// MOHI Technical Training Institute — seed / demo data
// This is client-side mock data for the v1 UI. Persistence via Lovable Cloud
// (Supabase) is a natural next step.

export type Department = {
  id: string;
  name: string;
  icon: string;
  color: string;
  head: string;
  students: number;
  courses: string[];
};

export const departments: Department[] = [
  { id: "ict", name: "ICT", icon: "Monitor", color: "#2563eb", head: "Mr. Josphat Kariuki", students: 342,
    courses: ["Computer Packages", "ICT Technician", "Software Development", "Web Development", "Networking", "Graphic Design"] },
  { id: "hospitality", name: "Hospitality", icon: "ChefHat", color: "#dc2626", head: "Ms. Grace Achieng", students: 218,
    courses: ["Food Production", "Food & Beverage", "Housekeeping", "Front Office"] },
  { id: "fashion", name: "Fashion & Design", icon: "Scissors", color: "#db2777", head: "Ms. Aisha Wanjiku", students: 156,
    courses: ["Garment Making", "Fashion Design", "Tailoring"] },
  { id: "engineering", name: "Engineering", icon: "Wrench", color: "#ea580c", head: "Eng. Peter Otieno", students: 289,
    courses: ["Electrical Installation", "Electronics", "Welding", "Plumbing"] },
  { id: "mechanical", name: "Mechanical", icon: "Cog", color: "#0891b2", head: "Mr. Samuel Mwangi", students: 174,
    courses: ["Motor Vehicle Mechanics", "Auto Electrics", "Panel Beating"] },
  { id: "building", name: "Building & Construction", icon: "HardHat", color: "#a16207", head: "Mr. David Kiprop", students: 132,
    courses: ["Masonry", "Carpentry & Joinery", "Painting & Decoration"] },
  { id: "cosmetology", name: "Cosmetology", icon: "Sparkles", color: "#9333ea", head: "Ms. Faith Njeri", students: 98,
    courses: ["Hairdressing", "Beauty Therapy", "Nail Technology"] },
  { id: "social", name: "Social Work", icon: "HeartHandshake", color: "#059669", head: "Rev. John Mutua", students: 87,
    courses: ["Community Development", "Counselling"] },
];

export const kpis = {
  totalStudents: 1496,
  newEnrolments: 312,
  activeStudents: 1284,
  graduatedStudents: 187,
  male: 812,
  female: 684,
  studentsWithAttachments: 246,
  studentsPlaced: 143,
  internalExamsCompleted: 4820,
  nitaExams: 328,
  knecExams: 214,
  awaitingAttachment: 68,
  awaitingPlacement: 44,
  examPassRate: 87.4,
  discipleshipEngaged: 1122,
};

export const enrolmentTrend = [
  { year: "2019", enrolments: 620, graduates: 402 },
  { year: "2020", enrolments: 548, graduates: 380 },
  { year: "2021", enrolments: 812, graduates: 512 },
  { year: "2022", enrolments: 1020, graduates: 688 },
  { year: "2023", enrolments: 1258, graduates: 820 },
  { year: "2024", enrolments: 1410, graduates: 912 },
  { year: "2025", enrolments: 1496, graduates: 187 },
];

export const intakeData = [
  { intake: "Jan 2024", students: 480 },
  { intake: "May 2024", students: 402 },
  { intake: "Sep 2024", students: 528 },
  { intake: "Jan 2025", students: 512 },
  { intake: "May 2025", students: 468 },
  { intake: "Sep 2025", students: 516 },
];

export const examPerformance = [
  { dept: "ICT", pass: 92, fail: 8 },
  { dept: "Hospitality", pass: 89, fail: 11 },
  { dept: "Engineering", pass: 84, fail: 16 },
  { dept: "Fashion", pass: 91, fail: 9 },
  { dept: "Mechanical", pass: 82, fail: 18 },
  { dept: "Building", pass: 86, fail: 14 },
  { dept: "Cosmetology", pass: 94, fail: 6 },
  { dept: "Social Work", pass: 95, fail: 5 },
];

