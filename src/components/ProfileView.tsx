import React, { useEffect, useState } from 'react';
import { UserRound, Mail, Crown, Clock3, MessageCircle, Users, ShieldCheck, Pencil, Check, Music2 } from 'lucide-react';
const CHANNEL_URL = '';
const GROUP_URL = '';
const OWNER_URL = '';
export const ProfileView: React.FC = () => {
  const [name,setName] = useState(() => localStorage.getItem('zxh-profile-name') || 'ZXH Music Listener');
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState(name);
  const email = localStorage.getItem('zxh-user-email') || 'Guest account';
  const [remaining,setRemaining] = useState(900);
  useEffect(() => {
    const key='zxh-free-trial-start'; let start=Number(localStorage.getItem(key));
    if(!start){start=Date.now();localStorage.setItem(key,String(start));}
    const tick=()=>setRemaining(Math.max(0,900-Math.floor((Date.now()-start)/1000)));
    tick(); const id=window.setInterval(tick,1000); return ()=>window.clearInterval(id);
  },[]);
  const timer=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');
  const links=[
    {label:'WhatsApp Channel',detail:'News, updates and music drops',Icon:MessageCircle,url:CHANNEL_URL},
    {label:'WhatsApp Group',detail:'Join the ZXH community',Icon:Users,url:GROUP_URL},
    {label:'Owner Contact',detail:'ZULQARNAIN X HAIDER',Icon:ShieldCheck,url:OWNER_URL},
  ];
  const saveName=()=>{const n=draft.trim()||'ZXH Music Listener';setName(n);localStorage.setItem('zxh-profile-name',n);setEditing(false);};
  return <section className="mx-auto w-full max-w-6xl px-4 sm:px-8 py-8 sm:py-12 pb-28">
    <div className="mb-7 sm:mb-9"><span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/75 px-4 py-2 text-xs font-extrabold tracking-[.18em] text-blue-700 shadow-sm"><Music2 size={14}/> ZXH MUSIC STUDIO</span><h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-slate-900">My Profile</h1><p className="mt-2 text-sm sm:text-base text-slate-600">Your account, membership and ZXH community.</p></div>
    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-5 sm:gap-6 items-start">
      <div className="rounded-[30px] sm:rounded-[36px] border border-white bg-white/80 backdrop-blur-xl p-5 sm:p-8 shadow-[0_24px_70px_-35px_rgba(37,99,235,.32)]">
        <div className="flex items-center gap-4 min-w-0"><div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-[24px] bg-gradient-to-br from-blue-500 to-cyan-400 text-white flex items-center justify-center shadow-lg shadow-blue-500/20"><UserRound size={34}/></div><div className="min-w-0 flex-1"><p className="text-[11px] font-extrabold tracking-[.18em] uppercase text-blue-600">Listener profile</p>{editing?<input value={draft} onChange={e=>setDraft(e.target.value)} aria-label="Profile name" className="mt-1 w-full max-w-xs rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-base font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-300"/>:<h2 className="mt-1 truncate text-xl sm:text-2xl font-extrabold text-slate-900">{name}</h2>}<p className="mt-2 flex min-w-0 items-center gap-2 text-xs sm:text-sm text-slate-500"><Mail size={14} className="shrink-0"/><span className="truncate">{email}</span></p></div><button onClick={()=>editing?saveName():(setDraft(name),setEditing(true))} aria-label={editing?'Save profile name':'Edit profile name'} className="h-10 w-10 shrink-0 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center justify-center">{editing?<Check size={18}/>:<Pencil size={17}/>}</button></div>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="rounded-[24px] border border-blue-100 bg-gradient-to-br from-blue-50 to-cyan-50 p-5"><div className="flex items-center gap-2 text-sm font-bold text-blue-800"><Clock3 size={17}/> Free access</div><p className="mt-3 text-3xl font-black tabular-nums text-slate-900">{timer}</p><p className="mt-1 text-xs text-slate-500">15-minute trial · display only</p></div><div className="rounded-[24px] border border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-5"><div className="flex items-center gap-2 text-sm font-bold text-amber-800"><Crown size={17}/> Pro membership</div><p className="mt-3 text-2xl font-black text-slate-900">Premium</p><p className="mt-1 text-xs text-slate-500">Upgrade activation not connected</p><a href={OWNER_URL||'#community'} className="mt-3 inline-flex text-xs font-extrabold text-blue-700">Explore Pro</a></div></div>
        <p className="mt-5 rounded-2xl bg-blue-50/80 px-4 py-3 text-[11px] leading-relaxed text-slate-500">Profile details are stored on this device. Secure authentication, trial expiry enforcement and Pro payments require a connected backend.</p>
      </div>
      <aside id="community" className="rounded-[30px] sm:rounded-[36px] border border-white bg-white/80 backdrop-blur-xl p-5 sm:p-7 shadow-[0_24px_70px_-35px_rgba(37,99,235,.28)]"><p className="text-[11px] font-extrabold tracking-[.18em] uppercase text-blue-600">ZXH Community</p><h3 className="mt-2 mb-5 text-2xl font-black text-slate-900">Stay connected</h3><div className="space-y-3">{links.map(({label,detail,Icon,url})=><a key={label} href={url||undefined} target={url?'_blank':undefined} rel={url?'noreferrer':undefined} onClick={e=>{if(!url)e.preventDefault();}} className="flex min-w-0 items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50/65 p-3 sm:p-4 transition hover:bg-blue-50"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm"><Icon size={20}/></span><span className="min-w-0"><strong className="block truncate text-sm text-slate-900">{label}</strong><small className="mt-1 block text-xs text-slate-500">{url?detail:'Official link will be configured'}</small></span></a>)}</div><p className="mt-6 border-t border-blue-100 pt-5 text-xs text-slate-500">Created by <b className="text-slate-800">ZULQARNAIN X HAIDER</b><br/>Powered by <b className="text-blue-700">ZXH OFFICIAL</b></p></aside>
    </div>
  </section>;
};
