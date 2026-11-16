"use client";

import { motion } from "framer-motion";
import { IPhoneIcon } from "./IPhoneIcon";
import type { PortfolioApp } from "./data";

type AppIconProps = {
  app: PortfolioApp;
  onOpen: (id: PortfolioApp["id"]) => void;
  animations: boolean;
};

export function AppIcon({ app, onOpen, animations }: AppIconProps) {

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(app.id)}
      whileHover={animations ? { y: -5, scale: 1.03 } : undefined}
      whileTap={animations ? { scale: 0.92 } : undefined}
      className="iphone-app-button group relative flex min-w-0 flex-col items-center gap-1.5 text-center outline-none"
      aria-label={`Open ${app.name}`}
    >
      <span className="iphone-app-tile">
        <IPhoneIcon id={app.id} />
        {app.badge ? (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-red-500 px-1 text-[0.68rem] font-bold text-white ring-2 ring-white">
            {app.badge}
          </span>
        ) : null}
      </span>
      <span className="iphone-app-label">
        {app.name}
      </span>
    </motion.button>
  );
}
