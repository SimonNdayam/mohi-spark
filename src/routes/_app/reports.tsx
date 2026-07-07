import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { FileBarChart2, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
  head: () => ({ meta: [{ title: "Reports · MOHI TTI" }] }),
});

const reports = [
  { title: "Enrolment Report", desc: "Filtered by department, intake, gender and county." },
  { title: "Academic Performance Report", desc: "CATs, end-term and internal exam summaries." },
  { title: "Examination Body Report", desc: "NITA and KNEC pass rates and grade distribution." },
  { title: "Attachment Report", desc: "Company placements, supervisor visits, completion status." },
  { title: "Job Placement Report", desc: "Employment outcomes, top employers, salary ranges." },
  { title: "Discipleship Report", desc: "Stage transitions, mentor allocation, follow-up." },
  { title: "Trainer Workload Report", desc: "Student allocation and performance by trainer." },
  { title: "Graduate Outcome Report", desc: "Long-term career progress by course and intake." },
];

function ReportsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Reports" description="Generate professional reports with filters, charts and downloadable formats (CSV, Excel, PDF)." />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.title} className="glass-card rounded-xl p-5 hover:shadow-elevated transition-shadow">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
              <FileBarChart2 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm">{r.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4">{r.desc}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Configure</Button>
              <Button size="sm" className="gradient-primary text-primary-foreground border-0">
                <Download className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
