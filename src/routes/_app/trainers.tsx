import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Star, Users } from "lucide-react";
import { trainers } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/trainers")({
  component: TrainersPage,
  head: () => ({ meta: [{ title: "Trainers · MOHI TTI" }] }),
});

function TrainersPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Trainers" description="Faculty overseeing student attendance, assessments, attachment visits and discipleship." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {trainers.map((t) => (
          <div key={t.name} className="glass-card rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="h-12 w-12 rounded-full gradient-primary grid place-items-center text-primary-foreground font-bold">
                {t.name.split(" ").slice(-2).map((n) => n[0]).join("")}
              </div>
              <div className="flex items-center gap-1 text-warning">
                <Star className="h-3.5 w-3.5 fill-current" />
                <span className="text-sm font-medium tabular-nums">{t.rating}</span>
              </div>
            </div>
            <div className="text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground mb-3">{t.dept} Department</div>
            <div className="pt-3 border-t border-border/60 flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-muted-foreground"><Users className="h-3 w-3" /> Students</span>
              <Badge variant="secondary" className="tabular-nums">{t.students}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
