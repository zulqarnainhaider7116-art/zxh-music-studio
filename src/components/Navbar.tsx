import React, { useRef, useState } from 'react';
import { Disc3, Search, Upload, Sparkles, Volume2, VolumeX, Menu, X, Music2, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { NavTab } from '../types/music';

export const Navbar: React.FC = () => {
  const { activeTab, setActiveTab, setShowBrandModal, importLocalAudio, sfxEnabled, toggleSfx, searchQuery, setSearchQuery, likedTrackIds } = useMusic();
  const [query, setQuery] = useState(searchQuery);
  const [menuOpen, setMenuOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const links: {id:NavTab;label:string}[] = [
    {id:'home',label:'Home'},{id:'explore',label:'Discover'},{id:'hindi',label:'Hindi'},{id:'punjabi',label:'Punjabi'},{id:'naats',label:'Naats'},{id:'playlists',label:'Library'}
  ];
  const submit = (e:React.FormEvent) => { e.preventDefault(); setSearchQuery(query.trim()); setActiveTab('search'); setMenuOpen(false); };
  const go = (id:NavTab) => { setActiveTab(id); setMenuOpen(false); };
  return <header className="plush-header">
    <div className="plush-header-inner">
      <button className="plush-brand" onClick={() => go('home')} aria-label="ZXH Official home">
        <span className="plush-brand-mark"><Music2 size={22}/></span><span><b>ZXH OFFICIAL</b><small>MUSIC STUDIO · A SOFTER SOUND</small></span>
      </button>
      <nav className="plush-desktop-nav" aria-label="Main navigation">{links.map(link=><button key={link.id} className={activeTab===link.id?'active':''} onClick={()=>go(link.id)}>{link.label}</button>)}</nav>
      <form className="plush-header-search" onSubmit={submit}><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Find a song, artist or mood"/><button type="submit" aria-label="Search"><Search size={16}/></button></form>
      <div className="plush-header-actions">
        <button className="plush-icon-button" onClick={()=>go('playlists')} title="Your library"><Heart size={18}/><i>{likedTrackIds.size}</i></button>
        <button className="plush-icon-button" onClick={toggleSfx} title="Toggle sound effects">{sfxEnabled?<Volume2 size={18}/>:<VolumeX size={18}/>}</button>
        <input ref={fileRef} type="file" accept="audio/*" className="hidden" onChange={e=>{if(e.target.files?.[0])importLocalAudio(e.target.files[0]);}}/>
        <button className="plush-import-button" onClick={()=>fileRef.current?.click()}><Upload size={15}/> <span>Add music</span></button>
        <button className="plush-menu-button" onClick={()=>setMenuOpen(v=>!v)} aria-label="Toggle menu">{menuOpen?<X/>:<Menu/>}</button>
      </div>
    </div>
    {menuOpen&&<div className="plush-mobile-menu">
      <form onSubmit={submit}><Search size={16}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search your next favourite"/><button type="submit">Go</button></form>
      <div>{links.map(link=><button key={link.id} className={activeTab===link.id?'active':''} onClick={()=>go(link.id)}>{link.label}</button>)}</div>
      <button className="plush-about-link" onClick={()=>{setShowBrandModal(true);setMenuOpen(false);}}><Sparkles size={15}/> About ZXH OFFICIAL</button>
    </div>}
  </header>;
};
