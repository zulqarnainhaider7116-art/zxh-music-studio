import React, { useRef } from 'react';
import { Bell, User, Upload, Sparkles, Disc } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const Navbar: React.FC = () => {
  const { setShowBrandModal, importLocalAudio, setActiveTab } = useMusic();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importLocalAudio(e.target.files[0]);
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.06] px-4 md:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo & Tagline */}
        <div 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-red-600 via-rose-700 to-black p-[1px] shadow-[0_0_20px_rgba(225,29,72,0.4)]">
            <div className="w-full h-full bg-[#0d0d12] rounded-xl flex items-center justify-center">
              <Disc className="w-5 h-5 text-red-500 group-hover:rotate-90 transition-transform duration-500" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-brand-title text-lg font-bold tracking-[0.2em] text-white">
                ZXH
              </span>
              <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/40 tracking-wider">
                STUDIO
              </span>
            </div>
            <p className="text-[10px] tracking-[0.25em] text-slate-400 font-medium uppercase -mt-0.5">
              Music Lives Here
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Audio File Upload */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import & Play Local Audio"
            aria-label="Import and Play Local Audio"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all hover:border-red-500/30"
          >
            <Upload className="w-3.5 h-3.5 text-red-400" />
            <span>Import Track</span>
          </button>

          {/* About & Developer Credits Button */}
          <button
            onClick={() => setShowBrandModal(true)}
            title="ZXH OFFICIAL Brand & Developer Info"
            aria-label="About ZXH Music Studio & Developer Zulqarnain x Haider"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 text-xs font-semibold text-red-300 hover:text-red-200 transition-all shadow-[0_0_12px_rgba(225,29,72,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden sm:inline">ZXH OFFICIAL</span>
          </button>

          {/* Notification Bell with Glowing Crimson Dot */}
          <button
            onClick={() => setShowBrandModal(true)}
            aria-label="Notifications"
            className="relative p-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />
          </button>

          {/* Profile Avatar */}
          <button
            onClick={() => setShowBrandModal(true)}
            aria-label="User Profile"
            className="relative w-8 h-8 rounded-full p-[1.5px] bg-gradient-to-tr from-red-600 via-rose-500 to-amber-500 overflow-hidden shadow-[0_0_12px_rgba(239,68,68,0.4)]"
          >
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
