// Simple in-memory API for local development. Persists only during process lifetime.
import type { Student } from "./lib/mock-data";

const now = () => Date.now();

// Basic stores
const students: Student[] = [];
const departments: any[] = [];
const trainers: any[] = [];
const exams: any[] = [];
const attachments: any[] = [];
const placements: any[] = [];
const discipleship: any[] = [];

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

async function readJson(req: Request) {
  try {
    return await req.json();
  } catch {
    return null;
  }
}

export async function handleApi(request: Request): Promise<Response | null> {
  const url = new URL(request.url);
  const path = url.pathname.replace(/\/$/, "");

  // Students
  if (path === "/api/students" && request.method === "GET") {
    return jsonResponse(students);
  }
  if (path === "/api/students" && request.method === "POST") {
    const body = await readJson(request);
    if (!body) return jsonResponse({ error: "Invalid JSON" }, 400);
    const s = { id: `s${now()}`, ...(body as any) } as Student;
    students.unshift(s);
    return jsonResponse(s, 201);
  }
  if (path === "/api/students/bulk" && request.method === "POST") {
    const body = await readJson(request);
    if (!Array.isArray(body)) return jsonResponse({ error: "Expected array" }, 400);
    const created = (body as any[]).map((b, i) => ({ id: `s${now() + i}`, ...b }));
    students.unshift(...created);
    return jsonResponse(created, 201);
  }

  // Departments
  if (path === "/api/departments" && request.method === "GET") return jsonResponse(departments);
  if (path === "/api/departments" && request.method === "POST") {
    const body = await readJson(request); if (!body) return jsonResponse({ error: "Invalid JSON" }, 400);
    const d = { id: `d${now()}`, ...body }; departments.unshift(d); return jsonResponse(d, 201);
  }

  // Trainers
  if (path === "/api/trainers" && request.method === "GET") return jsonResponse(trainers);
  if (path === "/api/trainers" && request.method === "POST") { const body = await readJson(request); if (!body) return jsonResponse({ error: "Invalid JSON" }, 400); const t = { id: `t${now()}`, ...body }; trainers.unshift(t); return jsonResponse(t, 201); }

  // Exams
  if (path === "/api/exams" && request.method === "GET") return jsonResponse(exams);
  if (path === "/api/exams" && request.method === "POST") { const body = await readJson(request); if (!body) return jsonResponse({ error: "Invalid JSON" }, 400); const e = { id: `e${now()}`, ...body }; exams.unshift(e); return jsonResponse(e, 201); }

  // Attachments
  if (path === "/api/attachments" && request.method === "GET") return jsonResponse(attachments);
  if (path === "/api/attachments" && request.method === "POST") { const body = await readJson(request); if (!body) return jsonResponse({ error: "Invalid JSON" }, 400); const a = { id: `a${now()}`, ...body }; attachments.unshift(a); return jsonResponse(a, 201); }

  // Placements
  if (path === "/api/placements" && request.method === "GET") return jsonResponse(placements);
  if (path === "/api/placements" && request.method === "POST") { const body = await readJson(request); if (!body) return jsonResponse({ error: "Invalid JSON" }, 400); const p = { id: `p${now()}`, ...body }; placements.unshift(p); return jsonResponse(p, 201); }

  // Discipleship
  if (path === "/api/discipleship" && request.method === "GET") return jsonResponse(discipleship);
  if (path === "/api/discipleship" && request.method === "POST") { const body = await readJson(request); if (!body) return jsonResponse({ error: "Invalid JSON" }, 400); const ds = { id: `ds${now()}`, ...body }; discipleship.unshift(ds); return jsonResponse(ds, 201); }

  return null; // not handled here
}
