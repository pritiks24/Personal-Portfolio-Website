import {
  Award,
  BriefcaseBusiness,
  Camera,
  Compass,
  MapPin,
  Code2,
  FileText,
  GitFork,
  GraduationCap,
  Mail,
  Music2,
  NotebookPen,
  Settings,
  Search,
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
  | "settings"
  | "google"
  | "maps";

export type PortfolioApp = {
  id: AppId;
  name: string;
  icon: LucideIcon;
  color: string;
  badge?: number;
  dock?: boolean;
};

export const apps: PortfolioApp[] = [
  { id: "google", name: "Google", icon: Search, color: "#4285f4" },
  { id: "maps", name: "Maps", icon: MapPin, color: "#34a853" },
  { id: "contact", name: "Contact Me", icon: UserRound, color: "#a45b4e", dock: true },
  { id: "projects", name: "Projects", icon: Code2, color: "#345dc5", dock: true },
  { id: "experience", name: "Experience", icon: BriefcaseBusiness, color: "#42735c" },
  { id: "skills", name: "Skills", icon: Sparkles, color: "#ba7834" },
  { id: "photos", name: "Photos", icon: Camera, color: "#9b5479" },
  { id: "music", name: "Music", icon: Music2, color: "#697747" },
  { id: "resume", name: "Resume", icon: FileText, color: "#647482", dock: true },
  { id: "notes", name: "Notes", icon: NotebookPen, color: "#b59135" },
  { id: "achievements", name: "Awards", icon: Award, color: "#75609c" },
  { id: "settings", name: "Settings", icon: Settings, color: "#555958", dock: true },
];

export const socialLinks = [
  { label: "Contact Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=pritika2404@gmail.com&su=Portfolio%20Inquiry", icon: Mail },
  { label: "Waterloo Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=plahiri@uwaterloo.ca&su=Portfolio%20Inquiry", icon: Mail },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/pritika-lahiri/", icon: GraduationCap },
  { label: "GitHub", href: "https://github.com/pritiks24", icon: GitFork },
];

export const projectData = [
  {
    title: "ATLAS Blend",
    category: "Web Dev",
    description: "Discover art that feels like you, then blend your taste with a friend’s. ATLAS Blend brings personalised museum galleries, an AI curator, and a painting created from your shared tastes into one experience.",
    stack: ["React", "TypeScript", "Three.js", "Node.js", "Gemini", "LangChain", "Supabase", "Typesense"],
    links: [{ label: "Devpost", href: "https://devpost.com/software/atlas-blend" }],
  },
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
    org: "TD",
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
