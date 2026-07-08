import { useRef, useState } from "react";
import { Upload, FileDown, FileSpreadsheet, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { importAndValidate } from "@/lib/io/import";
import { downloadTemplateCsv, downloadTemplateXlsx } from "@/lib/io/export";
import type { DatasetSchema, ImportResult } from "@/lib/io/schemas";

type Props<T> = {
  schema: DatasetSchema;
  onImport: (rows: T[]) => void;
  trigger?: React.ReactNode;
  title?: string;
};

export function ImportDialog<T = Record<string, unknown>>({
  schema, onImport, trigger, title,
}: Props<T>) {
  const [open, setOpen] = useState(false);
  const [result, setResult] = useState<ImportResult<T> | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => { setResult(null); setFileName(null); if (inputRef.current) inputRef.current.value = ""; };

  const handleFile = async (file: File) => {
    setBusy(true);
    setFileName(file.name);
    try {
      const res = await importAndValidate<T>(file, schema);
      setResult(res);
      if (res.invalid.length === 0) toast.success(`All ${res.totalRows} rows are valid`);
      else toast.warning(`${res.invalid.length} of ${res.totalRows} rows have errors`);
    } catch (e) {
      toast.error("Could not read file", { description: e instanceof Error ? e.message : String(e) });
      reset();
    } finally {
      setBusy(false);
    }
  };

  const commit = () => {
    if (!result) return;
    onImport(result.valid);
    toast.success(`Imported ${result.valid.length} ${schema.name.toLowerCase()}`);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" variant="outline">
            <Upload className="h-4 w-4 mr-1.5" /> Import
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{title ?? `Import ${schema.name}`}</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file. Rows are validated before anything is imported.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border border-dashed border-border p-4 flex flex-wrap items-center justify-between gap-3 bg-muted/30">
            <div>
              <div className="text-sm font-medium">Need the template?</div>
              <p className="text-xs text-muted-foreground">
                Includes the exact column headers and an instructions sheet.
              </p>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => downloadTemplateCsv(schema)}>
                <FileDown className="h-4 w-4 mr-1.5" /> CSV template
              </Button>
              <Button size="sm" variant="outline" onClick={() => downloadTemplateXlsx(schema)}>
                <FileSpreadsheet className="h-4 w-4 mr-1.5" /> Excel template
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border p-4">
            <input
              ref={inputRef}
              type="file"
              accept=".csv,.xlsx,.xls"
              className="block w-full text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
            />
            {fileName && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{fileName}</span>
                <button className="text-destructive inline-flex items-center gap-1" onClick={reset}>
                  <X className="h-3 w-3" /> clear
                </button>
              </div>
            )}
          </div>

          {busy && <div className="text-sm text-muted-foreground">Validating…</div>}

          {result && (
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-success/10 text-success border-success/20">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> {result.valid.length} valid
                </Badge>
                {result.invalid.length > 0 && (
                  <Badge className="bg-destructive/10 text-destructive border-destructive/20">
                    <AlertTriangle className="h-3 w-3 mr-1" /> {result.invalid.length} with errors
                  </Badge>
                )}
                <Badge variant="secondary">{result.totalRows} total</Badge>
              </div>

              {result.invalid.length > 0 && (
                <div className="rounded-lg border border-border max-h-56 overflow-auto">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/50 sticky top-0">
                      <tr>
                        <th className="text-left px-3 py-1.5 w-16">Row</th>
                        <th className="text-left px-3 py-1.5 w-40">Field</th>
                        <th className="text-left px-3 py-1.5">Error</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.invalid.flatMap((r) => r.errors).slice(0, 100).map((e, i) => (
                        <tr key={i} className="border-t border-border">
                          <td className="px-3 py-1.5 tabular-nums">{e.row}</td>
                          <td className="px-3 py-1.5">{e.field}</td>
                          <td className="px-3 py-1.5 text-destructive">{e.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={commit}
            disabled={!result || result.valid.length === 0}
            className="gradient-primary text-primary-foreground border-0"
          >
            Import {result?.valid.length ?? 0} rows
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
