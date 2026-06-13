"use client";

import { BatteryFull, Signal, Wifi } from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PhoneFrameProps = {
  children: ReactNode;
  theme: "light" | "dark";
  accent: string;
  booted: boolean;
};

export function PhoneFrame({ children, theme, accent, booted }: PhoneFrameProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={theme === "dark" ? "dark" : ""}
      style={{ "--phone-accent": accent } as React.CSSProperties}
    >
      <div className="relative h-[min(92svh,900px)] w-[min(92vw,calc(min(92svh,900px)*0.56),440px)] rounded-[3rem] border border-white/30 bg-slate-950 p-[6px] shadow-[0_36px_120px_rgba(15,23,42,0.38)] [container-type:size] sm:rounded-[3.35rem] sm:p-2 xl:h-[min(90svh,900px)] xl:w-[min(34vw,calc(min(90svh,900px)*0.56),440px)]">
        <div className="absolute left-1/2 top-0 z-30 h-5 w-40 -translate-x-1/2 rounded-b-3xl bg-slate-950 sm:h-6 sm:w-44" />
        <div className="relative h-full overflow-hidden rounded-[2.75rem] bg-slate-900">
          <div className="pointer-events-none absolute inset-0 z-20 rounded-[2.75rem] ring-1 ring-inset ring-white/20" />
          <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between px-8 text-xs font-semibold text-white">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-4 w-4" />
            </span>
          </div>
          {children}
          {!booted ? (
            <motion.div
              className="absolute inset-0 z-50 grid place-items-center bg-black"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 1.05, duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0.82, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.55 }}
                className="grid h-20 w-20 place-items-center rounded-[1.8rem] bg-white text-3xl font-black text-slate-950"
              >
                P
              </motion.div>
            </motion.div>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
