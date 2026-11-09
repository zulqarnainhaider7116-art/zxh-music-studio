import { Track, Playlist, Artist } from '../types/music';
import { upgradeArtworkResolution } from '../utils/audioUtils';

export const CURATED_TRACKS: Track[] = [
  {
    id: 'track-another-love',
    title: 'Another Love',
    artist: 'Tom Odell',
    album: 'Long Way Down (Deluxe Edition)',
    duration: 246,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/2a/0d/8d/2a0d8d48-f74a-236e-ec23-24a958f5649d/mzaf_16143782915340700495.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', // dark crimson nocturnal portrait
    genre: 'Indie',
    releaseYear: 2013,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "I wanna take you somewhere so you know I care",
      "But it's so cold and I don't know where",
      "I brought you daffodils in a pretty string",
      "But they won't flower like they did last spring",
      "And I wanna kiss you, make you feel alright",
      "I'm just so tired to share my nights",
      "I wanna cry and I wanna love",
      "But all my tears have been used up",
      "On another love, another love",
      "All my tears have been used up",
      "On another love, another love",
      "And if somebody hurts you, I wanna fight",
      "But my hands been broken one too many times",
      "So I'll use my voice, I'll be so fucking rude",
      "Words they always win, but I know I'll lose"
    ]
  },
  {
    id: 'track-eternal',
    title: 'Eternal',
    artist: 'AURORA',
    album: 'The Gods We Can Touch',
    duration: 249,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b4/77/b8/b477b8a7-01d6-37ca-fdaa-59831b750f05/mzaf_16307313298352295595.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', // red moon
    genre: 'Alternative',
    releaseYear: 2022,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "I had a dream I was seven",
      "Climbing my way in a tree",
      "I saw a piece of heaven",
      "Waiting in patience for me",
      "And I was running far away",
      "Would I run off the world someday?",
      "Nobody knows, nobody knows",
      "I was painting a picture",
      "The picture was a painting of you and me"
    ]
  },
  {
    id: 'track-neon-skies',
    title: 'Neon Skies',
    artist: 'Lunar',
    album: 'Cyber Echoes',
    duration: 258,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d2/45/fb/d245fbf9-8570-fdc0-5e6b-aa528c130486/mzaf_11947081694159530687.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80', // neon crimson city
    genre: 'Lo-fi',
    releaseYear: 2024,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "Driving through crimson rain",
      "Reflections on the windshield glass",
      "Every shadow knows your name",
      "Nothing was ever built to last",
      "Neon skies glowing red",
      "Echoes echoing in my head",
      "Electric pulse through the midnight air",
      "Looking for you everywhere"
    ]
  },
  {
    id: 'track-lost-in-you',
    title: 'Lost in You',
    artist: 'Skye',
    album: 'Midnight Chronicles',
    duration: 200,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/d6/59/2b/d6592b0b-1e7e-4743-b2e4-f2af038fd783/mzaf_7697277787797935735.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80', // silhouette woman in red
    genre: 'R&B',
    releaseYear: 2023,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "I've been watching you",
      "For some time",
      "Can't stop staring at those ocean eyes",
      "Burning cities and napalm skies",
      "Fifteen flares inside those eyes",
      "Your ocean eyes"
    ]
  },
  {
    id: 'track-after-hours',
    title: 'After Hours',
    artist: 'The Weeknd',
    album: 'After Hours',
    duration: 361,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/54/2b/61/542b6133-80f7-f30f-4dcf-059490db9d84/mzaf_1539067797902127760.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    genre: 'Pop',
    releaseYear: 2020,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "Thought I almost died in my dream again",
      "Fightin' for my life, I couldn't breathe again",
      "Totally numb and I'm frozen",
      "Pour myself a drink and I'm back in motion",
      "My darkest hour",
      "Girl, I felt so alone inside of this crowded room",
      "Different girls on the floor, distracting my thoughts of you"
    ]
  },
  {
    id: 'track-nuvole-bianche',
    title: 'Nuvole Bianche',
    artist: 'Ludovico Einaudi',
    album: 'Una Mattina',
    duration: 358,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0b/1e/a5/0b1ea5fb-9bd9-3695-9b04-791c99de975d/mzaf_10126848900834615297.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1520523839898-507121c1d683?auto=format&fit=crop&w=800&q=80',
    genre: 'Chill',
    releaseYear: 2004,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "[Instrumental Piano Solo]",
      "Gentle cascades and evocative harmonic progressions",
      "A journey into quiet midnight reflections",
      "The soul whispers in silence"
    ]
  },
  {
    id: 'track-cornfield-chase',
    title: 'Cornfield Chase',
    artist: 'Hans Zimmer',
    album: 'Interstellar Soundtrack',
    duration: 127,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/ee/23/3aee2300-f6f7-a006-e20f-28092e814cbe/mzaf_1624587954644600228.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    genre: 'Rock',
    releaseYear: 2014,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "[Cinematic Organ & Symphonic Strings]",
      "Racing past dust and collapsing dimensions",
      "Do not go gentle into that good night",
      "Rage, rage against the dying of the light"
    ]
  },
  {
    id: 'track-cafe-focus',
    title: 'Cafe Focus Lofi Beats',
    artist: 'Lofi Jazz Terrace',
    album: 'LoFi Work Beats Night',
    duration: 203,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/7f/a2/8d/7fa28da2-1d49-8338-1f19-0e8952504554/mzaf_12452324633794048360.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    genre: 'Lo-fi',
    releaseYear: 2023,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "[Warm Vinyl Crackle & Soft Fender Rhodes Keys]",
      "Gentle rain tapping on the studio pane",
      "Deep focus for late night creators and coders",
      "Rhythmic heartbeat of the city"
    ]
  }
];

