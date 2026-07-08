// CSV/XLSX parsing + validation using a DatasetSchema.
import ExcelJS from "exceljs";
import Papa from "papaparse";
import { validateRow, type DatasetSchema, type ImportResult } from "./schemas";

async function readCsv(file: File): Promise<Record<string, unknown>[]> {
  const text = await file.text();
  // Trim BOM from start if present
  const cleanText = text.replace(/^\uFEFF/, "");

  const parsed = Papa.parse<Record<string, unknown>>(cleanText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => String(h ?? "").replace(/^\uFEFF/, "").trim(),
  });

  // Fallback: some CSVs produced by Excel or other tools may require explicit newline or delimiter
  if ((parsed.data?.length ?? 0) <= 1) {
    // Try common newline variants
    const newlineCandidates = ["\r\n", "\n", "\r"];
    for (const nl of newlineCandidates) {
      if (!cleanText.includes(nl)) continue;
      // Try common delimiters
      const delimiters = [",", ";", "\t", "|"];
      for (const delim of delimiters) {
        try {
          const parsed2 = Papa.parse<Record<string, unknown>>(cleanText, {
            header: true,
            skipEmptyLines: true,
            transformHeader: (h) => String(h ?? "").replace(/^\uFEFF/, "").trim(),
            newline: nl,
            delimiter: delim,
          });
          if ((parsed2.data?.length ?? 0) > 1) return parsed2.data;
        } catch (e) {
          // ignore and try next
        }
      }
    }

    // As a last resort: try splitting lines and re-parse only header+first 1000 lines
    const lines = cleanText.split(/\r?\n/).filter(Boolean);
    if (lines.length > 1) {
      const header = lines[0];
      const sample = lines.slice(0, 1000).join("\n");
      const parsed3 = Papa.parse<Record<string, unknown>>(sample, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => String(h ?? "").replace(/^\uFEFF/, "").trim(),
      });
      if ((parsed3.data?.length ?? 0) > 0) return parsed3.data;
    }
  }

  return parsed.data;
}

async function readXlsx(file: File): Promise<Record<string, unknown>[]> {
  const buf = await file.arrayBuffer();
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buf);
  const sheet = workbook.worksheets.find((w) => w.name.toLowerCase() === "data") ?? workbook.worksheets[0];
  if (!sheet) return [];
  // Read header
  const headerRow = sheet.getRow(1);
  const headers: string[] = [];
  headerRow.eachCell({ includeEmpty: false }, (cell, colNumber) => {
    headers.push(String(cell.value ?? "").trim());
  });
  const rows: Record<string, unknown>[] = [];
  sheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const obj: Record<string, unknown> = {};
    headers.forEach((h, i) => {
      const cell = row.getCell(i + 1);
      obj[h] = cell.value ?? "";
    });
    rows.push(obj);
  });
  return rows;
}

export async function parseFile(file: File): Promise<Record<string, unknown>[]> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".csv")) return readCsv(file);
  if (name.endsWith(".xlsx") || name.endsWith(".xls")) return readXlsx(file);
  throw new Error("Unsupported file. Please upload .csv, .xls or .xlsx");
}

function normalizeTokens(s: string | undefined): string[] {
  if (!s) return [];
  return String(s)
    .toLowerCase()
    .replace(/["'()]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function headerMatchesField(header: string, fieldKey: string, fieldLabel: string): boolean {
  const hTokens = normalizeTokens(header);
  const fTokens = [...normalizeTokens(fieldKey), ...normalizeTokens(fieldLabel)];
  if (hTokens.length === 0 || fTokens.length === 0) return false;

  // Exact token match
  if (hTokens.some((t) => fTokens.includes(t))) return true;

  // Prefix matches (adm -> admission)
  for (const ht of hTokens) {
    for (const ft of fTokens) {
      if (ft.startsWith(ht) || ht.startsWith(ft)) return true;
    }
  }

  // Contains
  const h = hTokens.join("");
  const f = fTokens.join("");
  if (h.includes(f) || f.includes(h)) return true;

  return false;
}

export async function importAndValidate<T = Record<string, unknown>>(
  file: File,
  schema: DatasetSchema,
): Promise<ImportResult<T>> {
  const rows = await parseFile(file);
  const valid: T[] = [];
  const invalid: ImportResult<T>["invalid"] = [];

  // Build header -> schema key mapping using first row keys
  const headerKeys = rows.length > 0 ? Object.keys(rows[0]) : [];
  const headerMap: Record<string, string | null> = {}; // schemaKey -> headerKey
  const usedHeaders = new Set<string>();

  // Helper to normalize header for exact matching
  const normalize = (s: string) => String(s ?? "").replace(/^\uFEFF/, "").trim().toLowerCase();

  // 1) Exact matches by key or label (case-insensitive)
  for (const f of schema.fields) {
    const exact = headerKeys.find((h) => {
      const n = normalize(h);
      return n === normalize(f.key) || n === normalize(f.label) || n === normalize(f.label).replace(/\s+/g, " ") || n === normalize(f.key).replace(/\s+/g, "");
    });
    if (exact) { headerMap[f.key] = exact; usedHeaders.add(exact); }
    else headerMap[f.key] = null;
  }

  // 2) Tokenized fuzzy matches for remaining fields, prefer unused headers
  for (const f of schema.fields) {
    if (headerMap[f.key]) continue; // already assigned
    const found = headerKeys.find((h) => !usedHeaders.has(h) && headerMatchesField(h, f.key, f.label));
    if (found) { headerMap[f.key] = found; usedHeaders.add(found); }
    else headerMap[f.key] = null;
  }

  rows.forEach((raw, i) => {
    const rowNumber = i + 2; // header + 1-indexed

    // Create remapped row where keys match schema.field.key
    const remapped: Record<string, unknown> = {};
    for (const f of schema.fields) {
      const hk = headerMap[f.key];
      if (hk && raw.hasOwnProperty(hk)) remapped[f.key] = raw[hk as string];
      else if (raw.hasOwnProperty(f.key)) remapped[f.key] = raw[f.key as string];
      else if (raw.hasOwnProperty(f.label)) remapped[f.key] = raw[f.label as string];
      else {
        // try to find any unused header that somewhat matches tokens
        const alt = headerKeys.find((h) => headerMatchesField(h, f.key, f.label));
        if (alt && raw.hasOwnProperty(alt)) remapped[f.key] = raw[alt];
      }
    }

    const { data, errors } = validateRow(schema, remapped, rowNumber);
    if (errors.length === 0) valid.push(data as T);
    else invalid.push({ row: rowNumber, data, errors });
  });

  return { valid, invalid, totalRows: rows.length };
}
