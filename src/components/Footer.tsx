import React, { useState } from 'react';
import { Disc, ShieldCheck, Mail, Sparkles, Globe, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const Footer: React.FC = () => {
  const { setShowBrandModal, setActiveTab } = useMusic();
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="w-full border-t border-white/[0.08] bg-[#07070a] text-slate-400 pt-16 pb-28 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        {/* Col 1: Brand & Identity */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center">
              <Disc className="w-5 h-5 text-red-500" />
            </div>
            <div>
              <span className="font-brand-title text-xl sm:text-2xl font-bold tracking-widest text-white block">
                ZXH MUSIC STUDIO
              </span>
              <span className="text-[10px] tracking-[0.2em] text-red-400 uppercase font-semibold">
                Music Beyond Boundaries
              </span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
            A world-class music streaming platform crafted for nocturnal creators and authentic music lovers. Discover Hindi, Punjabi, Naats, and international hits with genuine studio playback.
          </p>
          <div className="pt-2 flex flex-wrap gap-2">
            <span className="text-[11px] font-semibold text-red-400 bg-red-950/60 px-3 py-1 rounded-full border border-red-800/40">
              Powered by ZXH OFFICIAL
            </span>
            <span className="text-[11px] font-semibold text-slate-300 bg-white/[0.04] px-3 py-1 rounded-full border border-white/[0.08]">
              Dev: ZULQARNAIN X HAIDER
            </span>
          </div>
        </div>

        {/* Col 2: Explore Music */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Explore Music
          </h4>
          <ul className="text-xs space-y-2.5">
            <li>
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-red-400 transition-colors"
              >
                Home & Trending
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('explore')}
                className="hover:text-red-400 transition-colors"
              >
                Sonic Atmospheres
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('playlists')}
                className="hover:text-red-400 transition-colors"
              >
                Curated Sound Suites
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('search')}
                className="hover:text-red-400 transition-colors"
              >
                Global Catalog Search
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Music Categories */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Music Categories
          </h4>
          <ul className="text-xs space-y-2.5">
            <li>
              <button
                onClick={() => setActiveTab('hindi')}
                className="hover:text-red-400 transition-colors"
              >
                Hindi & Bollywood Cinema
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('punjabi')}
                className="hover:text-red-400 transition-colors"
              >
                Punjabi Wave & Anthems
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('naats')}
                className="hover:text-red-400 transition-colors"
              >
                Urdu Naats & Nasheeds
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('home')}
                className="hover:text-red-400 transition-colors"
              >
                International Pop & Scores
              </button>
            </li>
          </ul>
        </div>

        {/* Col 4: Platform Integrity & Legal */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Integrity & Terms
          </h4>
          <ul className="text-xs space-y-2.5 text-slate-400">
            <li>
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </button>
            </li>
            <li>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </button>
            </li>
            <li>
              <button
                onClick={() => setShowBrandModal(true)}
                className="hover:text-red-400 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-red-400" />
                <span>About ZXH OFFICIAL</span>
              </button>
            </li>
            <li className="flex items-center gap-1.5 pt-1 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified API Previews</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="w-full max-w-[1600px] mx-auto pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
        <p className="text-slate-400 text-center sm:text-left">
          © {new Date().getFullYear()} <strong className="text-slate-200">ZXH MUSIC STUDIO</strong>. All rights reserved. Powered by <strong className="text-red-400">ZXH OFFICIAL</strong>.
        </p>
        <p className="text-slate-400 flex items-center gap-1.5 text-center sm:text-right">
          <span>Engineered & Developed by</span>
          <strong className="text-white hover:text-red-400 cursor-pointer" onClick={() => setShowBrandModal(true)}>
            ZULQARNAIN X HAIDER
          </strong>
        </p>
      </div>

      {/* Quick Legal Terms / Privacy Modal */}
      {legalModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-[#12121a] border border-white/[0.1] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4">
            <h3 className="font-serif-title text-xl font-bold text-white capitalize">
              {legalModal === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} · ZXH MUSIC STUDIO
            </h3>
            <div className="text-xs text-slate-300 space-y-2 max-h-60 overflow-y-auto pr-2 leading-relaxed">
              <p>
                ZXH MUSIC STUDIO respects your digital privacy. We do not sell or monetize personal tracking data. Playlists, favorite tracks, and audio volume preferences are securely stored locally on your device via client-side local storage.
              </p>
              <p>
                All music catalog metadata and audio preview streams are delivered through the official iTunes Search API in compliance with legitimate developer licensing guidelines.
              </p>
              <p>
                Brand: <strong>ZXH OFFICIAL</strong> | Developer: <strong>ZULQARNAIN X HAIDER</strong>.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-full text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
