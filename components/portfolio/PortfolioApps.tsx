"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  ExternalLink,
  Folder,
  MapPin,
  Play,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
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

function ProjectsApp() {
  const [filter, setFilter] = useState("All");
  const [expanded, setExpanded] = useState(projectData[0].title);
  const filters = ["All", "Hardware Projects", "Browser Extensions", "Web Dev", "Mobile Apps"];
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
            <motion.article
              layout
              key={project.title}
              className="app-card rounded-3xl p-4 text-left"
            >
              <button type="button" onClick={() => setExpanded(isOpen ? "" : project.title)} className="w-full rounded-2xl text-left outline-none transition focus-visible:ring-4 focus-visible:ring-[var(--phone-accent)]/25">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold text-[var(--phone-accent)]">{project.category}</p>
                    <h4 className="mt-1 text-lg font-semibold">{project.title}</h4>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-slate-400" />
                </div>
                <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-300">{project.description}</p>
              </button>
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
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-[var(--phone-accent)] px-3 py-1.5 text-xs font-bold text-white shadow-lg shadow-[var(--phone-accent)]/20 transition hover:-translate-y-0.5 hover:brightness-95"
                        >
                          {link.label} <ExternalLink className="h-3 w-3" />
                        </a>
                      ))}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.article>
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
      position: "46% center",
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
    <div className="flex h-[calc(100%-2.75rem)] min-h-0 flex-col">
      <SectionTitle kicker="Gallery: Moments and memories" title="Click on a section to see parts of my life outside tech and school." />
      <div className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-3 md:gap-4">
        {photos.map((album) => (
          <button
            key={album.label}
            type="button"
            onClick={() => setSelected(album.label)}
            className={`group relative flex h-full min-h-0 flex-col justify-between overflow-hidden rounded-[1.45rem] ${album.color} p-2.5 text-left text-white shadow-xl shadow-slate-900/12 ring-1 ring-white/30 transition hover:-translate-y-0.5 hover:shadow-2xl md:rounded-[1.6rem] md:p-3`}
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.32),rgba(255,255,255,0.08))]" />
            <div className="flex items-start justify-between gap-2">
              <span className="relative h-2.5 w-2.5 rounded-full bg-white shadow-sm" />
              <span className="relative rounded-full bg-white/24 px-2 py-1 text-[0.65rem] font-bold text-white shadow-sm ring-1 ring-white/30 backdrop-blur-md">
                {album.count ? `${album.count} photos` : "Soon"}
              </span>
            </div>
            {album.preview ? (
              <div className="relative my-2 min-h-0 flex-1 overflow-hidden rounded-2xl bg-black/20 shadow-inner ring-1 ring-white/25 md:my-3">
                <img src={album.preview} alt="" className="h-full w-full object-cover opacity-95 transition duration-300 group-hover:scale-105 group-hover:opacity-100" />
              </div>
            ) : (
              <div className="relative my-2 grid min-h-0 flex-1 place-items-center rounded-2xl bg-white/16 text-4xl font-black text-white/75 ring-1 ring-white/25 backdrop-blur-md md:my-3">
                {album.label.slice(0, 1)}
              </div>
            )}
            <div className={`relative rounded-2xl ${album.panel} p-2 backdrop-blur-md ring-1 ring-white/15 md:p-2.5`}>
              <p className="text-sm font-bold text-white md:text-base">{album.label}</p>
              <p className="mt-0.5 text-[0.68rem] leading-4 text-white/82 md:mt-1 md:text-xs">{album.detail}</p>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {activeGallery ? (
          <motion.div
            className="absolute inset-0 z-50 grid place-items-center bg-black/70 p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 24, scale: 0.96 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 24, scale: 0.96 }}
              className="flex max-h-[calc(100%-0.75rem)] w-full max-w-[28rem] flex-col overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="flex shrink-0 items-center justify-between px-4 py-2.5">
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
                className="relative min-h-[13rem] flex-1 overflow-hidden bg-slate-950"
              >
                {activeGalleryPhotos[activeGalleryPhoto].companionSrc ? (
                  <div className="relative h-full bg-slate-950">
                    <img
                      src={activeGalleryPhotos[activeGalleryPhoto].src}
                      alt={activeGalleryPhotos[activeGalleryPhoto].title}
                      className="h-full w-full object-contain"
                      style={{ objectPosition: activeGalleryPhotos[activeGalleryPhoto].position ?? "center" }}
                    />
                    <div className="absolute right-3 top-3 w-28 overflow-hidden rounded-2xl border border-white/45 bg-white/10 shadow-2xl backdrop-blur md:w-36">
                      <img
                        src={activeGalleryPhotos[activeGalleryPhoto].companionSrc}
                        alt=""
                        className="aspect-[4/3] w-full object-cover"
                        style={{ objectPosition: "center" }}
                      />
                    </div>
                  </div>
                ) : (
                  <img
                    src={activeGalleryPhotos[activeGalleryPhoto].src}
                    alt={activeGalleryPhotos[activeGalleryPhoto].title}
                    className="h-full w-full object-contain"
                    style={{ objectPosition: activeGalleryPhotos[activeGalleryPhoto].position ?? "center" }}
                  />
                )}
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
              <div className="shrink-0 bg-slate-950 px-4 py-3 text-white">
                <p className="text-sm font-bold">{activeGalleryPhotos[activeGalleryPhoto].title}</p>
                <p className="mt-1 text-xs leading-5 text-white/82">{activeGalleryPhotos[activeGalleryPhoto].caption}</p>
              </div>
              <div className="phone-scroll flex shrink-0 gap-2 overflow-x-auto px-4 py-3">
                {activeGalleryPhotos.map((photo, index) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setActiveGalleryPhoto(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl ring-2 transition md:h-20 md:w-20 ${
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
            className="absolute inset-0 z-50 grid place-items-center bg-black/70 p-6"
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
  const contactRows = [
    {
      label: "contact email",
      value: "pritika2404@gmail.com",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=pritika2404@gmail.com&su=Portfolio%20Inquiry",
    },
    {
      label: "waterloo email",
      value: "plahiri@uwaterloo.ca",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=plahiri@uwaterloo.ca&su=Portfolio%20Inquiry",
    },
    {
      label: "linkedin",
      value: "pritika-lahiri",
      href: "https://www.linkedin.com/in/pritika-lahiri/",
    },
    {
      label: "github",
      value: "pritiks24",
      href: "https://github.com/pritiks24",
    },
  ];
  const quickActions = socialLinks.map((link) => {
    const Icon = link.icon;
    return { ...link, Icon };
  });

  return (
    <div className="-m-4 min-h-full bg-[#f7f7f8] pb-6 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="bg-[#fde8ee] px-4 pb-16 pt-4 text-slate-900 dark:bg-slate-900 dark:text-white">
        <div className="h-9" />
      </div>

      <div className="-mt-12 px-4">
        <div className="grid place-items-center text-center">
          <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-4xl font-semibold text-rose-500 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-rose-200 dark:ring-slate-700">
            PL
          </div>
          <h3 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">Pritika Lahiri</h3>
          <p className="mt-2 max-w-[20rem] text-sm font-medium leading-5 text-slate-500 dark:text-slate-300">
            Waterloo CS undergrad building software, AI/ML projects, and creative products.
          </p>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-3">
          {quickActions.map(({ label, href, Icon }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined} className="grid gap-1 text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-rose-500 shadow-sm ring-1 ring-slate-200 transition hover:bg-rose-50 dark:bg-slate-900 dark:text-rose-200 dark:ring-slate-800">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[0.62rem] font-semibold text-slate-500 dark:text-slate-300">{label.replace(" Email", "")}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-[1.4rem] bg-white text-slate-950 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-white dark:ring-slate-800">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-500">Info</p>
          </div>
          {contactRows.map((row, index) => (
            <a
              key={row.label}
              href={row.href}
              target={row.href.startsWith("http") ? "_blank" : undefined}
              rel={row.href.startsWith("http") ? "noreferrer" : undefined}
              className={`flex items-start justify-between gap-4 px-4 py-3 transition hover:bg-rose-50 dark:hover:bg-slate-800/70 ${index !== contactRows.length - 1 ? "border-b border-slate-200 dark:border-slate-800" : ""}`}
            >
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{row.label}</p>
                <p className="mt-0.5 text-base font-semibold leading-5 text-slate-900 dark:text-white">{row.value}</p>
              </div>
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-rose-300" />
            </a>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-[1.4rem] bg-white text-slate-950 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:text-white dark:ring-slate-800">
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-rose-500">Actions</p>
          </div>
          {[
            "Open to internships, co-op roles, and project collaborations",
            "Happy to chat about AI, fintech, product, music, or basketball",
          ].map((action, index) => (
            <div key={action} className={`flex items-center justify-between gap-4 px-4 py-3 ${index === 0 ? "border-b border-slate-200 dark:border-slate-800" : ""}`}>
              <p className="text-sm font-semibold leading-5 text-slate-700 dark:text-slate-200">{action}</p>
              <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotesApp() {
  const [openNote, setOpenNote] = useState<string | null>(null);
  const allNotes = [
    {
      title: "What first year at Waterloo taught me",
      time: "Pinned",
      preview: "Studying is self-paced, co-op is harder than expected, and balance matters.",
      content:
        "First year at Waterloo taught me that university is a lot more self-paced than high school, especially when it comes to studying. There is less hand-holding, fewer reminders, and a lot more responsibility to figure out what you understand before it becomes a problem.\n\nIt also taught me that finding a co-op is hard. You have to send way more applications than you think, start earlier than feels necessary, and get comfortable with rejection being part of the process.\n\nThe hardest lesson was balance. It is easy to get pulled completely into studying, but you also need to enjoy yourself and build a life outside school. Exam season cramming was honestly insane. It was probably the most I have ever studied, maybe more than high school combined.",
      folder: "Waterloo CS",
      selected: true,
      thumb: "🎓",
    },
    {
      title: "Advice I would give to incoming first years",
      time: "Pinned",
      preview: "Enjoy orientation, join clubs, keep your old hobbies, and be open to people.",
      content:
        "My biggest advice is to enjoy orientation week and go to as many events as possible before classes start. That first week is such a rare window where everyone is open to meeting people, and it is where I met some of my closest friends.\n\nI would also tell first years to join more clubs early. I regret not doing more during my first semester because clubs are one of the easiest ways to find people who care about the same things as you.\n\nDo not lose touch with whatever sport, instrument, or creative thing you did in high school. It is really easy to get busy and slowly forget about the parts of yourself that made you happy before university. Stay close with your family too, even when school gets overwhelming.\n\nAnd finally, enjoy the random connections. Floor mates, late-night card games, quick conversations with strangers, and small acts of kindness matter more than you realize. Be open to meeting new people whenever you can.",
      folder: "First Year",
      selected: false,
      thumb: "💡",
    },
    {
      title: "What hackathons taught me",
      time: "Recent",
      preview: "Vibe coding, creative pitches, meeting teammates, and staying calm under pressure.",
      content:
        "Hackathons taught me how to become a professional vibe coder. Sometimes you are building with half a plan, no sleep, a random API, and a dream, and somehow you still have to make it work.\n\nThey also taught me that your idea and how you pitch it can be just as important as the product itself. The most obscure, creative pitches are often the ones people remember. Good storytelling and presentation skills can completely change how judges understand your project.\n\nI learned to meet new people at hackathons too, because those people can become future teammates at other events. And maybe most importantly, I learned how to deal with last-minute bugs, crashes, and demo chaos without fully panicking. Staying calm under pressure is its own skill.",
      folder: "Hackathons",
      selected: true,
      thumb: "⚡",
    },
    {
      title: "Book notes: The Let Them Theory",
      time: "Reading now",
      preview: "The current book I am reading, and a reminder to stop caring so much about what people think.",
      content:
        "The current book I am reading is The Let Them Theory, and I honestly really resonate with it.\n\nOne of the main messages I keep taking away is that you have to stop caring so much about what other people think. That sounds simple, but it is something I have struggled with for a long time. Before posting on LinkedIn or even putting up an Instagram story, I would overthink so much. I would wonder how people would interpret it, whether it was cringe, whether I was sharing too much, or whether someone would judge me.\n\nReading this book has been a helpful reminder that I do not want fear of other people's opinions to decide how much of myself I get to share. It actually inspired me to create this website and make it more personal, because at the end of the day, I have always loved creatively expressing myself. I like building things, writing thoughts down, sharing music, telling stories, and making things feel like me.\n\nI am trying to be less afraid of putting my thoughts and work into the world. Not everything has to be perfect or universally liked. Sometimes it is enough that it is honest.\n\nFor my next book, I want to explore financial literacy more. If anyone has recommendations for good finance, investing, or money mindset books, please email me because I would love suggestions.",
      folder: "Reading",
      selected: true,
      thumb: "📖",
    },
    {
      title: "What I learned from TD/CGI co-op",
      time: "Coming soon",
      preview: "Coming soon.",
      content: "Coming soon.",
      folder: "Co-op",
      selected: false,
    },
    {
      title: "Bucket list for 2027",
      time: "Temporary note",
      preview: "A running list of goals, places, projects, and things I want to try next.",
      content:
        "Temporary note.\n\nA running bucket list for 2027: projects I want to build, places I want to visit, songs I want to perform, hackathons I want to do, and small habits I want to carry with me.",
      folder: "Personal",
      selected: false,
      thumb: "📝",
    },
  ];
  const noteGroups = [
    ["Pinned", allNotes.slice(0, 2)],
    ["Reflections", allNotes.slice(2, 4)],
    ["Personal", allNotes.slice(4)],
  ] as const;
  const selectedNote = allNotes.find((note) => note.title === openNote);

  useEffect(() => {
    if (!selectedNote) return;

    const handleAppBack = (event: Event) => {
      event.preventDefault();
      setOpenNote(null);
    };

    window.addEventListener("portfolio-app-back", handleAppBack);
    return () => window.removeEventListener("portfolio-app-back", handleAppBack);
  }, [selectedNote]);

  if (selectedNote) {
    return (
      <div className="-m-4 min-h-full bg-[#f7f7f9] px-4 pb-5 pt-4 text-slate-950 dark:bg-slate-950 dark:text-white">
        <div className="mb-6 flex items-center">
          <button
            type="button"
            onClick={() => setOpenNote(null)}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-amber-600 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-white/20"
            aria-label="Back to all notes"
          >
            <span className="text-2xl font-semibold leading-none text-amber-600 dark:text-white" aria-hidden="true">
              ‹
            </span>
          </button>
        </div>

        <article className="min-h-[36rem] rounded-[1.6rem] bg-white px-4 py-5 shadow-sm dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
          <p className="text-xs font-semibold text-slate-400 dark:text-amber-200/80">{selectedNote.time} • {selectedNote.folder}</p>
          <h3 className="mt-3 text-2xl font-black leading-8 tracking-tight">{selectedNote.title}</h3>
          <div className="mt-5 whitespace-pre-line text-[0.98rem] leading-7 text-slate-700 dark:text-slate-200">
            {selectedNote.content}
          </div>
        </article>

      </div>
    );
  }

  return (
    <div className="-m-4 min-h-full bg-[#f7f7f9] px-4 pb-5 pt-4 text-slate-950 dark:bg-slate-950 dark:text-white">
      <div className="mb-3">
        <h3 className="text-4xl font-black tracking-tight">Notes</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">6 Notes</p>
      </div>

      <div className="space-y-5">
        {noteGroups.map(([group, groupNotes]) => (
          <section key={group}>
            <h4 className="mb-2 text-lg font-black">{group}</h4>
            <div className="overflow-hidden rounded-[1.45rem] bg-white shadow-sm dark:bg-slate-900">
              {groupNotes.map((note, index) => (
                <button
                  key={note.title + note.time}
                  type="button"
                  onClick={() => setOpenNote(note.title)}
                  className={`flex w-full gap-3 px-3 py-3 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/70 ${index !== groupNotes.length - 1 ? "border-b border-slate-200 dark:border-slate-800" : ""}`}
                >
                  <div className="pt-2">
                    {note.selected ? (
                      <CheckCircle2 className="h-5 w-5 fill-amber-400 text-white" />
                    ) : (
                      <span className="block h-5 w-5 rounded-full border-2 border-slate-300 dark:border-slate-600" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-base font-bold leading-5">{note.title}</p>
                        <p className="mt-1 truncate text-sm text-slate-500 dark:text-slate-400">
                          <span className="font-medium text-slate-700 dark:text-slate-300">{note.time}</span> &nbsp;{note.preview}
                        </p>
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Folder className="h-3.5 w-3.5" /> {note.folder}
                        </p>
                      </div>
                      {"thumb" in note && note.thumb ? (
                        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-slate-100 text-xl shadow-inner dark:bg-slate-800">
                          {note.thumb}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

    </div>
  );
}

function AchievementsApp() {
  const wins = [
    {
      title: "President's Scholarship of Distinction",
      detail: "Awarded the University of Waterloo President's Scholarship of Distinction, valued at $2,000.",
      category: "Scholarship",
    },
    {
      title: "Canadian Euclid Math Contest National Honour Roll",
      detail: "Scored in the top 150 out of 25,000+ students across Canada on the Grade 12 contest hosted by the University of Waterloo.",
      category: "Math",
    },
    {
      title: "Canadian Intermediate Mathematics Contest",
      detail: "Ranked top 60 nationally, placing in the top 0.4% out of 15,000 participants.",
      category: "Math",
    },
    {
      title: "AIME Qualifier",
      detail: "Qualified for the American Invitational Mathematics Examination, ranking in the top 5% of AMC math contest takers worldwide.",
      category: "Math",
    },
    {
      title: "American Math Olympiad",
      detail: "Hosted by SIMCC; ranked #1 in Canada and #2 globally for Grade 9 students in 2022, then #1 in Canada and #48 globally for Grade 10 students in 2023.",
      category: "International",
    },
    {
      title: "Singapore Asian Mathematical Olympiad Gold Medal",
      detail: "Gold Medal winner, ranked #1 in Canada and #38 globally for Grade 10 students among participants from 38 countries.",
      category: "International",
    },
    {
      title: "Girls in Math at Yale",
      detail: "First Place Team Award winner at a math competition hosted by Yale University.",
      category: "Team",
    },
    {
      title: "Merriam Music Voice Scholarship",
      detail: "Awarded a $3,000 voice scholarship and participated in Merriam's enriched music program with monthly genre-spanning performances.",
      category: "Music",
    },
    {
      title: "Peel Music Festival",
      detail: "1st place award winner in 2023 and 2024 for Pop and Musical Theatre, plus Ontario Music Festival provincials qualifier and honourable mention.",
      category: "Music",
    },
    {
      title: "RCM Level 8 Voice & Open Mic Canada Finalist",
      detail: "Achieved Royal Conservatory of Music Level 8 in Voice and qualified for the Ontario Singing Championship through Open Mic Canada.",
      category: "Music",
    },
  ];

  return (
    <div>
      <SectionTitle kicker="Awards" title="Math, music, and competition milestones." />
      <div className="grid gap-3">
        {wins.map((win) => (
          <div key={win.title} className="app-card flex items-start gap-3 rounded-3xl p-4 dark:border dark:border-amber-300/15 dark:bg-slate-900">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-300/18 dark:text-amber-200"><Trophy className="h-6 w-6" /></div>
            <div>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-amber-700 dark:bg-amber-300/15 dark:text-amber-200">{win.category}</span>
              <p className="mt-2 font-semibold leading-5 dark:text-white">{win.title}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-300">{win.detail}</p>
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
                className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${
                  theme === mode ? "bg-white text-slate-950 shadow dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-300"
                }`}
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
        <p className="mt-2">React, Tailwind CSS, Framer Motion, lucide-react.</p>
        <p className="mt-2 flex items-center gap-2"><MapPin className="h-4 w-4" /> Built for recruiters, teammates, and curious builders.</p>
      </div>
    </div>
  );
}
