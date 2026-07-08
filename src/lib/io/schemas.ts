// Dataset schemas power CSV/Excel templates, import validation and exports.
import type { Student } from "@/lib/mock-data";

export type FieldKind = "string" | "number" | "enum" | "phone";

export type FieldSpec = {
  key: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  enumValues?: readonly string[];
  min?: number;
  max?: number;
  example?: string | number;
};

export type DatasetSchema = {
  id: string;
  name: string;
  fields: FieldSpec[];
};

export const studentSchema: DatasetSchema = {
  id: "students",
  name: "Students",
  fields: [
    { key: "admissionNo", label: "Admission No", kind: "string", required: true, example: "MOHI/2025/1001" },
    { key: "name", label: "Full Name", kind: "string", required: true, example: "Jane Wanjiku" },
    { key: "gender", label: "Gender", kind: "enum", required: true, enumValues: ["M", "F"], example: "F" },
    { key: "department", label: "Department", kind: "string", required: true, example: "ICT" },
    { key: "course", label: "Course", kind: "string", required: true, example: "Web Development" },
    { key: "intake", label: "Intake", kind: "string", required: true, example: "Sep 2025" },
    {
      key: "status", label: "Status", kind: "enum", required: true,
      enumValues: ["Active", "Completed", "Deferred", "Dropped"], example: "Active",
    },
    { key: "phone", label: "Phone", kind: "phone", required: true, example: "+254712345678" },
    { key: "county", label: "County", kind: "string", required: true, example: "Nairobi" },
    { key: "discipleship", label: "Discipleship Stage", kind: "string", example: "Growing" },
    {
      key: "attachment", label: "Attachment", kind: "enum",
      enumValues: ["Placed", "Awaiting", "Completed", "N/A"], example: "Awaiting",
    },
    {
      key: "employment", label: "Employment", kind: "enum",
      enumValues: ["Employed", "Awaiting", "N/A"], example: "Awaiting",
    },
    { key: "gpa", label: "GPA", kind: "number", min: 0, max: 4, example: 3.2 },
  ],
};

export type ImportRowError = { row: number; field: string; message: string };

export type ImportResult<T> = {
  valid: T[];
  invalid: { row: number; data: Record<string, unknown>; errors: ImportRowError[] }[];
  totalRows: number;
};

export function validateRow(
  schema: DatasetSchema,
  raw: Record<string, unknown>,
  rowIndex: number,
): { data: Record<string, unknown>; errors: ImportRowError[] } {
  const errors: ImportRowError[] = [];
  const out: Record<string, unknown> = {};

  for (const f of schema.fields) {
    const rawVal = raw[f.key] ?? raw[f.label];
    const v = typeof rawVal === "string" ? rawVal.trim() : rawVal;

    if (v === undefined || v === null || v === "") {
      if (f.required) errors.push({ row: rowIndex, field: f.label, message: "Required" });
      continue;
    }

    if (f.kind === "number") {
      const n = typeof v === "number" ? v : Number(v);
      if (Number.isNaN(n)) {
        errors.push({ row: rowIndex, field: f.label, message: `Must be a number` });
      } else if ((f.min !== undefined && n < f.min) || (f.max !== undefined && n > f.max)) {
        errors.push({ row: rowIndex, field: f.label, message: `Must be between ${f.min}–${f.max}` });
      } else {
        out[f.key] = n;
      }
    } else if (f.kind === "enum") {
      const s = String(v);
      if (!f.enumValues!.includes(s)) {
        errors.push({
          row: rowIndex, field: f.label,
          message: `Must be one of: ${f.enumValues!.join(", ")}`,
        });
      } else {
        out[f.key] = s;
      }
    } else if (f.kind === "phone") {
      const s = String(v).replace(/\s+/g, "");
      if (!/^\+?\d{9,15}$/.test(s)) {
        errors.push({ row: rowIndex, field: f.label, message: "Invalid phone" });
      } else {
        out[f.key] = s;
      }
    } else {
      out[f.key] = String(v);
    }
  }

  return { data: out, errors };
}

export type ImportedStudent = Omit<Student, "id">;
