import type { AppId } from "./data";

const petals = ["#ffb62b", "#ff8a27", "#f25266", "#bc67b7", "#6e78c9", "#65b9df", "#60c48e", "#c4d94b"];
export function IPhoneIcon({ id }: { id: AppId }) {
  if (id === "projects") return <img className="iphone-app-art" src="/images/app-store-icon.png" alt="" aria-hidden="true" />;
  return <svg className="iphone-app-art" viewBox="0 0 64 64" aria-hidden="true">
    {id === "photos" && <><rect width="64" height="64" fill="#fff"/>{petals.map((fill,i)=><ellipse key={fill} cx="32" cy="20" rx="9" ry="15" fill={fill} fillOpacity=".83" transform={`rotate(${i*45} 32 32)`}/>)}<circle cx="32" cy="32" r="5" fill="#fac756"/></>}
    {id === "experience" && <><rect width="64" height="64" fill="#249cf1"/><circle cx="25" cy="24" r="12" fill="#ffdb42"/><path d="M21 46a10 10 0 1 1 0-20 13 13 0 0 1 24-1 10.5 10.5 0 1 1 2 21Z" fill="#fff"/></>}
    {id === "music" && <><rect width="64" height="64" fill="#fa355b"/><path d="M27 18v25c-7-2-13 1-13 6s9 6 13 2c2-2 2-5 2-8V26l18-4v16c-7-2-13 1-13 6s9 6 13 2c2-2 2-5 2-8V12Z" fill="white"/></>}
    {id === "notes" && <><rect width="64" height="64" fill="#fffdf5"/><path d="M0 0h64v20H0z" fill="#ffd448"/><path d="M0 22h64" stroke="#e4dfcf"/>{[32,40,48,56].map(y=><path key={y} d={`M8 ${y}h48`} stroke="#deded9" strokeWidth=".8"/>)}</>}
    {id === "contact" && <><rect width="64" height="64" fill="#188bf0"/><rect x="9" y="17" width="46" height="32" rx="3" fill="#fff"/><path d="m10 19 22 17 22-17M10 47l16-15m28 15L38 32" fill="none" stroke="#188bf0" strokeWidth="1.6"/></>}
    {id === "settings" && <><rect width="64" height="64" fill="#c4c6ca"/><circle cx="32" cy="32" r="25" fill="#81848a" stroke="#e8e9eb" strokeWidth="2"/>{Array.from({length:16},(_,i)=><path key={i} d="M29 8h6v10h-6z" fill="#d9dbde" transform={`rotate(${i*22.5} 32 32)`}/>)}<circle cx="32" cy="32" r="17" fill="#bfc1c6" stroke="#64686d" strokeWidth="2"/><circle cx="32" cy="32" r="10" fill="#6c7077" stroke="#e4e5e7" strokeWidth="2"/></>}
    {id === "resume" && <><rect width="64" height="64" fill="#fff"/><path d="M17 9h23l9 10v36H17z" fill="#f2f5f9" stroke="#c7d8ec"/><path d="M40 9v11h9" fill="#d7e8fa"/><path d="M23 27h19M23 34h19M23 41h19M23 48h13" stroke="#3284d9" strokeWidth="2.5" strokeLinecap="round"/></>}
    {id === "skills" && <><rect width="64" height="64" fill="#202229"/><path d="m24 20-12 12 12 12m16-24 12 12-12 12m-5-29-7 34" fill="none" stroke="#8fe4b8" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>}
    {id === "achievements" && <><rect width="64" height="64" fill="#fa8a20"/><path d="M31 22c-6-5-14-7-23-5v30c9-2 17 0 23 5zm2 0c6-5 14-7 23-5v30c-9-2-17 0-23 5z" fill="white"/></>}

  </svg>;
}
