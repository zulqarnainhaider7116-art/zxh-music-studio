import React from 'react';
import { Play, SlidersHorizontal, ChevronRight, Heart, Sparkles, Disc3, Radio } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { CURATED_PLAYLISTS, CURATED_TRACKS, GENRE_CATEGORIES, CURATED_ARTISTS } from '../data/curatedMusic';
import { Track } from '../types/music';

export const HomeDiscover: React.FC = () => {
  const {
    playTrack,
    currentTrack,
    isPlaying,
    genreFilter,
    setGenreFilter,
    setActiveTab,
    isLiked,
    toggleLike,
    setSelectedPlaylist,
    recentlyPlayed,
  } = useMusic();

  const featuredPlaylist = CURATED_PLAYLISTS[0]; // Midnight Vibes

  const filteredTracks = React.useMemo(() => {
    if (genreFilter === 'All') return CURATED_TRACKS;
    return CURATED_TRACKS.filter(
      (t) => t.genre?.toLowerCase() === genreFilter.toLowerCase()
    );
  }, [genreFilter]);

  const handlePlayHero = () => {
    if (featuredPlaylist && featuredPlaylist.tracks.length > 0) {
      playTrack(featuredPlaylist.tracks[0], featuredPlaylist.tracks);
    }
  };

  return (
    <div className="pb-36 pt-2 px-4 md:px-8 max-w-7xl mx-auto space-y-7 animate-fadeIn">
      {/* Editorial Hero Header matching Screen 1 */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#120a10] via-[#1a0c14] to-[#0d0910] border border-red-950/40 p-6 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.7)]">
        {/* Ambient Crimson Glow Sphere */}
        <div className="absolute top-0 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/15 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-lg space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800/40 text-red-400 text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>ZXH MUSIC STUDIO · NOIR EDITION</span>
            </div>

            <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Discover <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-amber-300 italic font-normal drop-shadow-[0_0_25px_rgba(239,68,68,0.4)]">
                New Sounds
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-400 max-w-md font-normal leading-relaxed">
              Music for every mood, moment and you. Stream licensed previews and high-fidelity studio productions in dark cinematic harmony.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handlePlayHero}
                aria-label="Play featured playlist"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-sm shadow-[0_0_20px_rgba(239,68,68,0.45)] hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play Midnight Vibes</span>
              </button>

              <button
                onClick={() => setActiveTab('explore')}
                aria-label="Explore catalog"
                className="px-5 py-2.5 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-slate-200 text-sm font-medium transition-all"
              >
                Browse Genres
              </button>
            </div>
          </div>

          {/* Hero Visual Imagery */}
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden shadow-2xl border border-red-500/20 shrink-0 group">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80"
              alt="Discover New Sounds Headphones"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-red-950/30 to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
              <span className="font-semibold text-white">Midnight Vibes</span>
              <span className="text-red-400 font-mono">48 Tracks</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Search Bar matching Reference */}
      <section>
        <div 
          onClick={() => setActiveTab('search')}
          className="group relative flex items-center gap-3 bg-[#13131a] hover:bg-[#181822] border border-white/[0.08] hover:border-red-500/40 rounded-2xl px-4 py-3.5 shadow-lg cursor-pointer transition-all"
        >
          <div className="p-1 text-slate-400 group-hover:text-red-400 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="flex-1 text-sm text-slate-400 group-hover:text-slate-200 transition-colors select-none">
            Search songs, artists, playlists...
          </span>
          <div className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 group-hover:text-white transition-colors">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* Genre and Mood Filter Pills matching Reference */}
      <section>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {GENRE_CATEGORIES.map((genre) => {
            const isActive = genreFilter === genre;
            return (
              <button
                key={genre}
                onClick={() => setGenreFilter(genre)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 select-none ${
                  isActive
                    ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)] font-semibold'
                    : 'bg-[#14141c] hover:bg-[#1c1c28] text-slate-400 hover:text-white border border-white/[0.06]'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Playlist Card matching Reference (Midnight Vibes) */}
      <section>
        <div 
          onClick={() => {
            setSelectedPlaylist(featuredPlaylist);
          }}
          className="relative group overflow-hidden rounded-3xl bg-gradient-to-br from-[#1b0d16] via-[#140a12] to-[#0a070c] border border-red-900/30 p-6 sm:p-7 shadow-xl cursor-pointer hover:border-red-500/40 transition-all duration-300"
        >
          {/* Ambient red lighting glow */}
          <div className="absolute -top-16 -right-16 w-60 h-60 bg-red-600/20 rounded-full blur-3xl group-hover:bg-red-600/30 transition-all" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-md">
              <span className="text-[11px] uppercase tracking-[0.2em] text-red-400 font-bold">
                Featured Playlist
              </span>
              <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {featuredPlaylist.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {featuredPlaylist.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 font-mono">
                <span>{featuredPlaylist.trackCount} Tracks</span>
                <span aria-hidden="true">·</span>
                <span>HQ Stream</span>
              </div>
            </div>

            {/* Glowing Red Circular Play Button matching Reference */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePlayHero();
              }}
              aria-label="Play Midnight Vibes"
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.7)] group-hover:scale-110 active:scale-95 transition-all self-end sm:self-center shrink-0"
            >
              <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Top Picks For You section matching Reference */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Top Picks For You
            </h2>
            <p className="text-xs text-slate-400">
              Curated for your nocturnal listening session
            </p>
          </div>
          <button
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Horizontal track cards scroll */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {filteredTracks.slice(0, 5).map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, filteredTracks)}
                className={`group relative bg-[#121219] hover:bg-[#181824] p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isCurrent ? 'border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.25)]' : 'border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                {/* Artwork with hover play button */}
                <div className="relative aspect-square rounded-xl overflow-hidden mb-2.5 bg-black/40">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity ${
                    isCurrent && isPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-[0_0_15px_#ef4444]">
                      {isCurrent && isPlaying ? (
                        <Radio className="w-4 h-4 animate-pulse" />
                      ) : (
                        <Play className="w-4 h-4 fill-white translate-x-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                <h3 className={`text-sm font-semibold truncate ${isCurrent ? 'text-red-400' : 'text-white'}`}>
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

      {/* Recently Played List matching Reference */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Recently Played
          </h2>
          <button
            onClick={() => setActiveTab('library')}
            className="flex items-center gap-1 text-xs font-medium text-slate-400 hover:text-red-400 transition-colors"
          >
            <span>See All</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="space-y-2">
          {recentlyPlayed.slice(0, 4).map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            const liked = isLiked(track.id);
            return (
              <div
                key={`${track.id}-${idx}`}
                onClick={() => playTrack(track, recentlyPlayed)}
                className={`flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#181116] border-red-500/40'
                    : 'bg-[#111117] hover:bg-[#171722] border-white/[0.05]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    {isCurrent && isPlaying && (
                      <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center">
                        <Disc3 className="w-5 h-5 text-red-400 animate-spin" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-medium truncate ${isCurrent ? 'text-red-400 font-bold' : 'text-white'}`}>
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate">
                      {track.artist} {track.album ? `· ${track.album}` : ''}
                    </p>
                  </div>
                </div>

                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex items-center gap-2 shrink-0"
                >
                  <button
                    onClick={() => toggleLike(track)}
                    aria-label={liked ? 'Unlike' : 'Like'}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_#ef4444]' : ''}`}
                    />
                  </button>

                  <button
                    onClick={() => playTrack(track, recentlyPlayed)}
                    aria-label={`Play ${track.title}`}
                    className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-red-600/20 text-white flex items-center justify-center border border-white/[0.08] hover:border-red-500 transition-colors"
                  >
                    {isCurrent && isPlaying ? (
                      <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Artists section */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Featured Artists
            </h2>
            <p className="text-xs text-slate-400">
              Masters of atmospheric and cinematic music
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CURATED_ARTISTS.map((artist) => (
            <div
              key={artist.id}
              onClick={() => {
                if (artist.topTracks[0]) {
                  playTrack(artist.topTracks[0], artist.topTracks);
                }
              }}
              className="group flex flex-col items-center text-center p-4 rounded-2xl bg-[#111117] hover:bg-[#171722] border border-white/[0.06] hover:border-red-500/30 cursor-pointer transition-all"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden p-[2px] bg-gradient-to-br from-red-600/40 to-transparent group-hover:from-red-500 transition-colors shadow-lg mb-3">
                <img
                  src={artist.coverUrl}
                  alt={artist.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                {artist.name}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {artist.monthlyListeners} monthly
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
