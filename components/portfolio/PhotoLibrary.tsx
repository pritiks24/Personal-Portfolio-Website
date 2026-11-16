"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Grid2X2, Images, Search, X } from "lucide-react";
type Photo = { src: string; title: string; caption: string; position?: string };
type Album = { name: string; photos: Photo[] };
export function PhotoLibrary({ albums }: { albums: Album[] }) {
  const [tab, setTab] = useState("Library");
  const [album, setAlbum] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const all = albums.flatMap(a => a.photos.map(p => ({ ...p, album: a.name })));
  const photos = all.filter(p => (!album || p.album === album) && `${p.title} ${p.caption} ${p.album}`.toLowerCase().includes(query.toLowerCase()));
  const photo = selected === null ? null : photos[selected];
  useEffect(() => {
    const back = (e: Event) => { if (selected !== null || album) { e.preventDefault(); selected !== null ? setSelected(null) : setAlbum(null); } };
    const keys = (e: KeyboardEvent) => { if (selected === null) return; if (e.key === "ArrowRight") setSelected((selected + 1) % photos.length); if (e.key === "ArrowLeft") setSelected((selected - 1 + photos.length) % photos.length); };
    window.addEventListener("portfolio-app-back", back); window.addEventListener("keydown", keys);
    return () => { window.removeEventListener("portfolio-app-back", back); window.removeEventListener("keydown", keys); };
  }, [selected, album, photos.length]);
  return <div className="ios-photos">
    <div className="photos-scroll-pane phone-scroll">
    <div className="photos-title"><div><p>MY LIFE, IN LITTLE MOMENTS</p><h3>{album || tab}</h3><span>{photos.length} photos</span></div><button className="photos-avatar" onClick={() => { setTab("Collections"); setAlbum(null); }} aria-label="View collections">PL</button></div>
    {searching && <input autoFocus className="photo-search" aria-label="Search photos" placeholder="Search basketball, travel…" value={query} onChange={e => { setQuery(e.target.value); setAlbum(null); setTab("Library"); }} />}
    {tab === "Collections" && !album ? <>
      <h4 className="photos-section-label">Memories <ChevronRight size={17}/></h4>
      <div className="memories-strip">{albums.map((a, i) => <motion.button whileTap={{ scale: .97 }} key={a.name} className="memory-tile" onClick={() => setAlbum(a.name)}><img src={a.photos[Math.min(1,a.photos.length-1)].src} alt={a.name} /><span><small>{{ "Life at TD": "THE PEOPLE & THE WINS", "Live & Loud": "BETTER IN PERSON", "Little Favourites": "THE LITTLE JOYS", Basketball: "ON THE COURT", Music: "FINDING MY RHYTHM", Travel: "SOMEWHERE NEW", Projects: "MADE WITH FRIENDS" }[a.name]}</small><strong>{a.name}</strong></span></motion.button>)}</div>
      <h4 className="photos-section-label">Albums <ChevronRight size={17}/></h4>
      <div className="ios-albums">{albums.map(a => <button key={a.name} onClick={() => setAlbum(a.name)}><img src={a.photos[0].src} alt={a.name}/><strong>{a.name}</strong><span>{a.photos.length}</span></button>)}</div>
    </> : <>
      {album && <button className="album-back" onClick={() => setAlbum(null)}><ChevronLeft size={15}/> All collections</button>}
      <div className="ios-photo-grid">{photos.map((p, i) => <motion.button key={p.src} initial={reduce ? false : {opacity:0}} animate={{opacity:1}} transition={{delay:Math.min(i*.025,.3)}} whileTap={{scale:.96}} onClick={() => setSelected(i)} aria-label={`Open ${p.title}`}><img loading="lazy" src={p.src} alt={p.title} style={{objectPosition:p.position}}/></motion.button>)}</div>
      {!photos.length && <p className="photos-empty">No moments found. Try another search.</p>}
    </>}
    </div>
    <nav className="photos-tabbar" aria-label="Photo views">{[{name:"Library",icon:Images},{name:"Collections",icon:Grid2X2}].map(({name,icon:Icon}) => <button key={name} aria-pressed={tab===name} onClick={() => {setTab(name);setAlbum(null);setQuery("");}}><Icon size={20}/>{name}</button>)}<button aria-label="Search photos" aria-pressed={searching} onClick={() => setSearching(!searching)}><Search size={21}/></button></nav>
    <AnimatePresence>{photo && <motion.div role="dialog" aria-modal="true" aria-label={photo.title} className="ios-photo-viewer" initial={{opacity:0,y:reduce?0:30}} animate={{opacity:1,y:0}} exit={{opacity:0}}><header><div><strong>{photo.album}</strong><small>{selected!+1} of {photos.length}</small></div><button onClick={() => setSelected(null)} aria-label="Close photo"><X size={20}/></button></header><div className="photo-fullscreen"><AnimatePresence mode="wait"><motion.img key={photo.src} src={photo.src} alt={photo.title} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/></AnimatePresence><button aria-label="Previous photo" onClick={() => setSelected((selected!-1+photos.length)%photos.length)}><ChevronLeft/></button><button aria-label="Next photo" onClick={() => setSelected((selected!+1)%photos.length)}><ChevronRight/></button></div><div className="photo-description"><strong>{photo.title}</strong><p>{photo.caption}</p></div><div className="photo-filmstrip">{photos.map((p,i)=><button key={p.src} aria-label={`Show ${p.title}`} aria-pressed={i===selected} onClick={()=>setSelected(i)}><img src={p.src} alt=""/></button>)}</div></motion.div>}</AnimatePresence>
  </div>;
}
