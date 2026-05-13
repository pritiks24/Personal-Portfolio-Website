"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, Minus, X } from "lucide-react";
import type { ReactNode } from "react";
import type { PortfolioApp } from "./data";

type AppWindowProps = {
  app: PortfolioApp | undefined;
  children: ReactNode;
  onClose: () => void;
  onBack: () => void;
  animations: boolean;
  theme: "light" | "dark";
};

export function AppWindow({ app, children, onClose, onBack, animations, theme }: AppWindowProps) {
  const Icon = app?.icon;

  return (
    <AnimatePresence>
      {app ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${app.name} app`}
          data-theme={theme}
          style={theme === "dark" ? { background: "#020617", color: "#f8fafc" } : undefined}
          className={`${theme === "dark" ? "dark" : ""} portfolio-window absolute inset-0 z-40 overflow-hidden bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50`}
          initial={animations ? { opacity: 0, scale: 0.82, y: 90, borderRadius: 42 } : false}
          animate={{ opacity: 1, scale: 1, y: 0, borderRadius: 46 }}
          exit={animations ? { opacity: 0, scale: 0.88, y: 60 } : undefined}
          transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        >
          <header className="portfolio-window-header sticky top-0 z-20 flex h-16 items-end justify-between bg-white/76 px-4 pb-3 pt-6 shadow-sm backdrop-blur-2xl dark:bg-slate-950/76">
            <button
              type="button"
              onClick={onBack}
              className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-700 outline-none transition hover:bg-slate-200 focus-visible:ring-4 focus-visible:ring-[var(--phone-accent)]/25 dark:bg-slate-800 dark:text-slate-200"
              aria-label="Back to home screen"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className={`grid h-8 w-8 place-items-center rounded-xl bg-gradient-to-br ${app.gradient}`}>
                {Icon ? <Icon className="h-4.5 w-4.5 text-white" /> : null}
              </span>
              <h2 className="text-sm font-semibold">{app.name}</h2>
            </div>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={onBack}
                className="grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-700 outline-none transition hover:bg-slate-200 focus-visible:ring-4 focus-visible:ring-[var(--phone-accent)]/25 dark:bg-slate-800 dark:text-slate-200"
                aria-label="Minimize app"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 place-items-center rounded-full bg-red-500 text-white outline-none transition hover:bg-red-600 focus-visible:ring-4 focus-visible:ring-red-300/60"
                aria-label="Close app"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </header>
          <main className="phone-scroll h-[calc(100%-4rem)] overflow-y-auto px-4 pb-7 pt-4">{children}</main>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
