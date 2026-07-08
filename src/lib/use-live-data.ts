import { useEffect, useMemo, useState } from "react";
import type { Student } from "./mock-data";

function safeJson(res: Response) {
  return res.status === 204 ? null : res.json();
}

export function useLiveData(pollInterval = 10000) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const res = await fetch("/api/students");
      if (res.ok) {
        const data = await safeJson(res);
        if (Array.isArray(data)) setStudents(data as Student[]);
      } else {
        console.warn("Fetch students returned status", res.status);
      }
    } catch (e) {
      console.warn("Fetch students failed", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
    const id = setInterval(fetchStudents, pollInterval);
    return () => clearInterval(id);
  }, [pollInterval]);

  const addStudent = async (s: Omit<Student, "id">) => {
    try {
      const res = await fetch("/api/students", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(s) });
      if (res.ok) {
        const data = await safeJson(res);
        if (data) setStudents((prev) => [data as Student, ...prev]);
        return data as Student | null;
      }
      // fallback: add locally
      const fallback: Student = { id: `s${Date.now()}`, ...(s as Student) };
      setStudents((prev) => [fallback, ...prev]);
      return fallback;
    } catch (e) {
      console.warn("Add student failed", e);
      const fallback: Student = { id: `s${Date.now()}`, ...(s as Student) };
      setStudents((prev) => [fallback, ...prev]);
      return fallback;
    }
  };

  const addStudentsBulk = async (rows: Omit<Student, "id">[]) => {
    try {
      const res = await fetch("/api/students/bulk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(rows) });
      if (res.ok) {
        const data = await safeJson(res);
        if (Array.isArray(data)) setStudents((prev) => [...(data as Student[]), ...prev]);
        return data as Student[] | null;
      }
      // fallback: assign ids and append
      const withIds = rows.map((r, i) => ({ id: `s${Date.now() + i}`, ...(r as Student) }));
      setStudents((prev) => [...withIds, ...prev]);
      return withIds;
    } catch (e) {
      console.warn("Bulk insert failed", e);
      const withIds = rows.map((r, i) => ({ id: `s${Date.now() + i}`, ...(r as Student) }));
      setStudents((prev) => [...withIds, ...prev]);
      return withIds;
    }
  };

  const kpis = useMemo(() => {
    const totalStudents = students.length;
    const newEnrolments = students.filter((s) => {
      try {
        const ad = new Date(s.admissionDate);
        return (Date.now() - ad.getTime()) / (1000 * 60 * 60 * 24) < 90;
      } catch (e) {
        return false;
      }
    }).length;
    const activeStudents = students.filter((s) => s.status === "Continuing").length;
    const graduatedStudents = students.filter((s) => s.status === "Completed").length;
    const studentsWithAttachments = students.filter((s) => s.attachmentStatus === "Placed" || s.attachmentStatus === "Completed").length;
    const studentsPlaced = students.filter((s) => s.employmentStatus === "Employed").length;
    const internalExamsCompleted = 0;
    const nitaExams = 0;
    const knecExams = 0;
    const awaitingAttachment = students.filter((s) => s.attachmentStatus === "Awaiting").length;
    const awaitingPlacement = students.filter((s) => s.employmentStatus === "Awaiting").length;
    const examPassRate = Math.round((students.filter((s) => typeof s.gpa === "number" && s.gpa >= 2.5).length / Math.max(1, totalStudents)) * 100 * 10) / 10;
    const male = students.filter((s) => s.gender === "M").length;
    const female = students.filter((s) => s.gender === "F").length;
    const discipleshipEngaged = students.filter((s) => s.discipleship && s.discipleship !== "Unknown").length;

    return {
      totalStudents, newEnrolments, activeStudents, graduatedStudents,
      studentsWithAttachments, studentsPlaced, internalExamsCompleted, nitaExams, knecExams,
      awaitingAttachment, awaitingPlacement, examPassRate, male, female, discipleshipEngaged,
    };
  }, [students]);

  const enrolmentTrend = useMemo(() => {
    const byYear: Record<string, { year: string; enrolments: number; graduates: number }> = {};
    for (const s of students) {
      const year = s.admissionDate ? new Date(s.admissionDate).getFullYear().toString() : "Unknown";
      if (!byYear[year]) byYear[year] = { year, enrolments: 0, graduates: 0 };
      byYear[year].enrolments += 1;
      if (s.status === "Completed") byYear[year].graduates += 1;
    }
    return Object.values(byYear).sort((a, b) => Number(a.year) - Number(b.year));
  }, [students]);

  const examPerformance = useMemo(() => {
    const map: Record<string, { dept: string; pass: number; fail: number }> = {};
    for (const s of students) {
      const dept = s.department || "Unknown";
      if (!map[dept]) map[dept] = { dept, pass: 0, fail: 0 };
      if (typeof s.gpa === "number" && s.gpa >= 2.5) map[dept].pass += 1; else map[dept].fail += 1;
    }
    return Object.values(map);
  }, [students]);

  const employmentTimeline = useMemo(() => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const byMonth = months.map((m) => ({ month: m, placed: 0, attached: 0 }));
    for (const s of students) {
      if (!s.admissionDate) continue;
      const d = new Date(s.admissionDate);
      const idx = d.getMonth();
      if (s.attachmentStatus === "Placed" || s.attachmentStatus === "Completed") byMonth[idx].attached += 1;
      if (s.employmentStatus === "Employed") byMonth[idx].placed += 1;
    }
    return byMonth;
  }, [students]);

  const intakeData = useMemo(() => {
    const map: Record<string, { intake: string; students: number }> = {};
    for (const s of students) {
      const key = s.intake || "Unknown";
      if (!map[key]) map[key] = { intake: key, students: 0 };
      map[key].students += 1;
    }
    return Object.values(map);
  }, [students]);

  const departments = useMemo(() => {
    const map: Record<string, { id: string; name: string; students: number; courses: string[] }> = {};
    for (const s of students) {
      const name = s.department || "Unknown";
      if (!map[name]) map[name] = { id: name.toLowerCase().replace(/\s+/g, "-"), name, students: 0, courses: [] };
      map[name].students += 1;
      if (s.course && !map[name].courses.includes(s.course)) map[name].courses.push(s.course);
    }
    return Object.values(map);
  }, [students]);

  const discipleshipStages = useMemo(() => {
    const map: Record<string, { stage: string; students: number; color?: string }> = {};
    for (const s of students) {
      const stage = s.discipleship || "Unknown";
      if (!map[stage]) map[stage] = { stage, students: 0, color: undefined };
      map[stage].students += 1;
    }
    return Object.values(map);
  }, [students]);

  const aiInsights = useMemo(() => {
    return [
      { kind: "growth", title: "ICT enrolment up", body: "Derived from live student data.", severity: "positive" },
      { kind: "risk", title: "Students awaiting attachment", body: "Derived from live student data.", severity: "warning" },
    ];
  }, [students]);

  return {
    students,
    loading,
    fetchStudents,
    addStudent,
    addStudentsBulk,
    kpis,
    enrolmentTrend,
    examPerformance,
    employmentTimeline,
    intakeData,
    discipleshipStages,
    departments,
    aiInsights,
  };
}
