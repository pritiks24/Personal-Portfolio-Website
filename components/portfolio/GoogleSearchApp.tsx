"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Compass, Copy, Globe, LockKeyhole, Search, SquareStack, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { projectData } from "./data";
const answers = [
 {title:"Who is Pritika?",terms:["who","about","introduce","yourself","pritika","study","school","waterloo","education"],answer:"I’m Pritika Lahiri, a Computer Science undergraduate at the University of Waterloo with an AI specialization. I like building creative products, exploring AI, and making room for basketball and music along the way.",link:"/resume.pdf",label:"Read my résumé"},
 {title:"What has she built?",terms:["project","projects","built","build","software","app","apps","portfolio"],answer:"My projects range from shared grocery shopping with BulkBridge to hands-free filming with AutoVlog, accessible lectures with Lingo Lift, and art discovery with ATLAS Blend. I’m especially proud of ATLAS Blend: it learns your taste in art and blends it with a friend’s to create something personal.",link:"https://devpost.com/software/atlas-blend",label:"Explore ATLAS Blend"},
 {title:"What experience does she have?",terms:["experience","work","intern","internship","td","cgi","career","job","coop","co-op"],answer:"At TD, I worked with the data engineering team and contributed to the front end of an internal application. My coworkers were the best part of the internship, and winning first place at the TD Builders AI Hackathon was a highlight. I’ve also worked on AI research, teaching, and campus initiatives.",link:"/resume.pdf",label:"See my résumé"},
 {title:"What does she do with AI?",terms:["ai","artificial","intelligence","research","machine","learning","berkeley","wat.ai","models"],answer:"I’ve researched multi-model reasoning for mathematical problem solving at UC Berkeley and contributed to WAT.ai’s work on semantic object state tracking. In my projects, I’m interested in AI that helps people do something useful or creative, from understanding lectures to discovering art.",link:"https://devpost.com/software/atlas-blend",label:"See an AI project"},
 {title:"What are her technical skills?",terms:["skills","technical","languages","language","code","coding","stack","python","typescript","react","programming"],answer:"My toolkit includes C, C++, Python, Java, TypeScript, and Racket. I build with React, Next.js, Node.js, and Tailwind, and my project stacks have also included Supabase, FastAPI, Prisma, and Gemini. I’m always adding to that list as a project calls for something new.",link:"https://github.com/pritiks24",label:"Visit my GitHub"},
 {title:"What does she do outside tech?",terms:["outside","hobbies","hobby","free","fun","interests","basketball","sports","soccer","tempo","ronaldo"],answer:"Basketball and music are big parts of my life. I also love watching sports live, whether it’s basketball or soccer, seeing my favourite artists in concert, and travelling. And I’m pretty much always down for a froyo run.",link:"https://www.youtube.com/channel/UCS6fmQv9bbeQYAYLQzMRlFQ",label:"Hear my music"},
 {title:"Does she make music?",terms:["music","musician","sing","singing","singer","piano","guitar","cover","covers","youtube","song","songs","concert","daniel"],answer:"Yes! I sing and play guitar and piano, and share covers on YouTube as Pritika 4 Musik. My covers include Somewhere Only We Know, All I Ask, Ceilings, and more. I love being on stage, but watching my favourite artists perform live is just as special.",link:"https://www.youtube.com/channel/UCS6fmQv9bbeQYAYLQzMRlFQ",label:"Watch my covers"},
 {title:"How can I contact her?",terms:["contact","email","connect","reach","message","hire","hiring","collaborate","collaboration","linkedin"],answer:"I’d love to hear from you, whether it’s about a project, an opportunity, or something we have in common. Email me at pritika2404@gmail.com, or connect with me on LinkedIn.",link:"mailto:pritika2404@gmail.com",label:"Send me an email"},
 {title:"Matcha or froyo?",terms:["matcha","froyo","food","sweet","dessert","favourite","favorite","drink","grass"],answer:"Both, obviously. I have a huge sweet tooth and am always up for froyo. And matcha does NOT taste like grass. I’m happy to defend that over a cup.",link:"mailto:pritika2404@gmail.com",label:"Invite me for matcha"},
];
function matchQuestion(question:string) {
 const tokens=new Set(question.toLowerCase().replace(/[^a-z0-9.+-]/g," ").split(/\s+/));
 const specific=projectData.find(p=>question.toLowerCase().replace(/\s/g,"").includes(p.title.toLowerCase().replace(/\s/g,"")));
 if(specific)return {title:specific.title,answer:specific.description,link:specific.links[0].href,label:"View project on Devpost"};
 const scored=answers.map(a=>({a,score:a.terms.reduce((sum,t)=>sum+(tokens.has(t)?(["who","about","introduce","yourself","pritika"].includes(t)?.1:1):0),0)})).sort((a,b)=>b.score-a.score);
 return scored[0].score?scored[0].a:null;
}
const suggestions=answers.map(a=>a.title);
function GoogleWordmark(){return <span className="google-wordmark" aria-label="Google">{[..."Google"].map((letter,i)=><span key={i} style={{color:["#4285f4","#ea4335","#fbbc05","#4285f4","#34a853","#ea4335"][i]}}>{letter}</span>)}</span>;}
export function GoogleSearchApp() {
 const [input,setInput]=useState("");
 const [question,setQuestion]=useState("");
 const [pending,setPending]=useState<string|null>(null);
 const reduce=useReducedMotion();
 const scroll=useRef<HTMLDivElement>(null);
 const answer=question?matchQuestion(question):null;
 useEffect(()=>{
   if(!pending)return;
   setInput("");setQuestion("");
   let count=0;
   let finish:number|undefined;
   const timer=window.setInterval(()=>{
     count=reduce?pending.length:count+1;
     setInput(pending.slice(0,count));
     if(count>=pending.length){window.clearInterval(timer);finish=window.setTimeout(()=>{setQuestion(pending);setPending(null);scroll.current?.scrollTo({top:0});},reduce?0:380);}
   },reduce?1:26);
   return()=>{window.clearInterval(timer);window.clearTimeout(finish);};
 },[pending,reduce]);
 const search=(q:string)=>{const value=q.trim().slice(0,300);if(value){setPending(value);scroll.current?.scrollTo({top:0});}};
 return <div className={`google-search-app ${question||pending?"google-has-query":""}`}>
 <div className="google-content phone-scroll" ref={scroll}>
 <header className="google-topline"><span>About Pritika</span><span className="google-avatar">PL</span></header>
 <div className="google-brand"><GoogleWordmark/>{!question&&!pending&&<p>A little search. A lot about me.</p>}</div>
 <form className="google-search-form" onSubmit={e=>{e.preventDefault();search(input);}}><Search size={18}/><input aria-label="Search questions about Pritika" placeholder="Ask about Pritika" value={input} disabled={!!pending} maxLength={300} onChange={e=>setInput(e.target.value)}/>{input&&!pending&&<button type="button" aria-label="Clear search" onClick={()=>setInput("")}><X size={16}/></button>}<button type="submit" disabled={!!pending} aria-label="Search"><ArrowUpRight size={18}/></button></form>
 {pending?<div className="google-searching" role="status"><div className="google-loading-line"/><span>Searching Pritika’s world…</span><div className="google-result-skeleton"><i/><i/><i/></div></div>:question?<motion.article className="google-results" initial={reduce?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.4}}><div className="google-result-tabs"><strong>All</strong><span>About Pritika</span></div><span className="google-answer-note">From my portfolio · prepared answer</span><div className="google-source"><span>P</span><div><strong>Pritika Lahiri</strong><small>Personal portfolio › About me</small></div></div><h3>{answer?.title||"A question for Pritika"}</h3><p>{answer?.answer||"I haven’t written an answer to this one yet. Try a question about my projects, experience, skills, music, or interests, or ask me directly."}</p><a href={answer?.link||"mailto:pritika2404@gmail.com"} target={answer?.link.startsWith("mailto:")?undefined:"_blank"} rel="noreferrer">{answer?.label||"Send me your question"}<ArrowUpRight size={14}/></a><h4>People also ask</h4><div className="google-question-list">{suggestions.filter(q=>q!==question).map(q=><button key={q} onClick={()=>search(q)}><span>{q}</span><ChevronRight size={16}/></button>)}</div></motion.article>:<div className="google-start-questions"><div className="google-questions-heading"><h4>What would you like to know?</h4><span>Pick a question to search</span></div><div className="google-question-list">{suggestions.map(q=><button key={q} onClick={()=>search(q)}><Search size={15}/><span>{q}</span><ArrowUpRight size={15}/></button>)}</div><p className="google-answer-note">Prepared answers. No AI, no limits. Just a little about me.</p></div>}
 </div><nav className="google-bottom"><button onClick={()=>{setPending(null);setQuestion("");setInput("");scroll.current?.scrollTo({top:0});}} aria-label="Google start page"><GoogleWordmark/><span>Home</span></button><button onClick={()=>{setPending(null);setQuestion("");scroll.current?.scrollTo({top:0});}}><Search size={21}/><span>Questions</span></button></nav>
 </div>;
}
