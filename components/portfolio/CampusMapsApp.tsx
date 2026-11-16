"use client";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownLeft, ChevronLeft, ChevronRight, MapPin, MousePointer2, Plane, Search, X } from "lucide-react";
const visited=[
 {name:"Mexico",flag:"🇲🇽",center:"23.6,-102.5",color:"#fce4d6",ink:"#a55027"},
 {name:"USA",flag:"🇺🇸",center:"39.8,-98.6",color:"#dce9ff",ink:"#2a62a4"},
 {name:"France",flag:"🇫🇷",center:"46.6,2.2",color:"#e7dffa",ink:"#71529c"},
 {name:"Italy",flag:"🇮🇹",center:"42.8,12.6",color:"#d9eedf",ink:"#357747"},
 {name:"Belgium",flag:"🇧🇪",center:"50.5,4.5",color:"#faedbb",ink:"#907020"},
 {name:"Switzerland",flag:"🇨🇭",center:"46.8,8.2",color:"#f8dce1",ink:"#a74e64"},
 {name:"United Kingdom",flag:"🇬🇧",center:"54,-2",color:"#d8eced",ink:"#34767a"},
 {name:"Cuba",flag:"🇨🇺",center:"21.5,-79.4",color:"#e4ebd2",ink:"#6b7b31"},
];
const wishlist=[{name:"Hawaii",flag:"🌺",center:"20.8,-156.3",color:"#f8deec",ink:"#a44e83"},{name:"Dominican Republic",flag:"🇩🇴",center:"18.7,-70.2",color:"#d5edf6",ink:"#28718f"},{name:"Greece",flag:"🇬🇷",center:"39.1,22.9",color:"#e0e6ff",ink:"#5566ac"}];
const memories:Record<string,{text:string;photos:string[];motif:string}>={
 Mexico:{text:"My first all-inclusive! What a dream. I could have spent the whole trip in the water. It was so much fun.",photos:["/images/travel/postcards/mexico.jpeg"],motif:"☀️"},
 USA:{text:"I’ve been to a couple of states, but Disney World and Universal were definitely the highlights. I absolutely love roller coasters. The bigger, the better.",photos:["/images/travel/postcards/usa.jpeg"],motif:"🎢"},
 France:{text:"I’ve been learning French since Grade 1, so getting to speak it with people in France was so fun! Whether they understood anything I said is another question.",photos:["/images/travel/postcards/france.jpeg"],motif:"🥐"},
 Italy:{text:"The pasta, of course. A classic for a reason. And yes, I recreated the photo where you pretend to hold up the Leaning Tower of Pisa. Had to do it.",photos:["/images/travel/postcards/italy.jpeg","/images/travel/colosseum-night.JPG","/images/travel/venice-canal.jpeg"],motif:"🍝"},
 Belgium:{text:"The Belgian waffles! So yummy. That alone would convince me to go back.",photos:["/images/travel/postcards/belgium.jpeg"],motif:"🧇"},
 Switzerland:{text:"Probably my favourite country I’ve visited. The views were insane, and I loved the gondola rides. One of those places where I kept looking around thinking, how is this real?",photos:["/images/travel/postcards/switzerland.jpeg","/images/travel/jungfraujoch-flag.jpeg","/images/travel/mountain-train.JPG","/images/travel/snow-view.jpeg"],motif:"🏔️"},
 "United Kingdom":{text:"I went to the famous toy store and visited a couple of museums. A pretty lovely way to spend a trip.",photos:["/images/travel/postcards/united-kingdom.jpeg"],motif:"🧸"},
 Cuba:{text:"We drove around Cuba and visited lots of historical sites. Such a pretty place, with so much to take in along the way.",photos:["/images/travel/postcards/cuba.jpeg"],motif:"🚗"},
};
export function CampusMapsApp(){
 const [destination,setDestination]=useState(visited.find(p=>p.name==="Switzerland")!);
 const [postcard,setPostcard]=useState<string|null>(null);
 const [photo,setPhoto]=useState(0);
 const dialog=useRef<HTMLDivElement>(null);
 const [showGuide,setShowGuide]=useState(true);
 const reduce=useReducedMotion();
 useEffect(()=>{const timer=window.setTimeout(()=>setShowGuide(false),6500);return()=>window.clearTimeout(timer);},[]);
 useEffect(()=>{
   if(!postcard)return;
   const previous=document.activeElement as HTMLElement|null;
   dialog.current?.querySelector<HTMLButtonElement>("button")?.focus();
   const back=(event:Event)=>{event.preventDefault();setPostcard(null);};
   window.addEventListener("portfolio-app-back",back);
   return()=>{window.removeEventListener("portfolio-app-back",back);previous?.focus();};
 },[postcard]);
 const choose=(place:typeof destination)=>{setShowGuide(false);setDestination(place);setPhoto(0);setPostcard(memories[place.name]?place.name:null);};
 const memory=postcard?memories[postcard]:null;
 const place=visited.find(p=>p.name===postcard);

 return <div className="campus-maps travel-only-maps">
 <div className="travel-map-title"><Search size={17}/><span>{destination.name}</span><MapPin size={17}/></div>
 <iframe className="campus-map-embed" title={`Google Maps · ${destination.name}`} src={`https://maps.google.com/maps?ll=${destination.center}&t=m&z=5&output=embed`} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"/>
 <section className="campus-place-card"><span className="campus-sheet-handle"/>
 <p className="campus-label">MY LITTLE CORNER OF THE WORLD</p><h3>I love travelling.</h3><p className="campus-description">New places, little adventures, and memories I get to bring home. There’s always somewhere else I’m dreaming of going.</p>
 <div className="map-explore-prompt"><motion.span animate={reduce?{}:{x:[0,-3,0],y:[0,3,0]}} transition={{duration:1.5,repeat:showGuide?3:0}}><ArrowDownLeft size={17}/></motion.span><span>Tap a country to open a postcard.</span></div>
 <div className="map-travel-heading"><h4>Places I’ve been</h4><span>{visited.length} countries</span></div>
 <div className="map-destinations">{visited.map((p,i)=><button key={p.name} style={{"--place-color":p.color,"--place-ink":p.ink} as CSSProperties} aria-pressed={destination.name===p.name} onClick={()=>choose(p)} className={i===0&&showGuide&&!reduce?"country-demo-target":""}><span>{p.flag}</span>{p.name}{i===0&&showGuide&&!reduce&&<motion.span className="map-demo-pointer" aria-hidden="true" animate={{x:[8,0,0,8],y:[10,0,0,10],scale:[1,1,.8,1],opacity:[0,1,1,0]}} transition={{duration:1.8,repeat:2}}><MousePointer2 size={22} fill="#fff" stroke="#326ed1" strokeWidth={2}/></motion.span>}</button>)}</div>
 <div className="map-travel-heading"><h4>Next on my wishlist</h4><Plane size={14}/></div>
 <div className="map-destinations">{wishlist.map(p=><button key={p.name} style={{"--place-color":p.color,"--place-ink":p.ink} as CSSProperties} aria-pressed={destination.name===p.name} onClick={()=>choose(p)}><span>{p.flag}</span>{p.name}{p.name==="Greece"?"!!":""}</button>)}</div>
 </section>
 <AnimatePresence>{memory&&place&&<motion.div className="travel-postcard-overlay" role="dialog" aria-modal="true" aria-label={`Postcard from ${place.name}`} ref={dialog} initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onKeyDown={event=>{
   if(event.key==="Escape"){event.preventDefault();event.stopPropagation();setPostcard(null);}
   if(event.key==="Tab"){const buttons=dialog.current?.querySelectorAll<HTMLButtonElement>("button");if(!buttons?.length)return;const first=buttons[0],last=buttons[buttons.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
 }}><motion.article className="travel-postcard" initial={reduce?false:{y:50,rotate:3,scale:.95}} animate={{y:0,rotate:0,scale:1}} exit={reduce?{opacity:0}:{y:30,opacity:0}} transition={{type:"spring",stiffness:220,damping:25}}>
 <header><span>A POSTCARD FROM MY TRAVELS</span><button onClick={()=>setPostcard(null)} aria-label="Close postcard"><X size={18}/></button></header>
 <div className={`postcard-picture ${memory.photos.length ? "polaroid-photo" : ""}`} style={memory.photos.length ? undefined : {background:place.color,color:place.ink}}>
 {memory.photos.length?<><AnimatePresence mode="wait"><motion.img key={memory.photos[photo]} src={memory.photos[photo]} alt={`${place.name} travel photo ${photo+1}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/></AnimatePresence>{memory.photos.length>1&&<><button className="postcard-photo-prev" onClick={()=>setPhoto((photo-1+memory.photos.length)%memory.photos.length)} aria-label="Previous postcard photo"><ChevronLeft size={18}/></button><button className="postcard-photo-next" onClick={()=>setPhoto((photo+1)%memory.photos.length)} aria-label="Next postcard photo"><ChevronRight size={18}/></button><span className="postcard-photo-count">{photo+1} / {memory.photos.length}</span></>}</>:<div className="postcard-illustration"><span>{memory.motif}</span><small>GREETINGS FROM</small><strong>{place.name}</strong><svg viewBox="0 0 240 35" aria-hidden="true"><path d="M0 16q20-20 40 0t40 0t40 0t40 0t40 0t40 0M0 30q20-20 40 0t40 0t40 0t40 0t40 0t40 0" fill="none" stroke="currentColor" strokeOpacity=".2"/></svg></div>}
 {memory.photos.length>0&&<span className="polaroid-caption">{place.name}, with love.</span>}
 </div>
 <div className="postcard-letter"><div className="postcard-heading"><div><small>Wish you were here.</small><h3>{place.name}</h3></div><span className="postcard-stamp">{place.flag}<small>A MEMORY</small></span></div><p>{memory.text}</p><span className="postcard-signature">Love, Pritika</span></div>
 <footer><button disabled={visited.indexOf(place)===0} onClick={()=>choose(visited[visited.indexOf(place)-1])}><ChevronLeft size={15}/>Previous</button><span>{visited.indexOf(place)+1} of {visited.length} postcards</span><button disabled={visited.indexOf(place)===visited.length-1} onClick={()=>choose(visited[visited.indexOf(place)+1])}>Next<ChevronRight size={15}/></button></footer>
 </motion.article></motion.div>}</AnimatePresence>
 </div>;
}
