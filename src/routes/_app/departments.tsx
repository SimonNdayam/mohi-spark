import { createFileRoute } from "@tanstack/react-router";
import * as Icons from "lucide-react";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { departments } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/departments")({
  component: DeptPage,
  head: () => ({ meta: [{ title: "Departments · MOHI TTI" }] }),
});

function DeptPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Departments" description="8 academic departments · 32 courses across MOHI TTI">
        <Button size="sm" className="gradient-primary text-primary-foreground border-0">
          <Icons.Plus className="h-4 w-4 mr-1.5" /> New Department
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {departments.map((d) => {
          const Icon = (Icons as any)[d.icon] as any;
          return (
            <div key={d.id} className="glass-card rounded-xl p-5 hover:shadow-elevated transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="h-11 w-11 rounded-xl grid place-items-center"
                  style={{ background: `${d.color}18`, color: d.color }}>
                  {Icon && <Icon className="h-5 w-5" />}
                </div>
                <Badge variant="secondary" className="tabular-nums">{d.students}</Badge>
              </div>
              <h3 className="font-semibold text-base mb-1">{d.name}</h3>
              <p className="text-xs text-muted-foreground mb-3">HoD: {d.head}</p>
              <div className="border-t border-border/60 pt-3">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">
                  {d.courses.length} Courses
                </div>
                <div className="flex flex-wrap gap-1">
                  {d.courses.map((c) => (
                    <span key={c} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
