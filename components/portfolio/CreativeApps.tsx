"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Headphones, Music2, Play, Search, Trophy, X } from "lucide-react";
type Cover = {title:string;videoId:string;url:string;label:string};
export function MusicLibrary({covers}:{covers:Cover[]}) {
 const [selected,setSelected]=useState<Cover|null>(null);
 const [query,setQuery]=useState("");
 const [searching,setSearching]=useState(false);
 const filtered=covers.filter(c=>c.title.toLowerCase().includes(query.toLowerCase()));
 return <div className="apple-music"><div className="music-scroll-pane phone-scroll"><div className="music-heading"><h3>Listen Now</h3><span>PL</span></div><p className="music-byline">PRITIKA 4 MUSIK · THE COVER COLLECTION</p>
 <div className="music-featured">{covers.slice(0,3).map((c,i)=><button key={c.videoId} onClick={()=>setSelected(c)}><small>{i===0?"SPOTLIGHT":"FROM MY COLLECTION"}</small><strong>{c.title}</strong><div><img src={`https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`} alt={c.title}/><span><Play size={22} fill="currentColor"/></span></div><p>Pritika Lahiri · {c.label}</p></button>)}</div>
 <div className="music-section-heading"><h4>All Covers <ChevronRight size={18}/></h4><span>{covers.length} songs</span></div>
 {searching&&<input className="music-search" autoFocus placeholder="Find a cover" aria-label="Find a cover" value={query} onChange={e=>setQuery(e.target.value)}/>}
 <div className="music-tracklist">{filtered.map((c,i)=><button key={c.videoId} onClick={()=>setSelected(c)}><img src={`https://i.ytimg.com/vi/${c.videoId}/hqdefault.jpg`} alt=""/><div><strong>{c.title}</strong><span>Pritika Lahiri · {c.label}</span></div><Play size={15}/></button>)}</div>
 {!filtered.length&&<p className="music-byline">No covers found.</p>}
 <a className="music-channel" href="https://www.youtube.com/channel/UCS6fmQv9bbeQYAYLQzMRlFQ" target="_blank" rel="noreferrer">Explore my YouTube channel <ArrowUpRight size={15}/></a>
 </div>
 <div className="music-bottom"><button className="music-mini-player" onClick={()=>setSelected(selected||covers[0])}><img src={`https://i.ytimg.com/vi/${(selected||covers[0]).videoId}/hqdefault.jpg`} alt=""/><span>{(selected||covers[0]).title}</span><Play size={20} fill="currentColor"/></button><nav><button onClick={()=>{setSearching(false);setQuery("");}}><Headphones size={20}/>Listen Now</button><button onClick={()=>{setSearching(false);setQuery("");}}><Music2 size={20}/>Library</button><button onClick={()=>setSearching(!searching)}><Search size={20}/>Search</button></nav></div>
 <AnimatePresence>{selected&&<motion.div className="music-player" initial={{y:"100%"}} animate={{y:0}} exit={{y:"100%"}} transition={{type:"spring",damping:30,stiffness:260}}><button className="player-close" onClick={()=>setSelected(null)} aria-label="Close music player"><X size={22}/></button><p>PRITIKA 4 MUSIK</p><div className="youtube-player"><iframe key={selected.videoId} title={`${selected.title} · Pritika's cover`} src={`https://www.youtube-nocookie.com/embed/${selected.videoId}?autoplay=1`} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/></div><h4>{selected.title}</h4><span>Pritika Lahiri · {selected.label}</span><div className="player-controls"><button aria-label="Previous cover" onClick={()=>setSelected(covers[(covers.indexOf(selected)-1+covers.length)%covers.length])}><ChevronLeft size={30}/></button><a href={selected.url} target="_blank" rel="noreferrer">Watch on YouTube ↗</a><button aria-label="Next cover" onClick={()=>setSelected(covers[(covers.indexOf(selected)+1)%covers.length])}><ChevronRight size={30}/></button></div></motion.div>}</AnimatePresence>
 </div>;
}

