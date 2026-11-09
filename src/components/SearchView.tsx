import React, { useState, useEffect, useRef } from 'react';
import { Search, Play, Heart, Plus, Loader2, Music, Sparkles } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { searchTracks } from '../services/musicApi';
import { Track } from '../types/music';
import { GENRE_CATEGORIES, CURATED_TRACKS } from '../data/curatedMusic';

export const SearchView: React.FC = () => {
  const {
    playTrack,
    currentTrack,
    isPlaying,
    isLiked,
    toggleLike,
    playlists,
    addTrackToPlaylist,
    setShowCreatePlaylistModal,
    searchQuery,
    setSearchQuery,
  } = useMusic();

  const [query, setQuery] = useState(searchQuery || '');
  const [results, setResults] = useState<Track[]>(CURATED_TRACKS);
  const [isLoading, setIsLoading] = useState(false);
  const [activeMenuTrackId, setActiveMenuTrackId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sync if context query changes
  useEffect(() => {
    if (searchQuery && searchQuery !== query) {
      setQuery(searchQuery);
    }
  }, [searchQuery]);

  // Auto-focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Debounced search against real API
  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults(CURATED_TRACKS);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const data = await searchTracks(trimmed, 24);
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const handleAddToPlaylist = (playlistId: string, track: Track, plTitle: string) => {
    addTrackToPlaylist(playlistId, track);
    setActiveMenuTrackId(null);
    setNotification(`Added "${track.title}" to "${plTitle}"`);
    setTimeout(() => setNotification(null), 2500);
  };

  const handleQuickTag = (tag: string) => {
    setQuery(tag);
  };

  return (
    <div className="pb-36 pt-4 px-4 md:px-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Search Bar Input */}
      <div className="relative">
        <div className="relative flex items-center bg-[#13131b] border border-white/[0.1] focus-within:border-red-500/60 rounded-2xl px-4 py-3.5 shadow-xl transition-all">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search songs, artists, albums, or lyrics..."
            aria-label="Search music catalog"
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          {isLoading && (
            <Loader2 className="w-5 h-5 text-red-500 animate-spin shrink-0 ml-2" />
          )}
          {query && !isLoading && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-slate-400 hover:text-white px-2 py-0.5 rounded-full bg-white/[0.06]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Suggested Search Keywords */}
      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
          Popular Inquiries
        </p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {['Another Love', 'The Weeknd', 'Billie Eilish', 'Hans Zimmer', 'Lofi Beats', 'AURORA', 'Synthwave'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleQuickTag(tag)}
              className="px-3 py-1.5 rounded-full bg-[#161622] hover:bg-red-950/40 hover:border-red-500/40 border border-white/[0.06] text-xs text-slate-300 hover:text-white transition-all whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div className="text-center text-xs text-red-300 bg-red-950/80 border border-red-800/60 rounded-full py-2 px-4 shadow-lg animate-fadeIn">
          {notification}
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            {query ? `Search Results for "${query}"` : 'Recommended For You'}
          </h2>
          <p className="text-xs text-slate-400">
            {results.length} genuine tracks available with real audio streams
          </p>
        </div>
      </div>

      {/* Results List */}
      {results.length === 0 ? (
        <div className="text-center py-16 bg-[#111117] rounded-3xl border border-white/[0.06] p-6">
          <Music className="w-10 h-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">No tracks found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            Try searching for another artist, song title, or genre.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {results.map((track, idx) => {
            const isCurrent = currentTrack?.id === track.id;
            const liked = isLiked(track.id);
            const isMenuOpen = activeMenuTrackId === track.id;

            return (
              <div
                key={`${track.id}-${idx}`}
                onClick={() => playTrack(track, results)}
                className={`relative flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#181116] border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]'
                    : 'bg-[#111117] hover:bg-[#171724] border-white/[0.06]'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0 pr-3">
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-black/40">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-full h-full object-cover"
                    />
                    {isCurrent && isPlaying && (
                      <div className="absolute inset-0 bg-red-950/50 flex items-center justify-center">
                        <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h3 className={`text-sm font-semibold truncate ${isCurrent ? 'text-red-400 font-bold' : 'text-white'}`}>
                      {track.title}
                    </h3>
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {track.artist} {track.album ? `· ${track.album}` : ''}
                    </p>
                  </div>
                </div>

                <div 
                  onClick={(e) => e.stopPropagation()} 
                  className="flex items-center gap-1.5 shrink-0"
                >
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLike(track)}
                    aria-label={liked ? 'Unlike track' : 'Like track'}
                    className="p-2 text-slate-400 hover:text-white transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_#ef4444]' : ''}`}
                    />
                  </button>

                  {/* Add to Playlist Button */}
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenuTrackId(isMenuOpen ? null : track.id)}
                      aria-label="Add to Playlist"
                      className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-[#181824] border border-white/[0.1] rounded-2xl p-2 shadow-2xl z-30 backdrop-blur-xl">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 px-3 py-1 font-semibold">
                          Add to Playlist
                        </p>
                        <div className="max-h-40 overflow-y-auto space-y-1">
                          {playlists.map((pl) => (
                            <button
                              key={pl.id}
                              onClick={() => handleAddToPlaylist(pl.id, track, pl.title)}
                              className="w-full text-left px-3 py-1.5 text-xs text-slate-200 hover:bg-red-950/60 hover:text-white rounded-lg transition-colors truncate"
                            >
                              {pl.title}
                            </button>
                          ))}
                        </div>
                        <div className="border-t border-white/[0.06] mt-1 pt-1">
                          <button
                            onClick={() => {
                              setActiveMenuTrackId(null);
                              setShowCreatePlaylistModal(true);
                            }}
                            className="w-full flex items-center gap-1.5 px-3 py-1.5 text-xs text-red-400 hover:bg-red-950/60 rounded-lg transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>New Playlist</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Play Button */}
                  <button
                    onClick={() => playTrack(track, results)}
                    aria-label={`Play ${track.title}`}
                    className="w-9 h-9 rounded-full bg-white/[0.06] hover:bg-red-600/20 border border-white/[0.1] hover:border-red-500 text-white flex items-center justify-center transition-all shadow-[0_0_10px_rgba(225,29,72,0.15)]"
                  >
                    <Play className="w-4 h-4 fill-white translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
