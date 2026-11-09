import React, { useRef, useState } from 'react';
import {
  Disc,
  Search,
  Upload,
  Sparkles,
  Volume2,
  VolumeX,
  Menu,
  X,
  Library,
  Music2,
  Heart,
  Compass,
} from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { NavTab } from '../types/music';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setShowBrandModal,
    importLocalAudio,
    sfxEnabled,
    toggleSfx,
    searchQuery,
    setSearchQuery,
    likedTrackIds,
  } = useMusic();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSearch, setHeaderSearch] = useState(searchQuery);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      importLocalAudio(e.target.files[0]);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearch.trim()) {
      setSearchQuery(headerSearch.trim());
      setActiveTab('search');
      setMobileMenuOpen(false);
    }
  };

  const navLinks: { id: NavTab; label: string; badge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'explore', label: 'Explore' },
    { id: 'hindi', label: 'Hindi Music' },
    { id: 'punjabi', label: 'Punjabi' },
    { id: 'naats', label: 'Naats & Nasheeds' },
    { id: 'playlists', label: 'Playlists' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08080c]/90 backdrop-blur-2xl border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Tagline */}
        <div
          onClick={() => {
            setActiveTab('home');
            setMobileMenuOpen(false);
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0 select-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 via-rose-700 to-black p-[1.5px] shadow-[0_0_22px_rgba(225,29,72,0.5)]">
            <div className="w-full h-full bg-[#0d0d14] rounded-xl flex items-center justify-center">
              <Disc className="w-5 h-5 text-red-500 group-hover:rotate-180 transition-transform duration-700" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-brand-title text-base sm:text-lg font-extrabold tracking-[0.18em] text-white">
                ZXH
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 border border-red-800/40 tracking-widest uppercase">
                Studio
              </span>
            </div>
            <p className="text-[9px] tracking-[0.24em] text-slate-400 font-semibold uppercase -mt-0.5">
              Music Beyond Boundaries
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav aria-label="Primary Website Navigation" className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white font-semibold bg-white/[0.06] shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.03]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-red-600 to-rose-400 rounded-full shadow-[0_0_8px_#ef4444]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Global Search Bar (Desktop) */}
        <div className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search Hindi, Punjabi, Naats, Pop..."
              className="w-full bg-[#13131b] border border-white/[0.08] focus:border-red-500/60 rounded-full pl-9 pr-8 py-2 text-xs text-white placeholder-slate-400 focus:outline-none transition-all shadow-inner"
            />
            {headerSearch && (
              <button
                type="button"
                onClick={() => setHeaderSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </form>
        </div>

        {/* Desktop Quick Actions: Sound Effects, Import, Brand Dossier */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Sound Effects Toggle */}
          <button
            onClick={toggleSfx}
            title={sfxEnabled ? 'Audio UI Effects: ON' : 'Audio UI Effects: OFF'}
            aria-label="Toggle UI Sound Effects"
            className={`p-2 rounded-full border transition-all ${
              sfxEnabled
                ? 'bg-red-950/40 border-red-800/40 text-red-400'
                : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-slate-200'
            }`}
          >
            {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Import Track */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="audio/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Import Local Audio Track"
            aria-label="Import local audio file"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-xs font-medium text-slate-300 hover:text-white transition-all"
          >
            <Upload className="w-3.5 h-3.5 text-red-400" />
            <span className="hidden xl:inline">Import Track</span>
          </button>

          {/* About ZXH Official */}
          <button
            onClick={() => setShowBrandModal(true)}
            aria-label="About ZXH Music Studio"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-red-950/60 to-rose-950/60 hover:from-red-900/80 hover:to-rose-900/80 border border-red-800/40 text-xs font-semibold text-red-300 transition-all shadow-[0_0_12px_rgba(225,29,72,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-red-400" />
            <span>ZXH OFFICIAL</span>
          </button>
        </div>

        {/* Mobile Search & Menu Toggle */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setActiveTab('search')}
            aria-label="Search"
            className="p-2 rounded-xl bg-white/[0.04] text-slate-300 border border-white/[0.08]"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-xl bg-white/[0.04] text-slate-300 border border-white/[0.08]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-red-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/[0.08] bg-[#0c0c12] px-5 py-4 space-y-3 animate-fadeIn">
          {/* Mobile Search input */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={headerSearch}
              onChange={(e) => setHeaderSearch(e.target.value)}
              placeholder="Search Hindi, Punjabi, Naats, Pop..."
              className="w-full bg-[#14141c] border border-white/[0.1] rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none"
            />
          </form>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    setActiveTab(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-red-950/60 text-red-400 border border-red-800/40 font-semibold'
                      : 'text-slate-300 hover:bg-white/[0.04]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
            <button
              onClick={() => {
                fileInputRef.current?.click();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
            >
              <Upload className="w-3.5 h-3.5 text-red-400" />
              <span>Import Audio File</span>
            </button>

            <button
              onClick={() => {
                setShowBrandModal(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-red-400 font-semibold"
            >
              ZXH OFFICIAL Dossier
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
