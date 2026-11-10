import React, { useState } from 'react';
import { Plus, Search, Play, MoreVertical, Heart, Music, Disc } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { LibraryTab, Playlist, Track, Artist } from '../types/music';
import { CURATED_ARTISTS, CURATED_TRACKS } from '../data/curatedMusic';

export const LibraryView: React.FC = () => {
  const {
    playlists,
    likedTrackIds,
    playTrack,
    setSelectedPlaylist,
    setShowCreatePlaylistModal,
    setActiveTab,
  } = useMusic();

  const [libraryTab, setLibraryTab] = useState<LibraryTab>('playlists');
  const [searchFilter, setSearchFilter] = useState('');

  const likedTracks = CURATED_TRACKS.filter((t) => likedTrackIds.has(t.id));

  const filteredPlaylists = playlists.filter((pl) =>
    pl.title.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const handlePlayPlaylist = (playlist: Playlist) => {
    if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0], playlist.tracks);
    }
  };

  return (
    <div className="pb-36 pt-4 px-4 md:px-8 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Header matching Screen 3 */}
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-serif-title text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
            Your Playlists
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            A collection of moods, memories and moments.
          </p>
        </div>

        {/* Top Right Action Buttons: Search & Glowing Red Plus */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('search')}
            aria-label="Search playlists"
            className="p-2.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-600 hover:text-slate-900 transition-colors border border-white/[0.06]"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setShowCreatePlaylistModal(true)}
            aria-label="Create new playlist"
            title="Create Playlist"
            className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-sky-500 hover:from-blue-500 hover:to-sky-400 text-slate-900 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </header>

      {/* Tabs matching Screen 3: Playlists | Artists | Albums | Liked */}
      <nav aria-label="Library sub tabs" className="border-b border-white/[0.06] pb-1">
        <div className="flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar">
          {(['playlists', 'artists', 'albums', 'liked'] as LibraryTab[]).map((tab) => {
            const isActive = libraryTab === tab;
            const labels: Record<LibraryTab, string> = {
              playlists: 'Playlists',
              artists: 'Artists',
              albums: 'Albums',
              liked: `Liked (${likedTrackIds.size})`,
            };
            return (
              <button
                key={tab}
                onClick={() => setLibraryTab(tab)}
                className={`py-2 text-xs sm:text-sm tracking-wide transition-all capitalize relative whitespace-nowrap ${
                  isActive ? 'text-blue-400 font-semibold' : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {labels[tab]}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Tab Content: Playlists (2-Column Grid matching Screen 3) */}
      {libraryTab === 'playlists' && (
        <section>
          {filteredPlaylists.length === 0 ? (
            <div className="text-center py-16 bg-[#111117] rounded-3xl border border-white/[0.06] p-6">
              <Music className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-900">No playlists found</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Create a custom playlist to curate your favorite tracks and moods.
              </p>
              <button
                onClick={() => setShowCreatePlaylistModal(true)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-slate-900 rounded-full text-xs font-semibold shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              >
                Create First Playlist
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {filteredPlaylists.map((pl) => (
                <div
                  key={pl.id}
                  onClick={() => setSelectedPlaylist(pl)}
                  className="group relative bg-[#121219] hover:bg-[#181822] border border-white/[0.06] hover:border-blue-500/30 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 shadow-lg flex flex-col justify-between"
                >
                  {/* Playlist Cover Image with Crimson Ambiance */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                    <img
                      src={pl.coverUrl}
                      alt={pl.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121219] via-transparent to-black/20" />

                    {/* Quick Play Button overlaid */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPlaylist(pl);
                      }}
                      aria-label={`Play ${pl.title}`}
                      className="absolute bottom-2.5 right-2.5 w-9 h-9 rounded-full bg-blue-600/90 hover:bg-blue-500 text-slate-900 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.6)] transform translate-y-1 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
                    >
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    </button>
                  </div>

                  {/* Card Info matching Reference */}
                  <div className="p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-xs sm:text-sm text-slate-900 group-hover:text-blue-400 transition-colors truncate">
                        {pl.title}
                      </h3>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPlaylist(pl);
                        }}
                        aria-label="Playlist options"
                        className="p-1 text-slate-500 hover:text-slate-900"
                      >
                        <MoreVertical className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                      {pl.trackCount} songs
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Tab Content: Artists */}
      {libraryTab === 'artists' && (
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {CURATED_ARTISTS.map((artist: Artist) => (
            <div
              key={artist.id}
              onClick={() => {
                if (artist.topTracks[0]) {
                  playTrack(artist.topTracks[0], artist.topTracks);
                }
              }}
              className="p-4 rounded-2xl bg-[#111117] hover:bg-[#181824] border border-white/[0.06] hover:border-blue-500/30 text-center cursor-pointer transition-all"
            >
              <img
                src={artist.coverUrl}
                alt={artist.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto object-cover mb-3 shadow-lg"
              />
              <h3 className="text-sm font-semibold text-slate-900">{artist.name}</h3>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">{artist.monthlyListeners} listeners</p>
            </div>
          ))}
        </section>
      )}

      {/* Tab Content: Albums */}
      {libraryTab === 'albums' && (
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {CURATED_TRACKS.slice(0, 4).map((track) => (
            <div
              key={track.id}
              onClick={() => playTrack(track, CURATED_TRACKS)}
              className="p-3 rounded-2xl bg-[#111117] hover:bg-[#181824] border border-white/[0.06] hover:border-blue-500/30 cursor-pointer transition-all"
            >
              <div className="aspect-square rounded-xl overflow-hidden mb-2">
                <img
                  src={track.coverUrl}
                  alt={track.album || track.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                {track.album || track.title}
              </h3>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">
                {track.artist} · {track.releaseYear || '2024'}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Tab Content: Liked Songs */}
      {libraryTab === 'liked' && (
        <section className="space-y-2">
          {likedTracks.length === 0 ? (
            <div className="text-center py-16 bg-[#111117] rounded-3xl border border-white/[0.06] p-6">
              <Heart className="w-10 h-10 text-slate-500 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-slate-900">No liked songs yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Tap the heart icon on any song to save it to your personal favorites collection.
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between px-2 mb-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {likedTracks.length} Saved Favorites
                </span>
                <button
                  onClick={() => playTrack(likedTracks[0], likedTracks)}
                  className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Play All</span>
                </button>
              </div>

              {likedTracks.map((track) => (
                <div
                  key={track.id}
                  onClick={() => playTrack(track, likedTracks)}
                  className="flex items-center justify-between p-3 rounded-2xl bg-[#111117] hover:bg-[#171722] border border-white/[0.05] hover:border-blue-500/30 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className="w-11 h-11 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="text-sm font-medium text-slate-900 truncate">
                        {track.title}
                      </h4>
                      <p className="text-xs text-slate-500 truncate">
                        {track.artist}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <Heart className="w-4 h-4 fill-blue-500 text-blue-500" />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playTrack(track, likedTracks);
                      }}
                      className="p-2 rounded-full bg-white/[0.05] hover:bg-blue-600/30 text-slate-900"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </section>
      )}
    </div>
  );
};
