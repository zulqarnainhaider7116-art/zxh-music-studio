import { Track, RepeatMode } from '../types/music';

/**
 * Format playback seconds to mm:ss or hh:mm:ss
 */
export function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0 || !isFinite(seconds)) {
    return '0:00';
  }
  const totalSeconds = Math.floor(seconds);
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;

  const paddedSecs = secs < 10 ? `0${secs}` : `${secs}`;

  if (hrs > 0) {
    const paddedMins = mins < 10 ? `0${mins}` : `${mins}`;
    return `${hrs}:${paddedMins}:${paddedSecs}`;
  }
  return `${mins}:${paddedSecs}`;
}

/**
 * Converts iTunes standard 100x100 artwork URLs to crisp high-res 600x600 or 1000x1000
 */
export function upgradeArtworkResolution(url: string, dimension = 600): string {
  if (!url) return '';
  return url
    .replace(/\/\d+x\d+bb\.(jpg|png|webp)/i, `/${dimension}x${dimension}bb.$1`)
    .replace(/\/100x100/i, `/${dimension}x${dimension}`);
}

/**
 * Milliseconds to rounded seconds
 */
export function parseDuration(millis: number): number {
  if (!millis || millis <= 0) return 0;
  return Math.round(millis / 1000);
}

/**
 * Calculates next index given current index, queue size, and repeat mode
 */
export function getNextTrackIndex(
  currentIndex: number,
  queueLength: number,
  repeatMode: RepeatMode
): number | null {
  if (queueLength <= 0) return null;
  if (repeatMode === 'one') {
    return currentIndex >= 0 && currentIndex < queueLength ? currentIndex : 0;
  }
  const next = currentIndex + 1;
  if (next < queueLength) {
    return next;
  }
  if (repeatMode === 'all') {
    return 0;
  }
  return null; // end of queue reached with repeat off
}

/**
 * Calculates previous track index
 */
export function getPreviousTrackIndex(currentIndex: number, queueLength: number): number {
  if (queueLength <= 0) return 0;
  const prev = currentIndex - 1;
  if (prev >= 0) return prev;
  return queueLength - 1; // loop back to end
}

/**
 * Fisher-Yates shuffle that keeps current track at current index
 */
export function shuffleQueue<T>(list: T[], currentIndex: number): T[] {
  if (list.length <= 1) return [...list];
  const copy = [...list];
  const currentItem = copy[currentIndex];

  // Remove current item temporarily
  copy.splice(currentIndex, 1);

  // Shuffle remaining
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  // Put current item at index 0 or restore position
  return [currentItem, ...copy];
}

/**
 * Filter tracks by query string and/or genre
 */
export function filterTracks(
  tracks: Track[],
  query: string,
  selectedGenre?: string
): Track[] {
  const q = query.trim().toLowerCase();
  const genreFilter = selectedGenre && selectedGenre.toLowerCase() !== 'all' ? selectedGenre.toLowerCase() : null;

  return tracks.filter((track) => {
    const matchesGenre = !genreFilter || (track.genre && track.genre.toLowerCase().includes(genreFilter));
    if (!matchesGenre) return false;

    if (!q) return true;
    const titleMatch = track.title.toLowerCase().includes(q);
    const artistMatch = track.artist.toLowerCase().includes(q);
    const albumMatch = track.album?.toLowerCase().includes(q);
    return titleMatch || artistMatch || albumMatch;
  });
}
