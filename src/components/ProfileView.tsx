import React, { useEffect, useMemo, useState } from 'react';
import JSZip from 'jszip';
import { UserRound, Mail, Crown, Clock3, MessageCircle, Users, ShieldCheck, Pencil, Check, Music2, ImagePlus, X, Sparkles, CheckCircle2, Archive, Upload, Images } from 'lucide-react';

const CHANNEL_URL = '';
const GROUP_URL = '';
const OWNER_URL = '';
type WallpaperCategory = 'boys' | 'girls' | 'uploads';
type StoredWallpaper = { id: string; name: string; category: WallpaperCategory; blob: Blob };
type Wallpaper = StoredWallpaper & { src: string };
type GalleryFilter = 'all' | WallpaperCategory;
const DB_NAME = 'zxh-music-wallpaper-gallery';
const STORE_NAME = 'wallpapers';
const ACTIVE_WALLPAPER_KEY = 'zxh-active-wallpaper';

const openGalleryDB = (): Promise<IDBDatabase> => new Promise((resolve,reject) => {
  const request = indexedDB.open(DB_NAME,1);
  request.onupgradeneeded = () => {
    const db = request.result;
    if (!db.objectStoreNames.contains(STORE_NAME)) db.createObjectStore(STORE_NAME,{keyPath:'id'});
  };
  request.onsuccess = () => resolve(request.result);
  request.onerror = () => reject(request.error);
});
const getAllWallpapers = async (): Promise<StoredWallpaper[]> => {
  const db = await openGalleryDB();
  return new Promise((resolve,reject) => {
    const request = db.transaction(STORE_NAME,'readonly').objectStore(STORE_NAME).getAll();
    request.onsuccess = () => resolve(request.result as StoredWallpaper[]);
    request.onerror = () => reject(request.error);
  });
};
const putWallpaper = async (item: StoredWallpaper) => {
  const db = await openGalleryDB();
  return new Promise<void>((resolve,reject) => {
    const tx = db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).put(item);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
const deleteWallpaper = async (id: string) => {
  const db = await openGalleryDB();
  return new Promise<void>((resolve,reject) => {
    const tx = db.transaction(STORE_NAME,'readwrite');
    tx.objectStore(STORE_NAME).delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
const toDisplayWallpaper = (item: StoredWallpaper): Wallpaper => ({...item,src:URL.createObjectURL(item.blob)});

export const ProfileView: React.FC = () => {
  const [name,setName] = useState(() => localStorage.getItem('zxh-profile-name') || 'ZXH Music Listener');
  const [editing,setEditing] = useState(false);
  const [draft,setDraft] = useState(name);
  const email = localStorage.getItem('zxh-user-email') || 'Guest account';
  const [remaining,setRemaining] = useState(900);
  const [wallpapers,setWallpapers] = useState<Wallpaper[]>([]);
  const [activeWallpaperId,setActiveWallpaperId] = useState(() => localStorage.getItem(ACTIVE_WALLPAPER_KEY) || '');
  const [galleryFilter,setGalleryFilter] = useState<GalleryFilter>('all');
  const [galleryError,setGalleryError] = useState('');
  const [isUploading,setIsUploading] = useState(false);
  const [isImportingZip,setIsImportingZip] = useState(false);

  useEffect(() => {
    let alive = true;
    getAllWallpapers().then(items => {
      if (alive) setWallpapers(items.map(toDisplayWallpaper));
    }).catch(() => setGalleryError('Wallpaper storage is unavailable in this browser.'));
    return () => { alive = false; };
  },[]);

  useEffect(() => {
    const key='zxh-free-trial-start'; let start=Number(localStorage.getItem(key));
    if(!start){start=Date.now();localStorage.setItem(key,String(start));}
    const tick=()=>setRemaining(Math.max(0,900-Math.floor((Date.now()-start)/1000)));
    tick(); const id=window.setInterval(tick,1000); return ()=>window.clearInterval(id);
  },[]);

  useEffect(() => {
    const active = wallpapers.find(item => item.id === activeWallpaperId);
    if(active) {
      document.documentElement.style.setProperty('--zxh-wallpaper-image', 'url("' + active.src + '")');
      localStorage.setItem(ACTIVE_WALLPAPER_KEY, active.id);
    } else {
      document.documentElement.style.removeProperty('--zxh-wallpaper-image');
      if(activeWallpaperId) localStorage.removeItem(ACTIVE_WALLPAPER_KEY);
    }
  },[wallpapers,activeWallpaperId]);


  const timer=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');
  const links=[
    {label:'WhatsApp Channel',detail:'News, updates and music drops',Icon:MessageCircle,url:CHANNEL_URL},
    {label:'WhatsApp Group',detail:'Join the ZXH community',Icon:Users,url:GROUP_URL},
    {label:'Owner Contact',detail:'ZULQARNAIN X HAIDER',Icon:ShieldCheck,url:OWNER_URL},
  ];
  const saveName=()=>{const n=draft.trim()||'ZXH Music Listener';setName(n);localStorage.setItem('zxh-profile-name',n);setEditing(false);};

  const filteredWallpapers = useMemo(() => galleryFilter === 'all' ? wallpapers : wallpapers.filter(item => item.category === galleryFilter),[wallpapers,galleryFilter]);
  const categoryCounts = useMemo(() => ({
    boys:wallpapers.filter(item=>item.category==='boys').length,
    girls:wallpapers.filter(item=>item.category==='girls').length,
    uploads:wallpapers.filter(item=>item.category==='uploads').length,
  }),[wallpapers]);

  const addImage = async (file: File, category: WallpaperCategory, id: string, nameOverride?: string) => {
    if (!file.type.startsWith('image/')) return;
    const item: StoredWallpaper = {id,name:nameOverride || file.name.replace(/\.[^.]+$/,'').slice(0,48) || 'My Wallpaper',category,blob:file};
    await putWallpaper(item);
    setWallpapers(previous => {
      const existing = previous.find(w => w.id === id);
      if(existing) URL.revokeObjectURL(existing.src);
      return [...previous.filter(w => w.id !== id),toDisplayWallpaper(item)];
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(event.target.files || []).filter(file=>file.type.startsWith('image/'));
    if(!selected.length) return;
    setIsUploading(true);setGalleryError('');
    try {
      for(const file of selected) await addImage(file,'uploads','upload-'+Date.now()+'-'+Math.random().toString(36).slice(2));
    } catch { setGalleryError('Could not save one or more images. Please try again.'); }
    finally { setIsUploading(false);event.target.value=''; }
  };

  const handleZipImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file=event.target.files?.[0];
    if(!file) return;
    setIsImportingZip(true);setGalleryError('');
    try {
      const zip=await JSZip.loadAsync(file);
      const entries=Object.values(zip.files).filter(entry=>!entry.dir && /^(boys bg|girls bg)\//i.test(entry.name) && /\.(jpe?g|png|webp)$/i.test(entry.name));
      let imported=0;
      for(const entry of entries) {
        const category:WallpaperCategory=entry.name.toLowerCase().startsWith('boys bg/')?'boys':'girls';
        const filename=entry.name.split('/').pop() || 'Wallpaper';
        const blob=await entry.async('blob');
        const mime=/\.png$/i.test(filename)?'image/png':/\.webp$/i.test(filename)?'image/webp':'image/jpeg';
        const imageBlob=blob.type?blob:new Blob([blob],{type:mime});
        await addImage(new File([imageBlob],filename,{type:mime}),category,category+'-'+filename,filename.replace(/\.[^.]+$/,''));
        imported++;
      }
      if(imported===0) setGalleryError('No boys bg/ or girls bg/ wallpaper folders were found in this ZIP.');
      else setGalleryFilter('all');
    } catch { setGalleryError('Could not read this ZIP. Please select the original Music Bg.zip file.'); }
    finally { setIsImportingZip(false);event.target.value=''; }
  };

  const removeWallpaper = async (item: Wallpaper) => {
    try {
      await deleteWallpaper(item.id);
      URL.revokeObjectURL(item.src);
      setWallpapers(previous=>previous.filter(w=>w.id!==item.id));
      if(activeWallpaperId===item.id) setActiveWallpaperId('');
    } catch { setGalleryError('Could not remove this wallpaper.'); }
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
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6"><div><span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[.18em] text-pink-600"><Sparkles size={14}/> Personalize your studio</span><h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900">Wallpaper Gallery</h2><p className="mt-1 text-sm text-slate-700">Original wallpaper stays visible behind the transparent liquid-glass panels.</p></div><div className="flex flex-wrap gap-2"><label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-600 px-4 py-3 text-xs font-extrabold text-white shadow-lg hover:scale-[1.02] transition"><ImagePlus size={16}/>{isUploading?'Adding…':'Add Images'}<input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload}/></label><label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/60 bg-white/35 px-4 py-3 text-xs font-extrabold text-blue-700 backdrop-blur-xl hover:bg-white/55 transition"><Archive size={16}/>{isImportingZip?'Importing…':'Import Music Bg.zip'}<input type="file" accept=".zip,application/zip" className="hidden" onChange={handleZipImport}/></label></div></div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div className="flex flex-wrap gap-2">{([{id:'all',label:'All wallpapers',count:wallpapers.length},{id:'boys',label:'Boys',count:categoryCounts.boys},{id:'girls',label:'Girls',count:categoryCounts.girls},{id:'uploads',label:'My uploads',count:categoryCounts.uploads}] as {id:GalleryFilter;label:string;count:number}[]).map(tab=><button key={tab.id} onClick={()=>setGalleryFilter(tab.id)} className={`rounded-full border px-3.5 py-2 text-xs font-extrabold transition ${galleryFilter===tab.id?'border-pink-300 bg-gradient-to-r from-pink-500 to-blue-600 text-white':'border-white/55 bg-white/25 text-slate-700 backdrop-blur-xl hover:bg-white/45'}`}>{tab.label} <span className="opacity-75">{tab.count}</span></button>)}</div><button onClick={()=>setActiveWallpaperId('')} className="text-xs font-extrabold text-blue-700 hover:text-pink-600">Reset background</button></div>
      {galleryError && <p role="alert" className="mb-4 rounded-xl border border-pink-200 bg-pink-50/70 px-3 py-2 text-xs font-semibold text-pink-700">{galleryError}</p>}
      {filteredWallpapers.length ? <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">{filteredWallpapers.map(wallpaper=><div key={wallpaper.id} className={`group relative overflow-hidden rounded-2xl border ${activeWallpaperId===wallpaper.id?'border-pink-400 ring-2 ring-pink-300/70':'border-white/55'}`}><button onClick={()=>setActiveWallpaperId(wallpaper.id)} className="relative block aspect-[4/5] w-full overflow-hidden text-left"><img src={wallpaper.src} alt={wallpaper.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/75 to-transparent px-3 pb-3 pt-8 text-xs font-bold text-white">{wallpaper.name}</span>{activeWallpaperId===wallpaper.id&&<span className="absolute right-2 top-2 rounded-full bg-white/90 p-1.5 text-pink-600"><CheckCircle2 size={15}/></span>}</button><button onClick={()=>removeWallpaper(wallpaper)} aria-label={`Remove ${wallpaper.name}`} className="absolute right-2 bottom-2 rounded-full bg-white/90 p-1.5 text-slate-700 opacity-0 transition group-hover:opacity-100 focus:opacity-100"><X size={13}/></button></div>)}</div>:<div className="rounded-[24px] border border-dashed border-white/70 bg-white/15 px-5 py-10 text-center backdrop-blur-lg"><Images className="mx-auto h-8 w-8 text-pink-500"/><p className="mt-3 text-sm font-extrabold text-slate-800">Your wallpaper gallery is ready</p><p className="mt-1 text-xs text-slate-600">Import the original Music Bg.zip to load all 22 boys and 19 girls wallpapers, or add images one by one.</p></div>}
    </section>
  </section>;
};
