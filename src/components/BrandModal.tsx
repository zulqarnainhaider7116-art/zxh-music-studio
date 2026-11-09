import React from 'react';
import { X, Sparkles, Disc, ShieldCheck, Mail, Globe, Code2, Heart } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const BrandModal: React.FC = () => {
  const { showBrandModal, setShowBrandModal } = useMusic();

  if (!showBrandModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About ZXH Music Studio"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="relative w-full max-w-lg bg-[#0e0e15] border border-red-900/30 rounded-3xl p-6 md:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Ambient Glow */}
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-red-600/20 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setShowBrandModal(false)}
          aria-label="Close brand information"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.04] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center pt-2 relative z-0">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-red-600 to-rose-700 p-[1.5px] shadow-[0_0_25px_rgba(239,68,68,0.5)] mb-3">
            <div className="w-full h-full bg-[#0a0a0f] rounded-2xl flex items-center justify-center">
              <Disc className="w-7 h-7 text-red-500 animate-spin-slow" />
            </div>
          </div>

          <h2 className="font-brand-title text-2xl font-bold tracking-[0.2em] text-white">
            ZXH MUSIC STUDIO
          </h2>
          <p className="text-xs tracking-[0.25em] text-red-400 font-semibold uppercase mt-0.5">
            Music Lives Here
          </p>
          <p className="text-xs text-slate-400 mt-2 max-w-sm mx-auto">
            A premier dark cinematic streaming platform inspired by NOIR aesthetics, crafted with passion for nocturnal music lovers.
          </p>
        </div>

        {/* Brand & Developer Identity */}
        <div className="p-4 rounded-2xl bg-[#14141e] border border-white/[0.06] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Product</span>
            <span className="font-semibold text-white">ZXH MUSIC STUDIO</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Brand</span>
            <span className="font-semibold text-red-400">ZXH OFFICIAL</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Lead Architect & Developer</span>
            <span className="font-semibold text-white">ZULQARNAIN X HAIDER</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Aesthetic Reference</span>
            <span className="font-semibold text-slate-200">NOIR Music Specification</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Engine Build</span>
            <span className="font-mono text-emerald-400 text-[11px]">Production v2.4</span>
          </div>
        </div>

        {/* Real Audio & Catalog Integration */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Audio Architecture & Licensing</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            ZXH MUSIC STUDIO adheres strictly to official developer licensing:
          </p>
          <ul className="text-xs text-slate-400 space-y-1.5 pl-4 list-disc">
            <li>
              <strong className="text-slate-200">iTunes Search API:</strong> Official catalog metadata, high-resolution artwork (up to 1000x1000px), and authentic 256kbps audio preview streams.
            </li>
            <li>
              <strong className="text-slate-200">Lossless Studio Masters:</strong> Royalty-free and open-license nocturnal soundscapes for extended study and chill sessions.
            </li>
            <li>
              <strong className="text-slate-200">Local Studio Upload:</strong> Users can import their own lossless WAV/MP3 files directly to play on the vinyl turntable engine.
            </li>
          </ul>
        </div>

        {/* Contact & Support Section */}
        <div className="p-4 rounded-2xl bg-[#14141e] border border-white/[0.06] space-y-2">
          <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
            Official Contact & Studio Inquiries
          </h4>
          <div className="flex flex-col gap-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-red-400" />
              <span>contact@zxhofficial.studio</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-red-400" />
              <span>https://zxhofficial.studio</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-2 border-t border-white/[0.06]">
          <p className="text-xs text-slate-400">
            Powered by <strong className="text-white">ZXH OFFICIAL</strong> · Built with pride by <strong className="text-red-400">ZULQARNAIN X HAIDER</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
