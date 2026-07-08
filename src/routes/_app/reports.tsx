import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { FileBarChart2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExportMenu } from "@/components/io/ExportMenu";
import { useLiveData } from "@/lib/use-live-data";
import { trainers } from "@/lib/mock-data";
import type { ExportColumn } from "@/lib/io/export";

export const Route = createFileRoute("/_app/reports")({
  component: ReportsPage,
  head: () => ({ meta: [{ title: "Reports · MOHI TTI" }] }),
});

type ReportDef = {
  id: string;
  title: string;
  desc: string;
  columns: ExportColumn[];
  data: Record<string, unknown>[];
};

function ReportsPage() {
  const { students, departments, examPerformance, employmentTimeline, enrolmentTrend, discipleshipStages } = useLiveData();

  const employers = (() => {
    const map: Record<string, { name: string; placed: number }> = {};
    for (const s of students) {
      if (!s.placementLocation) continue;
      const key = s.placementLocation;
      if (!map[key]) map[key] = { name: key, placed: 0 };
      map[key].placed += 1;
    }
    return Object.values(map).sort((a, b) => b.placed - a.placed).slice(0, 20);
  })();

  const reports: ReportDef[] = [
    {
      id: "enrolment",
      title: "Enrolment Report",
      desc: "Filtered by department, intake, gender and county.",
      columns: [
        { key: "admissionNo", label: "Admission No" }, { key: "name", label: "Name" },
        { key: "gender", label: "Gender" }, { key: "department", label: "Department" },
        { key: "course", label: "Course" }, { key: "intake", label: "Intake" },
        { key: "county", label: "County" }, { key: "status", label: "Status" },
      ],
      data: students as unknown as Record<string, unknown>[],
    },
    {
      id: "academic",
      title: "Academic Performance Report",
      desc: "CATs, end-term and internal exam summaries.",
      columns: [
        { key: "admissionNo", label: "Admission No" }, { key: "name", label: "Name" },
        { key: "department", label: "Department" }, { key: "course", label: "Course" },
        { key: "intake", label: "Intake" }, { key: "gpa", label: "GPA" },
      ],
      data: students as unknown as Record<string, unknown>[],
    },
    {
      id: "exam-bodies",
      title: "Examination Body Report",
      desc: "NITA and KNEC pass rates and grade distribution.",
      columns: [
        { key: "dept", label: "Department" },
        { key: "pass", label: "Pass %" }, { key: "fail", label: "Fail %" },
      ],
      data: examPerformance as unknown as Record<string, unknown>[],
    },
    {
      id: "attachment",
      title: "Attachment Report",
      desc: "Company placements, supervisor visits, completion status.",
      columns: [
        { key: "admissionNo", label: "Admission No" }, { key: "name", label: "Name" },
        { key: "department", label: "Department" }, { key: "course", label: "Course" },
        { key: "attachment", label: "Attachment Status" }, { key: "county", label: "County" },
      ],
      data: students as unknown as Record<string, unknown>[],
    },
    {
      id: "placement",
      title: "Job Placement Report",
      desc: "Employment outcomes, top employers, industry distribution.",
      columns: [
        { key: "name", label: "Employer" }, { key: "industry", label: "Industry" },
        { key: "placed", label: "Placed" }, { key: "county", label: "County" },
      ],
      data: employers as unknown as Record<string, unknown>[],
    },
    {
      id: "discipleship",
      title: "Discipleship Report",
      desc: "Stage transitions, mentor allocation, follow-up.",
      columns: [
        { key: "stage", label: "Stage" }, { key: "students", label: "Students" },
      ],
      data: discipleshipStages as unknown as Record<string, unknown>[],
    },
    {
      id: "trainer",
      title: "Trainer Workload Report",
      desc: "Student allocation and performance by trainer.",
      columns: [
        { key: "name", label: "Trainer" }, { key: "dept", label: "Department" },
        { key: "students", label: "Students" }, { key: "rating", label: "Rating" },
      ],
      data: trainers as unknown as Record<string, unknown>[],
    },
    {
      id: "graduate-outcome",
      title: "Graduate Outcome Report",
      desc: "Long-term career progress by course and intake.",
      columns: [
        { key: "year", label: "Year" }, { key: "enrolments", label: "Enrolments" },
        { key: "graduates", label: "Graduates" },
      ],
      data: enrolmentTrend as unknown as Record<string, unknown>[],
    },
    {
      id: "department",
      title: "Department Snapshot",
      desc: "Head count, courses on offer and departmental leads.",
      columns: [
        { key: "name", label: "Department" }, { key: "head", label: "Head" },
        { key: "students", label: "Students" },
      ],
      data: departments as unknown as Record<string, unknown>[],
    },
    {
      id: "monthly-flow",
      title: "Monthly Attachment & Placement Flow",
      desc: "Monthly counts of attached and placed students.",
      columns: [
        { key: "month", label: "Month" }, { key: "attached", label: "Attached" },
        { key: "placed", label: "Placed" },
      ],
      data: employmentTimeline as unknown as Record<string, unknown>[],
    },
  ];

  return (


function ReportsPage() {
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Reports"
        description="Generate professional reports with filters, charts and downloadable formats (CSV, Excel, PDF)."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((r) => (
          <div key={r.id} className="glass-card rounded-xl p-5 hover:shadow-elevated transition-shadow flex flex-col">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center mb-3">
              <FileBarChart2 className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-sm">{r.title}</h3>
            <p className="text-xs text-muted-foreground mt-1 mb-4 flex-1">{r.desc}</p>
            <div className="text-[11px] text-muted-foreground mb-2">{r.data.length} rows</div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Configure</Button>
              <ExportMenu
                filenameBase={r.id}
                columns={r.columns}
                data={r.data}
                title={r.title}
                subtitle={r.desc}
                label="Download"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
