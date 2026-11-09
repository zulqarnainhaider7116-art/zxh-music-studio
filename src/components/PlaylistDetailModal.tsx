import React from 'react';
import { X, Play, Shuffle, Trash2, Music, Clock } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { formatTime } from '../utils/audioUtils';

export const PlaylistDetailModal: React.FC = () => {
  const {
    selectedPlaylist,
    setSelectedPlaylist,
    playTrack,
    currentTrack,
    isPlaying,
    removeTrackFromPlaylist,
    deletePlaylist,
    toggleShuffle,
  } = useMusic();

  if (!selectedPlaylist) return null;

  const totalDurationSeconds = selectedPlaylist.tracks.reduce((acc, t) => acc + (t.duration || 0), 0);

  const handlePlayAll = () => {
    if (selectedPlaylist.tracks.length > 0) {
      playTrack(selectedPlaylist.tracks[0], selectedPlaylist.tracks);
    }
  };

  const handleShufflePlay = () => {
    if (selectedPlaylist.tracks.length > 0) {
      toggleShuffle();
      playTrack(selectedPlaylist.tracks[0], selectedPlaylist.tracks);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Playlist ${selectedPlaylist.title}`}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="relative w-full max-w-2xl bg-[#0f0f15] border border-white/[0.1] rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setSelectedPlaylist(null)}
          aria-label="Close playlist view"
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Hero Area */}
        <div className="p-6 md:p-8 flex flex-col sm:flex-row items-center sm:items-end gap-6 border-b border-white/[0.08] relative z-0">
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden shrink-0 shadow-2xl border border-white/[0.1]">
            <img
              src={selectedPlaylist.coverUrl}
              alt={selectedPlaylist.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left min-w-0">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-red-400">
              {selectedPlaylist.isUserCreated ? 'Custom Playlist' : 'Curated Studio Playlist'}
            </span>
            <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-white tracking-tight truncate">
              {selectedPlaylist.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2">
              {selectedPlaylist.description}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-3 text-xs text-slate-400 font-mono pt-1">
              <span>{selectedPlaylist.tracks.length} Songs</span>
              <span aria-hidden="true">·</span>
              <span>{formatTime(totalDurationSeconds)} Total</span>
            </div>

            {/* Actions: Play All & Shuffle & Delete */}
            <div className="flex items-center justify-center sm:justify-start gap-2.5 pt-3">
              <button
                onClick={handlePlayAll}
                disabled={selectedPlaylist.tracks.length === 0}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-600 to-rose-500 hover:from-red-500 hover:to-rose-400 text-white font-medium text-xs sm:text-sm shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:opacity-50 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Play All</span>
              </button>

              <button
                onClick={handleShufflePlay}
                disabled={selectedPlaylist.tracks.length === 0}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 text-xs sm:text-sm border border-white/[0.08] transition-colors"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>Shuffle</span>
              </button>

              {selectedPlaylist.isUserCreated && (
                <button
                  onClick={() => deletePlaylist(selectedPlaylist.id)}
                  title="Delete this custom playlist"
                  aria-label="Delete playlist"
                  className="p-2 rounded-full bg-red-950/30 hover:bg-red-900/60 text-red-400 border border-red-800/40 transition-colors ml-auto"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2">
          {selectedPlaylist.tracks.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Music className="w-8 h-8 mx-auto mb-2 text-slate-500" />
              <p className="text-sm">This playlist is currently empty.</p>
              <p className="text-xs text-slate-400 mt-1">
                Use the Search tab or "+" buttons across tracks to add songs here!
              </p>
            </div>
          ) : (
            selectedPlaylist.tracks.map((track, idx) => {
              const isCurrent = currentTrack?.id === track.id;
              return (
                <div
                  key={`${track.id}-${idx}`}
                  onClick={() => playTrack(track, selectedPlaylist.tracks)}
                  className={`flex items-center justify-between p-2.5 rounded-xl border transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-red-950/40 border-red-500/40 text-white'
                      : 'bg-[#14141c] hover:bg-[#1a1a24] border-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-3">
                    <span className="text-xs font-mono text-slate-400 w-5 shrink-0">
                      {idx + 1}
                    </span>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-10 h-10 rounded-lg object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className={`text-sm font-medium truncate ${isCurrent ? 'text-red-400 font-bold' : 'text-white'}`}>
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs font-mono text-slate-400">
                      {formatTime(track.duration)}
                    </span>
                    {selectedPlaylist.isUserCreated && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeTrackFromPlaylist(selectedPlaylist.id, track.id);
                        }}
                        aria-label={`Remove ${track.title} from playlist`}
                        className="p-1.5 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(track, selectedPlaylist.tracks);
                      }}
                      aria-label="Play song"
                      className="w-8 h-8 rounded-full bg-white/[0.05] hover:bg-red-600/30 text-white flex items-center justify-center transition-colors"
                    >
                      <Play className="w-3.5 h-3.5 fill-white translate-x-0.5" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
