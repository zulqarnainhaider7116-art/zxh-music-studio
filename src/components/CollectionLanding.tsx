import React from 'react';
import { ArrowLeft, ArrowRight, Play, Disc3, Users, Flame } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { CURATED_TRACKS, FEATURED_ARTISTS } from '../data/curatedMusic';
import { Track } from '../types/music';

type Props = { kind: 'artists' | 'albums' | 'trending' };
export const CollectionLanding: React.FC<Props> = ({ kind }) => {
 const { setActiveTab, playTrack, currentTrack } = useMusic();
 const albums = CURATED_TRACKS.filter((t,i,a)=>t.album && a.findIndex(x=>x.album===t.album)===i);
 const tracks = kind==='trending' ? CURATED_TRACKS : [];
 const title = kind==='artists' ? 'The artists' : kind==='albums' ? 'Albums & releases' : 'Trending sounds';
 const intro = kind==='artists' ? 'Meet the voices, creators and performers behind the music.' : kind==='albums' ? 'Discover complete worlds of sound, one release at a time.' : 'The tracks finding their way into everyone’s rotation.';
 const Icon = kind==='artists' ? Users : kind==='albums' ? Disc3 : Flame;
 const play = (track:Track, queue:Track[])=>playTrack(track,queue);
 return <div className="zxh-collection-page">
  <section className="zxh-collection-hero">
   <div className="zxh-collection-image"><img src={kind==='artists'?'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1800&q=85':kind==='albums'?'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1800&q=85':'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1800&q=85'} alt=""/></div>
   <div className="zxh-collection-overlay"/>
   <div className="zxh-collection-copy"><button className="zxh-back-link" onClick={()=>setActiveTab('home')}><ArrowLeft size={16}/> BACK HOME</button><span className="zxh-eyebrow"><Icon size={14}/> ZXH OFFICIAL · COLLECTION</span><h1>{title}<em>.</em></h1><p>{intro}</p><span className="zxh-collection-count">{kind==='artists'?FEATURED_ARTISTS.length:kind==='albums'?albums.length:tracks.length} CURATED {kind.toUpperCase()}</span></div>
  </section>
  <section className="zxh-collection-body">
   <div className="zxh-collection-heading"><div><span className="zxh-eyebrow zxh-dark-eyebrow">HANDPICKED FOR YOU</span><h2>{kind==='artists'?'Voices to know':kind==='albums'?'Featured releases':'On repeat right now'}</h2></div><span>ZXH / 2026</span></div>
   {kind==='artists' && <div className="zxh-artist-wall">{FEATURED_ARTISTS.map((a,i)=><button className="zxh-artist-feature" key={a.id} onClick={()=>a.topTracks[0]&&play(a.topTracks[0],a.topTracks)}><img src={a.coverUrl} alt={a.name}/><span className="zxh-feature-index">0{i+1}</span><span className="zxh-feature-info"><small>{a.genre||'FEATURED ARTIST'}</small><strong>{a.name}</strong><i><Play size={18} fill="currentColor"/></i></span></button>)}</div>}
   {kind==='albums' && <div className="zxh-album-wall">{albums.map((t,i)=><button className="zxh-album-feature" key={t.id} onClick={()=>play(t,CURATED_TRACKS)}><span className="zxh-album-photo"><img src={t.coverUrl} alt={t.album||t.title}/><i><Play size={19} fill="currentColor"/></i></span><span className="zxh-album-meta"><small>0{i+1} · {t.releaseYear||'ZXH SELECTS'}</small><strong>{t.album}</strong><em>{t.artist}</em></span></button>)}</div>}
   {kind==='trending' && <div className="zxh-trending-wall">{tracks.map((t,i)=><button className="zxh-trending-row" key={t.id} onClick={()=>play(t,tracks)}><b>{String(i+1).padStart(2,'0')}</b><img src={t.coverUrl} alt=""/><span><strong>{t.title}</strong><small>{t.artist}</small></span><i>{currentTrack?.id===t.id?'NOW PLAYING':'PLAY TRACK'}</i><Play size={17}/></button>)}</div>}
   <button className="zxh-more-link" onClick={()=>setActiveTab('explore')}>Explore the full music world <ArrowRight size={17}/></button>
  </section>
 </div>;
};