type Win={title:string;detail:string;category:string};
export function AchievementBooks({wins}:{wins:Win[]}) {
 const [index,setIndex]=useState(0);
 const [turn,setTurn]=useState<{from:number;to:number;direction:number}|null>(null);
 const reduce=useReducedMotion();
 const turning=useRef(false);
 const move=(direction:number)=>{
   const next=index+direction;
   if(turning.current||next<0||next>=wins.length)return;
   if(reduce){setIndex(next);return;}
   turning.current=true;
   setTurn({from:index,to:next,direction});
 };
 const win=wins[index];
 const titlePage=(award:Win,page:number)=><><span className="award-running-head">PRITIKA LAHIRI</span><div className="award-title-content"><span className="award-chapter">CHAPTER {String(page+1).padStart(2,"0")}</span><Trophy size={30} strokeWidth={1}/><h4>{award.title}</h4><span className="award-category">{award.category}</span></div><span className="award-page-number">{page*2+1}</span></>;
 const detailPage=(award:Win,page:number)=><><span className="award-running-head">A LITTLE BOOK OF MILESTONES</span><div className="award-detail-content"><span className="award-ornament">✦</span><p>{award.detail}</p><span className="award-detail-rule"/></div><span className="award-page-number">{page*2+2}</span></>;
 return <div className="award-reader">
  <div className="award-reader-heading"><BookOpen size={18}/><span>THE ACHIEVEMENT JOURNAL</span><small>{index+1} / {wins.length}</small></div>
  <h3>A few chapters<br/><em>I’m proud of.</em></h3>
  <motion.div className="award-open-book" role="region" aria-label="Award book. Use left and right arrow keys to turn pages." tabIndex={0} onKeyDown={e=>{if(e.key==="ArrowRight"){e.preventDefault();move(1);}if(e.key==="ArrowLeft"){e.preventDefault();move(-1);}}} onPanEnd={(_,info)=>{if(info.offset.x < -35)move(1);else if(info.offset.x >35)move(-1);}}>
    <div className="award-book-board"/>
    <div className="award-book-spread" aria-live="polite" aria-atomic="true">
      <div className="award-paper award-left">{titlePage(win,index)}</div>
      <div className="award-paper award-right">{detailPage(win,index)}</div>
    </div>
    <div className="award-book-binding" aria-hidden="true"/>
    {turn&&<div aria-hidden="true" className={`award-turn-underlay ${turn.direction===1?"underlay-right":"underlay-left"}`} />}
    {turn&&<motion.div key={`${turn.from}-${turn.to}`} aria-hidden="true" className={`award-turning-sheet ${turn.direction===1?"turn-forward":"turn-back"}`} initial={{rotateY:0}} animate={{rotateY:turn.direction===1?-180:180}} transition={{duration:.75,ease:[.32,0,.18,1]}} onAnimationComplete={()=>{setIndex(turn.to);setTurn(null);turning.current=false;}}>
       <div className="award-sheet-front award-paper">{turn.direction===1?detailPage(wins[turn.from],turn.from):titlePage(wins[turn.from],turn.from)}</div>
       <div className="award-sheet-back award-paper"><span className="award-blank-page-mark">✦</span></div>
    </motion.div>}
  </motion.div>
  <div className="award-reader-controls"><button onClick={()=>move(-1)} disabled={index===0||!!turn} aria-label="Previous award page"><ChevronLeft size={20}/></button><span>{turn?"Turning the page…":"Swipe to turn the page"}</span><button onClick={()=>move(1)} disabled={index===wins.length-1||!!turn} aria-label="Next award page"><ChevronRight size={20}/></button></div>
  <div className="award-book-progress" aria-label={`Chapter ${index+1} of ${wins.length}`}>{wins.map((w,i)=><span key={w.title} className={i===index?"current":""}/>)}</div>
  <p className="award-reader-footer">Math, music, and the moments along the way.</p>
 </div>;
}
