"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BrainCircuit, Code2, GraduationCap, Sparkles } from "lucide-react";
import { AppWindow } from "./AppWindow";
import { HomeScreen } from "./HomeScreen";
import { PhoneFrame } from "./PhoneFrame";
import { PortfolioApps } from "./PortfolioApps";
import { apps, type AppId } from "./data";

export function PortfolioPhone() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accent, setAccent] = useState("#14b8a6");
  const [animations, setAnimations] = useState(true);
  const [booted, setBooted] = useState(false);

  const activeAppMeta = useMemo(() => apps.find((app) => app.id === activeApp), [activeApp]);

  useEffect(() => {
    const timer = window.setTimeout(() => setBooted(true), 1550);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveApp(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.2),transparent_32%),linear-gradient(135deg,#f8fafc,#e2e8f0)] px-4 py-6 dark:bg-[linear-gradient(135deg,#020617,#111827)] sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute left-1/2 top-12 h-32 w-[28rem] -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
      <div className="relative mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl items-center gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(460px,1fr)] xl:grid-cols-[minmax(0,0.85fr)_minmax(500px,1fr)]">
        <section className="hidden lg:block">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-teal-600">Pritika Lahiri</p>
          <h1 className="mt-4 max-w-xl text-6xl font-semibold leading-[0.95] tracking-tight text-slate-950 xl:text-7xl">
            Pritika&apos;s Personal Portfolio
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">
            Waterloo CS undergrad with an A.I. specialization building creative products across software, product, fintech, and machine learning. Click on the apps to learn more about me!
          </p>
          <div className="mt-8 grid max-w-xl grid-cols-2 gap-3">
            {[
              { label: "Waterloo CS", detail: "Undergraduate", icon: GraduationCap },
              { label: "A.I.", detail: "Specialization", icon: BrainCircuit },
              { label: "Software Developer", detail: "Currently @ CGI", icon: Sparkles },
              { label: "Engineering", detail: "Full-stack projects", icon: Code2 },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="rounded-3xl border border-white/70 bg-white/62 p-4 shadow-[0_18px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl">
                  <Icon className="h-5 w-5 text-teal-600" />
                  <p className="mt-4 text-base font-semibold text-slate-950">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="mailto:you@example.com" className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5">
              Contact me <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="https://github.com/your-handle" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-5 py-3 text-sm font-bold text-slate-800 shadow-xl shadow-slate-950/5 backdrop-blur transition hover:-translate-y-0.5">
              GitHub <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
        <section className="relative grid place-items-center">
          <div className="pointer-events-none absolute inset-y-10 left-1/2 w-[min(70vw,720px)] -translate-x-1/2 rounded-full bg-gradient-to-br from-teal-200/45 via-indigo-200/35 to-fuchsia-200/35 blur-3xl" />
          <div className="relative">
            <PhoneFrame theme={theme} accent={accent} booted={booted}>
              <HomeScreen onOpen={setActiveApp} animations={animations} />
              <AppWindow app={activeAppMeta} onBack={() => setActiveApp(null)} onClose={() => setActiveApp(null)} animations={animations} theme={theme}>
                <AnimatePresence mode="wait">
                  {activeApp ? (
                    <motion.div
                      key={activeApp}
                      initial={animations ? { opacity: 0, y: 12 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      exit={animations ? { opacity: 0, y: -12 } : undefined}
                      transition={{ duration: 0.22 }}
                    >
                      <PortfolioApps
                        activeApp={activeApp}
                        theme={theme}
                        setTheme={setTheme}
                        accent={accent}
                        setAccent={setAccent}
                        animations={animations}
                        setAnimations={setAnimations}
                      />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </AppWindow>
            </PhoneFrame>
          </div>
        </section>
      </div>
      <p className="sr-only">Interactive phone-inspired personal portfolio. Use Tab to move between app icons and Escape to close an open app.</p>
    </main>
  );
}
