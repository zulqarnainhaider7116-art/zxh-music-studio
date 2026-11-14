/**
 * Data structures for ZXH MUSIC STUDIO
 */

export interface Track {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: number; // in seconds
  audioUrl: string; // real playable audio stream URL
  coverUrl: string; // high resolution artwork URL
  genre?: string;
  releaseYear?: number | string;
  isLiked?: boolean;
  isCurated?: boolean;
  lyrics?: string[];
  externalUrl?: string;
  category?: 'hindi' | 'punjabi' | 'naats' | 'english' | 'general';
}

export interface Playlist {
  id: string;
  title: string;
  description: string;
  coverUrl: string;
  trackCount: number;
  tracks: Track[];
  createdAt?: string;
  isUserCreated?: boolean;
}

export interface Artist {
  id: string;
  name: string;
  bio?: string;
  coverUrl: string;
  monthlyListeners?: string;
  topTracks: Track[];
  genre?: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  coverUrl: string;
  year: number;
  tracks: Track[];
}

export type RepeatMode = 'off' | 'all' | 'one';

export type NavTab = 'home' | 'explore' | 'hindi' | 'punjabi' | 'english' | 'naats' | 'playlists' | 'search' | 'profile';
export type LibraryTab = 'playlists' | 'artists' | 'albums' | 'liked';
