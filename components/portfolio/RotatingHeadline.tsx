"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const identities = ["Curious mind.", "Basketball player.", "Musician."];

export function RotatingHeadline({ active, reducedMotion, onCycleComplete }: { active: boolean; reducedMotion: boolean; onCycleComplete: () => void }) {
  const [word, setWord] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) {
      setWord(0); setLength(0); setDeleting(false);
      return;
    }
    if (reducedMotion) {
      const timer = window.setTimeout(onCycleComplete, 3500);
      return () => window.clearTimeout(timer);
    }
    const full = length === identities[word].length;
    const timer = window.setTimeout(() => {
      if (!deleting && full) setDeleting(true);
      else if (deleting && length === 0) {
        if (word === identities.length - 1) onCycleComplete();
        setWord((word + 1) % identities.length);
        setDeleting(false);
      } else setLength(current => current + (deleting ? -1 : 1));
    }, full && !deleting ? 1050 : deleting && length === 0 ? 230 : deleting ? 38 : 85);
    return () => window.clearTimeout(timer);
  }, [active, reducedMotion, word, length, deleting, onCycleComplete]);

  return <h1 className="rotating-headline">
    <span className="sr-only">Curious mind. Basketball player. Musician. Many worlds.</span>
    <span aria-hidden="true" className="typed-line">{reducedMotion ? identities[0] : identities[word].slice(0, length)}<span className="typing-caret" /></span>
    <motion.em aria-hidden="true" initial={reducedMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .35 }}>Many worlds.</motion.em>
  </h1>;
}
