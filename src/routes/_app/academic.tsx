import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { BookOpenCheck, Calendar } from "lucide-react";
import { useLiveData } from "@/lib/use-live-data";
import { KpiCard } from "@/components/ui-blocks/KpiCard";

export const Route = createFileRoute("/_app/academic")({
  component: AcademicPage,
  head: () => ({ meta: [{ title: "Academic · MOHI TTI" }] }),
});

function AcademicPage() {
  const { kpis } = useLiveData();
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      <PageHeader title="Academic" description={`Units, modules, attendance and academic progress across departments · ${kpis.totalStudents} students`} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard label="Active Modules" value={148} icon={BookOpenCheck} tone="primary" />
        <KpiCard label="Attendance Rate" value="92%" icon={Calendar} tone="positive" delta={2.1} />
        <KpiCard label="Assessments (YTD)" value={3204} icon={BookOpenCheck} tone="default" />
        <KpiCard label="Avg. GPA" value="3.24" icon={BookOpenCheck} tone="default" />
      </div>
      <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">
        <BookOpenCheck className="h-10 w-10 mx-auto mb-3 opacity-40" />
        <p className="text-sm font-medium text-foreground">Detailed academic tracking</p>
        <p className="text-xs mt-1">Units, projects, assignments, attendance, trainer comments — coming in the next iteration once persistence is wired up.</p>
      </div>
    </div>
  );
}
