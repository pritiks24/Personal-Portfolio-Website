"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, LockKeyhole } from "lucide-react";

const moments = [
  { title: "On the court.", detail: "Basketball", image: "/images/basketball/action-layup.jpg" },
  { title: "Finding my rhythm.", detail: "Music", image: "/images/music/recital-guitar.jpg" },
  { title: "A little further.", detail: "Travel", image: "/images/travel/mountain-train.JPG" },
  { title: "Making things happen.", detail: "Building", image: "/images/projects/build-table.jpeg" },
];

const slideDuration = 1800;

export function LifeOpening({ opening, onOpen, onComplete, reducedMotion }: { opening: boolean; onOpen: () => void; onComplete: () => void; reducedMotion: boolean }) {
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  useEffect(() => {
    if (!opening) return;
    setComplete(false);
    setStep(0);
    if (reducedMotion) { setComplete(true); onComplete(); return; }
    const timers = moments.slice(1).map((_, i) => window.setTimeout(() => setStep(i + 1), (i + 1) * slideDuration));
    timers.push(window.setTimeout(() => { setComplete(true); onComplete(); }, moments.length * slideDuration + 200));
    return () => timers.forEach(window.clearTimeout);
  }, [opening, reducedMotion]); // The sequence runs once per explicit open/replay.

  if (complete && !opening) return null;
  return (
    <div className="life-opening">
      {opening ? <>
        <AnimatePresence mode="wait">
          <motion.div className="life-moment" key={step} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <img src={moments[step].image} alt={`${moments[step].detail} from Pritika's life`} />
            <div className="moment-caption"><span>0{step + 1} / 04 · {moments[step].detail}</span><h2>{moments[step].title}</h2></div>
          </motion.div>
        </AnimatePresence>
        <button className="skip-opening" onClick={() => { setComplete(true); onComplete(); }}>Skip intro ↗</button>
      </> : <button className="lock-screen" onClick={onOpen} aria-label="Unlock phone and explore Pritika's life">
        <LockKeyhole size={20} strokeWidth={1.5} />
        <span className="lock-name">Pritika’s world</span>
        <span className="lock-time">Hello.</span>
        <span className="lock-subtitle">A few things that make me, me.</span>
        <span className="lock-collage"><img src="/images/basketball/action-layup.jpg" alt="Playing basketball" /><img src="/images/travel/venice-canal.jpeg" alt="Travels in Venice" /><img src="/images/music/recital-guitar.jpg" alt="Playing guitar" /></span>
        <span className="unlock-label">Tap to come in <ArrowUpRight size={17} /></span>
        <span className="home-indicator" />
      </button>}
    </div>
  );
}
