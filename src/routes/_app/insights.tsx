import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { Sparkles, TrendingUp, AlertTriangle, Award, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { aiInsights } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/insights")({
  component: InsightsPage,
  head: () => ({ meta: [{ title: "AI Insights · MOHI TTI" }] }),
});

const iconMap: Record<string, any> = {
  growth: TrendingUp, risk: AlertTriangle, outcomes: Award, spiritual: Info,
};

function InsightsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="AI Insights & Decision Support"
        description="Automated analysis of institutional data, forecasts, and recommendations for management."
      >
        <Button className="gradient-primary text-primary-foreground border-0" size="sm">
          <Sparkles className="h-4 w-4 mr-1.5" /> Generate New Report
        </Button>
      </PageHeader>

      <div className="glass-card rounded-xl p-6 gradient-brand text-primary-foreground">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-white/15 backdrop-blur grid place-items-center">
            <Sparkles className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider opacity-80 mb-1">Executive Summary · Sep 2025</div>
            <h2 className="text-lg font-semibold leading-snug">
              Enrolment is up 12.4% YoY, driven by ICT and Hospitality. Exam pass rate improved to 87.4%.
              Attachment backlog and Engineering discipleship follow-up need attention this term.
            </h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {aiInsights.map((ins, i) => {
          const Icon = iconMap[ins.kind] ?? Info;
          return (
            <div key={i} className="glass-card rounded-xl p-5">
              <div className="flex items-start gap-3 mb-3">
                <div className={
                  "h-10 w-10 rounded-lg grid place-items-center " +
                  (ins.severity === "positive" ? "bg-success/10 text-success" :
                   ins.severity === "warning" ? "bg-warning/15 text-warning-foreground" :
                   "bg-primary/10 text-primary")
                }>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <Badge variant="secondary" className="mb-2 text-[10px] uppercase tracking-wider">{ins.kind}</Badge>
                  <h3 className="font-semibold text-sm leading-snug">{ins.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{ins.body}</p>
            </div>
          );
        })}
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" /> Forecast Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Sep 2026 enrolment (predicted)", value: "≈ 1,680", delta: "+12%" },
            { label: "Placement rate (12-mo forecast)", value: "72%", delta: "+4pts" },
            { label: "Discipleship maturity index", value: "0.68", delta: "+0.06" },
          ].map((f) => (
            <div key={f.label} className="rounded-lg border border-border/60 p-4 bg-background/50">
              <div className="text-xs text-muted-foreground">{f.label}</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-2xl font-semibold tabular-nums">{f.value}</span>
                <span className="text-xs text-success font-medium">{f.delta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
