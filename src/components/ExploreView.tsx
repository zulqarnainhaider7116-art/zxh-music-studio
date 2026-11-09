import React from 'react';
import { Play, Sparkles, Disc, Flame, Moon, Compass, Headphones } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { CURATED_PLAYLISTS, CURATED_TRACKS, CURATED_ARTISTS } from '../data/curatedMusic';

export const ExploreView: React.FC = () => {
  const { playTrack, setSelectedPlaylist } = useMusic();

  const moods = [
    { title: 'Nocturnal Vibes', icon: Moon, desc: 'Deep beats, calm rhythms for 2AM', color: 'from-red-950/80 to-black', playlist: CURATED_PLAYLISTS[0] },
    { title: 'Cyberpunk & Synth', icon: Disc, desc: 'Neon pulse, retrowave synthesizers', color: 'from-rose-950/80 to-black', playlist: CURATED_PLAYLISTS[4] },
    { title: 'Peak Intensity', icon: Flame, desc: 'Driving basslines for workout power', color: 'from-amber-950/80 to-black', playlist: CURATED_PLAYLISTS[2] },
    { title: 'Acoustic Solitude', icon: Headphones, desc: 'Rainy strings, piano & soft vocals', color: 'from-zinc-900 to-black', playlist: CURATED_PLAYLISTS[5] },
  ];

  return (
    <div className="pb-36 pt-4 px-4 md:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 text-red-400 text-xs font-semibold mb-2 border border-red-800/40">
          <Compass className="w-3.5 h-3.5" />
          <span>Sonic Atmospheres</span>
        </div>
        <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Explore Moods & Frequencies
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Immerse yourself in hand-crafted dark audio environments and artist journeys.
        </p>
      </div>

      {/* Mood Stations Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {moods.map((mood, idx) => {
          const Icon = mood.icon;
          return (
            <div
              key={idx}
              onClick={() => setSelectedPlaylist(mood.playlist)}
              className={`p-5 rounded-2xl bg-gradient-to-br ${mood.color} border border-white/[0.08] hover:border-red-500/50 shadow-xl cursor-pointer group transition-all duration-300 relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="w-8 h-8 rounded-full bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_12px_#ef4444]">
                  <Play className="w-4 h-4 fill-white translate-x-0.5" />
                </div>
              </div>
              <h3 className="font-bold text-base text-white group-hover:text-red-400 transition-colors">
                {mood.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {mood.desc}
              </p>
            </div>
          );
        })}
      </section>

      {/* Featured Master Soundtracks */}
      <section>
        <h2 className="text-xl font-bold text-white tracking-tight mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-red-400" />
          <span>Cinematic Mastertracks</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURATED_TRACKS.slice(0, 6).map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, CURATED_TRACKS)}
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#121219] hover:bg-[#181824] border border-white/[0.06] hover:border-red-500/30 cursor-pointer transition-all group"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <img
                  src={track.coverUrl}
                  alt={track.title}
                  className="w-14 h-14 rounded-xl object-cover shrink-0 shadow-md group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors truncate">
                    {track.title}
                  </h3>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {track.artist} · {track.genre || 'Soundtrack'}
                  </p>
                  <span className="text-[11px] text-red-400/80 font-mono">
                    256 kbps Studio Master
                  </span>
                </div>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/[0.04] group-hover:bg-red-600/20 text-white flex items-center justify-center border border-white/[0.08] group-hover:border-red-500 transition-all shrink-0">
                <Play className="w-4 h-4 fill-white translate-x-0.5" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curated Playlists Showcase */}
      <section>
        <h2 className="text-xl font-bold text-white tracking-tight mb-4">
          Curated Sound Suites
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CURATED_PLAYLISTS.map((pl) => (
            <div
              key={pl.id}
              onClick={() => setSelectedPlaylist(pl)}
              className="p-2.5 rounded-2xl bg-[#121219] hover:bg-[#181822] border border-white/[0.06] hover:border-red-500/30 cursor-pointer transition-all group text-center"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-black/40">
                <img
                  src={pl.coverUrl}
                  alt={pl.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <h3 className="text-xs font-semibold text-white truncate group-hover:text-red-400">
                {pl.title}
              </h3>
              <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                {pl.trackCount} Tracks
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
