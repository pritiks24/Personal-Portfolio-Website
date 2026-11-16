"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Compass, Copy, Globe, LockKeyhole, Search, SquareStack, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { answers, matchQuestion, type PortfolioAnswer } from "../../lib/portfolio-knowledge";
const suggestions=answers.map(a=>a.title);
function GoogleWordmark(){return <span className="google-wordmark" aria-label="Google">{[..."Google"].map((letter,i)=><span key={i} style={{color:["#4285f4","#ea4335","#fbbc05","#4285f4","#34a853","#ea4335"][i]}}>{letter}</span>)}</span>;}
export function GoogleSearchApp() {
 const [input,setInput]=useState("");
 const [question,setQuestion]=useState("");
 const [pending,setPending]=useState<string|null>(null);
 const reduce=useReducedMotion();
 const scroll=useRef<HTMLDivElement>(null);
 const [answer,setAnswer]=useState<PortfolioAnswer|null>(null);
 const [answerMode,setAnswerMode]=useState("prepared");
 const [searchError,setSearchError]=useState("");
 const resultsCache=useRef(new Map<string,{answer:PortfolioAnswer|null;mode:string}>());
 useEffect(()=>{
   if(!pending)return;
   const controller=new AbortController();
   let live=true;
   setInput("");setQuestion("");setAnswer(null);setSearchError("");
   let count=0;
   let finish:number|undefined;
   const typing=new Promise<void>(resolve=>{
     const type=()=>{count=reduce?pending.length:Math.min(pending.length,count+Math.max(1,Math.ceil(pending.length/10)));setInput(pending.slice(0,count));if(count>=pending.length)resolve();else finish=window.setTimeout(type,18);};
     type();
   });
   const response=fetch("/api/ask",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:pending}),signal:controller.signal}).then(async res=>{
     const data=await res.json();
     if(!res.ok)throw new Error(data.error||"Search is temporarily unavailable. Please try again or contact Pritika.");
     return data as {answer:PortfolioAnswer|null;mode:string};
   });
   void (async()=>{
     try{const [data]=await Promise.all([response,typing]);if(!live)return;setAnswer(data.answer);setAnswerMode(data.mode);if(resultsCache.current.size>=50)resultsCache.current.delete(resultsCache.current.keys().next().value!);resultsCache.current.set(pending.toLowerCase(),data);}
     catch(error){if(!live||controller.signal.aborted)return;setSearchError(error instanceof Error?error.message:"Search is temporarily unavailable. Please try again.");}
     if(live){setInput(pending);setQuestion(pending);setPending(null);scroll.current?.scrollTo({top:0});}
   })();
   return()=>{live=false;controller.abort();window.clearTimeout(finish);};
 },[pending,reduce]);
 const search=(q:string)=>{
   const value=q.trim().slice(0,300);if(!value)return;
   const prepared=matchQuestion(value);
   const cached=resultsCache.current.get(value.toLowerCase());
   if(prepared||cached){setPending(null);setInput(value);setQuestion(value);setAnswer(prepared||cached!.answer);setAnswerMode(prepared?"prepared":cached!.mode);setSearchError("");}
   else setPending(value);
   scroll.current?.scrollTo({top:0});
 };
 return <div className={`google-search-app ${question||pending?"google-has-query":""}`}>
 <div className="google-content phone-scroll" ref={scroll}>
 <header className="google-topline"><span>About Pritika</span><span className="google-avatar">PL</span></header>
 <div className="google-brand"><GoogleWordmark/>{!question&&!pending&&<p>A little search. A lot about me.</p>}</div>
 <form className="google-search-form" onSubmit={e=>{e.preventDefault();search(input);}}><Search size={18}/><input aria-label="Search questions about Pritika" placeholder="Ask about Pritika" value={input} disabled={!!pending} maxLength={300} onChange={e=>setInput(e.target.value)}/>{input&&!pending&&<button type="button" aria-label="Clear search" onClick={()=>setInput("")}><X size={16}/></button>}<button type="submit" disabled={!!pending} aria-label="Search"><ArrowUpRight size={18}/></button></form>
 {pending?<div className="google-searching" role="status"><div className="google-loading-line"/><span>Searching Pritika’s world…</span><div className="google-result-skeleton"><i/><i/><i/></div></div>:question?<motion.article className="google-results" initial={reduce?false:{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:.4}}><div className="google-result-tabs"><strong>All</strong><span>About Pritika</span></div><span className="google-answer-note">{searchError ? "Search unavailable" : answerMode === "gemini" ? "Gemini-assisted · verified portfolio facts" : "From my portfolio · prepared answer"}</span><div className="google-source"><span>P</span><div><strong>Pritika Lahiri</strong><small>Personal portfolio › About me</small></div></div><h3>{answer?.title||"A question for Pritika"}</h3><p>{searchError || answer?.answer||"I don’t have the answer to that at the moment, but feel free to contact Pritika Lahiri to know more."}</p><a href={answer?.link||"mailto:pritika2404@gmail.com"} target={answer?.link.startsWith("mailto:")?undefined:"_blank"} rel="noreferrer">{answer?.label||"Send me your question"}<ArrowUpRight size={14}/></a><h4>People also ask</h4><div className="google-question-list">{suggestions.filter(q=>q!==question).map(q=><button key={q} onClick={()=>search(q)}><span>{q}</span><ChevronRight size={16}/></button>)}</div></motion.article>:<div className="google-start-questions"><div className="google-questions-heading"><h4>What would you like to know?</h4><span>Pick a question to search</span></div><div className="google-question-list">{suggestions.map(q=><button key={q} onClick={()=>search(q)}><Search size={15}/><span>{q}</span><ArrowUpRight size={15}/></button>)}</div><p className="google-answer-note">Answers based on my portfolio. If a detail isn’t here, just ask me directly.</p></div>}
 </div><nav className="google-bottom"><button onClick={()=>{setPending(null);setQuestion("");setInput("");scroll.current?.scrollTo({top:0});}} aria-label="Google start page"><GoogleWordmark/><span>Home</span></button><button onClick={()=>{setPending(null);setQuestion("");scroll.current?.scrollTo({top:0});}}><Search size={21}/><span>Questions</span></button></nav>
 </div>;
}
