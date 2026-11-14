import React from 'react';
import { ArrowDown, ArrowRight, Headphones, Play, Search, Sparkles } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { CURATED_TRACKS, NAATS_TRACKS } from '../data/curatedMusic';

export const HomeDiscover: React.FC = () => {
  const { setActiveTab, playTrack, currentTrack } = useMusic();
  const heroTrack = NAATS_TRACKS[0] || CURATED_TRACKS[0];
  return <div className="zxh-home-page">
    <section className="zxh-cinema-hero">
      <img className="zxh-hero-backdrop" src="https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2400&q=90" alt="" />
      <div className="zxh-hero-shade" />
      <div className="zxh-hero-content">
        <span className="zxh-eyebrow"><Sparkles size={14}/> ZXH OFFICIAL · MUSIC STUDIO</span>
        <h1>Feel every<br/><em>frequency.</em></h1>
        <p>A world of sound, stories and unforgettable moments. Discover your next favourite track.</p>
        <div className="zxh-hero-actions">
          <button className="zxh-cta-primary" onClick={() => setActiveTab('explore')}><Play size={17} fill="currentColor"/> Explore the sound</button>
          <button className="zxh-cta-ghost" onClick={() => setActiveTab('search')}><Search size={17}/> Find your music</button>
        </div>
        <div className="zxh-hero-caption"><span>01 / 04</span><i/> CURATED SOUND · UNLIMITED FEELING</div>
      </div>
      <button className="zxh-hero-feature" onClick={() => playTrack(heroTrack, NAATS_TRACKS)} aria-label="Play featured Naat">
        <img src={heroTrack.coverUrl} alt={heroTrack.title}/>
        <span><small>FEATURED LISTENING</small><strong>{heroTrack.title}</strong><i><Play size={15} fill="currentColor"/></i></span>
      </button>
      <button className="zxh-scroll-cue" onClick={() => setActiveTab('explore')}><ArrowDown size={17}/> DISCOVER MORE</button>
    </section>
    <section className="zxh-entry-strip">
      <button onClick={() => setActiveTab('hindi')}><span>01</span><strong>Hindi</strong><small>Melodies & memories</small><ArrowRight/></button>
      <button onClick={() => setActiveTab('punjabi')}><span>02</span><strong>Punjabi</strong><small>Rhythm & energy</small><ArrowRight/></button>
      <button onClick={() => setActiveTab('english')}><span>03</span><strong>English</strong><small>Global soundscape</small><ArrowRight/></button>
      <button onClick={() => setActiveTab('naats')}><span>04</span><strong>Naats</strong><small>Peace for the soul</small><ArrowRight/></button>
    </section>
    <section className="zxh-home-editorial">
      <div><span className="zxh-eyebrow zxh-dark-eyebrow">THE SOUND OF YOUR WORLD</span><h2>One place.<br/><em>Every feeling.</em></h2></div>
      <p>Move through dedicated music spaces, discover artists, explore releases and build a library that feels like yours.</p>
      <div className="zxh-editorial-links">
        <button onClick={() => setActiveTab('trending')}>Trending now <ArrowRight/></button>
        <button onClick={() => setActiveTab('artists')}>Meet the artists <ArrowRight/></button>
        <button onClick={() => setActiveTab('albums')}>Albums & releases <ArrowRight/></button>
        <button onClick={() => setActiveTab('playlists')}>Your collection <ArrowRight/></button>
      </div>
    </section>
    <div className="zxh-home-credit">A listening experience by <b>ZXH OFFICIAL</b> · Created by <b>ZULQARNAIN X HAIDER</b></div>
  </div>;
};
