"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { AppIcon } from "./AppIcon";
import { apps, type AppId } from "./data";

type HomeScreenProps = {
  onOpen: (id: AppId) => void;
  animations: boolean;
};

export function HomeScreen({ onOpen, animations }: HomeScreenProps) {
  const homeApps = apps.filter((app) => !app.dock);
  const dockApps = apps.filter((app) => app.dock);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.72),transparent_22%),radial-gradient(circle_at_78%_32%,rgba(20,184,166,0.48),transparent_24%),linear-gradient(145deg,#1d4ed8_0%,#6d28d9_42%,#0f172a_100%)] px-6 pb-5 pt-14 dark:bg-[radial-gradient(circle_at_20%_15%,rgba(45,212,191,0.34),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.34),transparent_24%),linear-gradient(145deg,#020617_0%,#172554_50%,#111827_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.24),transparent_26%,transparent_70%,rgba(255,255,255,0.12))]" />
      <motion.div
        initial={animations ? { y: 10, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-5"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">Pritika&apos;s Portfolio</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-white">Pritika Lahiri</h1>
        <p className="mt-1 max-w-[18rem] text-sm leading-5 text-white/78">Waterloo CS undergrad with A.I. specialization building creative products.</p>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={animations ? "hidden" : false}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.035, delayChildren: 0.14 } },
          }}
          className="relative z-10 grid grid-cols-4 gap-x-4 gap-y-5"
        >
          {homeApps.map((app) => (
            <motion.div
              key={app.id}
              variants={{
                hidden: { opacity: 0, y: 18, scale: 0.94 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
            >
              <AppIcon app={app} onOpen={onOpen} animations={animations} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-x-6 bottom-24 z-10">
        <div className="flex items-center gap-2 rounded-full bg-white/18 px-4 py-2 text-sm text-white/80 shadow-inner backdrop-blur-2xl ring-1 ring-white/18">
          <Search className="h-4 w-4" />
          <span>Search portfolio</span>
        </div>
      </div>

      <div className="absolute inset-x-4 bottom-5 z-10 rounded-[2rem] bg-white/22 p-3 shadow-[0_14px_45px_rgba(15,23,42,0.24)] backdrop-blur-2xl ring-1 ring-white/25">
        <div className="grid grid-cols-4 gap-3">
          {dockApps.map((app) => (
            <AppIcon key={app.id} app={app} onOpen={onOpen} animations={animations} />
          ))}
        </div>
      </div>
    </div>
  );
}
