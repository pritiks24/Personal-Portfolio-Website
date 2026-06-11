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
      className="group relative flex min-w-0 flex-col items-center gap-2 text-center outline-none"
      aria-label={`Open ${app.name}`}
    >
      <span
        className={`relative grid h-[4.15rem] w-[4.15rem] place-items-center rounded-[1.38rem] bg-gradient-to-br ${app.gradient} shadow-[0_12px_24px_rgba(15,23,42,0.22)] ring-1 ring-white/35 transition group-focus-visible:ring-4 group-focus-visible:ring-white/80 sm:h-[4.55rem] sm:w-[4.55rem]`}
      >
        <Icon className="h-7 w-7 text-white drop-shadow sm:h-8 sm:w-8" strokeWidth={2.2} />
        {app.badge ? (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white">
            {app.badge}
          </span>
        ) : null}
      </span>
      <span className="w-full truncate text-[0.76rem] font-semibold leading-tight text-white drop-shadow-[0_1px_5px_rgba(15,23,42,0.55)] sm:text-[0.82rem]">
        {app.name}
      </span>
    </motion.button>
  );
}
