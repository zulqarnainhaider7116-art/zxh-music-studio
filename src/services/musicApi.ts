import { Track } from '../types/music';
import { upgradeArtworkResolution, parseDuration } from '../utils/audioUtils';
import {
  CURATED_TRACKS,
  HINDI_TRACKS,
  PUNJABI_TRACKS,
  NAATS_TRACKS,
  ENGLISH_TRACKS,
} from '../data/curatedMusic';

interface ITunesResult {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName?: string;
  artworkUrl100?: string;
  previewUrl?: string;
  trackTimeMillis?: number;
  primaryGenreName?: string;
  releaseDate?: string;
  trackViewUrl?: string;
}

interface ITunesResponse {
  resultCount: number;
  results: ITunesResult[];
}

const cache = new Map<string, Track[]>();

/**
 * Searches the official iTunes Search API for genuine tracks with real audio preview URLs
 */
export async function searchTracks(query: string, limit = 25): Promise<Track[]> {
  const trimmed = query.trim();
  if (!trimmed) {
    return CURATED_TRACKS;
  }

  const cacheKey = `${trimmed.toLowerCase()}_${limit}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  try {
    const encoded = encodeURIComponent(trimmed);
    const url = `https://itunes.apple.com/search?term=${encoded}&entity=song&limit=${limit}`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`iTunes API returned status ${res.status}`);
    }

    const data: ITunesResponse = await res.json();

    const tracks: Track[] = (data.results || [])
      .filter((item) => item.previewUrl && item.trackName) // only keep tracks with genuine playable audio previews!
      .map((item) => {
        const cover = upgradeArtworkResolution(item.artworkUrl100 || '', 600);
        const year = item.releaseDate ? new Date(item.releaseDate).getFullYear() : undefined;

        return {
          id: `itunes-${item.trackId}`,
          title: item.trackName,
          artist: item.artistName,
          album: item.collectionName || 'Single',
          duration: parseDuration(item.trackTimeMillis || 30000),
          audioUrl: item.previewUrl!,
          coverUrl: cover || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
          genre: item.primaryGenreName || 'Music',
          releaseYear: year,
          isLiked: false,
          isCurated: false,
          lyrics: [
            `"${item.trackName}" by ${item.artistName}`,
            `From the release "${item.collectionName || 'Single'}"`,
            `Official preview audio stream provided via iTunes Search API.`,
            `Available on Apple Music & official distribution channels.`
          ],
          externalUrl: item.trackViewUrl,
        };
      });

    cache.set(cacheKey, tracks);
    return tracks;
  } catch (err) {
    console.warn('Real iTunes search API call failed or timed out, falling back to local catalog search:', err);
    const lower = trimmed.toLowerCase();
    const fallback = CURATED_TRACKS.filter(
      (t) =>
        t.title.toLowerCase().includes(lower) ||
        t.artist.toLowerCase().includes(lower) ||
        t.genre?.toLowerCase().includes(lower)
    );
    return fallback.length > 0 ? fallback : CURATED_TRACKS.slice(0, 4);
  }
}

/**
 * Category-specific search helper with fallback to curated high-fidelity items
 */
export async function searchCategoryTracks(
  category: 'hindi' | 'punjabi' | 'naats' | 'english' | 'trending' | 'new-releases',
  subterm?: string
): Promise<Track[]> {
  const queryMap: Record<string, string> = {
    hindi: subterm ? `Hindi ${subterm}` : 'Arijit Singh Pritam Bollywood songs',
    punjabi: subterm ? `Punjabi ${subterm}` : 'Diljit Dosanjh Sidhu Moose Wala Punjabi songs',
    naats: subterm ? `Urdu Naat Sharif ${subterm}` : 'Urdu Naat Sharif Owais Raza Qadri Junaid Jamshed Nasheed',
    english: subterm ? `English ${subterm}` : 'The Weeknd Tom Odell Pop songs',
    trending: 'Top Trending Global songs',
    'new-releases': 'New Hit songs 2024',
  };

  const query = queryMap[category] || 'Music';
  const apiTracks = await searchTracks(query, 16);

  if (apiTracks.length > 0) {
    return apiTracks;
  }

  // Graceful category fallback
  switch (category) {
    case 'hindi':
      return HINDI_TRACKS;
    case 'punjabi':
      return PUNJABI_TRACKS;
    case 'naats':
      return NAATS_TRACKS;
    case 'english':
      return ENGLISH_TRACKS;
    default:
      return CURATED_TRACKS;
  }
}
