import React, { useState } from 'react';
import { Disc3, Heart, Sparkles } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
export const Footer: React.FC = () => {
 const {setShowBrandModal,setActiveTab}=useMusic(); const [legal,setLegal]=useState<'privacy'|'terms'|null>(null);
 return <footer className="plush-footer"><div className="plush-footer-main">
 <button className="plush-footer-brand" onClick={()=>setActiveTab('home')}><span><Disc3 size={22}/></span><b>ZXH OFFICIAL</b></button>
 <p>A softer little universe for music, memories and every mood. Discover, collect and play the sounds that feel like you.</p>
 <div className="plush-footer-links"><button onClick={()=>setActiveTab('explore')}>Discover</button><button onClick={()=>setActiveTab('playlists')}>Your library</button><button onClick={()=>setActiveTab('naats')}>Naats & Nasheeds</button><button onClick={()=>setLegal('privacy')}>Privacy</button><button onClick={()=>setLegal('terms')}>Terms</button><button onClick={()=>setShowBrandModal(true)}><Sparkles size={13}/> About the creator</button></div>
 </div><div className="plush-footer-bottom"><span>© {new Date().getFullYear()} ZXH OFFICIAL MUSIC STUDIO</span><span>Made with <Heart size={12} fill="currentColor"/> by <b>ZULQARNAIN X HAIDER</b></span></div>
 {legal&&<div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#786777]/35 backdrop-blur-sm" role="dialog" aria-modal="true"><div className="w-full max-w-lg rounded-[28px] bg-[#fffaf6] p-6 shadow-2xl"><h3 className="text-xl font-black text-[#67576a]">{legal==='privacy'?'Privacy Policy':'Terms of Service'} · ZXH OFFICIAL</h3><div className="mt-4 space-y-3 text-sm leading-7 text-[#8c7d8b]"><p>ZXH MUSIC STUDIO keeps playlists, liked tracks and playback preferences on your device. Music catalogue details and audio previews may be provided by third-party music services.</p><p>Some tracks are short previews rather than full-length recordings. Availability depends on the source service and region.</p><p>Brand: ZXH OFFICIAL · Developer: ZULQARNAIN X HAIDER.</p></div><button className="mt-5 rounded-full bg-[#e9bfd1] px-5 py-2 text-sm font-bold text-[#76556a]" onClick={()=>setLegal(null)}>Close</button></div></div>}
 </footer>;
};