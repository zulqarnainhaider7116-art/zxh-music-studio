import React from 'react';
import { Disc, Heart, ShieldCheck, Mail, Sparkles, Github } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const Footer: React.FC = () => {
  const { setShowBrandModal, setActiveTab } = useMusic();

  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#070709] text-slate-400 py-12 px-6 md:px-12 mt-12 pb-36">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Col 1: Brand & Identity */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center">
              <Disc className="w-4 h-4 text-red-500" />
            </div>
            <span className="font-brand-title text-base font-bold tracking-widest text-white">
              ZXH MUSIC STUDIO
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Music Lives Here. The premier dark cinematic audio streaming platform inspired by NOIR aesthetics.
          </p>
          <div className="pt-1">
            <span className="text-[11px] font-semibold text-red-400 bg-red-950/60 px-2.5 py-1 rounded-full border border-red-800/40">
              NOIR Cinematic Edition
            </span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Explore Studio
          </h4>
          <ul className="text-xs space-y-2">
            <li>
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-red-400 transition-colors"
              >
                Home & Discover
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('explore')}
                className="hover:text-red-400 transition-colors"
              >
                Moods & Sound Suites
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('library')}
                className="hover:text-red-400 transition-colors"
              >
                Playlists & Collections
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('search')}
                className="hover:text-red-400 transition-colors"
              >
                Live Catalog Search
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Architecture & Audio */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Audio Integrity
          </h4>
          <ul className="text-xs space-y-2 text-slate-400">
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Real iTunes API Previews</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Lossless Curated Masters</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>HTML5 Web Audio Vinyl Engine</span>
            </li>
            <li className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Local File Import Player</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Developer & Credits */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Studio Credits
          </h4>
          <p className="text-xs text-slate-400">
            Developer: <strong className="text-white">ZULQARNAIN X HAIDER</strong>
          </p>
          <p className="text-xs text-slate-400">
            Brand: <strong className="text-red-400">ZXH OFFICIAL</strong>
          </p>
          <button
            onClick={() => setShowBrandModal(true)}
            className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold underline mt-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>View Full Brand Dossier</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
        <p className="text-slate-400">
          © {new Date().getFullYear()} <strong className="text-slate-200">ZXH MUSIC STUDIO</strong>. All rights reserved. Powered by <strong className="text-red-400">ZXH OFFICIAL</strong>.
        </p>
        <p className="text-slate-400 flex items-center gap-1">
          Architected by <span className="text-white font-semibold">ZULQARNAIN X HAIDER</span>
        </p>
      </div>
    </footer>
  );
};
