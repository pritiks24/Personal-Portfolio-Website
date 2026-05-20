import {
  Award,
  BriefcaseBusiness,
  Camera,
  Code2,
  FileText,
  GitFork,
  GraduationCap,
  Mail,
  MessageCircle,
  Music2,
  NotebookPen,
  Settings,
  Sparkles,
  Trophy,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppId =
  | "about"
  | "projects"
  | "experience"
  | "skills"
  | "photos"
  | "music"
  | "basketball"
  | "resume"
  | "contact"
  | "notes"
  | "achievements"
  | "settings";

export type PortfolioApp = {
  id: AppId;
  name: string;
  icon: LucideIcon;
  gradient: string;
  badge?: number;
  dock?: boolean;
};

export const apps: PortfolioApp[] = [
  { id: "about", name: "About Me", icon: UserRound, gradient: "from-sky-400 via-cyan-400 to-teal-400", dock: true },
  { id: "projects", name: "Projects", icon: Code2, gradient: "from-indigo-500 via-violet-500 to-fuchsia-500", badge: 4, dock: true },
  { id: "experience", name: "Experience", icon: BriefcaseBusiness, gradient: "from-emerald-400 via-teal-500 to-cyan-600" },
  { id: "skills", name: "Skills", icon: Sparkles, gradient: "from-amber-300 via-orange-400 to-rose-400" },
  { id: "photos", name: "Photos", icon: Camera, gradient: "from-rose-400 via-pink-500 to-purple-500" },
  { id: "music", name: "Music", icon: Music2, gradient: "from-lime-300 via-green-400 to-emerald-500" },
  { id: "basketball", name: "Basketball", icon: Trophy, gradient: "from-orange-400 via-red-500 to-stone-800" },
  { id: "resume", name: "Resume", icon: FileText, gradient: "from-slate-200 via-slate-300 to-slate-500", dock: true },
  { id: "contact", name: "Contact", icon: MessageCircle, gradient: "from-blue-400 via-sky-500 to-cyan-400", badge: 1, dock: true },
  { id: "notes", name: "Notes", icon: NotebookPen, gradient: "from-yellow-200 via-amber-300 to-orange-300" },
  { id: "achievements", name: "Awards", icon: Award, gradient: "from-purple-400 via-indigo-500 to-blue-500" },
  { id: "settings", name: "Settings", icon: Settings, gradient: "from-zinc-400 via-slate-500 to-zinc-700" },
];

export const socialLinks = [
  { label: "Email", href: "mailto:you@example.com", icon: Mail },
  { label: "LinkedIn", href: "https://linkedin.com/in/your-handle", icon: GraduationCap },
  { label: "GitHub", href: "https://github.com/your-handle", icon: GitFork },
];

export const projectData = [
  {
    title: "FinSight AI",
    category: "AI/ML",
    description: "A personal finance insight assistant that classifies spending, explains trends, and suggests smarter habits.",
    stack: ["Python", "Next.js", "OpenAI", "Postgres"],
    links: ["GitHub", "Demo"],
  },
  {
    title: "Campus Connect",
    category: "Web Dev",
    description: "A polished student event hub with RSVP flows, club profiles, and notification-ready dashboards.",
    stack: ["React", "Tailwind", "Firebase"],
    links: ["GitHub"],
  },
  {
    title: "HackRx Triage",
    category: "Hackathons",
    description: "Built in 24 hours: an intake workflow that summarizes symptoms and routes cases by urgency.",
    stack: ["TypeScript", "Prisma", "LLMs"],
    links: ["Devpost", "Demo"],
  },
  {
    title: "Compiler Notes",
    category: "School",
    description: "A mini language parser and interpreter with a clean test suite and visual AST explorer.",
    stack: ["C++", "Parsing", "Algorithms"],
    links: ["GitHub"],
  },
];

export const experienceData = [
  {
    role: "Software Developer Intern",
    org: "CGI",
    date: "2026",
    description: "Worked with the data engineering team on a TD project and contributed front-end development for an internal application.",
  },
  {
    role: "AI Researcher",
    org: "UC Berkeley",
    date: "June 2024 - April 2025",
    description: "Researched multi-model reasoning systems for mathematical problem solving, exploring how feedback between models can improve step-by-step accuracy on challenging benchmark tasks.",
  },
  {
    role: "Teaching Assistant Intern",
    org: "LIVE by Po-Shen Loh / Carnegie Mellon University",
    date: "Feb. 2022 - June 2025",
    description: "Supported interactive math instruction for a large international student community and helped mentor students through scholarship-focused learning programs.",
  },
];
