import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { Briefcase, TrendingUp, Building2, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { employers } from "@/lib/mock-data";
import { useLiveData } from "@/lib/use-live-data";

export const Route = createFileRoute("/_app/placement")({
  component: PlacementPage,
  head: () => ({ meta: [{ title: "Job Placement · MOHI TTI" }] }),
});

const chartAxis = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

function PlacementPage() {
  const { employmentTimeline, kpis, departments } = useLiveData();
  const byDept = departments.slice(0, 6).map((d) => ({
    dept: d.name.split(" ")[0],
    rate: Math.round(45 + Math.random() * 35),
  }));

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Job Placement" description="Graduate employment outcomes across industries and counties." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Placed in Jobs" value={kpis.studentsPlaced} icon={Briefcase} tone="positive" delta={11.7} />
        <KpiCard label="6-Month Rate" value="68%" icon={TrendingUp} tone="primary" delta={5.4} />
        <KpiCard label="Partner Employers" value={124} icon={Building2} tone="default" />
        <KpiCard label="Awaiting Placement" value={kpis.awaitingPlacement} icon={Clock} tone="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 lg:col-span-2">
          <h3 className="font-semibold mb-1">Employment Timeline</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly graduates placed · 2025</p>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={employmentTimeline}>
              <defs>
                <linearGradient id="pl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={chartAxis} />
              <YAxis tick={chartAxis} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="placed" stroke="var(--color-chart-2)" strokeWidth={2.5} fill="url(#pl)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Placement Rate by Dept</h3>
          <p className="text-xs text-muted-foreground mb-4">% of graduates placed</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={byDept} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tick={chartAxis} />
              <YAxis dataKey="dept" type="category" tick={chartAxis} width={80} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="rate" fill="var(--color-accent)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-4">Top Employers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {employers.map((e) => (
            <div key={e.name} className="rounded-lg border border-border/60 p-4 bg-background/50 hover:border-primary/40 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center font-bold">
                  {e.name[0]}
                </div>
                <Badge variant="secondary" className="tabular-nums text-xs">{e.placed} placed</Badge>
              </div>
              <div className="text-sm font-semibold">{e.name}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">{e.industry} · {e.county}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
