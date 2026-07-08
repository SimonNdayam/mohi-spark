// Export helpers: CSV, XLSX and PDF (table) for filtered/reportable datasets.
import ExcelJS from "exceljs";
import Papa from "papaparse";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { DatasetSchema, FieldSpec } from "./schemas";

export type ExportColumn = { key: string; label: string };

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

function timestamp() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`;
}

function toRows(data: Record<string, unknown>[], columns: ExportColumn[]) {
  return data.map((r) => {
    const o: Record<string, unknown> = {};
    for (const c of columns) o[c.label] = r[c.key] ?? "";
    return o;
  });
}

export function exportCsv(
  filenameBase: string,
  columns: ExportColumn[],
  data: Record<string, unknown>[],
) {
  const csv = Papa.unparse(toRows(data, columns));
  download(new Blob([csv], { type: "text/csv;charset=utf-8;" }), `${filenameBase}-${timestamp()}.csv`);
}

export async function exportXlsx(
  filenameBase: string,
  columns: ExportColumn[],
  data: Record<string, unknown>[],
  sheetName = "Data",
) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet(sheetName.slice(0, 31));
  // Set header row
  ws.columns = columns.map((c) => ({ header: c.label, key: c.key, width: Math.max(12, c.label.length + 2) }));
  // Add rows
  for (const r of data) {
    const row = columns.map((c) => (r[c.key] === undefined || r[c.key] === null ? "" : String(r[c.key])));
    ws.addRow(row);
  }
  const buffer = await wb.xlsx.writeBuffer();
  download(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${filenameBase}-${timestamp()}.xlsx`);
}

export function exportPdf(
  filenameBase: string,
  columns: ExportColumn[],
  data: Record<string, unknown>[],
  meta: { title: string; subtitle?: string } = { title: filenameBase },
) {
  const doc = new jsPDF({ orientation: columns.length > 6 ? "landscape" : "portrait" });
  const pageWidth = doc.internal.pageSize.getWidth();

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("MOHI Technical Training Institute", 14, 15);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text(meta.title, 14, 22);
  if (meta.subtitle) {
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(meta.subtitle, 14, 28);
    doc.setTextColor(0);
  }
  doc.setFontSize(8);
  doc.setTextColor(140);
  doc.text(`Generated ${new Date().toLocaleString()}`, pageWidth - 14, 15, { align: "right" });
  doc.setTextColor(0);

  autoTable(doc, {
    startY: meta.subtitle ? 34 : 28,
    head: [columns.map((c) => c.label)],
    body: data.map((r) => columns.map((c) => {
      const v = r[c.key];
      return v === undefined || v === null ? "" : String(v);
    })),
    styles: { fontSize: 8, cellPadding: 2 },
    headStyles: { fillColor: [30, 58, 138], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [244, 247, 251] },
    margin: { left: 14, right: 14 },
  });

  doc.save(`${filenameBase}-${timestamp()}.pdf`);
}

// --------- Template downloads (CSV + Excel) built from a DatasetSchema ---------

function templateColumns(schema: DatasetSchema): ExportColumn[] {
  return schema.fields.map((f) => ({ key: f.key, label: f.label }));
}

function templateExampleRow(schema: DatasetSchema): Record<string, unknown> {
  const row: Record<string, unknown> = {};
  for (const f of schema.fields) row[f.key] = f.example ?? "";
  return row;
}

function fieldHint(f: FieldSpec): string {
  const parts: string[] = [];
  parts.push(f.required ? "required" : "optional");
  if (f.kind === "enum") parts.push(`one of: ${f.enumValues!.join(" | ")}`);
  else if (f.kind === "number") parts.push(`number${f.min !== undefined ? ` ${f.min}–${f.max}` : ""}`);
  else if (f.kind === "phone") parts.push("phone e.g. +2547XXXXXXXX");
  else parts.push("text");
  return parts.join(" · ");
}

export function downloadTemplateCsv(schema: DatasetSchema) {
  const cols = templateColumns(schema);
  const csv = Papa.unparse([templateExampleRow(schema)], { columns: cols.map((c) => c.key) });
  // Replace header with human labels for readability.
  const labelHeader = cols.map((c) => c.label).join(",");
  const withLabels = labelHeader + "\n" + csv.split("\n").slice(1).join("\n");
  download(
    new Blob([withLabels], { type: "text/csv;charset=utf-8;" }),
    `${schema.id}-import-template.csv`,
  );
}

export async function downloadTemplateXlsx(schema: DatasetSchema) {
  const cols = templateColumns(schema);
  const wb = new ExcelJS.Workbook();

  // Data sheet with example row.
  const dataSheet = wb.addWorksheet("Data");
  dataSheet.columns = cols.map((c) => ({ header: c.label, key: c.key, width: Math.max(16, c.label.length + 4) }));
  const exampleRow = Object.fromEntries(cols.map((c) => [c.key, schema.fields.find((f) => f.key === c.key)?.example ?? ""]));
  dataSheet.addRow(exampleRow);

  // Instructions sheet.
  const instr = [
    ["Field", "Requirement", "Notes"],
    ...schema.fields.map((f) => [f.label, f.required ? "Required" : "Optional", fieldHint(f)]),
  ];
  const instrSheet = wb.addWorksheet("Instructions");
  instr.forEach((r) => instrSheet.addRow(r));
  instrSheet.columns = [{ width: 22 }, { width: 14 }, { width: 60 }];

  const buffer = await wb.xlsx.writeBuffer();
  download(new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }), `${schema.id}-import-template.xlsx`);
}