export const employmentTimeline = [
  { month: "Jan", placed: 12, attached: 28 },
  { month: "Feb", placed: 18, attached: 34 },
  { month: "Mar", placed: 22, attached: 41 },
  { month: "Apr", placed: 15, attached: 38 },
  { month: "May", placed: 28, attached: 52 },
  { month: "Jun", placed: 34, attached: 61 },
  { month: "Jul", placed: 41, attached: 58 },
  { month: "Aug", placed: 38, attached: 47 },
  { month: "Sep", placed: 44, attached: 55 },
  { month: "Oct", placed: 52, attached: 62 },
  { month: "Nov", placed: 48, attached: 58 },
  { month: "Dec", placed: 36, attached: 42 },
];

export const discipleshipStages = [
  { stage: "Growing", students: 428, color: "var(--color-chart-2)" },
  { stage: "Discipling Others", students: 214, color: "var(--color-primary)" },
  { stage: "Accepted Christ", students: 356, color: "var(--color-chart-3)" },
  { stage: "Wandering", students: 172, color: "var(--color-chart-4)" },
  { stage: "Lost", students: 98, color: "var(--color-destructive)" },
  { stage: "Don't Know", students: 228, color: "var(--color-muted-foreground)" },
];

export const genderByDept = departments.slice(0, 6).map((d) => ({
  dept: d.name,
  male: Math.round(d.students * (0.4 + Math.random() * 0.35)),
  female: Math.round(d.students * (0.25 + Math.random() * 0.35)),
}));

export type Student = {
  id: string;
  admissionNo: string;
  admissionDate: string;
  name: string;
  gender: "M" | "F";
  department: string;
  course: string;
  intake: string;
  status: "Continuing" | "Completed" | "Deferred" | "Dropped";
  phone: string;
  contact: string;
  county: string;
  discipleship: "Wanderer" | "Seeker" | "Accepted Christ" | "Follower" | "Guide" | "Unknown";
  attachmentStatus: "Placed" | "Awaiting" | "Completed" | "N/A";
  attachmentLocation?: string;
  employmentStatus: "Employed" | "Awaiting" | "N/A";
  placementLocation?: string;
  gpa: number;
};

const firstNames = ["Brian", "Faith", "Kevin", "Mercy", "Dennis", "Sharon", "Peter", "Grace", "James", "Aisha", "David", "Ruth", "Samuel", "Wanjiku", "Otieno", "Chebet", "Njeri", "Mutua", "Kiprop", "Achieng"];
const lastNames = ["Kariuki", "Otieno", "Mwangi", "Wanjiru", "Kimani", "Ochieng", "Njoroge", "Kiplagat", "Wafula", "Muthoni", "Barasa", "Cheruiyot", "Mukami", "Nyambura", "Kiplimo"];
const counties = ["Nairobi", "Kiambu", "Nakuru", "Uasin Gishu", "Kisumu", "Machakos", "Meru", "Bungoma", "Kakamega", "Nyeri"];
const intakes = ["Jan 2025", "May 2025", "Sep 2024", "May 2024", "Jan 2024"];
const discStages = ["Wanderer", "Seeker", "Accepted Christ", "Follower", "Guide"];

