"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  ExternalLink,
  MapPin,
  Play,
  Send,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { experienceData, projectData, socialLinks, type AppId } from "./data";

type PortfolioAppsProps = {
  activeApp: AppId;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  accent: string;
  setAccent: (accent: string) => void;
  animations: boolean;
  setAnimations: (enabled: boolean) => void;
};

export function PortfolioApps(props: PortfolioAppsProps) {
  const appMap: Record<AppId, ReactNode> = {
    about: <AboutApp />,
    projects: <ProjectsApp />,
    experience: <ExperienceApp />,
    skills: <SkillsApp />,
    photos: <PhotosApp />,
    music: <MusicApp />,
    resume: <ResumeApp />,
    contact: <ContactApp />,
    notes: <NotesApp />,
    achievements: <AchievementsApp />,
    settings: <SettingsApp {...props} />,
  };

  return appMap[props.activeApp];
}

function SectionTitle({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-4">
      <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-[var(--phone-accent)]">{kicker}</p>
      <h3 className="mt-1 text-2xl font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{children}</span>;
}

type GalleryPhoto = {
  src: string;
  title: string;
  caption: string;
  position?: string;
};

function AboutApp() {
  const facts = [
    ["Current mode", "CS undergrad shipping full-stack ideas"],
    ["Building for", "AI/ML, fintech, product, and useful tools"],
    ["Off-screen", "Basketball runs, playlists, friends, and lifting"],
    ["Looking for", "Internships, co-op roles, and ambitious teams"],
  ];

  return (
    <div>
      <SectionTitle kicker="Profile" title="Builder, teammate, learner." />
      <div className="glass-panel overflow-hidden rounded-[2rem] p-5 text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(20,184,166,0.7),transparent_30%),linear-gradient(135deg,#0f172a,#312e81_58%,#0f766e)]" />
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-[1.7rem] bg-white/16 text-3xl font-black ring-1 ring-white/30">YN</div>
          <div>
            <h4 className="text-xl font-semibold">Your Name</h4>
            <p className="mt-1 text-sm text-white/72">Software engineering / CS undergrad</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/82">
          I like building projects that feel clean, fast, and genuinely useful. My interests sit where strong engineering meets product thinking:
          AI/ML, fintech, consumer software, and tools that make everyday decisions easier.
        </p>
      </div>
      <div className="mt-4 grid gap-3">
        {facts.map(([label, value]) => (
          <div key={label} className="app-card rounded-3xl p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{label}</p>
            <p className="mt-2 text-sm font-semibold leading-5">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsApp() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(projectData[0].title);
  const filters = ["All", "AI/ML", "Web Dev", "Hackathons", "School"];
  const projects = filter === "All" ? projectData : projectData.filter((project) => project.category === filter);

  return (
    <div>
      <SectionTitle kicker="Work" title="Projects with product energy." />
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`shrink-0 rounded-full px-3.5 py-2 text-xs font-bold transition ${
              filter === item ? "bg-[var(--phone-accent)] text-white shadow-lg" : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="grid gap-3">
        {projects.map((project) => {
          const isOpen = expanded === project.title;
          return (
            <motion.button
              layout
              key={project.title}
              type="button"
              onClick={() => setExpanded(isOpen ? "" : project.title)}
              className="app-card rounded-3xl p-4 text-left outline-none transition focus-visible:ring-4 focus-visible:ring-[var(--phone-accent)]/25"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[var(--phone-accent)]">{project.category}</p>
                  <h4 className="mt-1 text-lg font-semibold">{project.title}</h4>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-400" />
              </div>
              <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{project.description}</p>
              <AnimatePresence>
                {isOpen ? (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.stack.map((tech) => (
                        <Chip key={tech}>{tech}</Chip>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-2">
                      {project.links.map((link) => (
                        <span key={link} className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold text-white dark:bg-white dark:text-slate-950">
                          {link} <ExternalLink className="h-3 w-3" />
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function ExperienceApp() {
  return (
    <div>
      <SectionTitle kicker="Timeline" title="My roles and impact." />
      <div className="relative space-y-4 pl-5 before:absolute before:bottom-4 before:left-1.5 before:top-2 before:w-px before:bg-slate-200 dark:before:bg-slate-800">
        {experienceData.map((item) => (
          <div key={item.role} className="relative app-card rounded-3xl p-4">
            <span className="absolute -left-[1.35rem] top-5 h-3 w-3 rounded-full bg-[var(--phone-accent)] ring-4 ring-slate-50 dark:ring-slate-950" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold">{item.role}</h4>
                <p className="text-sm text-slate-500">{item.org}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[0.68rem] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{item.date}</span>
            </div>
            <p className="mt-3 text-sm leading-5 text-slate-600 dark:text-slate-300">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsApp() {
  const groups = [
    ["Languages", [["C", 80], ["C++", 75], ["Python", 72], ["Java", 70], ["TypeScript", 68], ["Racket", 65]]],
    ["Frameworks", [["React", 90], ["Next.js", 84], ["Node", 80], ["Tailwind", 88]]],
    ["Tools", [["Postgres", 76], ["Git", 86], ["Cloud", 68]]],
  ] as const;

  return (
    <div>
      <SectionTitle kicker="Dashboard" title="Technical toolkit." />
      <div className="grid gap-4">
        {groups.map(([title, skills]) => (
          <div key={title} className="app-card rounded-3xl p-4">
            <h4 className="font-semibold">{title}</h4>
            <div className="mt-4 space-y-3">
              {skills.map(([skill, level]) => (
                <div key={skill}>
                  <div className="mb-1 flex justify-between text-xs font-bold text-slate-500">
                    <span>{skill}</span>
                    <span>{level}%</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-[var(--phone-accent)]" style={{ width: `${level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotosApp() {
  const [selected, setSelected] = useState<string | null>(null);
  const [activeBasketballPhoto, setActiveBasketballPhoto] = useState(0);
  const [activeMusicPhoto, setActiveMusicPhoto] = useState(0);
  const basketballPhotos: GalleryPhoto[] = [
    {
      src: "/images/basketball/action-layup.jpg",
      title: "Game action",
      caption: "Driving through contact in a Monarchs matchup.",
    },
    {
      src: "/images/basketball/juel-awards.jpg",
      title: "JUEL awards",
      caption: "Community Service and All Academic award recognition.",
    },
    {
      src: "/images/basketball/jersey-plaque.jpg",
      title: "Senior season",
      caption: "A framed jersey moment after years with the team.",
    },
    {
      src: "/images/basketball/under-hoop.jpg",
      title: "Under the rim",
      caption: "Court-level memories from the Monarchs years.",
    },
    {
      src: "/images/basketball/team-photo.jpg",
      title: "Team",
      caption: "One of the teams and communities that shaped me.",
      position: "68% center",
    },
  ];
  const musicPhotos: GalleryPhoto[] = [
    {
      src: "/images/music/recital-guitar.jpg",
      title: "Recital night",
      caption: "Performing one of my covers live with guitar.",
    },
    {
      src: "/images/music/piano-cover.jpg",
      title: "Piano set",
      caption: "Playing piano and singing on stage.",
    },
    {
      src: "/images/music/family-recital.jpg",
      title: "After the show",
      caption: "A post-performance moment with family.",
    },
    {
      src: "/images/music/stage-cover.jpg",
      title: "Stage lights",
      caption: "Another live cover from the recital stage.",
    },
  ];
  const activeGalleryPhotos = selected === "Music" ? musicPhotos : basketballPhotos;
  const activeGalleryPhoto = selected === "Music" ? activeMusicPhoto : activeBasketballPhoto;
  const setActiveGalleryPhoto = selected === "Music" ? setActiveMusicPhoto : setActiveBasketballPhoto;
  const photos = [
    ["Basketball", "from-orange-300 to-red-500"],
    ["Music", "from-lime-300 to-emerald-500"],
    ["Travel", "from-cyan-300 to-blue-500"],
    ["Projects", "from-violet-300 to-indigo-600"],
  ];

  return (
    <div>
      <SectionTitle kicker="Gallery: Moments and memories" title="Tap a button to see parts of my life outside tech and school." />
      <div className="grid grid-cols-2 gap-3">
        {photos.map(([label, gradient]) => (
          <button key={label} type="button" onClick={() => setSelected(label)} className={`aspect-square rounded-[1.6rem] bg-gradient-to-br ${gradient} p-3 text-left shadow-lg`}>
            <span className="rounded-full bg-white/28 px-2.5 py-1 text-xs font-bold text-white backdrop-blur">{label}</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selected === "Basketball" || selected === "Music" ? (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 24, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.96 }}
              className="app-card max-h-[86vh] w-full max-w-[22rem] overflow-hidden rounded-[2rem] bg-white dark:bg-slate-950"
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <h4 className="font-semibold">{selected}</h4>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-300">
                    {activeGalleryPhoto + 1} / {activeGalleryPhotos.length}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-100"
                >
                  Close
                </button>
              </div>
              <motion.div
                key={activeGalleryPhotos[activeGalleryPhoto].src}
                initial={{ opacity: 0.65, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="relative aspect-[4/5] overflow-hidden bg-slate-100 dark:bg-slate-900"
              >
                <img
                  src={activeGalleryPhotos[activeGalleryPhoto].src}
                  alt={activeGalleryPhotos[activeGalleryPhoto].title}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: activeGalleryPhotos[activeGalleryPhoto].position ?? "center" }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                  <p className="text-sm font-bold">{activeGalleryPhotos[activeGalleryPhoto].title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/78">{activeGalleryPhotos[activeGalleryPhoto].caption}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveGalleryPhoto((index) => (index === 0 ? activeGalleryPhotos.length - 1 : index - 1))}
                  className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-slate-800 shadow-lg backdrop-blur"
                  aria-label={`Previous ${selected} photo`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGalleryPhoto((index) => (index + 1) % activeGalleryPhotos.length)}
                  className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-slate-800 shadow-lg backdrop-blur"
                  aria-label={`Next ${selected} photo`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </motion.div>
              <div className="phone-scroll flex gap-2 overflow-x-auto px-4 py-3">
                {activeGalleryPhotos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActiveGalleryPhoto(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 transition ${
                      activeGalleryPhoto === index ? "ring-[var(--phone-accent)]" : "ring-transparent opacity-70"
                    }`}
                    aria-label={`Show ${photo.title}`}
                  >
                    <img src={photo.src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : selected ? (
          <motion.button
            type="button"
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close enlarged photo"
          >
            <motion.div layoutId={selected} className="grid aspect-[4/5] w-full max-w-[18rem] place-items-center rounded-[2rem] bg-gradient-to-br from-slate-100 to-slate-300 text-2xl font-bold text-slate-700">
              {selected}
            </motion.div>
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MusicApp() {
  const youtubeCovers = [
    {
      title: "Somewhere Only We Know (Keane)",
      videoId: "XJ9keooUwiM",
      url: "https://www.youtube.com/watch?v=XJ9keooUwiM",
      label: "Latest cover",
    },
    {
      title: "All I Ask",
      videoId: "FPv1ZQeRhYU",
      url: "https://www.youtube.com/watch?v=FPv1ZQeRhYU",
      label: "Vocal cover",
    },
    {
      title: "Ceilings",
      videoId: "2lwckWhvvaI",
      url: "https://www.youtube.com/watch?v=2lwckWhvvaI",
      label: "Indie cover",
    },
    {
      title: "Talking to the Moon",
      videoId: "dDa_9hxptJU",
      url: "https://www.youtube.com/watch?v=dDa_9hxptJU",
      label: "Bruno Mars",
    },
    {
      title: "Rise Up",
      videoId: "L_rmsuxP1Is",
      url: "https://www.youtube.com/watch?v=L_rmsuxP1Is",
      label: "Andra Day",
    },
    {
      title: "Someone Like You",
      videoId: "6xwKeqjBi8Q",
      url: "https://www.youtube.com/watch?v=6xwKeqjBi8Q",
      label: "Adele",
    },
  ];

  return (
    <div>
      <SectionTitle kicker="Music" title="Covers, performances, and playlists." />
      <a
        href="https://www.youtube.com/channel/UCS6fmQv9bbeQYAYLQzMRlFQ"
        target="_blank"
        rel="noreferrer"
        className="app-card flex items-center justify-between rounded-3xl p-4 transition hover:-translate-y-0.5"
      >
        <div>
          <p className="font-semibold">Watch my covers</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">Acoustic, piano, and vocal performances on YouTube.</p>
        </div>
        <ExternalLink className="h-5 w-5 text-[var(--phone-accent)]" />
      </a>
      <div className="mt-5">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">Cover Channel</p>
            <h4 className="mt-1 text-lg font-semibold">Pritika 4 Musik</h4>
          </div>
          <span className="rounded-full bg-red-500 px-2.5 py-1 text-[0.65rem] font-bold text-white">YouTube</span>
        </div>
        <div className="grid gap-3">
          {youtubeCovers.map((cover) => (
            <a
              key={cover.videoId}
              href={cover.url}
              target="_blank"
              rel="noreferrer"
              className="app-card group flex gap-3 rounded-3xl p-3 transition hover:-translate-y-0.5 hover:shadow-xl"
            >
              <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-2xl bg-slate-200 dark:bg-slate-800">
                <img
                  src={`https://i.ytimg.com/vi/${cover.videoId}/hqdefault.jpg`}
                  alt=""
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 grid place-items-center bg-black/18">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-red-500 shadow-lg">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                </div>
              </div>
              <div className="min-w-0 py-1">
                <p className="line-clamp-2 text-sm font-semibold leading-5">{cover.title}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-300">{cover.label}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[var(--phone-accent)]">
                  Watch cover <ArrowUpRight className="h-3.5 w-3.5" />
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {["Guitar", "Piano", "Vocals", "Live sets"].map((tag) => (
          <div key={tag} className="rounded-2xl bg-slate-100 px-3 py-2 text-center text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-200">
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumeApp() {
  return (
    <div>
      <SectionTitle kicker="Resume" title="Check out my resume." />
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="mb-4 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--phone-accent)] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5"
      >
        <ExternalLink className="h-4 w-4" /> Open Resume
      </a>
      <div className="app-card mb-4 overflow-hidden rounded-3xl">
        <div className="flex items-center justify-between border-b border-slate-200/80 px-4 py-3 dark:border-slate-700/70">
          <div>
            <h4 className="text-sm font-semibold">Resume Preview</h4>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-300">Scroll inside the document.</p>
          </div>
          <Download className="h-4 w-4 text-[var(--phone-accent)]" />
        </div>
        <iframe
          title="Pritika Lahiri resume PDF preview"
          src="/resume.pdf#toolbar=0&navpanes=0"
          className="h-[34rem] w-full bg-white"
        />
      </div>
      {[
        ["Education", "B.S. Computer Science, University of Waterloo"],
        ["Experience", "Internships, TA work, campus leadership, and product-focused projects."],
        ["Projects", "AI/ML tools, full-stack apps, and hackathon builds"],
        ["Skills", "TypeScript, Python, React, Next.js, databases, APIs, cloud basics."],
      ].map(([heading, body]) => (
        <div key={heading} className="app-card mb-3 rounded-3xl p-4">
          <h4 className="font-semibold">{heading}</h4>
          <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{body}</p>
        </div>
      ))}
    </div>
  );
}

function ContactApp() {
  return (
    <div>
      <SectionTitle kicker="Messages" title="Let’s build something." />
      <div className="space-y-3">
        <div className="max-w-[82%] rounded-[1.4rem] rounded-bl-md bg-slate-100 p-3 text-sm dark:bg-slate-800">Hey, I’m open to internships, projects, and coffee chats.</div>
        <div className="ml-auto max-w-[82%] rounded-[1.4rem] rounded-br-md bg-[var(--phone-accent)] p-3 text-sm font-medium text-white">Perfect. Where can recruiters reach you?</div>
      </div>
      <div className="mt-5 grid gap-2">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.label} href={link.href} className="app-card flex items-center justify-between rounded-3xl p-4">
              <span className="flex items-center gap-3 font-semibold"><Icon className="h-5 w-5 text-[var(--phone-accent)]" /> {link.label}</span>
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </a>
          );
        })}
      </div>
      <form className="app-card mt-4 rounded-3xl p-4">
        <input className="mb-2 w-full rounded-2xl bg-slate-100 px-3 py-2 text-sm outline-none dark:bg-slate-800" placeholder="Your email" />
        <textarea className="min-h-24 w-full resize-none rounded-2xl bg-slate-100 px-3 py-2 text-sm outline-none dark:bg-slate-800" placeholder="Message" />
        <button type="button" className="mt-3 inline-flex items-center gap-2 rounded-full bg-[var(--phone-accent)] px-4 py-2 text-sm font-bold text-white">
          <Send className="h-4 w-4" /> Send
        </button>
      </form>
    </div>
  );
}

function NotesApp() {
  const notes = [
    ["Learning note", "What I learned from building retrieval augmented apps and where evals changed my thinking."],
    ["Product thought", "Fintech products win when trust, clarity, and tiny moments of delight line up."],
    ["Debug log", "A reminder that slow, careful reproduction beats guessing almost every time."],
  ];

  return (
    <div>
      <SectionTitle kicker="Notes" title="Writing and reflections." />
      <div className="grid gap-3">
        {notes.map(([title, body], index) => (
          <div key={title} className={`rounded-[1.5rem] p-4 shadow-sm ${index === 1 ? "bg-cyan-100 text-cyan-950" : "bg-yellow-100 text-yellow-950"}`}>
            <p className="font-semibold">{title}</p>
            <p className="mt-2 text-sm leading-5 opacity-75">{body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AchievementsApp() {
  const wins = ["Dean’s List / Scholarship", "Hackathon finalist", "Student club leadership", "Basketball team award", "Music performance milestone"];

  return (
    <div>
      <SectionTitle kicker="Awards" title="Milestones worth pinning." />
      <div className="grid gap-3">
        {wins.map((win) => (
          <div key={win} className="app-card flex items-center gap-3 rounded-3xl p-4">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-100 text-amber-700"><Trophy className="h-6 w-6" /></div>
            <div>
              <p className="font-semibold">{win}</p>
              <p className="text-xs text-slate-500">Replace with your specific date and context.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsApp({ theme, setTheme, accent, setAccent, animations, setAnimations }: PortfolioAppsProps) {
  const colors = ["#14b8a6", "#6366f1", "#f97316", "#ec4899", "#22c55e"];

  return (
    <div>
      <SectionTitle kicker="System" title="Portfolio settings." />
      <div className="app-card rounded-3xl p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold">Appearance</span>
          <div className="rounded-full bg-slate-100 p-1 dark:bg-slate-800">
            {(["light", "dark"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                style={theme === mode ? { color: "#0f172a" } : undefined}
                className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${theme === mode ? "bg-white shadow" : "text-slate-500"}`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <p className="mb-2 text-sm font-semibold">Accent color</p>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setAccent(color)}
                className="grid h-9 w-9 place-items-center rounded-full outline-none ring-offset-2"
                style={{ background: color }}
                aria-label={`Use ${color} accent`}
              >
                {accent === color ? <BadgeCheck className="h-5 w-5 text-white" /> : null}
              </button>
            ))}
          </div>
        </div>
        <label className="mt-5 flex items-center justify-between">
          <span className="font-semibold">Animations</span>
          <input type="checkbox" checked={animations} onChange={(event) => setAnimations(event.target.checked)} className="h-5 w-5 accent-[var(--phone-accent)]" />
        </label>
      </div>
      <div className="app-card mt-4 rounded-3xl p-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        <p className="flex items-center gap-2 font-semibold text-slate-950 dark:text-white"><CalendarDays className="h-4 w-4" /> System info</p>
        <p className="mt-2">React, Tailwind CSS, Framer Motion, lucide-react. Replace placeholder copy in the portfolio data files as your story evolves.</p>
        <p className="mt-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Built for recruiters, teammates, and curious builders.</p>
      </div>
    </div>
  );
}
