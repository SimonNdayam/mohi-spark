import { createFileRoute } from "@tanstack/react-router";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { KpiCard } from "@/components/ui-blocks/KpiCard";
import { MapPinned, CheckCircle2, Clock, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { employmentTimeline, students, kpis } from "@/lib/mock-data";

export const Route = createFileRoute("/_app/attachment")({
  component: AttachmentPage,
  head: () => ({ meta: [{ title: "Industrial Attachment · MOHI TTI" }] }),
});

const chartAxis = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };

function AttachmentPage() {
  const onAttachment = students.filter((s) => s.attachment === "Placed").slice(0, 12);

  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Industrial Attachment" description="Track student placements with partner organisations across Kenya." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Currently on Attachment" value={kpis.studentsWithAttachments} icon={MapPinned} tone="primary" delta={4.2} />
        <KpiCard label="Completed" value={412} icon={CheckCircle2} tone="positive" delta={9.1} />
        <KpiCard label="Awaiting Placement" value={kpis.awaitingAttachment} icon={Clock} tone="warning" />
        <KpiCard label="Partner Companies" value={87} icon={Building} tone="default" />
      </div>

      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-1">Attachment Trend</h3>
        <p className="text-xs text-muted-foreground mb-4">Monthly placements · 2025</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={employmentTimeline}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={chartAxis} />
            <YAxis tick={chartAxis} />
            <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
            <Legend iconType="circle" formatter={(v) => <span className="text-xs text-foreground">{v}</span>} />
            <Line type="monotone" dataKey="attached" name="On attachment" stroke="var(--color-chart-1)" strokeWidth={2.5} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="glass-card rounded-xl p-5">
        <h3 className="font-semibold mb-4">Active Attachments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {onAttachment.map((s, i) => (
            <div key={s.id} className="rounded-lg border border-border/60 p-3 bg-background/50">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-primary/10 text-primary text-xs font-semibold grid place-items-center">
                  {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{s.name}</div>
                  <div className="text-[11px] text-muted-foreground truncate">{s.course}</div>
                </div>
                <Badge variant="secondary" className="text-[10px] bg-primary/10 text-primary border-primary/20">Week {(i % 12) + 1}</Badge>
              </div>
              <div className="mt-2.5 pt-2.5 border-t border-border/60 text-[11px] text-muted-foreground">
                <div className="flex justify-between"><span>Company</span><span className="text-foreground font-medium">
                  {["Safaricom", "KPLC", "Sarova", "Toyota Kenya", "Bidco", "Serena"][i % 6]}</span></div>
                <div className="flex justify-between mt-1"><span>County</span><span className="text-foreground">{s.county}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
