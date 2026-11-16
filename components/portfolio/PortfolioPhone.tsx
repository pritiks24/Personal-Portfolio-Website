"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { RotatingHeadline } from "./RotatingHeadline";
import { LifeOpening } from "./LifeOpening";
import { AppWindow } from "./AppWindow";
import { HomeScreen } from "./HomeScreen";
import { PhoneFrame } from "./PhoneFrame";
import { PortfolioApps } from "./PortfolioApps";
import { apps, type AppId } from "./data";

export function PortfolioPhone() {
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accent, setAccent] = useState("#14b8a6");
  const [wallpaper, setWallpaper] = useState("blue");
  const [animations, setAnimations] = useState(true);
  const [booted, setBooted] = useState(false);
  const [opening, setOpening] = useState(false);
  const reducedMotion = useReducedMotion();
  const [mobile, setMobile] = useState<boolean | null>(null);
  const [phase, setPhase] = useState<"intro" | "moving" | "open">("intro");

  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => { setMobile(media.matches); if (media.matches) setBooted(true); };
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (phase !== "moving" || mobile) return;
    const timer = window.setTimeout(() => { setPhase("open"); setOpening(true); }, reducedMotion ? 0 : 1450);
    return () => window.clearTimeout(timer);
  }, [phase, mobile, reducedMotion]);

  const enterWorld = useCallback(() => { setActiveApp(null); setPhase(current => current === "intro" ? "moving" : current); }, []);
  const returnToIntro = () => { setPhase("intro"); setActiveApp(null); setOpening(false); };


  const activeAppMeta = useMemo(() => apps.find((app) => app.id === activeApp), [activeApp]);

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
    <main className={`portfolio-stage cinematic-stage ${phase !== "intro" ? "world-focused" : ""} ${reducedMotion ? "motion-reduced" : ""}`}>
      <header className="site-masthead" inert={phase !== "intro"}><a href="#" aria-label="Pritika Lahiri home">pl.</a><span>A little window into my life</span><a href="mailto:pritika2404@gmail.com">Say hello ↗</a></header>
      <div className="portfolio-layout">
        <section className="portfolio-intro" inert={phase !== "intro"}>
          <p className="eyebrow">Pritika Lahiri · Waterloo CS</p>
          <RotatingHeadline active={mobile === false && phase === "intro"} reducedMotion={!!reducedMotion} onCycleComplete={enterWorld} />
          <p className="intro-copy">Hi, I’m Pritika. I study computer science,<br />build things, and follow my curiosity.</p>
          <button className="enter-button" onClick={enterWorld}>Open my world <span>↗</span></button>
          <p className="intro-footnote">01 · A collection of things that make me, me.</p>
        </section>
        <section className="phone-spotlight" aria-label="Interactive portfolio phone">
          <div className="phone-presence">
            <PhoneFrame theme={theme} accent={accent} booted={true}>
              {(booted || mobile) && <HomeScreen wallpaper={wallpaper} onOpen={setActiveApp} animations={animations && !reducedMotion} />}
              {mobile === false && <LifeOpening opening={opening} onOpen={enterWorld} onComplete={() => { setBooted(true); setOpening(false); }} reducedMotion={!!reducedMotion} />}
              <AppWindow app={activeAppMeta} onBack={() => setActiveApp(null)} onClose={() => setActiveApp(null)} animations={animations && !reducedMotion} theme={theme}>
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
                        wallpaper={wallpaper}
                        setWallpaper={setWallpaper}
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
      {phase !== "intro" && mobile === false && <button className="return-to-intro" onClick={returnToIntro}>← Back to introduction</button>}
      <p className="sr-only">Interactive phone-inspired personal portfolio. Use Tab to move between app icons and Escape to close an open app.</p>
    </main>
  );
}
