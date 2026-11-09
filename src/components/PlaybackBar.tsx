import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Repeat1,
  Heart,
  Volume2,
  VolumeX,
  Maximize2,
  ListMusic,
  FileText,
  Loader2,
  Disc,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { formatTime } from '../utils/audioUtils';

export const PlaybackBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    repeatMode,
    isShuffled,
    queue,
    queueIndex,
    isPlayerOpen,
    openPlayer,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    nextTrack,
    previousTrack,
    toggleShuffle,
    cycleRepeat,
    toggleLike,
    isLiked,
    playTrack,
    isLoadingAudio,
  } = useMusic();

  const [showQueueDrawer, setShowQueueDrawer] = useState(false);
  const [showLyricsDrawer, setShowLyricsDrawer] = useState(false);

  if (!currentTrack || isPlayerOpen) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const liked = isLiked(currentTrack.id);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSeconds = (parseFloat(e.target.value) / 100) * duration;
    seekTo(targetSeconds);
  };

  return (
    <>
      {/* Up Next Queue Quick Drawer (Popup above playback bar) */}
      {showQueueDrawer && (
        <div 
          role="region"
          aria-label="Playback Queue"
          className="fixed bottom-22 right-4 z-50 w-80 sm:w-96 max-h-[420px] bg-[#12121c]/98 border border-white/[0.1] rounded-2xl shadow-2xl backdrop-blur-2xl p-4 flex flex-col animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <ListMusic className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Up Next ({queue.length} Tracks)
              </span>
            </div>
            <button
              onClick={() => setShowQueueDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="overflow-y-auto space-y-1.5 flex-1 pr-1">
            {queue.map((track, idx) => {
              const isCurrent = idx === queueIndex;
              return (
                <div
                  key={`${track.id}-${idx}`}
                  onClick={() => playTrack(track, queue)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer text-xs transition-colors ${
                    isCurrent
                      ? 'bg-red-950/60 text-white font-semibold border border-red-500/40'
                      : 'hover:bg-white/[0.04] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-8 h-8 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="truncate text-white">{track.title}</p>
                      <p className="text-[11px] text-slate-400 truncate">{track.artist}</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 shrink-0 ml-2">
                    {formatTime(track.duration)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Synchronized Lyrics Quick Drawer (Popup above playback bar) */}
      {showLyricsDrawer && (
        <div 
          role="region"
          aria-label="Track Lyrics"
          className="fixed bottom-22 right-4 sm:right-28 z-50 w-80 sm:w-96 max-h-[420px] bg-[#12121c]/98 border border-white/[0.1] rounded-2xl shadow-2xl backdrop-blur-2xl p-4 flex flex-col animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              <span className="text-xs font-bold uppercase tracking-wider text-white truncate">
                Lyrics · {currentTrack.title}
              </span>
            </div>
            <button
              onClick={() => setShowLyricsDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="overflow-y-auto space-y-3 flex-1 text-center py-2 pr-1">
            {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
              currentTrack.lyrics.map((line, idx) => {
                const isHighlight =
                  Math.floor((currentTime / (duration || 30)) * currentTrack.lyrics!.length) === idx;
                return (
                  <p
                    key={idx}
                    className={`text-sm transition-all ${
                      isHighlight
                        ? 'text-red-400 font-bold text-base scale-105 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                        : 'text-slate-400'
                    }`}
                  >
                    {line}
                  </p>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 py-8">
                Instrumental piece or lyric synchronization unavailable for this preview.
              </p>
            )}
          </div>
        </div>
      )}

      {/* Main Bottom Website Playback Bar */}
      <footer 
        aria-label="Audio Playback Bar"
        className="fixed bottom-0 left-0 right-0 z-40 h-20 bg-[#0c0c14]/95 backdrop-blur-2xl border-t border-white/[0.08] px-4 sm:px-6 flex items-center justify-between gap-4 select-none shadow-[0_-8px_30px_rgba(0,0,0,0.8)]"
      >
        {/* Left Column: Track Info & Artwork */}
        <div className="flex items-center gap-3.5 w-1/4 min-w-[180px] max-w-[320px]">
          <div
            onClick={openPlayer}
            title="Expand Full Vinyl Player"
            className="relative w-13 h-13 rounded-xl overflow-hidden shrink-0 shadow-md border border-white/[0.1] group cursor-pointer"
          >
            <img
              src={currentTrack.coverUrl}
              alt={currentTrack.title}
              className={`w-full h-full object-cover ${isPlaying ? 'scale-105' : 'scale-100'} transition-transform duration-500`}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Maximize2 className="w-4 h-4 text-white" />
            </div>
            {isPlaying && (
              <span className="absolute bottom-1 right-1 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_6px_#ef4444] animate-ping" />
            )}
          </div>

          <div className="min-w-0 pr-1">
            <div className="flex items-center gap-2">
              <h4 
                onClick={openPlayer}
                className="text-xs sm:text-sm font-semibold text-white truncate cursor-pointer hover:text-red-400 transition-colors"
              >
                {currentTrack.title}
              </h4>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400 truncate mt-0.5">
              {currentTrack.artist}
            </p>
            <span className="text-[9px] text-red-400/90 font-mono tracking-wider">
              {currentTrack.isCurated ? 'Studio Master' : 'Official Stream'}
            </span>
          </div>

          {/* Like Heart Button */}
          <button
            onClick={() => toggleLike(currentTrack)}
            aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
            className="p-2 text-slate-400 hover:text-white transition-colors shrink-0"
          >
            <Heart
              className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_#ef4444]' : ''}`}
            />
          </button>
        </div>

        {/* Center Column: Playback Controls & Timeline Scrubber */}
        <div className="flex-1 max-w-xl flex flex-col items-center justify-center">
          {/* Controls Buttons Row */}
          <div className="flex items-center gap-3 sm:gap-5 mb-1">
            {/* Shuffle */}
            <button
              onClick={toggleShuffle}
              aria-label={isShuffled ? 'Shuffle is ON' : 'Shuffle is OFF'}
              className={`p-1.5 transition-colors ${
                isShuffled ? 'text-red-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Shuffle className="w-4 h-4" />
            </button>

            {/* Previous */}
            <button
              onClick={previousTrack}
              aria-label="Previous track"
              className="p-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <SkipBack className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-300" />
            </button>

            {/* Central Circular Play/Pause */}
            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause playback' : 'Start playback'}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white flex items-center justify-center shadow-[0_0_18px_rgba(239,68,68,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              {isLoadingAudio ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white" />
              ) : isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white translate-x-0.5" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={nextTrack}
              aria-label="Next track"
              className="p-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <SkipForward className="w-4 h-4 sm:w-5 sm:h-5 fill-slate-300" />
            </button>

            {/* Repeat */}
            <button
              onClick={cycleRepeat}
              aria-label={`Repeat mode: ${repeatMode}`}
              className={`p-1.5 transition-colors ${
                repeatMode !== 'off' ? 'text-red-500' : 'text-slate-400 hover:text-white'
              }`}
            >
              {repeatMode === 'one' ? (
                <Repeat1 className="w-4 h-4" />
              ) : (
                <Repeat className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Timeline & Scrubber Slider Row */}
          <div className="w-full flex items-center gap-2.5 text-[11px] font-mono text-slate-400">
            <span className="w-9 text-right shrink-0">{formatTime(currentTime)}</span>
            <div className="relative flex-1 flex items-center group">
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={progressPercent || 0}
                onChange={handleSeek}
                aria-label="Timeline seek"
                className="w-full h-1 bg-white/[0.12] rounded-full appearance-none cursor-pointer accent-red-600 focus:outline-none"
              />
            </div>
            <span className="w-9 text-left shrink-0">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right Column: Volume, Queue, Lyrics & Expand Controls */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4 min-w-[180px]">
          {/* Lyrics Drawer Toggle */}
          <button
            onClick={() => {
              setShowLyricsDrawer(!showLyricsDrawer);
              setShowQueueDrawer(false);
            }}
            title="View Synchronized Lyrics"
            aria-label="Toggle Lyrics"
            className={`p-2 rounded-lg transition-colors ${
              showLyricsDrawer
                ? 'text-red-400 bg-red-950/40'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <FileText className="w-4 h-4" />
          </button>

          {/* Up Next Queue Toggle */}
          <button
            onClick={() => {
              setShowQueueDrawer(!showQueueDrawer);
              setShowLyricsDrawer(false);
            }}
            title="Up Next Queue"
            aria-label="Toggle Playback Queue"
            className={`p-2 rounded-lg transition-colors ${
              showQueueDrawer
                ? 'text-red-400 bg-red-950/40'
                : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <ListMusic className="w-4 h-4" />
          </button>

          {/* Volume Slider & Mute */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={isMuted ? 'Unmute' : 'Mute'}
              className="text-slate-400 hover:text-white transition-colors"
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-red-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              aria-label="Volume level"
              className="w-18 sm:w-22 h-1 bg-white/[0.15] rounded-full appearance-none cursor-pointer accent-red-600 focus:outline-none"
            />
          </div>

          {/* Full Vinyl Player Expander */}
          <button
            onClick={openPlayer}
            title="Open Full Cinematic Vinyl Player"
            aria-label="Open Fullscreen Vinyl Turntable Player"
            className="p-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/[0.04] transition-colors"
          >
            <Disc className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </>
  );
};
