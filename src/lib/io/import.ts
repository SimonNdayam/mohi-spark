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

export async function importAndValidate<T = Record<string, unknown>>(
  file: File,
  schema: DatasetSchema,
): Promise<ImportResult<T>> {
  const rows = await parseFile(file);
  const valid: T[] = [];
  const invalid: ImportResult<T>["invalid"] = [];

  rows.forEach((raw, i) => {
    const rowNumber = i + 2; // header + 1-indexed
    const { data, errors } = validateRow(schema, raw, rowNumber);
    if (errors.length === 0) valid.push(data as T);
    else invalid.push({ row: rowNumber, data, errors });
  });

  return { valid, invalid, totalRows: rows.length };
}
