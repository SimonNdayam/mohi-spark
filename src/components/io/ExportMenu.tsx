import { Download, FileSpreadsheet, FileText, FileType2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { exportCsv, exportPdf, exportXlsx, type ExportColumn } from "@/lib/io/export";

export type ExportMenuProps = {
  filenameBase: string;
  columns: ExportColumn[];
  data: Record<string, unknown>[];
  title?: string;
  subtitle?: string;
  size?: "sm" | "default";
  variant?: "outline" | "default" | "ghost";
  label?: string;
};

export function ExportMenu({
  filenameBase, columns, data, title, subtitle,
  size = "sm", variant = "outline", label = "Export",
}: ExportMenuProps) {
  const run = (fmt: "csv" | "xlsx" | "pdf") => {
    if (data.length === 0) {
      toast.warning("Nothing to export", { description: "The current view has no rows." });
      return;
    }
    try {
      if (fmt === "csv") exportCsv(filenameBase, columns, data);
      else if (fmt === "xlsx") exportXlsx(filenameBase, columns, data, title ?? filenameBase);
      else exportPdf(filenameBase, columns, data, { title: title ?? filenameBase, subtitle });
      toast.success(`Exported ${data.length} rows as ${fmt.toUpperCase()}`);
    } catch (e) {
      toast.error("Export failed", { description: e instanceof Error ? e.message : String(e) });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size}>
          <Download className="h-4 w-4 mr-1.5" /> {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs">Export {data.length.toLocaleString()} rows</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => run("csv")}>
          <FileText className="h-4 w-4 mr-2" /> CSV (.csv)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run("xlsx")}>
          <FileSpreadsheet className="h-4 w-4 mr-2" /> Excel (.xlsx)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => run("pdf")}>
          <FileType2 className="h-4 w-4 mr-2" /> PDF (.pdf)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
