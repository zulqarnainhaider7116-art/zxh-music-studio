import React, { useState, useEffect } from 'react';
import {
  Play,
  Heart,
  Search,
  Sparkles,
  Disc,
  Radio,
  Star,
  Flame,
  Music2,
  Loader2,
  ChevronRight,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import {
  HINDI_TRACKS,
  PUNJABI_TRACKS,
  NAATS_TRACKS,
  ENGLISH_TRACKS,
  CURATED_TRACKS,
} from '../data/curatedMusic';
import { searchCategoryTracks, searchTracks } from '../services/musicApi';
import { Track } from '../types/music';
import { formatTime } from '../utils/audioUtils';

interface CategoryViewProps {
  category: 'hindi' | 'punjabi' | 'naats';
}

export const CategoryView: React.FC<CategoryViewProps> = ({ category }) => {
  const { playTrack, currentTrack, isPlaying, isLiked, toggleLike } = useMusic();

  const [tracks, setTracks] = useState<Track[]>(() => {
    switch (category) {
      case 'hindi':
        return HINDI_TRACKS;
      case 'punjabi':
        return PUNJABI_TRACKS;
      case 'naats':
        return NAATS_TRACKS;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const titles = {
    hindi: {
      tag: 'Bollywood & Hindi Cinema',
      title: 'Hindi Music Studio',
      desc: 'Explore romantic anthems, soulful Sufi melodies, heart-wrenching sad songs, and blockbuster Bollywood tracks.',
      filters: ['All', 'Romantic', 'Arijit Singh', 'Sad Songs', 'Classic Bollywood', 'New Releases'],
      bgGradient: 'from-sky-950/60 via-[#120810] to-[#08080a]',
      accentColor: 'text-pink-500',
    },
    punjabi: {
      tag: 'Desi Hip-Hop & Folk Beats',
      title: 'Punjabi Music Wave',
      desc: 'High-octane Punjabi hits, heavy 808 basslines, swagger anthems and modern folk compositions.',
      filters: ['All', 'Sidhu Moose Wala', 'Diljit Dosanjh', 'AP Dhillon', 'Karan Aujla', 'Bhangra Hits'],
      bgGradient: 'from-amber-950/60 via-[#140f0a] to-[#08080a]',
      accentColor: 'text-pink-500',
    },
    naats: {
      tag: 'Sacred Devotional Vocals',
      title: 'Naats, Nasheeds & Spiritual Solitude',
      desc: 'Peaceful Urdu Naats, soulful Hamd, Arabic Nasheeds, and reverent Durood-o-Salam praising the Holy Prophet (PBUH).',
      filters: ['All', 'Atif Aslam Naats', 'Maher Zain', 'Sami Yusuf', 'Owais Raza Qadri', 'Urdu Kalam'],
      bgGradient: 'from-emerald-950/60 via-[#07120e] to-[#08080a]',
      accentColor: 'text-pink-500',
    },
  }[category];

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    const term = searchQuery.trim() || (activeFilter !== 'All' ? activeFilter : undefined);
    searchCategoryTracks(category, term)
      .then((res) => {
        if (isMounted) {
          setTracks(res.length ? res : (category === 'hindi' ? HINDI_TRACKS : category === 'punjabi' ? PUNJABI_TRACKS : NAATS_TRACKS));
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category, activeFilter, searchQuery]);

  return (
    <div className="pb-36 pt-6 px-4 md:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      {/* Category Hero Banner */}
      <section className={`relative overflow-hidden p-8 md:p-12 rounded-3xl bg-gradient-to-r ${titles.bgGradient} border border-white/[0.08] shadow-2xl`}>
        <div className="relative z-10 max-w-2xl space-y-3">
          <span className={`text-xs font-bold uppercase tracking-widest ${titles.accentColor}`}>
            {titles.tag}
          </span>
          <h1 className="font-serif-title text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            {titles.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {titles.desc}
          </p>
        </div>
      </section>

      {/* Filter Chips & In-Category Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {titles.filters.map((f) => (
            <button
              key={f}
              onClick={() => {
                setActiveFilter(f);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                activeFilter === f
                  ? 'bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold shadow-md'
                  : 'bg-white/85 hover:bg-[#181824] text-slate-500 hover:text-slate-900 border border-white/[0.06]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveFilter('All');
            }}
            placeholder={`Search in ${titles.title}...`}
            className="w-full bg-white/85 border border-white/[0.08] focus:border-blue-500 rounded-full pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Tracks Grid */}
      {isLoading ? (
        <div className="text-center py-20">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Fetching genuine audio tracks from streaming catalog...</p>
        </div>
      ) : tracks.length === 0 ? (
        <div className="text-center py-20 bg-white/85 rounded-3xl border border-white/[0.06] p-8">
          <Music2 className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-900">No tracks found</h3>
          <p className="text-xs text-slate-500 mt-1">Try another search keyword or select All.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {tracks.map((track) => {
            const isCurrent = currentTrack?.id === track.id;
            const liked = isLiked(track.id);
            return (
              <div
                key={track.id}
                onClick={() => playTrack(track, tracks)}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer group ${
                  isCurrent
                    ? 'bg-blue-950/40 border-blue-500/60 shadow-lg'
                    : 'bg-white/85 hover:bg-[#181824] border-white/[0.06] hover:border-white/[0.12]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-12 h-12 rounded-xl object-cover shrink-0 shadow"
                  />
                  <div className="min-w-0">
                    <h4 className={`text-sm font-semibold truncate ${isCurrent ? 'text-blue-400' : 'text-slate-900'}`}>
                      {track.title}
                    </h4>
                    <p className="text-xs text-slate-500 truncate mt-0.5">
                      {track.artist} {track.album ? `· ${track.album}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(track);
                    }}
                    className="p-1.5 text-slate-500 hover:text-slate-900"
                  >
                    <Heart className={`w-4 h-4 ${liked ? 'fill-blue-500 text-blue-500' : ''}`} />
                  </button>
                  <div className="w-9 h-9 rounded-full bg-white/[0.06] group-hover:bg-blue-600 text-slate-900 flex items-center justify-center transition-all shadow-md">
                    {isCurrent && isPlaying ? (
                      <Radio className="w-4 h-4 text-blue-400 group-hover:text-slate-900 animate-pulse" />
                    ) : (
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
