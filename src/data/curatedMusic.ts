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
    coverUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    genre: 'Indie',
    category: 'english',
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
      "On another love, another love"
    ]
  },
  {
    id: 'track-kesariya',
    title: 'Kesariya',
    artist: 'Pritam & Arijit Singh',
    album: 'Brahmastra',
    duration: 268,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg',
    genre: 'Bollywood Romantic',
    category: 'hindi',
    releaseYear: 2022,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "Kesariya tera ishq hai piya",
      "Rang jaaun jo main haath lagaun",
      "Din beete saara teri fikr mein",
      "Rain saari teri khair manaun",
      "Kesar ki laali se rang diya tune",
      "Kismat ki lLakeeron ko mere"
    ]
  },
  {
    id: 'track-diljit-lover',
    title: 'Lover',
    artist: 'Diljit Dosanjh',
    album: 'MoonChild Era',
    duration: 190,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/38/d5/7a/38d57a99-39fc-e901-7c45-fa6260ec83c1/mzaf_8083696285926392389.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/600x600bb.jpg',
    genre: 'Punjabi Pop',
    category: 'punjabi',
    releaseYear: 2021,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "Tera ni lover, koi hor houga",
      "Main taan bas tainu chahunda aan",
      "Kinna tainu karda pyar",
      "Main taan akhan cho dasda aan"
    ]
  },
  {
    id: 'track-tajdar-e-haram',
    title: 'Tajdar-E-Haram',
    artist: 'Atif Aslam',
    album: 'Coke Studio Season 8',
    duration: 617,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b9/75/0b/b9750bad-dc50-f831-6a76-1db3ff3a95f3/mzaf_16667428091119990004.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/41/67/ad/4167ad0c-1dfd-6655-d62d-61d3059cdd10/7316476372880.jpg/600x600bb.jpg',
    genre: 'Urdu Naat & Qawwali',
    category: 'naats',
    releaseYear: 2015,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "Qismat mein meri chain se jeena likh de",
      "Doobe na kabhi mera safeena likh de",
      "Jannat bhi gawaara hai magar mere liye",
      "Aye kaatib-e-taqdeer Madina likh de",
      "Tajdar-e-Haram, ho nigaah-e-karam",
      "Hum ghareebon ke din bhi sanwar jaayenge"
    ]
  },
  {
    id: 'track-maher-zain-yanabi',
    title: 'Ya Nabi Salam Alayka',
    artist: 'Maher Zain',
    album: 'Thank You Allah',
    duration: 299,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/07/b7/4a/07b74ada-9fc2-1bf5-e106-9f1950ee147c/mzaf_715121258896882606.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/3b/2c/00/3b2c008e-227f-7334-4bb4-600658285f71/5060071981825.jpg/600x600bb.jpg',
    genre: 'Islamic Nasheed',
    category: 'naats',
    releaseYear: 2009,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "Anta noorullahi fajran",
      "Jeeta ba'dal usri yusra",
      "Rabbuna a'laka qadran",
      "Ya imamal anbiya'i",
      "Ya Nabi salam 'alayka",
      "Ya Rasool salam 'alayka",
      "Ya Habib salam 'alayka",
      "Salawatullah 'alayka"
    ]
  },
  {
    id: 'track-sidhu-295',
    title: '295',
    artist: 'Sidhu Moose Wala',
    album: 'Moosetape',
    duration: 270,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7f/f3/6d/7ff36d63-b933-3993-cd2f-f3fd770c3763/mzaf_12675758250838366519.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/97/69/58/976958ae-725e-bd41-6755-f0921c697840/810063889609_cover.jpg/600x600bb.jpg',
    genre: 'Punjabi Hip-Hop',
    category: 'punjabi',
    releaseYear: 2021,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "Dass keda ethe sacch bol sakda",
      "Kithon labbna ae sacha insaan bai",
      "Ajj kal sach bolan te lagdi",
      "Dhaara 295 je kare bayan bai"
    ]
  },
  {
    id: 'track-tum-hi-ho',
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    album: 'Aashiqui 2',
    duration: 237,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/ea/b2/30/eab2309a-4c4b-1ffb-e335-a0a92feea386/mzaf_4556994173020272430.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/bb/23/ee/bb23eeed-0c35-4f1d-2b11-485622777ae4/8902894353007_cover.jpg/600x600bb.jpg',
    genre: 'Bollywood Sad & Romantic',
    category: 'hindi',
    releaseYear: 2013,
    isLiked: false,
    isCurated: true,
    lyrics: [
      "Hum tere bin ab reh nahi sakte",
      "Tere bina kya wajood mera",
      "Tujhse juda agar ho jaayenge",
      "Toh khud se hi ho jaayenge judaa",
      "Kyunki tum hi ho, ab tum hi ho",
      "Zindagi ab tum hi ho"
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
    genre: 'Pop / Synthwave',
    category: 'english',
    releaseYear: 2020,
    isLiked: true,
    isCurated: true,
    lyrics: [
      "Thought I almost died in my dream again",
      "Fightin' for my life, I couldn't breathe again",
      "Totally numb and I'm frozen",
      "Pour myself a drink and I'm back in motion",
      "My darkest hour"
    ]
  },
  {
    id: 'track-eternal',
    title: 'Eternal',
    artist: 'AURORA',
    album: 'The Gods We Can Touch',
    duration: 249,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/b4/77/b8/b477b8a7-01d6-37ca-fdaa-59831b750f05/mzaf_16307313298352295595.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    genre: 'Alternative / Ethereal',
    category: 'english',
    releaseYear: 2022,
    isLiked: true,
    isCurated: true
  },
  {
    id: 'track-hasbi-rabbi',
    title: 'Hasbi Rabbi',
    artist: 'Sami Yusuf',
    album: 'My Ummah',
    duration: 258,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0e/b0/9f/0eb09f0a-b698-e6e7-2227-82442d2491ff/mzaf_6651501586607752988.plus.aac.p.m4a',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/d3/1b/40/d31b4070-13fd-122f-87ea-c5521da63672/mzi.htdpclbn.jpg/600x600bb.jpg',
    genre: 'Arabic & Urdu Nasheed',
    category: 'naats',
    releaseYear: 2005,
    isLiked: true,
    isCurated: true
  },
  {
    id: 'track-cornfield-chase',
    title: 'Cornfield Chase',
    artist: 'Hans Zimmer',
    album: 'Interstellar Soundtrack',
    duration: 127,
    audioUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/3a/ee/23/3aee2300-f6f7-a006-e20f-28092e814cbe/mzaf_1624587954644600228.plus.aac.p.m4a',
    coverUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    genre: 'Cinematic Score',
    category: 'english',
    releaseYear: 2014,
    isLiked: false,
    isCurated: true
  }
];

