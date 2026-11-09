import React from 'react';
import { Play, Pause, SlidersHorizontal, Heart, ChevronUp, Loader2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const MiniPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    togglePlay,
    openPlayer,
    isLiked,
    toggleLike,
    isLoadingAudio,
    isPlayerOpen,
  } = useMusic();

  if (!currentTrack || isPlayerOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const liked = isLiked(currentTrack.id);

  return (
    <aside 
      aria-label="Now Playing Bar"
      className="fixed bottom-[60px] left-0 right-0 z-40 px-3 py-1 pointer-events-none"
    >
      <div className="max-w-xl mx-auto pointer-events-auto">
        <div 
          onClick={openPlayer}
          className="relative group bg-[#111117]/95 hover:bg-[#161622]/95 backdrop-blur-2xl border border-white/[0.08] hover:border-red-500/30 rounded-2xl p-2.5 flex items-center justify-between shadow-[0_10px_35px_rgba(0,0,0,0.8)] cursor-pointer transition-all duration-200"
        >
          {/* Top Hairline Progress Bar */}
          <div className="absolute top-0 left-3 right-3 h-[2px] bg-white/[0.08] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-rose-400 shadow-[0_0_8px_#ef4444] transition-[width] duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Left: Thumbnail & Song Info */}
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0 shadow-md border border-white/[0.08]">
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className={`w-full h-full object-cover ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-500`}
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-red-950/20 flex items-center justify-center">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <h4 className="text-sm font-medium text-white truncate group-hover:text-red-400 transition-colors">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-slate-400 truncate">
                {currentTrack.artist}
              </p>
            </div>
          </div>

          {/* Right: Controls */}
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="flex items-center gap-1.5 shrink-0"
          >
            {/* Heart Favorite Button */}
            <button
              onClick={() => toggleLike(currentTrack)}
              aria-label={liked ? 'Unlike song' : 'Like song'}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]' : ''}`}
              />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-red-600/20 border border-white/[0.1] hover:border-red-500 text-white flex items-center justify-center transition-all shadow-[0_0_12px_rgba(225,29,72,0.15)]"
            >
              {isLoadingAudio ? (
                <Loader2 className="w-4 h-4 animate-spin text-red-400" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 fill-white text-white" />
              ) : (
                <Play className="w-4 h-4 fill-white text-white translate-x-0.5" />
              )}
            </button>

            {/* Equalizer / Expand Vinyl Player Button */}
            <button
              onClick={openPlayer}
              aria-label="Expand Full Player"
              title="Open Vinyl Player"
              className="p-2 text-slate-400 hover:text-red-400 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
