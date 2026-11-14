import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, AudioLines, Headphones, Heart, MoonStar, Music2, Play, Radio, Sparkles, Sun, Waves } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { CURATED_TRACKS, HINDI_TRACKS, PUNJABI_TRACKS, NAATS_TRACKS, ENGLISH_TRACKS, CURATED_PLAYLISTS, FEATURED_ARTISTS } from '../data/curatedMusic';
import { searchCategoryTracks } from '../services/musicApi';
import { Track } from '../types/music';

const categoryTiles = [
  { id: 'hindi' as const, title: 'Hindi melodies', note: 'Soft hearts, big feelings', icon: '🌸', tone: 'rose' },
  { id: 'punjabi' as const, title: 'Punjabi energy', note: 'A little more dhol', icon: '🪇', tone: 'mint' },
  { id: 'naats' as const, title: 'Naats & Nasheeds', note: 'Peace for the soul', icon: '🌙', tone: 'lilac' },
  { id: 'explore' as const, title: 'All sounds', note: 'Find your next favourite', icon: '🎧', tone: 'sky' },
];

const moods = [
  { label: 'Soft mornings', query: 'soft morning acoustic', icon: Sun },
  { label: 'Dreamy hours', query: 'dreamy chill music', icon: MoonStar },
  { label: 'Feel the beat', query: 'upbeat pop hits', icon: AudioLines },
  { label: 'Just breathe', query: 'peaceful nasheed', icon: Waves },
];

