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
  fit?: "cover" | "contain";
  companionSrc?: string;
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
  const [activeTravelPhoto, setActiveTravelPhoto] = useState(0);
  const [activeProjectPhoto, setActiveProjectPhoto] = useState(0);
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
      position: "18% center",
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
  const travelPhotos: GalleryPhoto[] = [
    {
      src: "/images/travel/jungfraujoch-flag.jpeg",
      title: "Jungfraujoch",
      caption: "Swiss mountain views at the Top of Europe.",
      position: "center",
    },
    {
      src: "/images/travel/mountain-train.JPG",
      title: "Mountain rail",
      caption: "A bright stop between green hills, glaciers, and train tracks.",
    },
    {
      src: "/images/travel/colosseum-night.JPG",
      title: "Rome at night",
      caption: "Warm lights and a night walk by the Colosseum.",
    },
    {
      src: "/images/travel/snow-view.jpeg",
      title: "Snow day",
      caption: "A playful pause in the snow with a huge mountain view behind us.",
      position: "center 35%",
    },
    {
      src: "/images/travel/venice-canal.jpeg",
      title: "Venice canal",
      caption: "Gondolas, water reflections, and colorful buildings in Venice.",
    },
  ];
  const projectPhotos: GalleryPhoto[] = [
    {
      src: "/images/projects/build-table.jpeg",
      title: "Build table",
      caption: "A hands-on hardware build session with tools, parts, and a lot of debugging.",
    },
    {
      src: "/images/projects/hack-the-valley.jpeg",
      title: "Hackathon memories",
      caption: "Photo strip from Hack the Valley with my team.",
    },
    {
      src: "/images/projects/spur-team.jpeg",
      title: "SPUR team",
      caption: "A team photo from a hackathon weekend at the SPUR Innovation Centre.",
      position: "center top",
      fit: "contain",
      companionSrc: "/images/projects/hack-canada-swag.jpg",
    },
    {
      src: "/images/projects/robot-prototype.jpeg",
      title: "Robot prototype",
      caption: "Early robot hardware prototype with sensors, wiring, and live testing.",
    },
    {
      src: "/images/projects/finalist-ui.jpg",
      title: "Finalist UI",
      caption: "The UI my team designed for our hackathon project, where we were selected as finalists.",
      position: "center top",
    },
  ];
  const galleryConfig = {
    Basketball: {
      photos: basketballPhotos,
      activePhoto: activeBasketballPhoto,
      setActivePhoto: setActiveBasketballPhoto,
    },
    Music: {
      photos: musicPhotos,
      activePhoto: activeMusicPhoto,
      setActivePhoto: setActiveMusicPhoto,
    },
    Travel: {
      photos: travelPhotos,
      activePhoto: activeTravelPhoto,
      setActivePhoto: setActiveTravelPhoto,
    },
    Projects: {
      photos: projectPhotos,
      activePhoto: activeProjectPhoto,
      setActivePhoto: setActiveProjectPhoto,
    },
  } as const;
  const activeGallery = selected === "Basketball" || selected === "Music" || selected === "Travel" || selected === "Projects" ? galleryConfig[selected] : null;
  const activeGalleryPhotos = activeGallery?.photos ?? basketballPhotos;
  const activeGalleryPhoto = activeGallery?.activePhoto ?? 0;
  const setActiveGalleryPhoto = activeGallery?.setActivePhoto ?? setActiveBasketballPhoto;
  const photos = [
    {
      label: "Basketball",
      detail: "Team, awards, court moments",
      count: basketballPhotos.length,
      preview: basketballPhotos[0].src,
      color: "bg-[#e85d3f]",
      panel: "bg-[#331714]/88",
    },
    {
      label: "Music",
      detail: "Recitals, covers, stage lights",
      count: musicPhotos.length,
      preview: musicPhotos[0].src,
      color: "bg-[#6652e8]",
      panel: "bg-[#171b4f]/88",
    },
    {
      label: "Travel",
      detail: "Places and little adventures",
      count: travelPhotos.length,
      preview: travelPhotos[0].src,
      color: "bg-[#2aa9b7]",
      panel: "bg-[#103f45]/88",
    },
    {
      label: "Projects",
      detail: "Build nights and demos",
      count: projectPhotos.length,
      preview: projectPhotos[0].src,
      color: "bg-[#5267d9]",
      panel: "bg-[#111c55]/88",
    },
  ];

  return (
    <div>
      <SectionTitle kicker="Gallery: Moments and memories" title="Click on a section to see parts of my life outside tech and school." />
      <div className="grid h-[46rem] grid-cols-2 grid-rows-2 gap-4">
        {photos.map((album) => (
          <button
            key={album.label}
            type="button"
            onClick={() => setSelected(album.label)}
            className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.6rem] ${album.color} p-3 text-left text-white shadow-xl shadow-slate-900/12 ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:shadow-2xl`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.32),rgba(255,255,255,0.08))]" />
            <div className="flex items-start justify-between gap-2">
              <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
              <span className="relative rounded-full bg-white/24 px-2 py-1 text-[0.65rem] font-bold text-white shadow-sm ring-1 ring-white/30 backdrop-blur-md">
                {album.count ? `${album.count} photos` : "Soon"}
              </span>
            </div>
            {album.preview ? (
              <div className="relative my-3 h-48 overflow-hidden rounded-2xl bg-black/20 shadow-inner ring-1 ring-white/25">
                <img src={album.preview} alt="" className="h-full w-full object-cover opacity-95 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
              </div>
            ) : (
              <div className="relative my-3 grid h-48 place-items-center rounded-2xl bg-white/16 text-4xl font-black text-white/75 ring-1 ring-white/25 backdrop-blur-md">
                {album.label.slice(0, 1)}
              </div>
            )}
            <div className={`relative rounded-2xl ${album.panel} p-2.5 backdrop-blur-md ring-1 ring-white/15`}>
              <p className="text-base font-bold text-white">{album.label}</p>
              <p className="mt-1 text-xs leading-4 text-white/82">{album.detail}</p>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {activeGallery ? (
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
              className="max-h-[88vh] w-full max-w-[30rem] overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
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
                className="relative h-[58vh] min-h-[22rem] overflow-hidden bg-slate-100 dark:bg-slate-900"
              >
                {activeGalleryPhotos[activeGalleryPhoto].companionSrc ? (
                  <div className="flex h-full flex-col bg-slate-950">
                    <div className="grid min-h-0 flex-[1.1] place-items-center bg-slate-950">
                      <img
                        src={activeGalleryPhotos[activeGalleryPhoto].src}
                        alt={activeGalleryPhotos[activeGalleryPhoto].title}
                        className="max-h-full w-full object-contain"
                        style={{ objectPosition: activeGalleryPhotos[activeGalleryPhoto].position ?? "center" }}
                      />
                    </div>
                    <div className="min-h-0 flex-1 overflow-hidden border-t border-white/10">
                      <img
                        src={activeGalleryPhotos[activeGalleryPhoto].companionSrc}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeGalleryPhotos[activeGalleryPhoto].src}
                    alt={activeGalleryPhotos[activeGalleryPhoto].title}
                    className={`h-full w-full ${activeGalleryPhotos[activeGalleryPhoto].fit === "contain" ? "object-contain" : "object-cover"}`}
                    style={{ objectPosition: activeGalleryPhotos[activeGalleryPhoto].position ?? "center" }}
                  />
                )}
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
              <div className="phone-scroll flex gap-2 overflow-x-auto px-4 py-4">
                {activeGalleryPhotos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActiveGalleryPhoto(index)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-2xl ring-2 transition ${
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
    {
      title: "What first year at Waterloo taught me",
      tag: "Waterloo CS",
      status: "Draft",
      body: "Learning how to ask for help early, build real friendships, protect your energy, and remember that everyone is figuring it out more than they look like they are.",
      color: "bg-yellow-100 text-yellow-950",
    },
    {
      title: "Advice I would give to incoming first years",
      tag: "First Year",
      status: "Draft",
      body: "Go to the events, talk to the person beside you, start assignments earlier than you think, and do not let comparison steal the fun of learning hard things.",
      color: "bg-emerald-100 text-emerald-950",
    },
    {
      title: "What hackathons taught me",
      tag: "Hackathons",
      status: "Notes",
      body: "The best teams make decisions quickly, scope aggressively, demo the story clearly, and leave room for weird ideas before narrowing into something shippable.",
      color: "bg-violet-100 text-violet-950",
    },
    {
      title: "Book notes: The Let Them Theory",
      tag: "Reading",
      status: "Currently reading",
      body: "A reminder to stop over-managing other people's reactions and put that energy back into your own choices, standards, and peace.",
      color: "bg-rose-100 text-rose-950",
    },
    {
      title: "What I learned from TD/CGI co-op",
      tag: "Co-op",
      status: "Coming soon",
      body: "Coming soon.",
      color: "bg-sky-100 text-sky-950",
    },
    {
      title: "Notes on building creative products",
      tag: "Product",
      status: "Coming soon",
      body: "Coming soon.",
      color: "bg-orange-100 text-orange-950",
    },
  ];

  return (
    <div>
      <SectionTitle kicker="Notes" title="Things I am learning." />
      <div className="mb-4 rounded-[1.6rem] bg-slate-950 p-4 text-white shadow-xl">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">Notebook</p>
        <p className="mt-2 text-sm leading-5 text-white/78">
          Short reflections from school, hackathons, books, co-op, and the messy middle of becoming a better builder.
        </p>
      </div>
      <div className="grid gap-3">
        {notes.map((note) => (
          <div key={note.title} className={`rounded-[1.5rem] p-4 shadow-sm ${note.color}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-black uppercase tracking-[0.16em] opacity-60">{note.tag}</p>
                <p className="mt-1 font-semibold leading-5">{note.title}</p>
              </div>
              <span className="shrink-0 rounded-full bg-white/60 px-2.5 py-1 text-[0.65rem] font-bold shadow-sm">{note.status}</span>
            </div>
            <p className="mt-3 text-sm leading-5 opacity-78">{note.body}</p>
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
