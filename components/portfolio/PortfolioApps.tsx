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
  FileText,
  MapPin,
  Play,
  Trophy,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { GoogleSearchApp } from "./GoogleSearchApp";
import { CampusMapsApp } from "./CampusMapsApp";
import { ProjectStore } from "./ProjectStore";
import { MusicLibrary, AchievementBooks } from "./CreativeApps";
import { PhotoLibrary } from "./PhotoLibrary";
import { WeatherExperience } from "./WeatherExperience";
import { experienceData, projectData, socialLinks, type AppId } from "./data";

type PortfolioAppsProps = {
  activeApp: AppId;
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  accent: string;
  setAccent: (accent: string) => void;
  wallpaper: string;
  setWallpaper: (value: string) => void;
  animations: boolean;
  setAnimations: (enabled: boolean) => void;
};

export function PortfolioApps(props: PortfolioAppsProps) {
  const appMap: Record<AppId, ReactNode> = {
    google: <GoogleSearchApp />,
    maps: <CampusMapsApp />,
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

function ProjectsApp() { return <ProjectStore />; }

function ExperienceApp() { return <WeatherExperience />; }

function SkillsApp() {
  const reduce = useReducedMotion();
  const groups = [
    ["Languages", [["C", 80], ["C++", 75], ["Python", 72], ["Java", 70], ["TypeScript", 68], ["Racket", 65]]],
    ["Frameworks", [["React", 90], ["Next.js", 84], ["Node", 80], ["Tailwind", 88]]],
  ] as const;

  return <div className="skills-studio">
    <header className="skills-heading"><span>THE TOOLKIT / 01</span><h3>Things I build with.</h3><p>Languages, frameworks, and tools I reach for.</p></header>
    {groups.map(([title, skills], groupIndex) => <section className="skills-group" key={title}>
      <div className="skills-group-title"><span>0{groupIndex + 1}</span><h4>{title}</h4><small>{skills.length} skills</small></div>
      {skills.map(([skill,level], i) => <div className="skill-meter" key={skill}>
        <div className="skill-meter-label"><span>{skill}</span><span>{level}<small> / 100</small></span></div>
        <div className="skill-meter-track" role="progressbar" aria-label={skill} aria-valuemin={0} aria-valuemax={100} aria-valuenow={level}>
          <motion.div className="skill-meter-fill" initial={reduce ? false : {scaleX:0}} whileInView={{scaleX:1}} viewport={{once:true,amount:.6}} transition={{duration:1,delay:i*.07,ease:[.22,1,.36,1]}} style={{width:`${level}%`,transformOrigin:"left"}}/>
        </div>
      </div>)}
    </section>)}
    <p className="skills-footnote">Always learning. Always adding to the toolkit.</p>
  </div>;
}

function PhotosApp() {
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
  ];
  const workPhotos: GalleryPhoto[] = [
    { src: "/images/life/td-coworkers.jpg", title: "The best part of TD", caption: "My TD internship coworkers. Easily the best part of the internship!" },
    { src: "/images/life/td-builders-win.jpg", title: "First place at TD Builders", caption: "First place at the TD Builders AI Hackathon! A build, a team, and a win to remember." },
  ];
  const livePhotos: GalleryPhoto[] = [
    { src: "/images/life/daniel-caesar-live.jpg", title: "Daniel Caesar, live", caption: "I LOVE watching my favourite artists perform live. Daniel Caesar in concert was one for the books." },
    { src: "/images/life/toronto-tempo.jpg", title: "Courtside energy", caption: "At a Toronto Tempo game! I love watching sports live: soccer, basketball, you name it. Nothing beats being there." },
    { src: "/images/life/fifa-match.jpg", title: "World Cup feelings", caption: "Watching a FIFA game! Not ready for Ronaldo’s last World Cup :(" },
  ];
  const favouritePhotos: GalleryPhoto[] = [
    { src: "/images/life/froyo-run.jpg", title: "Always down for froyo", caption: "I have the biggest sweet tooth you could ever imagine. Always down for a froyo run. Any time." },
    { src: "/images/life/matcha.jpg", title: "Matcha, obviously", caption: "MATCHA. Which does NOT taste like grass. I will defend this forever." },
  ];
  return <PhotoLibrary albums={[
    { name: "Life at TD", photos: workPhotos },
    { name: "Live & Loud", photos: livePhotos },
    { name: "Little Favourites", photos: favouritePhotos },
    { name: "Basketball", photos: basketballPhotos },
    { name: "Music", photos: musicPhotos },
    { name: "Travel", photos: travelPhotos },
    { name: "Projects", photos: projectPhotos },
  ]} />;
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

  return <MusicLibrary covers={youtubeCovers} />;
}

function ResumeApp() {
  return (
    <div>
      <SectionTitle kicker="Resume" title="Check out my resume." />
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noreferrer"
        className="resume-open-button"
      >
        <span className="resume-document-icon"><FileText size={24} strokeWidth={1.5}/></span><span className="resume-button-copy"><small>PRITIKA LAHIRI · PDF</small><strong>Open résumé</strong></span><span className="resume-button-arrow"><ArrowUpRight size={20}/></span>
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
        "title": "What first year at Waterloo taught me",
        "time": "Pinned",
        "preview": "Learning how to study, handle rejection, and leave room for a life outside class.",
        "content": "First year at Waterloo taught me that being busy and actually understanding the material are two different things. Nobody is checking whether you’ve kept up, so you have to get better at noticing what you don’t know and asking for help before exam week. I’m still working on that last part.\n\nCo-op applications were their own learning curve. I had to start earlier, apply more widely, and learn not to treat every rejection as a verdict on my ability. Easier said than done.\n\nMostly, I learned that school can take up every hour you give it. Making time for friends, music, and basketball isn’t something I want to save for when everything else is finished. There will always be another assignment.",
        "folder": "Waterloo CS",
        "selected": true,
        "thumb": "🎓"
    },
    {
        "title": "A note to incoming first years",
        "time": "Pinned",
        "preview": "Go to orientation. Join something. Keep the hobbies you arrived with.",
        "content": "Go to orientation, even if an event sounds a little awkward. Everyone is trying to meet people, and some of my closest friendships started that week.\n\nJoin a club earlier than you think you’re ready to. I wish I’d done more of that in my first semester. It’s much easier to start a conversation when you already have something in common.\n\nKeep playing your sport or instrument. Call your family. Say yes to the occasional late-night card game. Those things can feel optional when school gets busy, but they’re a big part of what makes a place feel like home.\n\nYou don’t have to figure out your entire university experience in September. Just give yourself a few chances to be surprised.",
        "folder": "First Year",
        "selected": false,
        "thumb": "💡"
    },
    {
        "title": "What hackathons taught me",
        "time": "Recent",
        "preview": "Build a smaller idea well, tell its story, and leave time to test the demo.",
        "content": "Hackathons have taught me to make decisions before I feel completely ready. There’s always another feature we could add, but at some point we have to choose what matters and get it working.\n\nA good pitch helps people understand why a project should exist. I’ve learned to spend less time listing technologies and more time explaining the person we’re building for and the problem we’re trying to solve.\n\nThe people are a huge part of why I keep going. Someone you meet at one event can become a teammate at the next.\n\nAnd yes, something will probably break right before the demo. I’m getting better at taking a breath, finding the smallest fix, and carrying on.",
        "folder": "Hackathons",
        "selected": true,
        "thumb": "⚡"
    },
    {
        "title": "Reading: The Let Them Theory",
        "time": "On my bookshelf",
        "preview": "A reminder to share the things I care about without overthinking every reaction.",
        "content": "The Let Them Theory has made me think about how much time I spend anticipating other people’s opinions. I can turn posting a project or a song cover into a much bigger decision than it needs to be.\n\nI’m trying to get more comfortable sharing work because I care about it, rather than waiting until I’m certain nobody could find it embarrassing. That certainty is probably never coming.\n\nThis website is part of that. I wanted a place for the projects, music, photos, and little interests that don’t fit neatly on a résumé.\n\nNext on my reading list: something about financial literacy. If you have a book you’d recommend, I’d love to hear about it.",
        "folder": "Reading",
        "selected": true,
        "thumb": "📖"
    },
    {
        "title": "The people made my TD internship",
        "time": "A favourite memory",
        "preview": "The work taught me a lot. My coworkers made it a place I wanted to show up to.",
        "content": "At TD, I worked with the data engineering team and contributed to the front end of an internal application. It was a chance to see how software fits into a team’s everyday work, beyond the scope of a class project or a weekend hackathon.\n\nMy coworkers were the best part of the internship. They’re the people I think of first when someone asks how it went.\n\nWinning first place at the TD Builders AI Hackathon was another highlight. I’m glad I have photos from both the competition and the time with my team; those are the parts I want to remember.",
        "folder": "Co-op",
        "selected": false,
        "thumb": "☀️"
    },
    {
        "title": "A few things for 2027",
        "time": "A work in progress",
        "preview": "More building, more music, and a little more room for things outside school.",
        "content": "Build a project I want to keep working on after the deadline.\n\nLearn and perform more songs.\n\nVisit somewhere new, and make time to see people I miss.\n\nKeep basketball and music in the week, even when school gets busy.\n\nLeave a few weekends unplanned.\n\nThis list will change. That’s half the point.",
        "folder": "Personal",
        "selected": false,
        "thumb": "📝"
    }
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

  return <AchievementBooks wins={wins} />;
}

function SettingsApp({ theme, setTheme, accent, setAccent, wallpaper, setWallpaper, animations, setAnimations }: PortfolioAppsProps) {
  const colors = [{ name: "Teal", value: "#14b8a6" }, { name: "Blue", value: "#6366f1" }, { name: "Orange", value: "#f97316" }, { name: "Rose", value: "#ec4899" }, { name: "Green", value: "#22c55e" }];
  const [reset, setReset] = useState(false);
  return <div className="settings-studio">
    <header className="settings-title"><span>MAKE YOURSELF AT HOME</span><h3>Settings</h3></header>
    <a className="settings-profile" href="mailto:pritika2404@gmail.com"><span className="settings-profile-avatar">PL</span><span><strong>Pritika’s world</strong><small>A little more personal. Just like you.</small></span><ChevronRight size={17}/></a>
    <h4 className="settings-section-heading">Appearance</h4>
    <section className="settings-panel"><div className="settings-appearance">{(["light", "dark"] as const).map(mode => <button key={mode} aria-pressed={theme === mode} onClick={() => setTheme(mode)}><span className={`settings-theme-preview preview-${mode}`}><i/><span><b/><b/><b/></span></span><strong>{mode === "light" ? "Light" : "Dark"}</strong><span className="settings-radio"/></button>)}</div>
    <div className="settings-color-row"><div><strong>Accent colour</strong><small>Make the details yours</small></div><div className="settings-swatches">{colors.map(c => <button key={c.value} style={{ background:c.value }} aria-label={`Use ${c.name} accent`} aria-pressed={accent===c.value} onClick={()=>setAccent(c.value)}>{accent===c.value&&<CheckCircle2 size={16}/>}</button>)}</div></div></section>
    <h4 className="settings-section-heading">Home screen</h4>
    <section className="settings-panel"><div className="settings-row-copy"><strong>Choose your wallpaper</strong><small>A fresh backdrop for your world.</small></div><div className="settings-wallpapers">{[{id:"blue",name:"Coast"},{id:"sage",name:"Botanical"},{id:"rose",name:"Dusk"}].map(w=><button key={w.id} onClick={()=>setWallpaper(w.id)} aria-pressed={wallpaper===w.id}><span className={`wallpaper-swatch wallpaper-${w.id}`}><i/><i/><i/>{wallpaper===w.id&&<CheckCircle2 size={19}/>}</span><span>{w.name}</span></button>)}</div></section>
    <h4 className="settings-section-heading">A little motion</h4>
    <section className="settings-panel"><label className="settings-toggle-row"><span className="settings-motion-icon"><Play size={16}/></span><span><strong>Interface animations</strong><small>Softer transitions as you explore</small></span><input type="checkbox" role="switch" checked={animations} onChange={e=>setAnimations(e.target.checked)} /></label><p className="settings-accessibility-note">Your device’s reduced-motion preference is respected.</p></section>
    <button className="settings-reset" onClick={()=>{setTheme("light");setAccent("#14b8a6");setWallpaper("blue");setAnimations(true);setReset(true);}}>Restore default appearance</button>
    <p className="settings-reset-message" role="status">{reset ? "Back to the original look." : "Changes apply to this visit."}</p>
    <footer className="settings-signoff"><span>✳</span><p>Made for curious people.<br/>Thanks for stopping by.</p></footer>
  </div>;
}