export const HomeDiscover: React.FC = () => {
  const { playTrack, currentTrack, isPlaying, isLiked, toggleLike, setActiveTab, setSearchQuery, setSelectedPlaylist } = useMusic();
  const [naats, setNaats] = useState<Track[]>(NAATS_TRACKS);
  const [trending, setTrending] = useState<Track[]>(CURATED_TRACKS);
  const [hindi, setHindi] = useState<Track[]>(HINDI_TRACKS);
  const [punjabi, setPunjabi] = useState<Track[]>(PUNJABI_TRACKS);
  const [english, setEnglish] = useState<Track[]>(ENGLISH_TRACKS);

  useEffect(() => {
    let live = true;
    Promise.allSettled([
      searchCategoryTracks('naats'),
      searchCategoryTracks('trending'),
      searchCategoryTracks('hindi'),
      searchCategoryTracks('punjabi'),
      searchCategoryTracks('english'),
    ]).then(([n, t, h, p, e]) => {
      if (!live) return;
      if (n.status === 'fulfilled' && n.value.length) setNaats(n.value);
      if (t.status === 'fulfilled' && t.value.length) setTrending(t.value);
      if (h.status === 'fulfilled' && h.value.length) setHindi(h.value);
      if (p.status === 'fulfilled' && p.value.length) setPunjabi(p.value);
      if (e.status === 'fulfilled' && e.value.length) setEnglish(e.value);
    }).catch(() => {});
    return () => { live = false; };
  }, []);

  const allTracks = useMemo(() => [...hindi, ...punjabi, ...naats, ...english], [hindi, punjabi, naats, english]);
  const featured = naats[0] || CURATED_TRACKS[3];
  const featuredPlaylist = CURATED_PLAYLISTS[3];

  const openMood = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const TrackTile = ({ track, queue }: { track: Track; queue: Track[] }) => {
    const active = currentTrack?.id === track.id;
    return (
      <article className={`plush-track ${active ? 'is-current' : ''}`}>
        <button className="plush-track-art" onClick={() => playTrack(track, queue)} aria-label={`Play ${track.title}`}>
          <img src={track.coverUrl} alt="" loading="lazy" />
          <span className="plush-play"><Play size={17} fill="currentColor" /></span>
        </button>
        <div className="plush-track-meta">
          <button className="plush-track-title" onClick={() => playTrack(track, queue)}>{track.title}</button>
          <span>{track.artist}</span>
        </div>
        <button className={`plush-like ${isLiked(track.id) ? 'liked' : ''}`} onClick={() => toggleLike(track)} aria-label={isLiked(track.id) ? 'Unlike track' : 'Like track'}>
          <Heart size={17} fill={isLiked(track.id) ? 'currentColor' : 'none'} />
        </button>
      </article>
    );
  };

  return (
    <div className="plush-home">
      <section className="plush-welcome">
        <div className="plush-welcome-copy">
          <span className="plush-kicker"><Sparkles size={14}/> THE LITTLE WORLD OF ZXH OFFICIAL</span>
          <h1>Make room for<br/><em>good feelings.</em></h1>
          <p>A softer place for the songs you love. Drift through Hindi favourites, Punjabi beats, peaceful Naats and sounds that feel like you.</p>
          <div className="plush-actions">
            <button className="plush-primary" onClick={() => setActiveTab('explore')}><Play size={17} fill="currentColor"/> Explore the sound</button>
            <button className="plush-soft-button" onClick={() => setActiveTab('playlists')}>My music <ArrowRight size={16}/></button>
          </div>
          <div className="plush-note"><span className="plush-note-dot"/> A cozy corner for every mood</div>
        </div>
        <div className="plush-hero-art" aria-label="Featured music artwork">
          <div className="plush-orbit plush-orbit-one"/><div className="plush-orbit plush-orbit-two"/>
          <div className="plush-hero-disc"><img src={featured.coverUrl} alt={featured.title}/><span><Headphones size={24}/></span></div>
          <div className="plush-sticker sticker-top">made of music ✿</div>
          <div className="plush-sticker sticker-bottom">soft sounds, big feelings</div>
          <div className="plush-floating-dot dot-one"/><div className="plush-floating-dot dot-two"/>
        </div>
      </section>

      <section className="plush-section">
        <div className="plush-section-heading"><div><span className="plush-overline">A little something for every mood</span><h2>Pick your sound</h2></div><span className="plush-heading-mark">✳</span></div>
        <div className="plush-categories">
          {categoryTiles.map((item) => <button key={item.id} className={`plush-category tone-${item.tone}`} onClick={() => setActiveTab(item.id)}>
            <span className="plush-category-icon">{item.icon}</span><strong>{item.title}</strong><small>{item.note}</small><span className="plush-category-arrow"><ArrowRight size={15}/></span>
          </button>)}
        </div>
      </section>

      <section className="plush-featured">
        <div className="plush-featured-cover"><img src={featured.coverUrl} alt={featured.title}/><span className="plush-cover-label">A MOMENT OF PEACE</span></div>
        <div className="plush-featured-copy"><span className="plush-overline">The devotional corner</span><h2>Let your heart<br/><em>find its quiet.</em></h2><p>Beautiful Naats and Nasheeds for slow moments, reflection and a little peace in your day.</p><button className="plush-primary" onClick={() => setActiveTab('naats')}><MoonStar size={17}/> Explore Naats</button></div>
        <div className="plush-featured-list">{naats.slice(0,3).map((track) => <TrackTile key={track.id} track={track} queue={naats}/>)}</div>
      </section>

      <section className="plush-section">
        <div className="plush-section-heading"><div><span className="plush-overline">Follow the feeling</span><h2>What’s your mood?</h2></div><span className="plush-heading-mark">♡</span></div>
        <div className="plush-moods">{moods.map(({label,query,icon:Icon}) => <button key={label} onClick={() => openMood(query)}><span><Icon size={19}/></span>{label}<ArrowRight size={15}/></button>)}</div>
      </section>

      <section className="plush-section">
        <div className="plush-section-heading"><div><span className="plush-overline">Little songs making big waves</span><h2>On repeat lately</h2></div><button className="plush-text-link" onClick={() => setActiveTab('explore')}>See all <ArrowRight size={15}/></button></div>
        <div className="plush-track-grid">{trending.slice(0,8).map((track) => <TrackTile key={track.id} track={track} queue={trending}/>)}</div>
      </section>

      <section className="plush-section plush-artists-section">
        <div className="plush-section-heading"><div><span className="plush-overline">Voices behind the feelings</span><h2>Featured artists</h2></div><button className="plush-text-link" onClick={() => setActiveTab('explore')}>Explore artists <ArrowRight size={15}/></button></div>
        <div className="plush-artist-grid">
          {FEATURED_ARTISTS.map((artist, index) => (
            <button className="plush-artist-card" key={artist.id} onClick={() => artist.topTracks[0] && playTrack(artist.topTracks[0], artist.topTracks)}>
              <span className="plush-artist-photo"><img src={artist.coverUrl} alt={artist.name} loading="lazy"/><i><Play size={16} fill="currentColor"/></i></span>
              <strong>{artist.name}</strong><small>{artist.genre || 'Featured artist'}</small>
              <span className="plush-artist-number">{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="plush-playlist-banner">
        <div className="plush-playlist-art"><img src={featuredPlaylist.coverUrl} alt={featuredPlaylist.title}/></div>
        <div><span className="plush-overline">A playlist made for your slower hours</span><h2>{featuredPlaylist.title}</h2><p>{featuredPlaylist.description}</p><button className="plush-soft-button" onClick={() => setSelectedPlaylist(featuredPlaylist)}>Open this playlist <ArrowRight size={16}/></button></div>
        <span className="plush-banner-sparkle">✦</span>
      </section>

      <section className="plush-mini-player">
        <div className="plush-mini-icon"><Radio size={20}/></div>
        <div><span>YOUR SOUND IS WAITING</span><strong>{currentTrack?.title || 'Choose your next favourite'}</strong><small>{currentTrack?.artist || 'Tap any song to start listening'}</small></div>
        <button onClick={() => currentTrack ? playTrack(currentTrack, allTracks) : setActiveTab('explore')} aria-label="Play current track"><Play size={18} fill="currentColor"/></button>
        {isPlaying && <i className="plush-playing-indicator"/>}
      </section>
      <div className="plush-credit-line">Designed with a little extra softness · <strong>ZXH OFFICIAL</strong> · Created by <strong>ZULQARNAIN X HAIDER</strong></div>
    </div>
  );
};
