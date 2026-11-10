import React, { useEffect, useState } from 'react';
import { UserRound, Mail, Crown, Clock3, MessageCircle, Users, ShieldCheck, Pencil, Check, Music2, ImagePlus, X, Sparkles, CheckCircle2 } from 'lucide-react';

const CHANNEL_URL = '';
const GROUP_URL = '';
const OWNER_URL = '';
type Wallpaper = { id: string; name: string; src: string };
const WALLPAPER_KEY = 'zxh-profile-wallpapers';
const ACTIVE_WALLPAPER_KEY = 'zxh-active-wallpaper';

const readWallpapers = (): Wallpaper[] => {
  try { return JSON.parse(localStorage.getItem(WALLPAPER_KEY) || '[]'); } catch { return []; }
};

const compressWallpaper = async (file: File): Promise<string> => {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Image editor is unavailable');
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.76);
};

export const ProfileView: React.FC = () => {
  const [name,setName] = useState(() => localStorage.getItem('zxh-profile-name') || 'ZXH Music Listener');
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState(name);
  const email = localStorage.getItem('zxh-user-email') || 'Guest account';
  const [remaining,setRemaining] = useState(900);
  const [wallpapers,setWallpapers] = useState<Wallpaper[]>(readWallpapers);
  const [activeWallpaper,setActiveWallpaper] = useState(() => localStorage.getItem(ACTIVE_WALLPAPER_KEY) || '');
  const [galleryError,setGalleryError] = useState('');
  const [isUploading,setIsUploading] = useState(false);

  useEffect(() => {
    const key='zxh-free-trial-start'; let start=Number(localStorage.getItem(key));
    if(!start){start=Date.now();localStorage.setItem(key,String(start));}
    const tick=()=>setRemaining(Math.max(0,900-Math.floor((Date.now()-start)/1000)));
    tick(); const id=window.setInterval(tick,1000); return ()=>window.clearInterval(id);
  },[]);

  useEffect(() => {
    if(activeWallpaper) {
      document.documentElement.style.setProperty('--zxh-wallpaper-image', 'url("' + activeWallpaper + '")');
      localStorage.setItem(ACTIVE_WALLPAPER_KEY, activeWallpaper);
    } else {
      document.documentElement.style.removeProperty('--zxh-wallpaper-image');
      localStorage.removeItem(ACTIVE_WALLPAPER_KEY);
    }
  },[activeWallpaper]);

  const timer=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');
  const links=[
    {label:'WhatsApp Channel',detail:'News, updates and music drops',Icon:MessageCircle,url:CHANNEL_URL},
    {label:'WhatsApp Group',detail:'Join the ZXH community',Icon:Users,url:GROUP_URL},
    {label:'Owner Contact',detail:'ZULQARNAIN X HAIDER',Icon:ShieldCheck,url:OWNER_URL},
  ];
  const saveName=()=>{const n=draft.trim()||'ZXH Music Listener';setName(n);localStorage.setItem('zxh-profile-name',n);setEditing(false);};

  const saveWallpapers = (items: Wallpaper[]) => {
    try {
      localStorage.setItem(WALLPAPER_KEY, JSON.stringify(items));
      setWallpapers(items);
      setGalleryError('');
    } catch {
      setGalleryError('Device storage is full. Remove a few wallpapers and try again.');
    }
  };

  const handleWallpaperUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).filter(file => file.type.startsWith('image/'));
    if (!selected.length) return;
    setIsUploading(true);
    setGalleryError('');
    try {
      const next = [...wallpapers];
      for (const file of selected) {
        if (next.length >= 15) break;
        const src = await compressWallpaper(file);
        next.push({ id: 'wallpaper-' + Date.now() + '-' + next.length, name: file.name.replace(/\.[^.]+$/, '').slice(0,32) || 'My Wallpaper', src });
      }
      saveWallpapers(next);
    } catch {
      setGalleryError('Could not save this image. Try a smaller wallpaper.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const removeWallpaper = (id: string) => {
    const item = wallpapers.find(w => w.id === id);
    const next = wallpapers.filter(w => w.id !== id);
    saveWallpapers(next);
    if (item?.src === activeWallpaper) setActiveWallpaper('');
  };

  return <section className="mx-auto w-full max-w-7xl px-4 sm:px-8 lg:px-10 py-8 sm:py-12 pb-28 relative z-10">
    <div className="mb-7 sm:mb-9"><span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/25 backdrop-blur-xl px-4 py-2 text-xs font-extrabold tracking-[.18em] text-blue-700 shadow-sm"><Music2 size={14}/> ZXH MUSIC STUDIO</span><h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-blue-600 to-cyan-500">My Profile</h1><p className="mt-2 text-sm sm:text-base text-slate-700">Your account, membership, wallpapers and ZXH community.</p></div>

    <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_.9fr] gap-5 sm:gap-6 items-start">
      <div className="zxh-glass-panel rounded-[30px] sm:rounded-[36px] p-5 sm:p-8">
        <div className="flex items-center gap-4 min-w-0"><div className="h-16 w-16 sm:h-20 sm:w-20 shrink-0 rounded-[24px] bg-gradient-to-br from-pink-400/90 to-blue-500/90 text-white flex items-center justify-center shadow-lg"><UserRound size={34}/></div><div className="min-w-0 flex-1"><p className="text-[11px] font-extrabold tracking-[.18em] uppercase text-pink-600">Listener profile</p>{editing?<input value={draft} onChange={e=>setDraft(e.target.value)} aria-label="Profile name" className="mt-1 w-full max-w-xs rounded-xl border border-white/60 bg-white/45 backdrop-blur px-3 py-2 text-base font-bold text-slate-900 outline-none focus:ring-2 focus:ring-pink-300"/>:<h2 className="mt-1 truncate text-xl sm:text-2xl font-extrabold text-slate-900">{name}</h2>}<p className="mt-2 flex min-w-0 items-center gap-2 text-xs sm:text-sm text-slate-700"><Mail size={14} className="shrink-0"/><span className="truncate">{email}</span></p></div><button onClick={()=>editing?saveName():(setDraft(name),setEditing(true))} aria-label={editing?'Save profile name':'Edit profile name'} className="h-10 w-10 shrink-0 rounded-xl bg-white/45 border border-white/60 text-blue-700 hover:bg-white/65 flex items-center justify-center backdrop-blur">{editing?<Check size={18}/>:<Pencil size={17}/>}</button></div>
        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4"><div className="zxh-glass-tile rounded-[24px] p-5"><div className="flex items-center gap-2 text-sm font-bold text-blue-700"><Clock3 size={17}/> Free access</div><p className="mt-3 text-3xl font-black tabular-nums text-slate-900">{timer}</p><p className="mt-1 text-xs text-slate-600">15-minute trial · display only</p></div><div className="zxh-glass-tile rounded-[24px] p-5"><div className="flex items-center gap-2 text-sm font-bold text-pink-600"><Crown size={17}/> Pro membership</div><p className="mt-3 text-2xl font-black text-slate-900">Premium</p><p className="mt-1 text-xs text-slate-600">Upgrade activation not connected</p><a href={OWNER_URL||'#community'} className="mt-3 inline-flex text-xs font-extrabold text-blue-700">Explore Pro</a></div></div>
        <p className="mt-5 rounded-2xl border border-white/45 bg-white/25 backdrop-blur-xl px-4 py-3 text-[11px] leading-relaxed text-slate-700">Profile details are stored on this device. Secure authentication, trial expiry enforcement and Pro payments require a connected backend.</p>
      </div>

      <aside id="community" className="zxh-glass-panel rounded-[30px] sm:rounded-[36px] p-5 sm:p-7"><p className="text-[11px] font-extrabold tracking-[.18em] uppercase text-pink-600">ZXH Community</p><h3 className="mt-2 mb-5 text-2xl font-black text-slate-900">Stay connected</h3><div className="space-y-3">{links.map(({label,detail,Icon,url})=><a key={label} href={url||undefined} target={url?'_blank':undefined} rel={url?'noreferrer':undefined} onClick={e=>{if(!url)e.preventDefault();}} className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/45 bg-white/25 backdrop-blur-xl p-3 sm:p-4 transition hover:bg-white/45"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/45 text-blue-600 shadow-sm"><Icon size={20}/></span><span className="min-w-0"><strong className="block truncate text-sm text-slate-900">{label}</strong><small className="mt-1 block text-xs text-slate-600">{url?detail:'Official link will be configured'}</small></span></a>)}</div><p className="mt-6 border-t border-white/45 pt-5 text-xs text-slate-700">Created by <b className="text-pink-600">ZULQARNAIN X HAIDER</b><br/>Powered by <b className="text-blue-700">ZXH OFFICIAL</b></p></aside>
    </div>

    <section className="zxh-glass-panel mt-6 sm:mt-8 rounded-[30px] sm:rounded-[36px] p-5 sm:p-8" aria-label="Wallpaper gallery">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6"><div><span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-pink-600"><Sparkles size={14}/> Personalize your studio</span><h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Wallpaper Gallery</h2><p className="mt-1 text-sm text-slate-700">Choose a wallpaper and let the full image shine through the glass interface.</p></div><label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-600 px-5 py-3 text-xs font-extrabold text-white shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition"><ImagePlus size={16}/>{isUploading?'Adding…':'Add Wallpapers'}<input type="file" accept="image/*" multiple className="hidden" onChange={handleWallpaperUpload}/></label></div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3"><p className="text-xs font-semibold text-slate-700">{wallpapers.length}/15 saved wallpapers</p><button onClick={()=>setActiveWallpaper('')} className="text-xs font-extrabold text-blue-700 hover:text-pink-600">Reset background</button></div>
      {galleryError && <p role="alert" className="mb-4 rounded-xl border border-pink-200 bg-pink-50/70 px-3 py-2 text-xs font-semibold text-pink-700">{galleryError}</p>}
      {wallpapers.length ? <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">{wallpapers.map((wallpaper,index)=><div key={wallpaper.id} className={`group relative overflow-hidden rounded-2xl border ${activeWallpaper===wallpaper.src?'border-pink-400 ring-2 ring-pink-300/70':'border-white/55'}`}><button onClick={()=>setActiveWallpaper(wallpaper.src)} className="relative block aspect-[4/5] w-full overflow-hidden text-left"><img src={wallpaper.src} alt={wallpaper.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/70 to-transparent px-3 pb-3 pt-8 text-xs font-bold text-white">{wallpaper.name}</span>{activeWallpaper===wallpaper.src&&<span className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-pink-600"><CheckCircle2 size={15}/></span>}</button><button onClick={()=>removeWallpaper(wallpaper.id)} aria-label={`Remove ${wallpaper.name}`} className="absolute right-2 bottom-2 rounded-full bg-white/90 p-1.5 text-slate-700 opacity-0 transition group-hover:opacity-100 focus:opacity-100"><X size={13}/></button></div>)}</div>:<div className="rounded-[24px] border border-dashed border-white/70 bg-white/15 px-5 py-10 text-center backdrop-blur-lg"><ImagePlus className="mx-auto h-8 w-8 text-pink-500"/><p className="mt-3 text-sm font-extrabold text-slate-800">Your gallery is ready</p><p className="mt-1 text-xs text-slate-600">Add your wallpaper images to start personalizing the studio.</p></div>}
    </section>
  </section>;
};