export const HINDI_TRACKS = CURATED_TRACKS.filter((t) => t.category === 'hindi');
export const PUNJABI_TRACKS = CURATED_TRACKS.filter((t) => t.category === 'punjabi');
export const NAATS_TRACKS = CURATED_TRACKS.filter((t) => t.category === 'naats');
export const ENGLISH_TRACKS = CURATED_TRACKS.filter((t) => t.category === 'english');

export const CURATED_PLAYLISTS: Playlist[] = [
  {
    id: 'playlist-midnight-vibes',
    title: 'Midnight Vibes',
    description: 'Deep nocturnal beats for quieter hours. Handpicked cinematic soundscapes.',
    coverUrl: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=800&q=80',
    trackCount: 48,
    tracks: [
      CURATED_TRACKS[0],
      CURATED_TRACKS[1],
      CURATED_TRACKS[7],
      CURATED_TRACKS[8],
    ]
  },
  {
    id: 'playlist-bollywood-romance',
    title: 'Bollywood Romance & Sufi',
    description: 'Timeless melodies, soulful vocals and unforgettable poetic romance.',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music112/v4/9f/13/ca/9f13ca3b-e533-03e0-f19a-f0aaa774581d/196589311191.jpg/600x600bb.jpg',
    trackCount: 64,
    tracks: [
      CURATED_TRACKS[1],
      CURATED_TRACKS[6],
      CURATED_TRACKS[3],
    ]
  },
  {
    id: 'playlist-punjabi-fire',
    title: 'Punjabi Heatwave',
    description: 'Driving 808s, swaggering lyrics, and the biggest Punjabi anthems.',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/8a/89/e4/8a89e445-d2c6-f8ac-a828-27818b0c1afe/859749638209_cover.jpg/600x600bb.jpg',
    trackCount: 45,
    tracks: [
      CURATED_TRACKS[2],
      CURATED_TRACKS[5],
    ]
  },
  {
    id: 'playlist-noor-e-madina',
    title: 'Noor-e-Madina Naats',
    description: 'Sacred praises, heartfelt durood, and tranquil devotional expressions.',
    coverUrl: 'https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=800&q=80',
    trackCount: 38,
    tracks: [
      CURATED_TRACKS[3],
      CURATED_TRACKS[4],
      CURATED_TRACKS[9],
    ]
  },
  {
    id: 'playlist-late-night-drive',
    title: 'Late Night Drive',
    description: 'Empty highways, crimson brake lights, synthwave and neon memories.',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    trackCount: 41,
    tracks: [
      CURATED_TRACKS[7],
      CURATED_TRACKS[0],
      CURATED_TRACKS[10],
    ]
  },
  {
    id: 'playlist-chill-evenings',
    title: 'Chill Evenings',
    description: 'Soft melodies and moonlit acoustics for winding down.',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    trackCount: 52,
    tracks: [
      CURATED_TRACKS[8],
      CURATED_TRACKS[0],
      CURATED_TRACKS[1],
    ]
  }
];

