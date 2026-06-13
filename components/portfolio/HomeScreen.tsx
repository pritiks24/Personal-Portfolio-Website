"use client";

import { AnimatePresence, motion } from "framer-motion";
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
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_24%_16%,rgba(20,184,166,0.42),transparent_24%),radial-gradient(circle_at_78%_32%,rgba(124,58,237,0.42),transparent_25%),linear-gradient(145deg,#1e3a8a_0%,#6d28d9_44%,#0f172a_100%)] px-[7cqw] pb-[5cqw] pt-[clamp(3.6rem,14cqw,4.35rem)] dark:bg-[radial-gradient(circle_at_20%_15%,rgba(45,212,191,0.34),transparent_24%),radial-gradient(circle_at_80%_30%,rgba(168,85,247,0.34),transparent_24%),linear-gradient(145deg,#020617_0%,#172554_50%,#111827_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgba(255,255,255,0.14),transparent_25%,transparent_70%,rgba(255,255,255,0.1))]" />
      <motion.div
        initial={animations ? { y: 10, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 mb-[clamp(1.6rem,9cqh,2.7rem)]"
      >
        <p className="text-[clamp(0.7rem,3cqw,0.78rem)] font-semibold uppercase tracking-[0.18em] text-white/75">Pritika&apos;s Portfolio</p>
        <h1 className="mt-2 text-[clamp(1.9rem,9cqw,2.35rem)] font-semibold leading-none tracking-tight text-white">Pritika Lahiri</h1>
        <p className="mt-3 max-w-[28rem] text-[clamp(0.92rem,4cqw,1.08rem)] font-medium leading-[1.45] text-white/86">
          Waterloo CS undergrad with A.I. specialization building creative products.
        </p>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={animations ? "hidden" : false}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.035, delayChildren: 0.14 } },
          }}
          className="relative z-10 grid grid-cols-4 gap-x-[clamp(0.55rem,4cqw,1.25rem)] gap-y-[clamp(1.05rem,7cqh,1.75rem)]"
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

      <div className="absolute inset-x-[clamp(0.75rem,5cqw,1.5rem)] bottom-[clamp(1rem,4cqh,1.25rem)] z-10 rounded-[2.2rem] bg-white/22 p-[clamp(0.55rem,2.8cqw,0.75rem)] shadow-[0_14px_45px_rgba(15,23,42,0.24)] backdrop-blur-2xl ring-1 ring-white/25">
        <div className="grid grid-cols-4 gap-[clamp(0.45rem,2.8cqw,0.75rem)]">
          {dockApps.map((app) => (
            <AppIcon key={app.id} app={app} onOpen={onOpen} animations={animations} />
          ))}
        </div>
      </div>
    </div>
  );
}
