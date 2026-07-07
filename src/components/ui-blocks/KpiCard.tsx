import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function KpiCard({
  label,
  value,
  icon: Icon,
  delta,
  tone = "default",
  hint,
}: {
  label: string;
  value: string | number;
  icon: LucideIcon;
  delta?: number;
  tone?: "default" | "positive" | "warning" | "primary";
  hint?: string;
}) {
  const toneRing = {
    default: "bg-muted text-foreground",
    positive: "bg-success/10 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    primary: "bg-primary/10 text-primary",
  }[tone];

  const deltaPositive = (delta ?? 0) >= 0;

  return (
    <div className="glass-card rounded-xl p-4 flex flex-col gap-3 hover:shadow-elevated transition-shadow">
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</span>
        <div className={cn("h-8 w-8 rounded-lg grid place-items-center", toneRing)}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div className="flex items-end justify-between gap-2">
        <div className="text-2xl font-semibold tracking-tight tabular-nums">{value}</div>
        {delta !== undefined && (
          <div
            className={cn(
              "flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md",
              deltaPositive ? "text-success bg-success/10" : "text-destructive bg-destructive/10"
            )}
          >
            {deltaPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      {hint && <div className="text-[11px] text-muted-foreground">{hint}</div>}
    </div>
  );
}
