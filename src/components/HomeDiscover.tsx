import React, { useState, useEffect } from 'react';
import {
  Play,
  Heart,
  Sparkles,
  ChevronRight,
  Flame,
  Radio,
  Disc,
  Compass,
  Star,
  Moon,
  CloudRain,
  Coffee,
  Headphones,
  Music2,
  Clock,
  ArrowRight,
  Layers,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import {
  CURATED_TRACKS,
  HINDI_TRACKS,
  PUNJABI_TRACKS,
  NAATS_TRACKS,
  ENGLISH_TRACKS,
  CURATED_PLAYLISTS,
  FEATURED_ARTISTS,
  MOOD_COLLECTIONS,
} from '../data/curatedMusic';
import { searchCategoryTracks } from '../services/musicApi';
import { Track } from '../types/music';
import { formatTime } from '../utils/audioUtils';

export const HomeDiscover: React.FC = () => {
  const {
    playTrack,
    currentTrack,
    isPlaying,
    isLiked,
    toggleLike,
    setSelectedPlaylist,
    setActiveTab,
    setSearchQuery,
  } = useMusic();

  // Dynamic state for live category tracks loaded via API
  const [liveHindi, setLiveHindi] = useState<Track[]>(HINDI_TRACKS);
  const [livePunjabi, setLivePunjabi] = useState<Track[]>(PUNJABI_TRACKS);
  const [liveNaats, setLiveNaats] = useState<Track[]>(NAATS_TRACKS);
  const [liveEnglish, setLiveEnglish] = useState<Track[]>(ENGLISH_TRACKS);
  const [liveTrending, setLiveTrending] = useState<Track[]>(CURATED_TRACKS);
  const [hindiSubFilter, setHindiSubFilter] = useState<'all' | 'romantic' | 'sad' | 'hits'>('all');
  const [punjabiSubFilter, setPunjabiSubFilter] = useState<'all' | 'hits' | 'vibes'>('all');

  // Load enriched catalog asynchronously in background
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [hindiRes, punjabiRes, naatsRes, englishRes, trendingRes] = await Promise.allSettled([
          searchCategoryTracks('hindi'),
          searchCategoryTracks('punjabi'),
          searchCategoryTracks('naats'),
          searchCategoryTracks('english'),
          searchCategoryTracks('trending'),
        ]);

        if (isMounted) {
          if (hindiRes.status === 'fulfilled' && hindiRes.value.length > 0) {
            setLiveHindi(hindiRes.value);
          }
          if (punjabiRes.status === 'fulfilled' && punjabiRes.value.length > 0) {
            setLivePunjabi(punjabiRes.value);
          }
          if (naatsRes.status === 'fulfilled' && naatsRes.value.length > 0) {
            setLiveNaats(naatsRes.value);
          }
          if (englishRes.status === 'fulfilled' && englishRes.value.length > 0) {
            setLiveEnglish(englishRes.value);
          }
          if (trendingRes.status === 'fulfilled' && trendingRes.value.length > 0) {
            setLiveTrending(trendingRes.value);
          }
        }
      } catch (err) {
        console.warn('API enrichment fallback to curated:', err);
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  const featuredPlaylist = CURATED_PLAYLISTS[0]; // Midnight Vibes

  const handleMoodClick = (query: string) => {
    setSearchQuery(query);
    setActiveTab('search');
  };

  const filteredHindiTracks = React.useMemo(() => {
    if (hindiSubFilter === 'romantic') {
      return liveHindi.filter((t) => t.title.toLowerCase().includes('kesariya') || t.genre?.toLowerCase().includes('romantic'));
    }
    if (hindiSubFilter === 'sad') {
      return liveHindi.filter((t) => t.title.toLowerCase().includes('tum hi ho') || t.genre?.toLowerCase().includes('sad'));
    }
    return liveHindi;
  }, [liveHindi, hindiSubFilter]);

  return (
    <div className="pb-32 space-y-16 animate-fadeIn">
      {/* ======================================================== */}
      {/* SECTION A: CINEMATIC HERO SECTION                         */}
      {/* ======================================================== */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-blue-50 to-cyan-50 border-b border-white/[0.06] pt-8 md:pt-14 pb-16 md:pb-24">
        {/* Ambient Crimson Glow Sphere */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-700/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
          <div className="grid grid-cols-1 gap-8 lg:gap-12 items-center">
            {/* Left Hero Content */}
            <div className="w-full max-w-5xl space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ZXH OFFICIAL · YOUR FLUFFY PINK MUSIC UNIVERSE</span>
              </div>

              <h1 className="font-serif-title text-5xl sm:text-7xl xl:text-8xl font-extrabold tracking-tight text-white leading-[1.08]">
                MUSIC BEYOND <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-500 italic font-normal drop-shadow-[0_0_35px_rgba(239,68,68,0.35)]">
                  BOUNDARIES.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
                Discover the sounds, artists, and music that define every moment. From timeless Bollywood melodies and electrifying Punjabi beats to tranquil Naats and international pop.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center justify-start gap-4">
                <button
                  onClick={() => setActiveTab('explore')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] hover:border-blue-300/30 text-slate-200 font-medium text-sm transition-all"
                >
                  <Compass className="w-4 h-4 text-blue-600" />
                  <span>Explore Music</span>
                </button>
              </div>

              <p className="pt-2 text-xs sm:text-sm text-slate-400 ">
                Explore Hindi, Punjabi, Naats and international music in one place.
              </p>
            </div>

          </div>
        </div>
      </section>

      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-10 space-y-12 md:space-y-16">
        {/* FEATURED NAATS — 12 live devotional selections */}
        <section className="relative overflow-hidden rounded-[34px] border border-white/90 bg-gradient-to-br from-white via-blue-50 to-cyan-50 p-5 sm:p-7 md:p-9 shadow-[12px_12px_28px_rgba(148,163,184,.22),-10px_-10px_26px_rgba(255,255,255,.95)]">
          <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-200/35 blur-3xl pointer-events-none"/>
          <div className="relative z-10 flex flex-wrap items-end justify-between gap-3 mb-6">
            <div><span className="inline-flex items-center gap-2 rounded-full bg-white/80 border border-blue-100 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[.2em] text-blue-700"><Sparkles className="w-3.5 h-3.5"/> Featured Collection</span><h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900">Featured Naats</h2><p className="mt-2 max-w-xl text-sm sm:text-base text-slate-600">A dedicated collection of Urdu Naats and peaceful Nasheeds.</p></div>
            <button onClick={() => setActiveTab('naats')} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-extrabold text-blue-700 shadow-[5px_5px_12px_rgba(148,163,184,.2),-4px_-4px_10px_white] border border-blue-100">Explore Naats <ChevronRight className="w-4 h-4"/></button>
          </div>
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
            {liveNaats.slice(0, 12).map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return <button key={track.id} onClick={() => playTrack(track, liveNaats)} className="group min-w-0 text-left rounded-[24px] border border-white bg-white/85 p-2.5 sm:p-3 shadow-[7px_7px_16px_rgba(148,163,184,.2),-6px_-6px_14px_white] hover:-translate-y-1 transition-all">
                <div className="relative aspect-square overflow-hidden rounded-[18px] bg-blue-50"><img src={track.coverUrl} alt={track.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"/><span className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg"><Play className="h-4 w-4 fill-current ml-0.5"/></span></div>
                <span className="mt-3 block truncate text-sm font-extrabold text-slate-900">{track.title}</span><span className="mt-1 block truncate text-xs text-slate-500">{track.artist}</span>
                {isCurrent && <span className="mt-2 inline-flex rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold text-blue-700">Now playing</span>}
              </button>;
            })}
          </div>
          {liveNaats.length < 10 && <p className="relative z-10 mt-4 text-xs text-slate-500">More Naats are being fetched from the live music catalogue…</p>}
        </section>

        {/* QUICK CATEGORY ACCESS — every category opens its own working catalogue */}
        <section className="zxh-home-categories" aria-label="Browse music categories">
          <div className="mb-5"><span className="text-xs font-extrabold uppercase tracking-[.2em] text-pink-600">Pick your sound</span><h2 className="mt-2 text-2xl sm:text-3xl font-black text-pink-600">Browse Categories</h2><p className="mt-1 text-sm text-slate-600">Open a category to explore its own music collection.</p></div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[{id:'hindi',title:'Hindi & Bollywood',desc:'Romance, hits and classics',emoji:'🎬'},{id:'punjabi',title:'Punjabi Beats',desc:'Desi hits and new sounds',emoji:'🔥'},{id:'naats',title:'Naats & Nasheeds',desc:'Urdu naats and devotionals',emoji:'🌙'},{id:'explore',title:'Explore All',desc:'Discover every music style',emoji:'🎧'}].map((item)=><button key={item.id} onClick={()=>setActiveTab(item.id as 'hindi'|'punjabi'|'naats'|'explore')} className="zxh-category-tile text-left rounded-2xl p-4 sm:p-5 transition-all"><span className="text-2xl">{item.emoji}</span><strong className="mt-3 block text-sm sm:text-base font-black text-pink-600">{item.title}</strong><span className="mt-1 block text-xs text-slate-600">{item.desc}</span><span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-pink-600">Open category <ChevronRight className="w-3.5 h-3.5"/></span></button>)}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION B: TRENDING NOW (Smooth Horizontal Rail)         */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-xs font-semibold uppercase tracking-widest mb-1">
                <Flame className="w-4 h-4 fill-current" />
                <span>Top Charts</span>
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Trending Now
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('explore')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-700 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Horizontal scroll track rail */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {liveTrending.slice(0, 12).map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              const liked = isLiked(track.id);
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track, liveTrending)}
                  className={`group relative bg-white/85 hover:bg-blue-50 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                    isCurrent
                      ? 'border-blue-300 shadow-[8px_8px_18px_rgba(148,163,184,.2),-6px_-6px_14px_white]'
                      : 'border-white/[0.06] hover:border-blue-200'
                  }`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-blue-50">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-blue-50/40 flex items-center justify-center transition-opacity ${
                        isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    >
                      <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-[5px_5px_12px_rgba(37,99,235,.22)]">
                        {isCurrent && isPlaying ? (
                          <Radio className="w-5 h-5 animate-pulse" />
                        ) : (
                          <Play className="w-5 h-5 fill-white translate-x-0.5" />
                        )}
                      </div>
                    </div>
                  </div>

                  <h3 className={`text-sm font-semibold truncate ${isCurrent ? 'text-blue-400' : 'text-white'}`}>
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {track.artist}
                  </p>

                  <div className="mt-2 pt-2 border-t border-white/[0.04] flex items-center justify-between text-[11px] text-slate-400">
                    <span className="font-mono">{formatTime(track.duration)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track);
                      }}
                      className="p-1 hover:text-white"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${liked ? 'fill-blue-500 text-blue-500' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION C: HINDI & BOLLYWOOD                             */}
        {/* ======================================================== */}
        <section className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-white via-blue-50 to-cyan-50 border border-blue-100 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Bollywood & Sufi Hits
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                Hindi Music Studio
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Soulful romantic melodies, emotional ballads, and blockbuster film tracks.
              </p>
            </div>

            {/* Sub-filter chips */}
            <div className="flex items-center gap-1.5 p-1 bg-blue-50/70 border border-white/[0.08] rounded-full text-xs">
              {(['all', 'romantic', 'sad', 'hits'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setHindiSubFilter(filter)}
                  className={`px-3 py-1 rounded-full capitalize transition-all ${
                    hindiSubFilter === filter
                      ? 'bg-blue-600 text-white font-semibold shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredHindiTracks.slice(0, 6).map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              const liked = isLiked(track.id);
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track, filteredHindiTracks)}
                  className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                    isCurrent
                      ? 'bg-blue-50 border-blue-500/50 shadow-md'
                      : 'bg-white/85/80 hover:bg-[#181822] border-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-3">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 shadow"
                    />
                    <div className="min-w-0">
                      <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-blue-400' : 'text-white'}`}>
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(track);
                      }}
                      className="p-1.5 text-slate-400 hover:text-white"
                    >
                      <Heart className={`w-4 h-4 ${liked ? 'fill-blue-500 text-blue-500' : ''}`} />
                    </button>
                    <div className="w-8 h-8 rounded-full bg-white/[0.06] group-hover:bg-blue-600 text-white flex items-center justify-center transition-all">
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION D: PUNJABI MUSIC                                 */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
                Loud & Proud
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                Punjabi Wave & Anthems
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                From Sidhu Moose Wala and Diljit Dosanjh to AP Dhillon and Karan Aujla.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('punjabi')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>Explore Punjabi</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {livePunjabi.slice(0, 5).map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track, livePunjabi)}
                  className={`group bg-white/85 hover:bg-[#161622] p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent ? 'border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.25)]' : 'border-white/[0.06] hover:border-amber-500/30'
                  }`}
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-3 bg-blue-50/70">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-blue-50/70 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-amber-500 text-black font-bold flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-black translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-white truncate group-hover:text-amber-400 transition-colors">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {track.artist}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION E: NAATS & ISLAMIC VOCALS (Distinct & Reverent)   */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden p-6 md:p-10 rounded-3xl bg-gradient-to-br from-[#071813] via-[#08120e] to-[#060809] border border-emerald-900/30 shadow-2xl">
          {/* Subtle Emerald Sacred Glow */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/40 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-2">
                <Star className="w-3.5 h-3.5" />
                <span>Devotional Sanctum</span>
              </div>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Naats, Nasheeds & Spiritual Vocals
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                Heartfelt Durood-o-Salam, Urdu Naat Shareef, Arabic Nasheeds, and peaceful spiritual recitations by Atif Aslam, Maher Zain, and Sami Yusuf.
              </p>
            </div>

            <button
              onClick={() => setActiveTab('naats')}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors self-start sm:self-end"
            >
              <span>Full Naat Collection</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory no-scrollbar">
            {liveNaats.slice(0, 12).map((track) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={track.id}
                  onClick={() => playTrack(track, liveNaats)}
                  className={`group relative w-[220px] sm:w-[250px] shrink-0 snap-start p-4 rounded-2xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-emerald-950/60 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.25)]'
                      : 'bg-[#0a1410]/70 hover:bg-[#0e1d17] border-emerald-900/20 hover:border-emerald-500/40'
                  }`}
                >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-3 bg-black/50">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] font-semibold text-emerald-400 tracking-wider uppercase">
                        Devotional Vocal
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors truncate">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {track.artist}
                  </p>
                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{formatTime(track.duration)}</span>
                    <div className="w-7 h-7 rounded-full bg-emerald-950/80 group-hover:bg-emerald-500 group-hover:text-black text-emerald-400 flex items-center justify-center transition-all">
                      <Play className="w-3.5 h-3.5 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION F: ENGLISH & INTERNATIONAL POP                   */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-cyan-400">
                International Hits
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                English Pop & Global Soundtracks
              </h2>
            </div>
            <button
              onClick={() => {
                setSearchQuery('English Pop Hits');
                setActiveTab('search');
              }}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>Explore Pop</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {liveEnglish.slice(0, 5).map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track, liveEnglish)}
                className="group bg-white/85 hover:bg-[#161622] p-3 rounded-2xl border border-white/[0.06] hover:border-blue-500/30 cursor-pointer transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-blue-400 truncate">
                  {track.title}
                </h4>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {track.artist}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION H: BROWSE BY MOOD                                */}
        {/* ======================================================== */}
        <section>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Personalized Discovery
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
              Browse By Mood & Scene
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Select your current headspace to launch instant curated musical atmospheres.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {MOOD_COLLECTIONS.map((mood) => (
              <div
                key={mood.id}
                onClick={() => handleMoodClick(mood.query)}
                className={`group p-5 rounded-2xl bg-gradient-to-br ${mood.color} border border-white/[0.08] hover:border-blue-500/40 shadow-lg cursor-pointer transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
                <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                  {mood.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {mood.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION I: FEATURED ARTISTS                              */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Studio Spotlight
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                Featured Artists
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {FEATURED_ARTISTS.map((artist) => (
              <div
                key={artist.id}
                onClick={() => {
                  if (artist.topTracks[0]) {
                    playTrack(artist.topTracks[0], artist.topTracks);
                  }
                }}
                className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white/85 hover:bg-[#181824] border border-white/[0.06] hover:border-blue-500/30 cursor-pointer transition-all"
              >
                <div className="relative w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-blue-600/40 via-cyan-500/20 to-transparent group-hover:from-blue-500 transition-colors shadow-lg mb-3">
                  <img
                    src={artist.coverUrl}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">
                  {artist.name}
                </h3>
                <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                  {artist.monthlyListeners} monthly
                </p>
                <span className="text-[10px] text-blue-400/80 mt-1 uppercase tracking-wider font-semibold">
                  {artist.genre}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION J: CURATED PLAYLISTS                             */}
        {/* ======================================================== */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                Editorial Suites
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight mt-0.5">
                Curated Playlists
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('playlists')}
              className="flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-400 transition-colors"
            >
              <span>All Playlists</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {CURATED_PLAYLISTS.map((pl) => (
              <div
                key={pl.id}
                onClick={() => setSelectedPlaylist(pl)}
                className="group bg-white/85 hover:bg-[#181824] p-3 rounded-2xl border border-white/[0.06] hover:border-blue-500/30 cursor-pointer transition-all"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5 bg-blue-50/70">
                  <img
                    src={pl.coverUrl}
                    alt={pl.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-blue-600/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                    <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                  </div>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-white group-hover:text-blue-400 truncate">
                  {pl.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
                  {pl.trackCount} Songs
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION K: PROMOTIONAL EDITORIAL BANNER                  */}
        {/* ======================================================== */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-white via-blue-50 to-cyan-50 border border-blue-800/40 p-8 md:p-12 shadow-2xl">
          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">
              ZXH OFFICIAL · AUDIO PLATFORM
            </span>
            <h2 className="font-serif-title text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Crafted for True Music Lovers and Nocturnal Creators.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Experience zero distractions, high-resolution audio preview streams, lossless local playback, and an iconic vinyl turntable player built from the ground up by <strong>ZULQARNAIN X HAIDER</strong>.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActiveTab('explore')}
                className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(239,68,68,0.5)] transition-all"
              >
                Start Listening Now
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
