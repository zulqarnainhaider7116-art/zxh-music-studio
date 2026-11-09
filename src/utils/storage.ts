import { Track, Playlist, RepeatMode } from '../types/music';
import { CURATED_PLAYLISTS, CURATED_TRACKS } from '../data/curatedMusic';

const STORAGE_KEYS = {
  PLAYLISTS: 'zxh_music_playlists_v1',
  LIKED_TRACKS: 'zxh_music_liked_tracks_v1',
  RECENTLY_PLAYED: 'zxh_music_recently_played_v1',
  VOLUME: 'zxh_music_volume_v1',
  REPEAT: 'zxh_music_repeat_v1',
  SHUFFLE: 'zxh_music_shuffle_v1',
};

export function loadStoredPlaylists(): Playlist[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PLAYLISTS);
    if (!raw) return CURATED_PLAYLISTS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Failed to load stored playlists', e);
  }
  return CURATED_PLAYLISTS;
}

export function saveStoredPlaylists(playlists: Playlist[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PLAYLISTS, JSON.stringify(playlists));
  } catch (e) {
    console.error('Failed to save playlists to storage', e);
  }
}

export function loadStoredLikedTracks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LIKED_TRACKS);
    if (!raw) {
      return CURATED_TRACKS.filter((t) => t.isLiked).map((t) => t.id);
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error('Failed to load liked tracks', e);
  }
  return [];
}

export function saveStoredLikedTracks(likedIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.LIKED_TRACKS, JSON.stringify(likedIds));
  } catch (e) {
    console.error('Failed to save liked tracks', e);
  }
}

export function loadStoredRecentlyPlayed(): Track[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECENTLY_PLAYED);
    if (!raw) return [CURATED_TRACKS[0], CURATED_TRACKS[1], CURATED_TRACKS[2]];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
  } catch (e) {
    console.error('Failed to load recently played', e);
  }
  return [];
}

export function saveStoredRecentlyPlayed(tracks: Track[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.RECENTLY_PLAYED, JSON.stringify(tracks.slice(0, 30)));
  } catch (e) {
    console.error('Failed to save recently played', e);
  }
}

export function loadStoredVolume(): number {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VOLUME);
    if (raw !== null) {
      const v = parseFloat(raw);
      if (!isNaN(v) && v >= 0 && v <= 1) return v;
    }
  } catch (e) {
    console.error('Failed to load volume', e);
  }
  return 0.85;
}

export function saveStoredVolume(volume: number): void {
  try {
    localStorage.setItem(STORAGE_KEYS.VOLUME, volume.toString());
  } catch (e) {
    console.error('Failed to save volume', e);
  }
}

export function loadStoredRepeat(): RepeatMode {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REPEAT) as RepeatMode;
    if (raw === 'off' || raw === 'all' || raw === 'one') return raw;
  } catch (e) {}
  return 'all';
}

export function saveStoredRepeat(mode: RepeatMode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.REPEAT, mode);
  } catch (e) {}
}

export function loadStoredShuffle(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEYS.SHUFFLE) === 'true';
  } catch (e) {
    return false;
  }
}

export function saveStoredShuffle(isShuffle: boolean): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SHUFFLE, String(isShuffle));
  } catch (e) {}
}