export const students: Student[] = Array.from({ length: 60 }).map((_, i) => {
  const dept = departments[i % departments.length];
  const gender: "M" | "F" = i % 2 === 0 ? "M" : "F";
  const first = firstNames[i % firstNames.length];
  const last = lastNames[(i * 3) % lastNames.length];
  const phone = `+2547${(10000000 + i * 12345).toString().slice(0, 8)}`;
  const admissionDate = new Date(2022 + (i % 4), (i % 12), (1 + (i % 27))).toISOString().slice(0, 10);
  const attachmentStatus = (["Placed", "Awaiting", "Completed", "N/A"] as const)[i % 4];
  const employmentStatus = (["Employed", "Awaiting", "N/A", "N/A"] as const)[i % 4];
  const attachmentLocation = attachmentStatus === "Placed" ? `Company ${(i % 12) + 1}` : undefined;
  const placementLocation = employmentStatus === "Employed" ? `Employer ${(i % 10) + 1}` : undefined;

  return {
    id: `s${i + 1}`,
    admissionNo: `MOHI/${2024 - (i % 3)}/${(1000 + i).toString()}`,
    admissionDate,
    name: `${first} ${last}`,
    gender,
    department: dept.name,
    course: dept.courses[i % dept.courses.length],
    intake: intakes[i % intakes.length],
    status: (["Continuing", "Continuing", "Continuing", "Completed", "Deferred"] as const)[i % 5],
    phone,
    contact: phone,
    county: counties[i % counties.length],
    discipleship: discStages[i % discStages.length],
    attachmentStatus,
    attachmentLocation,
    employmentStatus,
    placementLocation,
    gpa: Number((2.4 + Math.random() * 1.6).toFixed(2)),
  };
});

export const trainers = [
  { name: "Mr. Josphat Kariuki", dept: "ICT", students: 84, rating: 4.8 },
  { name: "Ms. Grace Achieng", dept: "Hospitality", students: 62, rating: 4.6 },
  { name: "Eng. Peter Otieno", dept: "Engineering", students: 78, rating: 4.7 },
  { name: "Ms. Aisha Wanjiku", dept: "Fashion", students: 48, rating: 4.9 },
  { name: "Mr. Samuel Mwangi", dept: "Mechanical", students: 56, rating: 4.5 },
  { name: "Mr. David Kiprop", dept: "Building", students: 42, rating: 4.4 },
  { name: "Ms. Faith Njeri", dept: "Cosmetology", students: 38, rating: 4.7 },
  { name: "Rev. John Mutua", dept: "Social Work", students: 31, rating: 4.9 },
];

export const aiInsights = [
  {
    kind: "growth",
    title: "ICT enrolment up 24% year-over-year",
    body: "Software Development and Web Development courses are driving the surge. Consider adding a second morning cohort for Sep 2025 intake to prevent lab overflow.",
    severity: "positive",
  },
  {
    kind: "risk",
    title: "68 students awaiting industrial attachment",
    body: "Engineering and Mechanical departments have the largest backlog. Recommend accelerating industry outreach in Nakuru and Nairobi counties where 62% of employers are located.",
    severity: "warning",
  },
  {
    kind: "spiritual",
    title: "172 students flagged in 'Wandering' stage",
    body: "Concentrated in first-year Engineering intake. Suggest pairing with senior mentors from the 'Discipling Others' cohort and scheduling small-group follow-up before end of term.",
    severity: "attention",
  },
  {
    kind: "outcomes",
    title: "Hospitality graduates: 78% employment within 6 months",
    body: "Highest placement rate across all departments, led by Food & Beverage. Employer feedback rates practical skills at 4.6/5 — this is a strong story for management reports.",
    severity: "positive",
  },
];

export const employers = [
  { name: "Safaricom PLC", industry: "Telecoms", placed: 18, county: "Nairobi" },
  { name: "Serena Hotels", industry: "Hospitality", placed: 14, county: "Nairobi" },
  { name: "KPLC", industry: "Energy", placed: 11, county: "Nairobi" },
  { name: "Bidco Africa", industry: "Manufacturing", placed: 9, county: "Kiambu" },
  { name: "Sarova Hotels", industry: "Hospitality", placed: 8, county: "Nakuru" },
  { name: "Toyota Kenya", industry: "Automotive", placed: 7, county: "Nairobi" },
  { name: "Vivo Energy", industry: "Energy", placed: 6, county: "Nairobi" },
  { name: "Deloitte EA", industry: "Consulting", placed: 5, county: "Nairobi" },
];
