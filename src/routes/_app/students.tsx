import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Filter, UserPlus, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { students as seedStudents, departments, type Student } from "@/lib/mock-data";
import { ExportMenu } from "@/components/io/ExportMenu";
import { ImportDialog } from "@/components/io/ImportDialog";
import { studentSchema, type ImportedStudent } from "@/lib/io/schemas";

export const Route = createFileRoute("/_app/students")({
  component: StudentsPage,
  head: () => ({ meta: [{ title: "Students · MOHI TTI" }] }),
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const [students, setStudents] = useState<Student[]>(seedStudents);

  const filtered = useMemo(() => students.filter((s) => {
    if (dept !== "all" && s.department !== dept) return false;
    if (status !== "all" && s.status !== status) return false;
    if (q && !`${s.name} ${s.admissionNo} ${s.course}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [students, dept, status, q]);

  const exportColumns = [
    { key: "admissionNo", label: "Admission No" },
    { key: "name", label: "Name" },
    { key: "gender", label: "Gender" },
    { key: "department", label: "Department" },
    { key: "course", label: "Course" },
    { key: "intake", label: "Intake" },
    { key: "county", label: "County" },
    { key: "phone", label: "Phone" },
    { key: "status", label: "Status" },
    { key: "gpa", label: "GPA" },
  ];

  const handleImport = (rows: ImportedStudent[]) => {
    const startId = students.length + 1;
    const withIds: Student[] = rows.map((r, i) => ({ ...(r as ImportedStudent), id: `s${startId + i}` }));
    setStudents((prev) => [...withIds, ...prev]);
  };

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      <PageHeader
        title="Students"
        description={`${students.length} total · ${students.filter((s) => s.status === "Active").length} active · showing ${filtered.length}`}
      >
        <ImportDialog<ImportedStudent>
          schema={studentSchema}
          onImport={handleImport}
          trigger={<Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1.5" /> Import</Button>}
        />
        <ExportMenu
          filenameBase="students"
          columns={exportColumns}
          data={filtered as unknown as Record<string, unknown>[]}
          title="Students Register"
          subtitle={`Filtered view · ${filtered.length} of ${students.length} students`}
        />
        <Button size="sm" className="gradient-primary text-primary-foreground border-0">
          <UserPlus className="h-4 w-4 mr-1.5" /> New Student
        </Button>
      </PageHeader>

      <div className="glass-card rounded-xl p-4 space-y-4">
        <div className="flex flex-wrap gap-2">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, admission no, course…" className="pl-9" />
          </div>
          <Select value={dept} onValueChange={setDept}>
            <SelectTrigger className="w-[180px]"><SelectValue placeholder="Department" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All departments</SelectItem>
              {departments.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[150px]"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Deferred">Deferred</SelectItem>
              <SelectItem value="Dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Student</TableHead>
                <TableHead>Admission No</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Intake</TableHead>
                <TableHead>County</TableHead>
                <TableHead className="text-right">GPA</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    <div className="flex items-center gap-2.5">
                      <div className="h-7 w-7 rounded-full bg-primary/10 text-primary text-[11px] font-semibold grid place-items-center">
                        {s.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-medium leading-tight">{s.name}</div>
                        <div className="text-[11px] text-muted-foreground">{s.gender === "M" ? "Male" : "Female"} · {s.phone}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{s.admissionNo}</TableCell>
                  <TableCell className="text-sm">{s.department}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.course}</TableCell>
                  <TableCell className="text-sm">{s.intake}</TableCell>
                  <TableCell className="text-sm">{s.county}</TableCell>
                  <TableCell className="text-right tabular-nums text-sm">{s.gpa.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === "Active" ? "default" : "secondary"}
                      className={s.status === "Active" ? "bg-success/10 text-success hover:bg-success/10 border-success/20" : ""}>
                      {s.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="text-xs text-muted-foreground">Showing {filtered.length} of {students.length} students</div>
      </div>
    </div>
  );
}