export const FEATURED_ARTISTS: Artist[] = [
  {
    id: 'artist-arijit-singh',
    name: 'Arijit Singh',
    bio: 'The voice of Indian cinema. Known for emotive romantic anthems and soul-stirring ballads.',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '48,920,400',
    genre: 'Bollywood / Classical',
    topTracks: [CURATED_TRACKS[1], CURATED_TRACKS[6]]
  },
  {
    id: 'artist-diljit-dosanjh',
    name: 'Diljit Dosanjh',
    bio: 'Global Punjabi powerhouse, Coachella performer and icon of modern Punjabi music.',
    coverUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '22,410,200',
    genre: 'Punjabi Pop',
    topTracks: [CURATED_TRACKS[2]]
  },
  {
    id: 'artist-atif-aslam',
    name: 'Atif Aslam',
    bio: 'Legendary Pakistani playback singer and Sufi vocalist beloved worldwide.',
    coverUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '26,380,900',
    genre: 'Sufi / Pop / Naat',
    topTracks: [CURATED_TRACKS[3]]
  },
  {
    id: 'artist-the-weeknd',
    name: 'The Weeknd',
    bio: 'Pioneering Canadian R&B and synth-pop superstar redefining atmospheric pop.',
    coverUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '109,420,380',
    genre: 'R&B / Synthwave',
    topTracks: [CURATED_TRACKS[7]]
  },
  {
    id: 'artist-maher-zain',
    name: 'Maher Zain',
    bio: 'Swedish-Lebanese singer-songwriter and prominent global Nasheed artist.',
    coverUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '12,500,000',
    genre: 'Nasheed / Spiritual',
    topTracks: [CURATED_TRACKS[4]]
  },
  {
    id: 'artist-sidhu-moosewala',
    name: 'Sidhu Moose Wala',
    bio: 'Immortal Punjabi rap legend who captured hearts across continents with raw lyrics.',
    coverUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80',
    monthlyListeners: '19,700,000',
    genre: 'Punjabi Hip-Hop',
    topTracks: [CURATED_TRACKS[5]]
  }
];

export const CURATED_ARTISTS = FEATURED_ARTISTS;

export const MOOD_COLLECTIONS = [
  { id: 'mood-romantic', title: 'Romantic & Love', desc: 'Heartfelt melodies & slow dance poetry', color: 'from-rose-900/60 to-black', query: 'Hindi romantic love songs', icon: 'Heart' },
  { id: 'mood-sad', title: 'Melancholy & Sad', desc: 'Emotional catharsis for reflective moments', color: 'from-indigo-950/70 to-black', query: 'Arijit Singh sad songs', icon: 'CloudRain' },
  { id: 'mood-chill', title: 'Chill & Relaxing', desc: 'Acoustic calm and quiet midnight peace', color: 'from-teal-950/70 to-black', query: 'Chill acoustic peaceful songs', icon: 'Coffee' },
  { id: 'mood-workout', title: 'Workout & Energy', desc: 'High adrenaline, heavy bass & driving beats', color: 'from-red-950/80 to-black', query: 'Punjabi workout gym songs', icon: 'Flame' },
  { id: 'mood-party', title: 'Party & Celebration', desc: 'Unstoppable rhythm to fill the floor', color: 'from-fuchsia-950/70 to-black', query: 'Bollywood dance party hits', icon: 'Sparkles' },
  { id: 'mood-lofi', title: 'Lo-fi & Focus', desc: 'Dusty vinyl beats for deep creative focus', color: 'from-amber-950/70 to-black', query: 'Lofi chill beats study', icon: 'Headphones' },
  { id: 'mood-latenight', title: 'Late Night Nocturne', desc: 'Crimson atmospheric nocturnal sounds', color: 'from-red-900/40 via-[#100a12] to-black', query: 'The Weeknd synthwave nocturnal', icon: 'Moon' },
  { id: 'mood-devotional', title: 'Naats & Nasheeds', desc: 'Peaceful Islamic vocals and sacred praises', color: 'from-emerald-950/80 to-black', query: 'Urdu Naat Sharif peaceful', icon: 'Star' }
];

export const GENRE_CATEGORIES = [
  'All',
  'Hindi',
  'Punjabi',
  'Naats',
  'Pop',
  'Lo-fi',
  'Sufi',
  'Soundtrack'
];
