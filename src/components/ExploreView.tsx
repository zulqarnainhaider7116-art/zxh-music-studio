import React, { useEffect, useState } from 'react';
import { Play, Sparkles, Disc, Flame, Moon, Compass, Headphones, Heart, Music2, Loader2 } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { CURATED_PLAYLISTS } from '../data/curatedMusic';
import { searchTracks } from '../services/musicApi';
import { Track } from '../types/music';

const DISCOVERY_LISTS = [
  { id: 'hindi', title: 'Hindi Hits', subtitle: 'Bollywood favourites', query: 'Hindi Bollywood hit songs', icon: Music2 },
  { id: 'romance', title: 'Romantic Bollywood', subtitle: 'Love songs & melodies', query: 'Bollywood romantic songs', icon: Heart },
  { id: 'sad', title: 'Sad & Heartbreak', subtitle: 'Emotional Hindi melodies', query: 'Hindi sad songs Arijit Singh', icon: Moon },
  { id: 'punjabi', title: 'Punjabi Hits', subtitle: 'Punjabi chart favourites', query: 'Punjabi hit songs Diljit Dosanjh', icon: Flame },
  { id: 'urdu-naats', title: 'Urdu Naats', subtitle: 'Naat Sharif collections', query: 'Urdu Naat Sharif', icon: Sparkles },
  { id: 'arabic-nasheeds', title: 'Arabic Nasheeds', subtitle: 'Peaceful devotional vocals', query: 'Arabic Islamic Nasheed', icon: Moon },
  { id: 'islamic', title: 'Islamic Vocals', subtitle: 'Spiritual & devotional', query: 'Islamic vocals Maher Zain Sami Yusuf', icon: Headphones },
  { id: 'english', title: 'English Pop', subtitle: 'International pop tracks', query: 'English pop hits', icon: Disc },
  { id: 'chill', title: 'Chill & Relax', subtitle: 'Easy listening sounds', query: 'Chill relaxing acoustic songs', icon: Headphones },
  { id: 'lofi', title: 'Lo-fi & Focus', subtitle: 'Study and focus beats', query: 'Lofi study beats', icon: Music2 },
  { id: 'workout', title: 'Workout Energy', subtitle: 'High-energy tracks', query: 'Workout gym music hits', icon: Flame },
  { id: 'sufi', title: 'Sufi & Qawwali', subtitle: 'Soulful South Asian vocals', query: 'Sufi qawwali songs', icon: Sparkles },
];

