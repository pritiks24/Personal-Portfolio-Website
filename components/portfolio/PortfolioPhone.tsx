"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.22),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.2),transparent_32%),linear-gradient(135deg,#f8fafc,#e2e8f0)] px-4 py-8 dark:bg-[linear-gradient(135deg,#020617,#111827)]">
      <div className="pointer-events-none absolute left-1/2 top-12 h-32 w-[28rem] -translate-x-1/2 rounded-full bg-white/60 blur-3xl" />
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
      <p className="sr-only">Interactive phone-inspired personal portfolio. Use Tab to move between app icons and Escape to close an open app.</p>
    </main>
  );
}
