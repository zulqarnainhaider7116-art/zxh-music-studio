import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { Track, Playlist, RepeatMode, NavTab } from '../types/music';
import { CURATED_TRACKS } from '../data/curatedMusic';
import {
  getNextTrackIndex,
  getPreviousTrackIndex,
  shuffleQueue,
} from '../utils/audioUtils';
import {
  loadStoredPlaylists,
  saveStoredPlaylists,
  loadStoredLikedTracks,
  saveStoredLikedTracks,
  loadStoredRecentlyPlayed,
  saveStoredRecentlyPlayed,
  loadStoredVolume,
  saveStoredVolume,
  loadStoredRepeat,
  saveStoredRepeat,
  loadStoredShuffle,
  saveStoredShuffle,
} from '../utils/storage';
import {
  isSfxEnabled,
  setSfxEnabled,
  playNeedleDrop,
  playLikeChime,
  playUiClick,
} from '../utils/soundEffects';

interface MusicContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  repeatMode: RepeatMode;
  isShuffled: boolean;
  queue: Track[];
  queueIndex: number;
  isPlayerOpen: boolean;
  activeTab: NavTab;
  genreFilter: string;
  playlists: Playlist[];
  likedTrackIds: Set<string>;
  recentlyPlayed: Track[];
  audioError: string | null;
  isLoadingAudio: boolean;
  sfxEnabled: boolean;
  searchQuery: string;

  // Actions
  playTrack: (track: Track, queueContext?: Track[]) => void;
  togglePlay: () => void;
  pause: () => void;
  resume: () => void;
  seekTo: (seconds: number) => void;
  setVolume: (level: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  toggleShuffle: () => void;
  cycleRepeat: () => void;
  toggleLike: (track: Track) => void;
  isLiked: (trackId: string) => boolean;
  createPlaylist: (title: string, description: string, coverUrl?: string) => Playlist;
  addTrackToPlaylist: (playlistId: string, track: Track) => void;
  removeTrackFromPlaylist: (playlistId: string, trackId: string) => void;
  deletePlaylist: (playlistId: string) => void;
  openPlayer: () => void;
  closePlayer: () => void;
  setActiveTab: (tab: NavTab) => void;
  setGenreFilter: (genre: string) => void;
  importLocalAudio: (file: File) => void;
  toggleSfx: () => void;
  setSearchQuery: (q: string) => void;
  selectedPlaylist: Playlist | null;
  setSelectedPlaylist: (playlist: Playlist | null) => void;
  showCreatePlaylistModal: boolean;
  setShowCreatePlaylistModal: (show: boolean) => void;
  showBrandModal: boolean;
  setShowBrandModal: (show: boolean) => void;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // States
  const [currentTrack, setCurrentTrack] = useState<Track | null>(CURATED_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(CURATED_TRACKS[0].duration);
  const [volume, setVolumeState] = useState<number>(loadStoredVolume);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [prevVolume, setPrevVolume] = useState<number>(0.85);
  const [repeatMode, setRepeatMode] = useState<RepeatMode>(loadStoredRepeat);
  const [isShuffled, setIsShuffled] = useState<boolean>(loadStoredShuffle);
  const [queue, setQueue] = useState<Track[]>(CURATED_TRACKS);
  const [queueIndex, setQueueIndex] = useState<number>(0);
  const [isPlayerOpen, setIsPlayerOpen] = useState<boolean>(false);
  const [activeTab, setActiveTabState] = useState<NavTab>('home');
  const [genreFilter, setGenreFilter] = useState<string>('All');
  const [playlists, setPlaylists] = useState<Playlist[]>(loadStoredPlaylists);
  const [likedTrackIds, setLikedTrackIds] = useState<Set<string>>(() => new Set(loadStoredLikedTracks()));
  const [recentlyPlayed, setRecentlyPlayed] = useState<Track[]>(loadStoredRecentlyPlayed);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isLoadingAudio, setIsLoadingAudio] = useState<boolean>(false);
  const [sfxEnabled, setSfxEnabledState] = useState<boolean>(isSfxEnabled);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [showCreatePlaylistModal, setShowCreatePlaylistModal] = useState<boolean>(false);
  const [showBrandModal, setShowBrandModal] = useState<boolean>(false);

  const setActiveTab = useCallback((tab: NavTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleSfx = useCallback(() => {
    setSfxEnabledState((prev) => {
      const next = !prev;
      setSfxEnabled(next);
      return next;
    });
  }, []);

  // Initialize Audio element once
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = volume;
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
      setIsLoadingAudio(false);
      setAudioError(null);
    };

    const handleWaiting = () => {
      setIsLoadingAudio(true);
    };

    const handlePlaying = () => {
      setIsLoadingAudio(false);
      setIsPlaying(true);
      setAudioError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
    };

    const handleError = () => {
      setIsLoadingAudio(false);
      setIsPlaying(false);
      setAudioError('Audio preview stream unavailable or network blocked.');
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.src = '';
    };
  }, []);

  // Update track ended behavior with latest state via ref / useCallback
  const repeatModeRef = useRef(repeatMode);
  repeatModeRef.current = repeatMode;
  const queueRef = useRef(queue);
  queueRef.current = queue;
  const queueIndexRef = useRef(queueIndex);
  queueIndexRef.current = queueIndex;

  const nextTrackInternal = useCallback(() => {
    const q = queueRef.current;
    const currentIdx = queueIndexRef.current;
    const rep = repeatModeRef.current;

    const nextIdx = getNextTrackIndex(currentIdx, q.length, rep);
    if (nextIdx !== null && q[nextIdx]) {
      const nextTrackObj = q[nextIdx];
      setQueueIndex(nextIdx);
      setCurrentTrack(nextTrackObj);
      if (audioRef.current) {
        audioRef.current.src = nextTrackObj.audioUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch((err) => {
          console.warn('Auto play next track prevented:', err);
        });
      }
      addToRecentlyPlayed(nextTrackObj);
    } else {
      setIsPlaying(false);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatModeRef.current === 'one') {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
      } else {
        nextTrackInternal();
      }
    };

    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [nextTrackInternal]);

  // Sync volume to audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const addToRecentlyPlayed = (track: Track) => {
    setRecentlyPlayed((prev) => {
      const filtered = prev.filter((t) => t.id !== track.id);
      const updated = [track, ...filtered].slice(0, 30);
      saveStoredRecentlyPlayed(updated);
      return updated;
    });
  };

  const playTrack = useCallback(
    (track: Track, newQueue?: Track[]) => {
      const audio = audioRef.current;
      if (!audio) return;

      playNeedleDrop();

      let targetQueue = newQueue || queue;
      let trackIdx = targetQueue.findIndex((t) => t.id === track.id);
      if (trackIdx === -1) {
        targetQueue = [track, ...targetQueue];
        trackIdx = 0;
      }

      setQueue(targetQueue);
      setQueueIndex(trackIdx);
      setCurrentTrack(track);
      setDuration(track.duration || 30);
      setCurrentTime(0);
      setAudioError(null);
      setIsLoadingAudio(true);

      audio.src = track.audioUrl;
      audio.currentTime = 0;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
        })
        .catch((err) => {
          console.warn('Playback error or gesture needed:', err);
          setIsLoadingAudio(false);
          setIsPlaying(false);
        });

      addToRecentlyPlayed(track);
    },
    [queue]
  );

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    playUiClick();

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src && currentTrack) {
        audio.src = currentTrack.audioUrl;
      }
      setIsLoadingAudio(true);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoadingAudio(false);
        })
        .catch((err) => {
          console.warn('Playback failed:', err);
          setIsPlaying(false);
          setIsLoadingAudio(false);
        });
    }
  }, [isPlaying, currentTrack]);

  const pause = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.warn);
    }
  }, []);

  const seekTo = useCallback((seconds: number) => {
    if (audioRef.current && isFinite(seconds)) {
      audioRef.current.currentTime = seconds;
      setCurrentTime(seconds);
    }
  }, []);

  const setVolume = useCallback((level: number) => {
    const bounded = Math.max(0, Math.min(1, level));
    setVolumeState(bounded);
    saveStoredVolume(bounded);
    if (bounded > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    playUiClick();
    if (isMuted) {
      setIsMuted(false);
      setVolumeState(prevVolume || 0.85);
    } else {
      setPrevVolume(volume);
      setIsMuted(true);
    }
  }, [isMuted, volume, prevVolume]);

  const nextTrack = useCallback(() => {
    playUiClick();
    nextTrackInternal();
  }, [nextTrackInternal]);

  const previousTrack = useCallback(() => {
    playUiClick();
    const prevIdx = getPreviousTrackIndex(queueIndex, queue.length);
    if (queue[prevIdx]) {
      const prevTrack = queue[prevIdx];
      setQueueIndex(prevIdx);
      setCurrentTrack(prevTrack);
      if (audioRef.current) {
        audioRef.current.src = prevTrack.audioUrl;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(console.warn);
      }
      addToRecentlyPlayed(prevTrack);
    }
  }, [queueIndex, queue]);

  const toggleShuffle = useCallback(() => {
    playUiClick();
    setIsShuffled((prev) => {
      const nextVal = !prev;
      saveStoredShuffle(nextVal);
      if (nextVal) {
        const shuffled = shuffleQueue(queue, queueIndex);
        setQueue(shuffled);
        setQueueIndex(0);
      } else {
        setQueue(CURATED_TRACKS);
        const idx = CURATED_TRACKS.findIndex((t) => t.id === currentTrack?.id);
        setQueueIndex(idx >= 0 ? idx : 0);
      }
      return nextVal;
    });
  }, [queue, queueIndex, currentTrack]);

  const cycleRepeat = useCallback(() => {
    playUiClick();
    setRepeatMode((prev) => {
      const nextMode: RepeatMode = prev === 'off' ? 'all' : prev === 'all' ? 'one' : 'off';
      saveStoredRepeat(nextMode);
      return nextMode;
    });
  }, []);

  const toggleLike = useCallback((track: Track) => {
    setLikedTrackIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(track.id)) {
        copy.delete(track.id);
        playUiClick();
      } else {
        copy.add(track.id);
        playLikeChime();
      }
      saveStoredLikedTracks(Array.from(copy));
      return copy;
    });
  }, []);

  const isLiked = useCallback(
    (trackId: string) => {
      return likedTrackIds.has(trackId);
    },
    [likedTrackIds]
  );

  const createPlaylist = useCallback((title: string, description: string, coverUrl?: string): Playlist => {
    const defaultCover = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80';
    const newPlaylist: Playlist = {
      id: `playlist-${Date.now()}`,
      title: title.trim() || 'My Playlist',
      description: description.trim() || 'Custom curated playlist in ZXH MUSIC STUDIO.',
      coverUrl: coverUrl || defaultCover,
      trackCount: 0,
      tracks: [],
      createdAt: new Date().toLocaleDateString(),
      isUserCreated: true,
    };

    setPlaylists((prev) => {
      const updated = [newPlaylist, ...prev];
      saveStoredPlaylists(updated);
      return updated;
    });
    return newPlaylist;
  }, []);

  const addTrackToPlaylist = useCallback((playlistId: string, track: Track) => {
    setPlaylists((prev) => {
      const updated = prev.map((pl) => {
        if (pl.id !== playlistId) return pl;
        if (pl.tracks.some((t) => t.id === track.id)) return pl;
        const newTracks = [...pl.tracks, track];
        return {
          ...pl,
          trackCount: newTracks.length,
          tracks: newTracks,
        };
      });
      saveStoredPlaylists(updated);
      return updated;
    });
  }, []);

  const removeTrackFromPlaylist = useCallback((playlistId: string, trackId: string) => {
    setPlaylists((prev) => {
      const updated = prev.map((pl) => {
        if (pl.id !== playlistId) return pl;
        const newTracks = pl.tracks.filter((t) => t.id !== trackId);
        return {
          ...pl,
          trackCount: newTracks.length,
          tracks: newTracks,
        };
      });
      saveStoredPlaylists(updated);
      return updated;
    });
  }, []);

  const deletePlaylist = useCallback((playlistId: string) => {
    setPlaylists((prev) => {
      const updated = prev.filter((p) => p.id !== playlistId);
      saveStoredPlaylists(updated);
      return updated;
    });
    if (selectedPlaylist?.id === playlistId) {
      setSelectedPlaylist(null);
    }
  }, [selectedPlaylist]);

  const importLocalAudio = useCallback((file: File) => {
    const objectUrl = URL.createObjectURL(file);
    const fileName = file.name.replace(/\.[^/.]+$/, '');
    const customTrack: Track = {
      id: `local-${Date.now()}`,
      title: fileName,
      artist: 'Local Import',
      album: 'Studio Uploads',
      duration: 180,
      audioUrl: objectUrl,
      coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      genre: 'User Audio',
      isCurated: false,
    };
    playTrack(customTrack, [customTrack, ...queue]);
  }, [playTrack, queue]);

  const openPlayer = useCallback(() => setIsPlayerOpen(true), []);
  const closePlayer = useCallback(() => setIsPlayerOpen(false), []);

  return (
    <MusicContext.Provider
      value={{
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
        activeTab,
        genreFilter,
        playlists,
        likedTrackIds,
        recentlyPlayed,
        audioError,
        isLoadingAudio,
        sfxEnabled,
        searchQuery,

        playTrack,
        togglePlay,
        pause,
        resume,
        seekTo,
        setVolume,
        toggleMute,
        nextTrack,
        previousTrack,
        toggleShuffle,
        cycleRepeat,
        toggleLike,
        isLiked,
        createPlaylist,
        addTrackToPlaylist,
        removeTrackFromPlaylist,
        deletePlaylist,
        openPlayer,
        closePlayer,
        setActiveTab,
        setGenreFilter,
        importLocalAudio,
        toggleSfx,
        setSearchQuery,
        selectedPlaylist,
        setSelectedPlaylist,
        showCreatePlaylistModal,
        setShowCreatePlaylistModal,
        showBrandModal,
        setShowBrandModal,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export function useMusic(): MusicContextType {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
