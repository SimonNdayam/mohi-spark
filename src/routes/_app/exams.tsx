import { createFileRoute } from "@tanstack/react-router";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, Legend } from "recharts";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, GraduationCap, TrendingUp, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { examPerformance, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/exams")({
  component: ExamsPage,
  head: () => ({ meta: [{ title: "Examinations · MOHI TTI" }] }),
});

const chartAxis = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

function ExamsPage() {
  const nita = [
    { grade: "Grade I", count: 128 }, { grade: "Grade II", count: 96 },
    { grade: "Grade III", count: 74 }, { grade: "Fail", count: 30 },
  ];
  const knec = [
    { grade: "Distinction", count: 42 }, { grade: "Credit", count: 78 },
    { grade: "Pass", count: 74 }, { grade: "Fail", count: 20 },
  ];
  const passData = [{ name: "Pass rate", value: kpis.examPassRate, fill: "var(--color-chart-2)" }];

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Examinations" description="Internal, NITA and KNEC results across all departments." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Overall Pass Rate" value={`${kpis.examPassRate}%`} icon={CheckCircle2} tone="positive" delta={3.2} />
        <KpiCard label="Internal Exams" value={kpis.internalExamsCompleted.toLocaleString()} icon={GraduationCap} tone="primary" />
        <KpiCard label="NITA Trade Tests" value={kpis.nitaExams} icon={Award} tone="default" />
        <KpiCard label="KNEC Exams" value={kpis.knecExams} icon={Award} tone="default" />
      </div>

      <Tabs defaultValue="performance">
        <TabsList>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="nita">NITA</TabsTrigger>
          <TabsTrigger value="knec">KNEC</TabsTrigger>
          <TabsTrigger value="internal">Internal</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          <div className="glass-card rounded-xl p-5 lg:col-span-2">
            <h3 className="font-semibold mb-1">Pass Rate by Department</h3>
            <p className="text-xs text-muted-foreground mb-4">Combined internal + external exams</p>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={examPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="dept" tick={{ ...chartAxis, fontSize: 10 }} />
                <YAxis tick={chartAxis} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="pass" fill="var(--color-chart-2)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="fail" fill="var(--color-destructive)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="glass-card rounded-xl p-5 flex flex-col">
            <h3 className="font-semibold mb-1">Overall Pass Rate</h3>
            <p className="text-xs text-muted-foreground mb-4">All examination bodies</p>
            <div className="flex-1 grid place-items-center">
              <ResponsiveContainer width="100%" height={220}>
                <RadialBarChart innerRadius="70%" outerRadius="100%" data={passData} startAngle={90} endAngle={-270}>
                  <RadialBar background dataKey="value" cornerRadius={20} />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-center -mt-32">
                <div className="text-4xl font-bold tabular-nums">{kpis.examPassRate}%</div>
                <div className="text-xs text-muted-foreground">Institutional average</div>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-4 border-t border-border/60 mt-4">
              <Badge className="bg-success/10 text-success border-success/20"><TrendingUp className="h-3 w-3 mr-1" />+3.2% YoY</Badge>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nita" className="mt-4">
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-1">NITA Trade Test Grades</h3>
            <p className="text-xs text-muted-foreground mb-4">Grade I, II, III distribution</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={nita}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="grade" tick={chartAxis} />
                <YAxis tick={chartAxis} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="knec" className="mt-4">
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-semibold mb-1">KNEC Grade Distribution</h3>
            <p className="text-xs text-muted-foreground mb-4">Distinction · Credit · Pass · Fail</p>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={knec}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="grade" tick={chartAxis} />
                <YAxis tick={chartAxis} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                <Bar dataKey="count" fill="var(--color-chart-2)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="internal" className="mt-4">
          <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
            <GraduationCap className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">CAT, End-Term, Practical & Theory records</p>
            <p className="text-xs mt-1">4,820 exams completed year-to-date</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
