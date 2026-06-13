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
      className="group relative flex min-w-0 flex-col items-center gap-1.5 text-center outline-none"
      aria-label={`Open ${app.name}`}
    >
      <span
        className={`relative grid h-[clamp(3.2rem,18cqw,4.45rem)] w-[clamp(3.2rem,18cqw,4.45rem)] place-items-center rounded-[clamp(1.05rem,5cqw,1.38rem)] bg-gradient-to-br ${app.gradient} shadow-[0_12px_24px_rgba(15,23,42,0.22)] ring-1 ring-white/35 transition group-focus-visible:ring-4 group-focus-visible:ring-white/80`}
      >
        <Icon className="h-[clamp(1.45rem,7cqw,1.95rem)] w-[clamp(1.45rem,7cqw,1.95rem)] text-white drop-shadow" strokeWidth={2.2} />
        {app.badge ? (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white">
            {app.badge}
          </span>
        ) : null}
      </span>
      <span className="w-full truncate text-[clamp(0.6rem,3.15cqw,0.84rem)] font-semibold leading-tight text-white drop-shadow-[0_1px_5px_rgba(15,23,42,0.55)]">
        {app.name}
      </span>
    </motion.button>
  );
}
