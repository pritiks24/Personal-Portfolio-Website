"use client";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Cloud, CloudSun, Code2, FlaskConical, GraduationCap, MapPin, Sun, Wind } from "lucide-react";
import { experienceData } from "./data";
const conditions = ["Building in finance", "Exploring intelligence", "Bringing people together", "Research in motion", "Helping ideas click"];
const fields = ["Software development", "AI research", "Community & events", "AI research", "Education"];
function WeatherSymbol({variant,small=false}:{variant:number;small?:boolean}) {
 return <svg className={small?"weather-symbol-small":"weather-symbol"} viewBox="0 0 120 110" fill="none" aria-hidden="true">
 {variant===0&&<><g stroke="#edb846" strokeWidth="5" strokeLinecap="round">{Array.from({length:8},(_,i)=><path key={i} d="M60 9v10" transform={`rotate(${i*45} 60 55)`}/>)}</g><circle cx="60" cy="55" r="25" fill="#f8ca58"/><circle cx="60" cy="55" r="19" fill="#ffdb7a"/></>}
 {variant===1&&<><circle cx="76" cy="35" r="26" fill="#f6cf68"/><path d="M24 84a18 18 0 1 1 2-36 24 24 0 0 1 45-7 21 21 0 1 1 15 43Z" fill="#fff"/><path d="M33 84h53a21 21 0 0 0 20-15H18a18 18 0 0 0 15 15" fill="#e5f0f7"/></>}
 {variant===2&&<><path d="M14 35h67c27 0 25-28 8-28-9 0-15 6-15 13M9 56h91M22 77h51c25 0 25 25 8 25-8 0-13-5-13-11" stroke="#f9fdff" strokeWidth="10" strokeLinecap="round"/><path d="M21 56h79" stroke="#a6c7db" strokeWidth="5" strokeLinecap="round"/></>}
 {variant===3&&<><path d="M79 13a39 39 0 1 0 25 57A35 35 0 0 1 79 13Z" fill="#e5edff"/><path d="m88 11 3 8 8 3-8 3-3 8-3-8-8-3 8-3Zm16 30 2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" fill="#f7d078"/><circle cx="43" cy="47" r="4" fill="#c1d2ed"/></>}
 {variant===4&&<><path d="M15 85V65a45 45 0 0 1 90 0v20" stroke="#eaa993" strokeWidth="13"/><path d="M29 85V65a31 31 0 0 1 62 0v20" stroke="#f8d781" strokeWidth="13"/><path d="M43 85V65a17 17 0 0 1 34 0v20" stroke="#8ebba8" strokeWidth="13"/><path d="M10 88h30m40 0h30" stroke="#f7fbff" strokeWidth="18" strokeLinecap="round"/></>}
 </svg>;
}
export function WeatherExperience() {
 const [active,setActive]=useState(0);
 const reduce=useReducedMotion();
 const role=experienceData[active];
 return <div className="weather-experience">
   <div className="weather-location"><MapPin size={13}/> My career forecast <span>EXPERIENCE</span></div>
   <div className="weather-hero"><AnimatePresence mode="wait"><motion.div key={active} initial={reduce?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-8}} transition={{duration:.22}}><p>{role.org}</p><h3>{role.date.match(/\d{4}/)?.[0]}</h3><h4>{role.role}</h4><span>{conditions[active]}</span></motion.div></AnimatePresence>
   <div className="weather-art" aria-hidden="true"><AnimatePresence mode="wait"><motion.div key={active} initial={reduce?false:{opacity:0,scale:.7,rotate:-12}} animate={{opacity:1,scale:1,rotate:0}} exit={{opacity:0,scale:.8,rotate:12}} transition={{duration:.35,ease:[.22,1,.36,1]}}><WeatherSymbol variant={active}/></motion.div></AnimatePresence></div></div>
   <section className="forecast-summary"><div><WeatherSymbol variant={active} small/><span>ROLE OVERVIEW</span><ArrowUpRight size={15}/></div><AnimatePresence mode="wait"><motion.p key={active} initial={{opacity:0}} animate={{opacity:1}}>{role.description}</motion.p></AnimatePresence></section>
   <div className="weather-metrics"><div><Code2 size={17}/><small>FOCUS</small><strong>{fields[active]}</strong></div><div><Wind size={17}/><small>SEASON</small><strong>{role.date}</strong></div></div>
   <section className="career-forecast"><h4><CloudSun size={15}/> The journey so far</h4>{experienceData.map((r,i)=>{return <motion.button key={r.org} whileTap={{scale:.98}} aria-pressed={active===i} onClick={()=>setActive(i)}><span className="forecast-year">{r.date.match(/\d{4}/)?.[0]}</span><WeatherSymbol variant={i} small/><span><strong>{r.org}</strong><small>{r.role}</small></span><ArrowUpRight size={15}/></motion.button>})}</section>
   <p className="weather-footer">A forecast shaped by curiosity.</p>
 </div>;
}