export const ExploreView: React.FC = () => {
  const { playTrack, setSelectedPlaylist, isLiked, toggleLike } = useMusic();
  const [catalog, setCatalog] = useState<Record<string, Track[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      const results = await Promise.allSettled(
        DISCOVERY_LISTS.map((item) => searchTracks(item.query, 12))
      );
      if (!active) return;
      const next: Record<string, Track[]> = {};
      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value.length) {
          next[DISCOVERY_LISTS[index].id] = result.value;
        }
      });
      setCatalog(next);
      setLoading(false);
    };
    load();
    return () => { active = false; };
  }, []);

  const moods = [
    { title: 'Nocturnal Vibes', icon: Moon, desc: 'Deep beats, calm rhythms for late nights', color: 'from-blue-950/80 to-black', playlist: CURATED_PLAYLISTS[0] },
    { title: 'Bollywood Romance', icon: Heart, desc: 'Timeless melodies and love songs', color: 'from-sky-950/80 to-black', playlist: CURATED_PLAYLISTS[1] },
    { title: 'Punjabi Energy', icon: Flame, desc: 'Driving beats and Punjabi anthems', color: 'from-amber-950/80 to-black', playlist: CURATED_PLAYLISTS[2] },
    { title: 'Naats & Nasheeds', icon: Sparkles, desc: 'Peaceful devotional collections', color: 'from-emerald-950/80 to-black', playlist: CURATED_PLAYLISTS[3] },
  ];

  return (
    <div className="w-full max-w-[1600px] mx-auto pb-36 pt-6 px-4 sm:px-6 lg:px-10 space-y-12 animate-fadeIn">
      <header className="border-b border-white/[0.07] pb-7">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/40 text-blue-400 text-xs font-semibold mb-3 border border-blue-800/40">
          <Compass className="w-3.5 h-3.5" /><span>ZXH MUSIC DISCOVERY</span>
        </div>
        <h1 className="font-serif-title text-4xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight">Explore Every Sound</h1>
        <p className="text-sm text-slate-500 mt-2 max-w-2xl">Discover Hindi, Punjabi, Urdu Naats, Arabic Nasheeds, international music and collections for every mood.</p>
      </header>

      <section>
        <div className="flex items-end justify-between mb-5">
          <div><span className="text-xs uppercase tracking-widest text-blue-400 font-bold">Find your frequency</span><h2 className="font-serif-title text-2xl sm:text-3xl text-slate-900 font-bold mt-1">Browse by Mood</h2></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moods.map((mood) => {
            const Icon = mood.icon;
            return <button key={mood.title} onClick={() => setSelectedPlaylist(mood.playlist)} className={`text-left p-5 rounded-2xl bg-gradient-to-br ${mood.color} border border-white/[0.08] hover:border-blue-500/50 shadow-xl group transition-all`}>
              <Icon className="w-6 h-6 text-blue-400 mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-400">{mood.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{mood.desc}</p>
            </button>;
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between gap-3">
          <div><span className="text-xs uppercase tracking-widest text-blue-400 font-bold">12 curated discovery lists</span><h2 className="font-serif-title text-2xl sm:text-3xl text-slate-900 font-bold mt-1">Music for Every Moment</h2></div>
          {loading && <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />}
        </div>
        {DISCOVERY_LISTS.map((list) => {
          const tracks = catalog[list.id] || [];
          const Icon = list.icon;
          return <section key={list.id} className="border-b border-white/[0.07] pb-7">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-950/50 border border-blue-900/40 flex items-center justify-center"><Icon className="w-4 h-4 text-blue-400" /></div>
              <div className="min-w-0"><h3 className="text-lg sm:text-xl font-bold text-slate-900">{list.title}</h3><p className="text-xs text-slate-500">{list.subtitle}</p></div>
              <span className="ml-auto text-xs text-slate-500">{tracks.length ? `${tracks.length} tracks` : loading ? 'Loading…' : 'No results'}</span>
            </div>
            {tracks.length > 0 ? <div className="flex gap-3 overflow-x-auto pb-2 snap-x">
              {tracks.slice(0, 12).map((track) => <article key={track.id} className="group w-[145px] sm:w-[170px] shrink-0 snap-start">
                <button onClick={() => playTrack(track, tracks)} className="relative block w-full aspect-square rounded-xl overflow-hidden bg-blue-50 border border-white/[0.06]">
                  <img src={track.coverUrl} alt={track.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute bottom-2 right-2 w-9 h-9 rounded-full bg-blue-600 text-slate-900 flex items-center justify-center shadow-lg"><Play className="w-4 h-4 fill-current ml-0.5" /></span>
                </button>
                <div className="flex items-start gap-1 mt-2"><div className="min-w-0 flex-1"><p className="text-sm text-slate-900 font-semibold truncate">{track.title}</p><p className="text-xs text-slate-500 truncate">{track.artist}</p></div><button aria-label={isLiked(track.id) ? 'Unlike track' : 'Like track'} onClick={() => toggleLike(track)} className="p-1 text-slate-500 hover:text-blue-400"><Heart className={`w-4 h-4 ${isLiked(track.id) ? 'fill-blue-500 text-blue-500' : ''}`} /></button></div>
              </article>)}
            </div> : <p className="text-sm text-slate-500 py-3">{loading ? 'Finding tracks from the music catalogue…' : 'No matching tracks are available right now.'}</p>}
          </section>;
        })}
      </section>

      <section>
        <h2 className="font-serif-title text-2xl sm:text-3xl font-bold text-slate-900 mb-5">Curated Playlists</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {CURATED_PLAYLISTS.map((pl) => <button key={pl.id} onClick={() => setSelectedPlaylist(pl)} className="text-left group min-w-0">
            <div className="aspect-square rounded-xl overflow-hidden bg-blue-50 border border-white/[0.06]"><img src={pl.coverUrl} alt={pl.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform" /></div>
            <h3 className="text-sm font-semibold text-slate-900 truncate mt-2">{pl.title}</h3><p className="text-xs text-slate-500">{pl.trackCount} tracks</p>
          </button>)}
        </div>
      </section>
      <footer className="pt-5 text-xs text-slate-500">Powered by ZXH OFFICIAL · Developed by ZULQARNAIN X HAIDER</footer>
    </div>
  );
};
