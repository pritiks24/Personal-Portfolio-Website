import {
  Award,
  BriefcaseBusiness,
  Camera,
  Code2,
  FileText,
  GitFork,
  GraduationCap,
  Mail,
  Music2,
  NotebookPen,
  Settings,
  Sparkles,
  UserRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type AppId =
  | "projects"
  | "experience"
  | "skills"
  | "photos"
  | "music"
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
  { id: "contact", name: "Contact Me", icon: UserRound, gradient: "from-rose-200 via-pink-300 to-stone-400", dock: true },
  { id: "projects", name: "Projects", icon: Code2, gradient: "from-teal-600 via-teal-600 to-teal-600", dock: true },
  { id: "experience", name: "Experience", icon: BriefcaseBusiness, gradient: "from-emerald-400 via-teal-500 to-cyan-600" },
  { id: "skills", name: "Skills", icon: Sparkles, gradient: "from-amber-300 via-orange-400 to-rose-400" },
  { id: "photos", name: "Photos", icon: Camera, gradient: "from-rose-400 via-pink-500 to-purple-500" },
  { id: "music", name: "Music", icon: Music2, gradient: "from-lime-300 via-green-400 to-emerald-500" },
  { id: "resume", name: "Resume", icon: FileText, gradient: "from-slate-200 via-slate-300 to-slate-500", dock: true },
  { id: "notes", name: "Notes", icon: NotebookPen, gradient: "from-yellow-200 via-amber-300 to-orange-300" },
  { id: "achievements", name: "Awards", icon: Award, gradient: "from-purple-400 via-indigo-500 to-blue-500" },
  { id: "settings", name: "Settings", icon: Settings, gradient: "from-zinc-400 via-slate-500 to-zinc-700", dock: true },
];

export const socialLinks = [
  { label: "Contact Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=pritika2404@gmail.com&su=Portfolio%20Inquiry", icon: Mail },
  { label: "Waterloo Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=plahiri@uwaterloo.ca&su=Portfolio%20Inquiry", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pritika-lahiri/", icon: GraduationCap },
  { label: "GitHub", href: "https://github.com/pritiks24", icon: GitFork },
];

export const projectData = [
  {
    title: "BulkBridge",
    category: "Mobile Apps",
    description: "A mobile app for coordinating shared Costco trips, splitting bulk grocery purchases, and using an AI pantry assistant to turn existing ingredients into recipe ideas.",
    stack: ["React Native", "Expo", "Next.js API", "Prisma", "SQLite", "Gemini API"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/bulkbridge" }],
  },
  {
    title: "AutoVlog",
    category: "Hardware Projects",
    description: "An autonomous filming robot that follows a user, avoids obstacles, and captures hands-free video, combining hardware prototyping with a web app for AI-assisted editing.",
    stack: ["Arduino", "ESP32-CAM", "Computer Vision", "Gemini API", "Web App"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/autovlog" }],
  },
  {
    title: "GreenPrompts",
    category: "Browser Extensions",
    description: "A browser extension that shortens overly long AI prompts to reduce token usage, energy demand, and water usage from everyday AI workflows.",
    stack: ["JavaScript", "Browser Extension", "AI", "JSON", "Sustainability"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/greenprompts" }],
  },
  {
    title: "BiteWise",
    category: "Web Dev",
    description: "A receipt-to-health insights platform that flags allergens, highlights nutrition risks, creates health scores, and supports accessibility features like voice support.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "FastAPI", "MongoDB Atlas", "Gemini API"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/bitewise-6dr7lg" }],
  },
  {
    title: "Lingo Lift",
    category: "Web Dev",
    description: "A winning lecture accessibility platform for ELL students with live translation, adaptive summaries, audio translation, voice tutoring, and saved chat history.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Azure Speech", "ElevenLabs", "Gemini", "Supabase", "Auth0"],
    links: [
      { label: "Devpost", href: "https://devpost.com/software/lingo-lift" },
      { label: "Live", href: "https://www.hackthelang.work" },
    ],
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
    role: "Design Team Researcher",
    org: "WAT.ai, University of Waterloo",
    date: "2026 - Present",
    description: "Contributing to Waterloo's WAT.ai research team on semantic object state tracking, exploring how systems can better understand and reason about changes in object conditions over time.",
  },
  {
    role: "Hackathon Executive",
    org: "Technova, University of Waterloo",
    date: "2026",
    description: "On the Technova Hackathon team and helping plan the University of Waterloo's Hackathon for Women+ in Tech for 2026, with a focus on creating a polished and welcoming participant experience.",
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
