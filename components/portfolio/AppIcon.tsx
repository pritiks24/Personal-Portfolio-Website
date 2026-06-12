"use client";

import { motion } from "framer-motion";
import type { PortfolioApp } from "./data";

type AppIconProps = {
  app: PortfolioApp;
  onOpen: (id: PortfolioApp["id"]) => void;
  animations: boolean;
};

export function AppIcon({ app, onOpen, animations }: AppIconProps) {
  const Icon = app.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(app.id)}
      whileHover={animations ? { y: -5, scale: 1.03 } : undefined}
      whileTap={animations ? { scale: 0.92 } : undefined}
      className="group relative flex min-w-0 flex-col items-center gap-1.5 text-center outline-none sm:gap-2"
      aria-label={`Open ${app.name}`}
    >
      <span
        className={`relative grid h-[clamp(3.25rem,17vw,4.15rem)] w-[clamp(3.25rem,17vw,4.15rem)] place-items-center rounded-[clamp(1.05rem,5vw,1.38rem)] bg-gradient-to-br ${app.gradient} shadow-[0_12px_24px_rgba(15,23,42,0.22)] ring-1 ring-white/35 transition group-focus-visible:ring-4 group-focus-visible:ring-white/80 sm:h-[4.55rem] sm:w-[4.55rem] sm:rounded-[1.38rem]`}
      >
        <Icon className="h-[clamp(1.45rem,7vw,1.75rem)] w-[clamp(1.45rem,7vw,1.75rem)] text-white drop-shadow sm:h-8 sm:w-8" strokeWidth={2.2} />
        {app.badge ? (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white">
            {app.badge}
          </span>
        ) : null}
      </span>
      <span className="w-full truncate text-[clamp(0.66rem,3vw,0.76rem)] font-semibold leading-tight text-white drop-shadow-[0_1px_5px_rgba(15,23,42,0.55)] sm:text-[0.82rem]">
        {app.name}
      </span>
    </motion.button>
  );
}
