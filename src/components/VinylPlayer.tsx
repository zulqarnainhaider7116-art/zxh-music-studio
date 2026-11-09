import React, { useState, useMemo } from 'react';
import {
  ChevronDown,
  MoreHorizontal,
  Heart,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  FileText,
  ListMusic,
  Volume2,
  VolumeX,
  Share2,
  Check,
  Radio,
  Plus,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { formatTime } from '../utils/audioUtils';

export const VinylPlayer: React.FC = () => {
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
    closePlayer,
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
    playlists,
    addTrackToPlaylist,
    setShowCreatePlaylistModal,
  } = useMusic();

  const [activeTab, setActiveTab] = useState<'player' | 'lyrics' | 'queue'>('player');
  const [copiedShare, setCopiedShare] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [playlistAddedToast, setPlaylistAddedToast] = useState<string | null>(null);

  // Generate deterministic audio visualizer bars based on track id & duration
  const waveformBars = useMemo(() => {
    const bars: number[] = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      // undulating curved waveform pattern
      const angle = (i / count) * Math.PI * 3;
      const height = Math.sin(angle) * 0.4 + Math.cos(i * 0.5) * 0.3 + 0.3;
      bars.push(Math.max(0.15, Math.min(1.0, height)));
    }
    return bars;
  }, [currentTrack?.id]);

  if (!isPlayerOpen || !currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const liked = isLiked(currentTrack.id);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetSeconds = (parseFloat(e.target.value) / 100) * duration;
    seekTo(targetSeconds);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Listening to "${currentTrack.title}" by ${currentTrack.artist} on ZXH MUSIC STUDIO — Music Lives Here.`
      );
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const handleAddToPlaylist = (playlistId: string, playlistTitle: string) => {
    addTrackToPlaylist(playlistId, currentTrack);
    setShowPlaylistMenu(false);
    setPlaylistAddedToast(`Added to "${playlistTitle}"`);
    setTimeout(() => setPlaylistAddedToast(null), 2500);
  };

  return (
    <div 
      role="dialog"
      aria-modal="true"
      aria-label="Full Screen Vinyl Player"
      className="fixed inset-0 z-50 bg-[#08080a] text-slate-100 flex flex-col justify-between overflow-y-auto overflow-x-hidden selection:bg-red-600 animate-fadeIn"
    >
      {/* Ambient Crimson Radial Backdrop */}
      <div className="fixed inset-0 pointer-events-none bg-crimson-radial opacity-80" />

      {/* Top Bar */}
      <header className="relative z-10 w-full max-w-2xl mx-auto px-6 pt-5 pb-2 flex items-center justify-between">
        <button
          onClick={closePlayer}
          aria-label="Minimize player"
          className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
        >
          <ChevronDown className="w-5 h-5" />
        </button>

        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
            Playing From Playlist
          </p>
          <h2 className="text-xs md:text-sm font-medium text-slate-200 truncate max-w-[220px]">
            {currentTrack.album || 'Midnight Vibes'}
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
            aria-label="Track options menu"
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white transition-colors"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {/* Add to playlist menu dropdown */}
          {showPlaylistMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#161620] border border-white/[0.1] rounded-2xl p-2 shadow-2xl z-20 backdrop-blur-xl">
              <p className="text-[11px] font-semibold text-slate-400 px-3 py-1 uppercase tracking-wider">
                Add to Playlist
              </p>
              <div className="max-h-48 overflow-y-auto space-y-1">
                {playlists.map((pl) => (
                  <button
                    key={pl.id}
                    onClick={() => handleAddToPlaylist(pl.id, pl.title)}
                    className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-red-950/60 hover:text-white rounded-lg transition-colors truncate"
                  >
                    {pl.title}
                  </button>
                ))}
              </div>
              <div className="border-t border-white/[0.06] mt-1 pt-1">
                <button
                  onClick={() => {
                    setShowPlaylistMenu(false);
                    setShowCreatePlaylistModal(true);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-red-400 hover:bg-red-950/60 rounded-lg transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Playlist</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Player Content Area */}
      <main className="relative z-10 w-full max-w-lg mx-auto px-6 py-2 flex-1 flex flex-col items-center justify-center">
        {/* Tab switcher: Player Turntable vs Lyrics vs Queue */}
        <div className="w-full flex justify-center mb-3">
          <div className="inline-flex items-center gap-1 p-1 bg-white/[0.04] border border-white/[0.06] rounded-full text-xs">
            <button
              onClick={() => setActiveTab('player')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'player'
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)] font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Turntable
            </button>
            <button
              onClick={() => setActiveTab('lyrics')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'lyrics'
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)] font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Lyrics
            </button>
            <button
              onClick={() => setActiveTab('queue')}
              className={`px-3 py-1 rounded-full transition-all ${
                activeTab === 'queue'
                  ? 'bg-red-600 text-white shadow-[0_0_12px_rgba(239,68,68,0.5)] font-medium'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Queue ({queue.length})
            </button>
          </div>
        </div>

        {/* Tab 1: Realistic Vinyl Turntable Display */}
        {activeTab === 'player' && (
          <div className="w-full flex flex-col items-center">
            {/* Vinyl Record & Turntable Tonearm Container */}
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 my-1 sm:my-2 flex items-center justify-center select-none">
              {/* Outer Glowing Crimson Neon Ring */}
              <div className="absolute inset-0 rounded-full border border-red-500/30 shadow-[0_0_40px_rgba(239,68,68,0.35)] animate-pulse" />

              {/* Turntable Platter Base */}
              <div className="relative w-[96%] h-[96%] rounded-full bg-[#0a0a0d] border border-white/[0.08] shadow-2xl flex items-center justify-center">
                {/* Rotating Vinyl Record */}
                <div
                  className={`relative w-[92%] h-[92%] rounded-full shadow-[inset_0_0_30px_rgba(0,0,0,0.95)] flex items-center justify-center overflow-hidden ${
                    isPlaying ? 'animate-vinyl-spin' : 'animate-vinyl-spin-paused'
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle, #0e0e12 0%, #15151a 15%, #08080a 28%, #15151a 45%, #09090c 60%, #17171e 80%, #050507 100%)',
                  }}
                >
                  {/* Subtle Vinyl Grooves */}
                  <div className="absolute inset-2 rounded-full border border-white/[0.03]" />
                  <div className="absolute inset-6 rounded-full border border-white/[0.04]" />
                  <div className="absolute inset-10 rounded-full border border-white/[0.03]" />
                  <div className="absolute inset-14 rounded-full border border-white/[0.04]" />
                  <div className="absolute inset-18 rounded-full border border-white/[0.03]" />
                  <div className="absolute inset-22 rounded-full border border-white/[0.04]" />

                  {/* Grooves light reflection sheen */}
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-20"
                    style={{
                      background: 'conic-gradient(from 45deg, transparent 0deg, rgba(255,255,255,0.18) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.18) 225deg, transparent 270deg)',
                    }}
                  />

                  {/* Vinyl Center Album Art Badge */}
                  <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-[2px] bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 shadow-xl overflow-hidden">
                    <img
                      src={currentTrack.coverUrl}
                      alt={currentTrack.title}
                      className="w-full h-full object-cover rounded-full"
                    />
                    {/* Vinyl Center Spindle Hole */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#08080a] border border-white/20 shadow-inner" />
                  </div>
                </div>

                {/* Realistic Turntable Tonearm Graphic (Top-Right) */}
                <div 
                  className={`absolute top-2 right-2 w-28 h-40 pointer-events-none transition-transform duration-700 origin-top-right ${
                    isPlaying ? 'rotate-12 translate-y-1' : '-rotate-6'
                  }`}
                >
                  {/* Pivot Base */}
                  <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-zinc-600 shadow-lg flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-zinc-400" />
                  </div>
                  {/* Arm Stem */}
                  <div className="absolute top-5 right-3 w-1.5 h-28 bg-gradient-to-r from-zinc-400 via-zinc-200 to-zinc-500 rounded-full shadow-md transform -rotate-25 origin-top" />
                  {/* Cartridge & Glowing Crimson Stylus */}
                  <div className="absolute bottom-4 left-2 w-4 h-6 bg-zinc-900 border border-zinc-700 rounded-sm shadow flex items-center justify-center transform -rotate-15">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* Song Title, Artist & Like Button */}
            <div className="w-full mt-4 mb-2 flex items-center justify-between">
              <div className="min-w-0 pr-4">
                <h1 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight truncate">
                  {currentTrack.title}
                </h1>
                <p className="text-sm sm:text-base text-slate-400 truncate mt-0.5 font-normal">
                  {currentTrack.artist}
                </p>
              </div>

              <button
                onClick={() => toggleLike(currentTrack)}
                aria-label={liked ? 'Unlike song' : 'Like song'}
                className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white transition-all shrink-0"
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    liked
                      ? 'fill-red-500 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.8)] scale-110'
                      : 'hover:text-red-400'
                  }`}
                />
              </button>
            </div>

            {/* Sound Waveform Visualizer & Seek Bar */}
            <div className="w-full my-3">
              {/* Dynamic Waveform Bars */}
              <div className="h-10 flex items-center justify-between gap-[2px] px-1 select-none">
                {waveformBars.map((val, idx) => {
                  const barProgress = (idx / waveformBars.length) * 100;
                  const isPast = barProgress <= progressPercent;
                  // add rhythmic bounce when playing
                  const dynamicHeight = isPlaying
                    ? Math.min(100, Math.max(15, val * 100 + (idx % 3 === 0 ? 15 : -10)))
                    : val * 100;

                  return (
                    <div
                      key={idx}
                      onClick={() => seekTo((barProgress / 100) * duration)}
                      className="flex-1 flex items-center justify-center cursor-pointer py-1 group"
                    >
                      <div
                        className={`w-full rounded-full transition-all duration-150 ${
                          isPast
                            ? 'bg-gradient-to-t from-red-600 to-rose-400 shadow-[0_0_6px_rgba(239,68,68,0.5)]'
                            : 'bg-white/[0.12] group-hover:bg-white/30'
                        }`}
                        style={{ height: `${dynamicHeight}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Seek Slider */}
              <div className="relative mt-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="0.1"
                  value={progressPercent || 0}
                  onChange={handleSeek}
                  aria-label="Seek track"
                  className="w-full h-1.5 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
                />
              </div>

              {/* Time Indicators */}
              <div className="flex justify-between text-xs text-slate-400 mt-1 font-mono tracking-wider">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Main Playback Controls */}
            <div className="w-full flex items-center justify-between px-2 my-2">
              {/* Shuffle Button */}
              <button
                onClick={toggleShuffle}
                aria-label={isShuffled ? 'Shuffle enabled' : 'Shuffle disabled'}
                className={`p-3 rounded-full transition-colors ${
                  isShuffled
                    ? 'text-red-500 bg-red-950/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Shuffle className="w-5 h-5" />
              </button>

              {/* Previous Track */}
              <button
                onClick={previousTrack}
                aria-label="Previous track"
                className="p-3 text-slate-300 hover:text-white transition-colors"
              >
                <SkipBack className="w-6 h-6 fill-slate-300" />
              </button>

              {/* Large Glowing Crimson Play/Pause Button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-16 h-16 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.65)] hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-7 h-7 fill-white text-white" />
                ) : (
                  <Play className="w-7 h-7 fill-white text-white translate-x-0.5" />
                )}
              </button>

              {/* Next Track */}
              <button
                onClick={nextTrack}
                aria-label="Next track"
                className="p-3 text-slate-300 hover:text-white transition-colors"
              >
                <SkipForward className="w-6 h-6 fill-slate-300" />
              </button>

              {/* Repeat Button */}
              <button
                onClick={cycleRepeat}
                aria-label={`Repeat mode: ${repeatMode}`}
                className={`p-3 rounded-full transition-colors ${
                  repeatMode !== 'off'
                    ? 'text-red-500 bg-red-950/40 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {repeatMode === 'one' ? (
                  <Repeat1 className="w-5 h-5" />
                ) : (
                  <Repeat className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Synchronized Lyrics View */}
        {activeTab === 'lyrics' && (
          <div className="w-full flex-1 max-h-[380px] overflow-y-auto px-4 py-6 text-center space-y-5">
            <h3 className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-4">
              Lyrics · {currentTrack.title}
            </h3>
            {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
              currentTrack.lyrics.map((line, index) => {
                const isHighlight = Math.floor((currentTime / (duration || 30)) * currentTrack.lyrics!.length) === index;
                return (
                  <p
                    key={index}
                    className={`text-base sm:text-lg transition-all duration-300 ${
                      isHighlight
                        ? 'font-serif-title text-red-400 font-bold text-xl sm:text-2xl drop-shadow-[0_0_12px_rgba(239,68,68,0.6)]'
                        : 'text-slate-400 font-normal hover:text-slate-200'
                    }`}
                  >
                    {line}
                  </p>
                );
              })
            ) : (
              <div className="py-12 text-slate-400">
                <p>Instrumental track or lyrics unavailable.</p>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Up Next Queue Drawer */}
        {activeTab === 'queue' && (
          <div className="w-full flex-1 max-h-[380px] overflow-y-auto px-2 py-4 space-y-2">
            <div className="flex items-center justify-between mb-2 px-2">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                Up Next ({queue.length} Tracks)
              </span>
              <button
                onClick={toggleShuffle}
                className="text-xs text-red-400 hover:underline flex items-center gap-1"
              >
                <Shuffle className="w-3 h-3" />
                <span>Shuffle Queue</span>
              </button>
            </div>
            {queue.map((track, idx) => {
              const isCurrent = idx === queueIndex;
              return (
                <div
                  key={`${track.id}-${idx}`}
                  onClick={() => playTrack(track, queue)}
                  className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-red-950/60 border border-red-500/40 text-white'
                      : 'bg-white/[0.03] hover:bg-white/[0.06] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs font-mono w-4 text-slate-400 shrink-0">
                      {idx + 1}
                    </span>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className={`text-sm truncate ${isCurrent ? 'font-bold text-red-400' : 'font-medium text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-mono text-slate-400">
                      {formatTime(track.duration)}
                    </span>
                    {isCurrent && (
                      <Radio className="w-4 h-4 text-red-500 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Bottom Action Footer matching Screen 2 in reference */}
      <footer className="relative z-10 w-full max-w-lg mx-auto px-6 py-4 border-t border-white/[0.06]">
        {/* Volume Slider Control */}
        <div className="flex items-center gap-3 mb-4 px-2">
          <button
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute volume' : 'Mute volume'}
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
            aria-label="Volume slider"
            className="w-full h-1 bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none"
          />
          <span className="text-xs font-mono text-slate-400 w-8 text-right">
            {isMuted ? '0%' : `${Math.round(volume * 100)}%`}
          </span>
        </div>

        {/* Bottom 4 action icons: Lyrics, Queue, Audio Quality, Share */}
        <div className="flex items-center justify-around text-slate-400">
          <button
            onClick={() => setActiveTab(activeTab === 'lyrics' ? 'player' : 'lyrics')}
            className={`flex flex-col items-center gap-1 hover:text-white transition-colors ${
              activeTab === 'lyrics' ? 'text-red-400 font-semibold' : ''
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Lyrics</span>
          </button>

          <button
            onClick={() => setActiveTab(activeTab === 'queue' ? 'player' : 'queue')}
            className={`flex flex-col items-center gap-1 hover:text-white transition-colors ${
              activeTab === 'queue' ? 'text-red-400 font-semibold' : ''
            }`}
          >
            <ListMusic className="w-5 h-5" />
            <span className="text-[10px] tracking-wider uppercase">Queue</span>
          </button>

          <div className="flex flex-col items-center gap-1 text-slate-400 cursor-default">
            <Radio className="w-5 h-5 text-emerald-400" />
            <span className="text-[10px] tracking-wider uppercase">HQ 256k</span>
          </div>

          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-1 hover:text-white transition-colors"
          >
            {copiedShare ? (
              <>
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-[10px] tracking-wider uppercase text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-5 h-5" />
                <span className="text-[10px] tracking-wider uppercase">Share</span>
              </>
            )}
          </button>
        </div>

        {/* Toast confirmation */}
        {playlistAddedToast && (
          <div className="mt-2 text-center text-xs text-red-300 bg-red-950/80 border border-red-800/60 rounded-full py-1.5 px-3">
            {playlistAddedToast}
          </div>
        )}
      </footer>
    </div>
  );
};
