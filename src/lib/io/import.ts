// CSV/XLSX parsing + validation using a DatasetSchema.
import * as XLSX from "xlsx";
import Papa from "papaparse";
import { validateRow, type DatasetSchema, type ImportResult } from "./schemas";

async function readCsv(file: File): Promise<Record<string, unknown>[]> {
  const text = await file.text();
  const parsed = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim(),
  });
  return parsed.data;
}

async function readXlsx(file: File): Promise<Record<string, unknown>[]> {
  const buf = await file.arrayBuffer();
  const wb = XLSX.read(buf, { type: "array" });
  const sheetName = wb.SheetNames.find((n) => n.toLowerCase() === "data") ?? wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  return XLSX.utils.sheet_to_json<Record<string, unknown>>(ws, { defval: "" });
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