export const CURATED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-midnight-vibes',
    title: 'Midnight Vibes',
    description: 'Deep beats for quieter nights. Handpicked cinematic soundscapes.',
    coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    trackCount: 48,
    tracks: [
      CURATED_TRACKS[0],
      CURATED_TRACKS[2],
      CURATED_TRACKS[4],
      CURATED_TRACKS[7],
    ]
  },
  {
    id: 'playlist-chill-evenings',
    title: 'Chill Evenings',
    description: 'Soft melodies and moonlit acoustics for winding down.',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', // red moon over sea
    trackCount: 52,
    tracks: [
      CURATED_TRACKS[1],
      CURATED_TRACKS[5],
      CURATED_TRACKS[3],
    ]
  },
  {
    id: 'playlist-workout-mode',
    title: 'Workout Mode',
    description: 'High octane adrenaline, driving basslines and peak power.',
    coverUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80', // crimson moody athlete
    trackCount: 36,
    tracks: [
      CURATED_TRACKS[2],
      CURATED_TRACKS[4],
      CURATED_TRACKS[6],
    ]
  },
  {
    id: 'playlist-focus-flow',
    title: 'Focus & Flow',
    description: 'Deep work, uninterrupted rhythm and cognitive concentration.',
    coverUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', // moody workspace
    trackCount: 48,
    tracks: [
      CURATED_TRACKS[7],
      CURATED_TRACKS[5],
      CURATED_TRACKS[6],
    ]
  },
  {
    id: 'playlist-late-night-drive',
    title: 'Late Night Drive',
    description: 'Empty highways, crimson brake lights, synthwave and neon memories.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80', // wet street with red lights
    trackCount: 41,
    tracks: [
      CURATED_TRACKS[2],
      CURATED_TRACKS[4],
      CURATED_TRACKS[0],
    ]
  },
  {
    id: 'playlist-sad-but-okay',
    title: 'Sad but Okay',
    description: 'Cathartic acoustics and melancholic poetry for rainy nights.',
    coverUrl: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80', // rain on glass with moody red
    trackCount: 67,
    tracks: [
      CURATED_TRACKS[0],
      CURATED_TRACKS[1],
      CURATED_TRACKS[3],
    ]
  },
  {
    id: 'playlist-feel-good',
    title: 'Feel Good',
    description: 'Soulful rhythms, warm analog grooves and uplifting energy.',
    coverUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', // vinyl with red flowers
    trackCount: 39,
    tracks: [
      CURATED_TRACKS[4],
      CURATED_TRACKS[0],
      CURATED_TRACKS[2],
    ]
  }
];

export const CURATED_ARTISTS: Artist[] = [
  {
    id: 'artist-tom-odell',
    name: 'Tom Odell',
    bio: 'British singer-songwriter known for passionate piano ballads and emotional resonance.',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '34,291,480',
    topTracks: [CURATED_TRACKS[0]]
  },
  {
    id: 'artist-aurora',
    name: 'AURORA',
    bio: 'Norwegian singer, songwriter and producer with ethereal vocals and pagan-folk energy.',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '19,812,050',
    topTracks: [CURATED_TRACKS[1]]
  },
  {
    id: 'artist-lunar',
    name: 'Lunar',
    bio: 'Electronic and synthwave producer crafting cinematic nocturnal cyberpunk soundscapes.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '8,420,100',
    topTracks: [CURATED_TRACKS[2]]
  },
  {
    id: 'artist-the-weeknd',
    name: 'The Weeknd',
    bio: 'Pioneering Canadian R&B, synth-pop icon and global superstar.',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '109,420,380',
    topTracks: [CURATED_TRACKS[4]]
  }
];

export const GENRE_CATEGORIES = [
  'All',
  'Chill',
  'Pop',
  'Rock',
  'Lo-fi',
  'Indie',
  'Electronic',
  'R&B',
  'Classical'
];
