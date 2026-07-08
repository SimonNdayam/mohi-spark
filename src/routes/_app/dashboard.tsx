import { createFileRoute } from "@tanstack/react-router";
import {
  Users, UserPlus, GraduationCap, Briefcase, MapPinned, Award,
  HeartHandshake, TrendingUp, Sparkles, AlertTriangle, ChevronRight,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExportMenu } from "@/components/io/ExportMenu";
import {
  kpis, enrolmentTrend, intakeData, examPerformance,
  employmentTimeline, discipleshipStages, departments, aiInsights, students,
} from "@/lib/mock-data";

export const Route = createFileRoute("/_app/dashboard")({
  component: DashboardPage,
  head: () => ({
    meta: [{ title: "Dashboard · MOHI TTI" }, { name: "description", content: "Institutional performance overview." }],
  }),
});

const chartAxis = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

function DashboardPage() {
  const genderPie = [
    { name: "Male", value: kpis.male, color: "var(--color-chart-1)" },
    { name: "Female", value: kpis.female, color: "var(--color-chart-2)" },
  ];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Institutional Overview"
        description="Live snapshot of enrolment, academic performance, attachment, placement and discipleship — Academic Year 2025."
      >
        <ExportMenu
          filenameBase="dashboard-kpis"
          title="Institutional Overview — KPIs"
          subtitle="Academic Year 2025"
          columns={[
            { key: "metric", label: "Metric" },
            { key: "value", label: "Value" },
          ]}
          data={Object.entries(kpis).map(([k, v]) => ({
            metric: k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase()),
            value: v,
          }))}
        />
        <Button size="sm" className="gradient-primary text-primary-foreground border-0">
          <Sparkles className="h-4 w-4 mr-1.5" /> AI Summary
        </Button>
      </PageHeader>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <KpiCard label="Total Students" value={kpis.totalStudents.toLocaleString()} icon={Users} delta={12.4} tone="primary" />
        <KpiCard label="New Enrolments" value={kpis.newEnrolments} icon={UserPlus} delta={8.1} tone="positive" hint="This intake" />
        <KpiCard label="Active" value={kpis.activeStudents.toLocaleString()} icon={GraduationCap} tone="default" hint="Currently enrolled" />
        <KpiCard label="Graduated" value={kpis.graduatedStudents} icon={Award} delta={6.3} tone="positive" hint="2025 cohort" />
        <KpiCard label="On Attachment" value={kpis.studentsWithAttachments} icon={MapPinned} delta={4.2} tone="default" />
        <KpiCard label="Placed in Jobs" value={kpis.studentsPlaced} icon={Briefcase} delta={11.7} tone="positive" />
        <KpiCard label="Internal Exams" value={kpis.internalExamsCompleted.toLocaleString()} icon={GraduationCap} tone="default" hint="Completed YTD" />
        <KpiCard label="NITA Exams" value={kpis.nitaExams} icon={Award} tone="default" />
        <KpiCard label="KNEC Exams" value={kpis.knecExams} icon={Award} tone="default" />
        <KpiCard label="Awaiting Attachment" value={kpis.awaitingAttachment} icon={AlertTriangle} tone="warning" />
        <KpiCard label="Awaiting Placement" value={kpis.awaitingPlacement} icon={AlertTriangle} tone="warning" />
        <KpiCard label="Discipleship Engaged" value={kpis.discipleshipEngaged.toLocaleString()} icon={HeartHandshake} delta={9.8} tone="positive" />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold">Enrolment vs Graduation Trend</h3>
              <p className="text-xs text-muted-foreground">Historical growth across 7 years</p>
            </div>
            <Badge variant="secondary" className="gap-1"><TrendingUp className="h-3 w-3" />+140% since 2019</Badge>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={enrolmentTrend}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="year" tick={chartAxis} />
              <YAxis tick={chartAxis} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Area type="monotone" dataKey="enrolments" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#g1)" />
              <Area type="monotone" dataKey="graduates" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#g2)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Gender Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">All active students</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={genderPie} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {genderPie.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Legend iconType="circle" formatter={(v) => <span className="text-xs text-foreground">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Examination Pass Rate by Department</h3>
          <p className="text-xs text-muted-foreground mb-4">Internal, NITA and KNEC combined · 2025</p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={examPerformance} layout="vertical" margin={{ left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tick={chartAxis} />
              <YAxis dataKey="dept" type="category" tick={chartAxis} width={90} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="pass" stackId="a" fill="var(--color-chart-2)" radius={[0, 0, 0, 0]} />
              <Bar dataKey="fail" stackId="a" fill="var(--color-destructive)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Attachment & Placement Timeline</h3>
          <p className="text-xs text-muted-foreground mb-4">Monthly counts · 2025</p>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={employmentTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={chartAxis} />
              <YAxis tick={chartAxis} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Legend iconType="circle" formatter={(v) => <span className="text-xs text-foreground">{v}</span>} />
              <Line type="monotone" dataKey="attached" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="placed" stroke="var(--color-chart-2)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Intakes</h3>
          <p className="text-xs text-muted-foreground mb-4">Students per intake</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={intakeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="intake" tick={{ ...chartAxis, fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={chartAxis} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
              <Bar dataKey="students" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Department Distribution</h3>
          <p className="text-xs text-muted-foreground mb-4">Active enrolment mix</p>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={departments.map((d, i) => ({ name: d.name, value: d.students, fill: `var(--color-chart-${(i % 5) + 1})` }))}
                dataKey="value" innerRadius={40} outerRadius={80} paddingAngle={2} />
              <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-semibold mb-1">Discipleship Journey</h3>
          <p className="text-xs text-muted-foreground mb-4">Spiritual growth stages</p>
          <div className="space-y-2.5">
            {discipleshipStages.map((s) => {
              const pct = Math.round((s.students / kpis.totalStudents) * 100);
              return (
                <div key={s.stage}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{s.stage}</span>
                    <span className="text-muted-foreground tabular-nums">{s.students} · {pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct * 3}%`, background: s.color }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Insights + Recent Students */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="glass-card rounded-xl p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg gradient-primary grid place-items-center">
                <Sparkles className="h-3.5 w-3.5 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">AI Insights</h3>
                <p className="text-xs text-muted-foreground">Auto-generated recommendations</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">View all <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {aiInsights.map((ins, i) => (
              <div key={i} className="rounded-lg border border-border/60 bg-background/50 p-3 hover:border-primary/40 transition-colors">
                <div className="flex items-start gap-2 mb-2">
                  <Badge
                    variant="secondary"
                    className={
                      ins.severity === "positive" ? "bg-success/10 text-success border-success/20" :
                      ins.severity === "warning" ? "bg-warning/15 text-warning-foreground border-warning/20" :
                      "bg-primary/10 text-primary border-primary/20"
                    }
                  >
                    {ins.kind}
                  </Badge>
                </div>
                <div className="font-medium text-sm mb-1">{ins.title}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{ins.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Students</h3>
            <Button variant="ghost" size="sm" className="text-xs">All <ChevronRight className="h-3 w-3 ml-1" /></Button>
          </div>
          <div className="space-y-2.5">
            {students.slice(0, 7).map((s) => (
              <div key={s.id} className="flex items-center gap-3 p-2 -mx-2 rounded-lg hover:bg-muted/50">
                <div className="h-8 w-8 rounded-full bg-primary/10 text-primary text-xs font-semibold grid place-items-center">
                  {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{s.course} · {s.intake}</div>
                </div>
                <Badge variant="outline" className="text-[10px]">{s.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
