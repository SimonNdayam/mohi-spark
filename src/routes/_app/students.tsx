import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Filter, UserPlus, Upload } from "lucide-react";
import { PageHeader } from "@/components/ui-blocks/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Student } from "@/lib/mock-data";
import { ExportMenu } from "@/components/io/ExportMenu";
import { ImportDialog } from "@/components/io/ImportDialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { studentSchema, type ImportedStudent } from "@/lib/io/schemas";
import { useLiveData } from "@/lib/use-live-data";

export const Route = createFileRoute("/_app/students")({
  component: StudentsPage,
  head: () => ({ meta: [{ title: "Students · MOHI TTI" }] }),
});

function AddStudentDialog({ trigger, onAdd, departments }: { trigger?: React.ReactNode; onAdd: (s: Omit<Student, 'id'>) => void; departments: { id: string; name: string; courses: string[] }[] }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [admissionNo, setAdmissionNo] = useState("");
  const [admissionDate, setAdmissionDate] = useState<string>(new Date().toISOString().slice(0, 10));
  const [contact, setContact] = useState("");
  const [departmentVal, setDepartmentVal] = useState(departments[0]?.name ?? "");
  const [course, setCourse] = useState("");
  const [statusVal, setStatusVal] = useState<"Continuing" | "Completed" | "Deferred" | "Dropped">("Continuing");
  const [discipleship, setDiscipleship] = useState<"Wanderer" | "Seeker" | "Accepted Christ" | "Follower" | "Guide">("Seeker");
  const [attachmentStatus, setAttachmentStatus] = useState<"Placed" | "Awaiting" | "Completed" | "N/A">("Awaiting");
  const [attachmentLocation, setAttachmentLocation] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState<"Employed" | "Awaiting" | "N/A">("Awaiting");
  const [placementLocation, setPlacementLocation] = useState("");
  const [gpa, setGpa] = useState<number>(0);

  const reset = () => {
    setName(""); setAdmissionNo(""); setAdmissionDate(new Date().toISOString().slice(0, 10)); setContact("");
    setDepartmentVal(departments[0]?.name ?? ""); setCourse(""); setStatusVal("Continuing"); setDiscipleship("Seeker");
    setAttachmentStatus("Awaiting"); setAttachmentLocation(""); setEmploymentStatus("Awaiting"); setPlacementLocation(""); setGpa(0);
  };

  const commit = () => {
    if (!name || !admissionNo || !departmentVal || !course) return;
    const payload: Omit<Student, 'id'> = {
      admissionNo,
      admissionDate,
      name,
      gender: "M",
      department: departmentVal,
      course,
      intake: "",
      status: statusVal,
      phone: contact,
      contact,
      county: "",
      discipleship,
      attachmentStatus,
      attachmentLocation: attachmentLocation || undefined,
      employmentStatus,
      placementLocation: placementLocation || undefined,
      gpa: Number(gpa || 0),
    };

    onAdd(payload);
    setOpen(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { setOpen(o); if (!o) reset(); }}>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button size="sm" className="gradient-primary text-primary-foreground border-0">
            <UserPlus className="h-4 w-4 mr-1.5" /> New Student
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>Fill required fields and click Add to create a new student record.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
            <Input value={admissionNo} onChange={(e) => setAdmissionNo(e.target.value)} placeholder="Admission No" />
            <Input type="date" value={admissionDate} onChange={(e) => setAdmissionDate(e.target.value)} />
            <Input value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Contact (phone)" />
            <Select value={departmentVal} onValueChange={(v) => { setDepartmentVal(v); const dept = departments.find(d => d.name === v); if (dept) setCourse(dept.courses?.[0] ?? ""); }}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Department" /></SelectTrigger>
              <SelectContent>
                {departments.map((d) => <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input value={course} onChange={(e) => setCourse(e.target.value)} placeholder="Course" />
            <Select value={statusVal} onValueChange={(v) => setStatusVal(v as any)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Continuing">Continuing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Deferred">Deferred</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
            <Select value={discipleship} onValueChange={(v) => setDiscipleship(v as any)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Discipleship" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Wanderer">Wanderer</SelectItem>
                <SelectItem value="Seeker">Seeker</SelectItem>
                <SelectItem value="Accepted Christ">Accepted Christ</SelectItem>
                <SelectItem value="Follower">Follower</SelectItem>
                <SelectItem value="Guide">Guide</SelectItem>
              </SelectContent>
            </Select>
            <Select value={attachmentStatus} onValueChange={(v) => setAttachmentStatus(v as any)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Attachment Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Placed">Placed</SelectItem>
                <SelectItem value="Awaiting">Awaiting</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="N/A">N/A</SelectItem>
              </SelectContent>
            </Select>
            <Input value={attachmentLocation} onChange={(e) => setAttachmentLocation(e.target.value)} placeholder="Attachment Location (optional)" />
            <Select value={employmentStatus} onValueChange={(v) => setEmploymentStatus(v as any)}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Employment Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Employed">Employed</SelectItem>
                <SelectItem value="Awaiting">Awaiting</SelectItem>
                <SelectItem value="N/A">N/A</SelectItem>
              </SelectContent>
            </Select>
            <Input value={placementLocation} onChange={(e) => setPlacementLocation(e.target.value)} placeholder="Placement Location (optional)" />
            <Input type="number" step="0.01" value={String(gpa)} onChange={(e) => setGpa(Number(e.target.value))} placeholder="GPA" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={commit} className="gradient-primary text-primary-foreground border-0">Add student</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StudentsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("all");
  const { students, addStudent, addStudentsBulk, departments } = useLiveData();

  const filtered = useMemo(() => students.filter((s) => {
    if (dept !== "all" && s.department !== dept) return false;
    if (status !== "all" && s.status !== status) return false;
    if (q && !`${s.name} ${s.admissionNo} ${s.course} ${s.admissionDate ?? ""} ${s.phone ?? ""} ${s.discipleship ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  }), [students, dept, status, q]);

  const exportColumns = [
    { key: "admissionNo", label: "Admission No" },
    { key: "name", label: "Name" },
    { key: "admissionDate", label: "Admission Date" },
    { key: "contact", label: "Contact" },
    { key: "gender", label: "Gender" },
    { key: "department", label: "Department" },
    { key: "course", label: "Course" },
    { key: "intake", label: "Intake" },
    { key: "county", label: "County" },
    { key: "discipleship", label: "Discipleship" },
    { key: "attachmentStatus", label: "Attachment" },
    { key: "attachmentLocation", label: "Attachment Location" },
    { key: "employmentStatus", label: "Employment" },
    { key: "placementLocation", label: "Placement Location" },
    { key: "status", label: "Status" },
    { key: "gpa", label: "GPA" },
  ];

  const handleImport = async (rows: ImportedStudent[]) => {
    // send to API via hook; rows conform to ImportedStudent (no id)
    await addStudentsBulk(rows as Omit<Student, 'id'>[]);
  };

  return (
    <div className="p-6 space-y-4 max-w-[1600px] mx-auto">
      <PageHeader
        title="Students"
        description={`${students.length} total · ${students.filter((s) => s.status === "Continuing").length} continuing · showing ${filtered.length}`}
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
        <AddStudentDialog
          trigger={<Button size="sm" className="gradient-primary text-primary-foreground border-0"><UserPlus className="h-4 w-4 mr-1.5" /> New Student</Button>}
          departments={departments}
          onAdd={(s) => { addStudent(s); }}
        />
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
              <SelectItem value="Continuing">Continuing</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Deferred">Deferred</SelectItem>
              <SelectItem value="Dropped">Dropped</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon"><Filter className="h-4 w-4" /></Button>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {departments.map((d) => (
            <Button key={d.id} variant={dept === d.name ? 'default' : 'outline'} size="sm" onClick={() => setDept(d.name)}>
              {d.name}
            </Button>
          ))}
          <Button variant="ghost" size="sm" onClick={() => setDept('all')}>All departments</Button>
        </div>

        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/40 hover:bg-muted/40">
                <TableHead>Student</TableHead>
                <TableHead>Admission No</TableHead>
                <TableHead>Admission Date</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Discipleship</TableHead>
                <TableHead>Attachment</TableHead>
                <TableHead>Placement</TableHead>
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
                  <TableCell className="text-sm">{s.admissionDate}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.contact}</TableCell>
                  <TableCell className="text-sm">{s.department}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.course}</TableCell>
                  <TableCell className="text-sm">{s.discipleship}</TableCell>
                  <TableCell className="text-sm">{s.attachmentStatus}{s.attachmentLocation ? ` · ${s.attachmentLocation}` : ''}</TableCell>
                  <TableCell className="text-sm">{s.employmentStatus}{s.placementLocation ? ` · ${s.placementLocation}` : ''}</TableCell>
                  <TableCell className="text-right tabular-nums text-sm">{s.gpa.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={s.status === "Continuing" ? "default" : "secondary"}
                      className={s.status === "Continuing" ? "bg-success/10 text-success hover:bg-success/10 border-success/20" : ""}>
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
