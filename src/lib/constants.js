export const NAV_LINKS = [
  { label: "Create", href: "/create", icon: "PenLine" },
  { label: "Analyze", href: "/analyze", icon: "BarChart3" },
  { label: "Tailor", href: "/tailor", icon: "Target" },
  { label: "Templates", href: "/templates", icon: "LayoutTemplate" },
];

export const STEPS = [
  { id: 1, label: "Personal Info", icon: "User" },
  { id: 2, label: "Experience", icon: "Briefcase" },
  { id: 3, label: "Education", icon: "GraduationCap" },
  { id: 4, label: "Skills", icon: "Wrench" },
  { id: 5, label: "Preview", icon: "Eye" },
];

export const SCORE_LABELS = {
  excellent: { min: 85, label: "Excellent", color: "#10b981" },
  good: { min: 70, label: "Good", color: "#6366f1" },
  fair: { min: 50, label: "Fair", color: "#f59e0b" },
  poor: { min: 0, label: "Needs Work", color: "#ef4444" },
};

export const SCORE_CATEGORIES = [
  { key: "formatting", label: "Formatting", icon: "FileText", weight: 0.2 },
  { key: "content", label: "Content Quality", icon: "Star", weight: 0.3 },
  { key: "keywords", label: "Keywords", icon: "Search", weight: 0.25 },
  { key: "impact", label: "Impact & Metrics", icon: "TrendingUp", weight: 0.25 },
];

export const INITIAL_RESUME = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    portfolio: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: {
    languages: [],
    frameworks: [],
    tools: [],
    databases: [],
    other: [],
  },
  selectedTemplate: "professional",
};

export const EMPTY_EXPERIENCE = {
  id: "",
  company: "",
  title: "",
  location: "",
  startDate: "",
  endDate: "",
  current: false,
  bullets: [""],
};

export const EMPTY_EDUCATION = {
  id: "",
  school: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
  gpa: "",
  coursework: "",
};

export const SKILL_CATEGORIES = [
  { key: "languages", label: "Programming Languages", placeholder: "e.g. JavaScript, Python, Java" },
  { key: "frameworks", label: "Frameworks & Libraries", placeholder: "e.g. React, Next.js, Express" },
  { key: "tools", label: "Tools & Platforms", placeholder: "e.g. Git, Docker, AWS, Vercel" },
  { key: "databases", label: "Databases", placeholder: "e.g. PostgreSQL, MongoDB, Redis" },
  { key: "other", label: "Other Skills", placeholder: "e.g. REST APIs, Agile, CI/CD" },
];

export const TECH_KEYWORDS = [
  "javascript", "typescript", "python", "java", "c++", "rust", "go",
  "react", "next.js", "vue", "angular", "svelte", "node.js", "express",
  "django", "flask", "spring", "sql", "nosql", "mongodb", "postgresql",
  "redis", "docker", "kubernetes", "aws", "gcp", "azure", "terraform",
  "git", "ci/cd", "rest", "graphql", "microservices", "agile", "scrum",
  "machine learning", "deep learning", "nlp", "data structures", "algorithms",
  "system design", "api", "devops", "linux", "testing", "tdd",
  "html", "css", "tailwind", "sass", "webpack", "vite",
  "firebase", "supabase", "vercel", "netlify",
];

export const ACTION_VERBS = [
  "achieved", "built", "created", "delivered", "designed", "developed",
  "engineered", "established", "executed", "improved", "implemented",
  "increased", "launched", "led", "managed", "migrated", "optimized",
  "orchestrated", "reduced", "refactored", "redesigned", "scaled",
  "shipped", "spearheaded", "streamlined", "transformed", "architected",
];
