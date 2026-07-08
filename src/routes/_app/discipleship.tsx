import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { HeartHandshake, Users, TrendingUp, AlertCircle } from "lucide-react";
import { useLiveData } from "@/lib/use-live-data";

export const Route = createFileRoute("/_app/discipleship")({
  component: DiscipleshipPage,
  head: () => ({ meta: [{ title: "Discipleship Journey · MOHI TTI" }] }),
});

const chartAxis = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

function DiscipleshipPage() {
  const { discipleshipStages, kpis, departments } = useLiveData();

  const growthOverTime = [
    { term: "T1 24", growing: 280, disc: 120, wandering: 220, lost: 180 },
    { term: "T2 24", growing: 320, disc: 148, wandering: 202, lost: 158 },
    { term: "T3 24", growing: 368, disc: 172, wandering: 189, lost: 132 },
    { term: "T1 25", growing: 402, disc: 195, wandering: 178, lost: 118 },
    { term: "T2 25", growing: 428, disc: 214, wandering: 172, lost: 98 },
  ];
  const byDept = departments.slice(0, 6).map((d) => ({
    dept: d.name.split(" ")[0],
    growing: Math.round(30 + Math.random() * 40),
    discipling: Math.round(10 + Math.random() * 25),
  }));

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Discipleship Journey" description="Every student walked through six stages of spiritual growth — with mentors, prayer notes and follow-up." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Engaged in Journey" value={kpis.discipleshipEngaged.toLocaleString()} icon={HeartHandshake} tone="primary" delta={9.8} />
        <KpiCard label="Growing" value={428} icon={TrendingUp} tone="positive" delta={6.5} />
        <KpiCard label="Discipling Others" value={214} icon={Users} tone="positive" delta={10.9} />
        <KpiCard label="Needs Follow-up" value={270} icon={AlertCircle} tone="warning" hint="Wandering + Lost" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="glass-card rounded-xl p-5 lg:col-span-3">
          <h3 className="font-semibold mb-1">Growth Over Time</h3>
          <p className="text-xs text-muted-foreground mb-4">Stage transitions by term</p>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={growthOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="term" tick={chartAxis} />
              <YAxis tick={chartAxis} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="growing" name="Growing" fill="var(--color-chart-2)" stackId="a" />
              <Bar dataKey="disc" name="Discipling" fill="var(--color-primary)" stackId="a" />
              <Bar dataKey="wandering" name="Wandering" fill="var(--color-warning)" stackId="a" />
              <Bar dataKey="lost" name="Lost" fill="var(--color-destructive)" stackId="a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="glass-card rounded-xl p-5 lg:col-span-2">
          <h3 className="font-semibold mb-4">Stage Distribution</h3>
          <div className="space-y-3">
            {discipleshipStages.map((s) => {
              const pct = Math.round((s.students / kpis.totalStudents) * 100);
              return (
                <div key={s.stage}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-medium">{s.stage}</span>
                    <span className="text-muted-foreground tabular-nums">{s.students} · {pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct * 3}%`, background: s.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-1">Spiritual Growth by Department</h3>
        <p className="text-xs text-muted-foreground mb-4">% of students in Growing / Discipling Others stages</p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={byDept}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="dept" tick={chartAxis} />
            <YAxis tick={chartAxis} />
            <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
            <Bar dataKey="growing" name="Growing" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
            <Bar dataKey="discipling" name="Discipling Others" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
