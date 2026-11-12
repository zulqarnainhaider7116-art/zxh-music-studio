import React from 'react';
import { House, Search, Compass, UserRound } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();
  const items = [{id:'home' as const,label:'Home',icon:House},{id:'search' as const,label:'Search',icon:Search},{id:'explore' as const,label:'Discover',icon:Compass},{id:'profile' as const,label:'You',icon:UserRound}];
  return <nav className="plush-bottom-nav" aria-label="Quick navigation">{items.map(({id,label,icon:Icon})=><button key={id} onClick={()=>setActiveTab(id)} className={activeTab===id?'active':''} aria-current={activeTab===id?'page':undefined}><span><Icon size={19}/></span><small>{label}</small></button>)}</nav>;
};
