"use client";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Code2, Compass, Grid2X2, Leaf, MessageCircle, Palette, Search, ShoppingBasket, Video } from "lucide-react";
import { projectData } from "./data";
const artwork = [
 {color:"#eee5d3",ink:"#6c5840",icon:Palette,tag:"Art, made personal.",subtitle:"Your taste. Your friends. Your gallery."},
 {color:"#dae9da",ink:"#39734a",icon:ShoppingBasket,tag:"Good things, shared.",subtitle:"A smarter way to shop together."},
 {color:"#dce5f5",ink:"#3c6297",icon:Video,tag:"Stay in the moment.",subtitle:"Let your camera follow along."},
 {color:"#e4edcc",ink:"#587033",icon:Leaf,tag:"Small prompts. Big impact.",subtitle:"Make everyday AI a little greener."},
 {color:"#f5ded5",ink:"#a75d43",icon:Compass,tag:"Know what’s on your plate.",subtitle:"Turn receipts into health insights."},
 {color:"#e4dcf3",ink:"#7a58a1",icon:MessageCircle,tag:"Learning, without barriers.",subtitle:"Make every lecture more accessible."},
];
const projectDemos: Record<string, { embed: string; watch: string; platform: string }> = {
  "ATLAS Blend": { embed: "https://www.youtube-nocookie.com/embed/gX9ZpMqreFs", watch: "https://www.youtube.com/watch?v=gX9ZpMqreFs", platform: "YouTube" },
  BulkBridge: { embed: "https://www.youtube-nocookie.com/embed/-xoCPqTsdfI", watch: "https://www.youtube.com/watch?v=-xoCPqTsdfI", platform: "YouTube" },
  AutoVlog: { embed: "https://www.youtube-nocookie.com/embed/fpFWbVz6vsU", watch: "https://www.youtube.com/watch?v=fpFWbVz6vsU", platform: "YouTube" },
  GreenPrompts: { embed: "https://www.youtube-nocookie.com/embed/H5NlX8XHuoA", watch: "https://www.youtube.com/watch?v=H5NlX8XHuoA", platform: "YouTube" },
  "Lingo Lift": { embed: "https://drive.google.com/file/d/1fB13n2K49aCxcYGzh32ffx3VXGWAWVMn/preview", watch: "https://drive.google.com/file/d/1fB13n2K49aCxcYGzh32ffx3VXGWAWVMn/view", platform: "Google Drive" },
};
export function ProjectStore() {
 const [tab,setTab]=useState("Today");
 const [query,setQuery]=useState("");
 const [category,setCategory]=useState("All");
 const [selected,setSelected]=useState<number|null>(null);
 const reduce=useReducedMotion();
 const scroller=useRef<HTMLDivElement>(null);
 const show=(index:number)=>{setSelected(index);scroller.current?.scrollTo({top:0});};
 const back=()=>{setSelected(null);scroller.current?.scrollTo({top:0});};
 useEffect(()=>{const handler=(event:Event)=>{if(selected!==null){event.preventDefault();back();}};window.addEventListener("portfolio-app-back",handler);return()=>window.removeEventListener("portfolio-app-back",handler);},[selected]);
 const icon=(i:number,large=false)=>{const Icon=artwork[i].icon;return <span className={`store-project-icon ${large?"large":""}`} style={{background:artwork[i].color,color:artwork[i].ink}}><Icon strokeWidth={1.7}/></span>;};
 const open=(i:number)=><a className="store-open" href={projectData[i].links.find(l=>l.label==="Devpost")!.href} target="_blank" rel="noreferrer" aria-label={`Open ${projectData[i].title} on Devpost`}>OPEN</a>;
 const project=selected===null?null:projectData[selected];
 const demo=project ? projectDemos[project.title] : undefined;
 const list=projectData.map((p,i)=>({p,i})).filter(({p})=>(category==="All"||p.category===category)&&`${p.title} ${p.description} ${p.stack.join(" ")}`.toLowerCase().includes(query.toLowerCase()));
 return <div className="project-store"><div className="store-scroll phone-scroll" ref={scroller}>
 <AnimatePresence mode="wait"><motion.div key={selected===null?tab:selected} initial={reduce?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0}} transition={{duration:.18}}>
 {project&&selected!==null?<>
 <button className="store-back" onClick={back}><ChevronLeft size={18}/>Projects</button>
 <div className="store-detail-hero">{icon(selected,true)}<div><h3>{project.title}</h3><p>{artwork[selected].subtitle}</p>{open(selected)}</div></div>
 <div className="store-facts"><div><small>CATEGORY</small><strong>{project.category}</strong></div><div><small>CREATOR</small><strong>Pritika & team</strong></div><div><small>BUILT WITH</small><strong>{project.stack[0]}</strong></div></div>
 {demo?<section className="store-demo"><div className="store-section-title"><h4>See it in action</h4><span>PROJECT DEMO</span></div><iframe key={demo.embed} loading="lazy" title={`${project.title} project demo`} src={demo.embed} allow="encrypted-media; picture-in-picture" allowFullScreen/>{selected===0&&<p>One of my favourites. I’m really proud of this one.</p>}<a href={demo.watch} target="_blank" rel="noreferrer">Watch on {demo.platform} <ArrowUpRight size={13}/></a></section>:<div className="store-detail-art" style={{background:artwork[selected].color,color:artwork[selected].ink}}>{icon(selected,true)}<h4>{artwork[selected].tag}</h4></div>}
 <section className="store-about"><h4>About this project</h4><p>{project.description}</p></section>
 <section className="store-about"><h4>Built with</h4><div className="store-stack">{project.stack.map(t=><span key={t}>{t}</span>)}</div></section>
 <div className="store-developer"><Code2 size={23}/><div><strong>Pritika Lahiri & team</strong><span>Project creators</span></div><a href={project.links[0].href} target="_blank" rel="noreferrer" aria-label="View project story on Devpost"><ArrowUpRight size={20}/></a></div>
 <h4 className="store-more-heading">More to explore</h4><div className="store-related">{projectData.map((p,i)=>i!==selected&&<button key={p.title} onClick={()=>show(i)}>{icon(i)}<strong>{p.title}</strong><small>{p.category}</small></button>)}</div>
 </>:<>
 <header className="store-heading"><div><p>BUILT WITH CURIOSITY</p><h3>{tab==="Today"?"Today":tab==="Search"?"Search":"Apps"}</h3></div><span>PL</span></header>
 <div className="store-browse-hint"><ChevronRight size={19}/><span><strong>Tap a project to explore</strong><small>See its demo and story here. OPEN takes you to Devpost.</small></span></div>
 {tab==="Today"?<>
 <button className="store-feature" onClick={()=>show(0)}><span className="store-editorial-label">ONE OF MY FAVOURITES</span><h4>Art is better<br/>when it’s shared.</h4><div className="store-atlas-art"><span/><span/><span/><Palette size={44} strokeWidth={1}/></div><div className="store-feature-footer">{icon(0)}<div><strong>ATLAS Blend</strong><small>Discover your taste in art</small></div><span className="store-feature-view">View <ChevronRight size={14}/></span></div></button>
 <div className="store-section-title"><h4>Made to make a difference</h4><ChevronRight size={18}/></div>
 </>:<>
 {tab==="Search"&&<input autoFocus className="store-search" aria-label="Search projects" placeholder="Projects, tools, ideas…" value={query} onChange={e=>setQuery(e.target.value)}/>}
 <div className="store-categories">{["All",...new Set(projectData.map(p=>p.category))].map(c=><button key={c} aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}</button>)}</div>
 </>}
 <div className="store-list">{list.map(({p,i})=><article key={p.title}><button onClick={()=>show(i)} className="store-row-info">{icon(i)}<div><h4>{p.title}</h4><span>{p.category}</span><small className="store-row-detail-link">View demo & details</small></div><ChevronRight className="store-row-chevron" size={17}/></button><div>{open(i)}<small>Devpost</small></div></article>)}</div>
 {!list.length&&<p className="store-empty">No projects found. Try a different search.</p>}
 </>}
 </motion.div></AnimatePresence>
 </div><nav className="store-tabbar" aria-label="Project store navigation">{[{name:"Today",icon:Compass},{name:"Apps",icon:Grid2X2},{name:"Search",icon:Search}].map(({name,icon:Icon})=><button key={name} aria-pressed={tab===name} onClick={()=>{setSelected(null);setTab(name);setQuery("");setCategory("All");scroller.current?.scrollTo({top:0});}}><Icon size={21}/>{name}</button>)}</nav></div>;
}
