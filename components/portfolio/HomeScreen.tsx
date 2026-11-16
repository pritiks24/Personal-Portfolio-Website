"use client";

import { useState } from "react";
import { MessageCircle, ListTodo, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { AppIcon } from "./AppIcon";
import { apps, type AppId } from "./data";

type HomeScreenProps = {
  onOpen: (id: AppId) => void;
  animations: boolean;
  wallpaper: string;
};

export function HomeScreen({ onOpen, animations, wallpaper }: HomeScreenProps) {
  const [completed, setCompleted] = useState<string[]>(["Go for froyo"]);
  const reminders = ["Build something new", "Make time for music", "Go for froyo", "Connect with you :)"];
  const homeApps = apps.filter((app) => !app.dock);
  const dockApps = apps.filter((app) => app.dock);

  return (
    <div className="iphone-home absolute inset-0 overflow-hidden bg-[#273c80] px-[7cqw] pb-[5cqw] pt-[clamp(3.6rem,14cqw,4.35rem)] dark:bg-[#182447]">
      <div data-wallpaper={wallpaper} className="iphone-wallpaper" aria-hidden="true"><i/><i/><i/></div>
      <motion.div
        initial={animations ? { y: 10, opacity: 0 } : false}
        animate={{ y: 0, opacity: 1 }}
        className="home-connect-widget relative z-10"
      >
        <button type="button" className="iphone-widget connect-widget" onClick={() => onOpen("contact")} aria-label="Want to connect? Open Contact to message Pritika">
          <span className="connect-widget-icon" aria-hidden="true"><MessageCircle size={24} fill="currentColor" strokeWidth={0}/></span>
          <span className="connect-widget-copy"><strong>Want to connect?</strong><span>Message me. I’d love to talk!</span><span className="connect-widget-link">Say hello <span aria-hidden="true">↗</span></span></span>
        </button>
      </motion.div>

      <AnimatePresence>
        <motion.div
          initial={animations ? "hidden" : false}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.035, delayChildren: 0.14 } },
          }}
          className="home-app-grid relative z-10 grid grid-cols-4 gap-x-[clamp(0.55rem,4cqw,1.25rem)] gap-y-[clamp(1.05rem,7cqh,1.75rem)]"
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
          <motion.section className="reminders-widget" aria-label="A few reminders" variants={{hidden:{opacity:0,y:18},show:{opacity:1,y:0}}}>
            <header><span><ListTodo size={13}/>Reminders</span><strong>{reminders.length-completed.length}</strong></header>
            <div>{reminders.map(reminder => <button key={reminder} type="button" role="checkbox" aria-checked={completed.includes(reminder)} onClick={() => setCompleted(current => current.includes(reminder) ? current.filter(item => item !== reminder) : [...current,reminder])}><span className="reminder-check">{completed.includes(reminder) && <Check size={9} strokeWidth={3}/>}</span><span>{reminder}</span></button>)}</div>
          </motion.section>
        </motion.div>
      </AnimatePresence>

      <div className="iphone-page-dots" aria-hidden="true"><i/><i/></div>
      <div className="iphone-home-bar" aria-hidden="true"/>
      <div className="iphone-dock absolute inset-x-[clamp(0.75rem,5cqw,1.5rem)] bottom-[clamp(1rem,4cqh,1.25rem)] z-10 rounded-[2.2rem] bg-white/22 p-[clamp(0.55rem,2.8cqw,0.75rem)] shadow-[0_14px_45px_rgba(15,23,42,0.24)] backdrop-blur-2xl ring-1 ring-white/25">
        <div className={`home-dock-icons ${dockApps.length > 4 ? "dock-extra-app" : ""}`} style={{gridTemplateColumns:`repeat(${dockApps.length},minmax(0,1fr))`}}>
          {dockApps.map((app) => (
            <AppIcon key={app.id} app={app} onOpen={onOpen} animations={animations} />
          ))}
        </div>
      </div>
    </div>
  );
}
