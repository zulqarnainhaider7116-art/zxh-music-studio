import React, { useEffect, useState } from 'react';
import { Palette, Check } from 'lucide-react';

const themes = [
  { id: 'crimson', name: 'Crimson', color: '#e11d48' },
  { id: 'ocean', name: 'Ocean Blue', color: '#2586e8' },
  { id: 'violet', name: 'Royal Violet', color: '#8b5cf6' },
  { id: 'emerald', name: 'Emerald', color: '#10b981' },
  { id: 'pearl', name: 'Pearl Light', color: '#f1a8c8' },
];

export const ThemeSwitcher: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => localStorage.getItem('zxh-music-theme') || 'crimson');
  useEffect(() => {
    document.documentElement.dataset.theme = active;
    localStorage.setItem('zxh-music-theme', active);
  }, [active]);
  return <div className="fixed top-24 right-3 sm:right-6 z-[70]">
    {open && <div className="mb-2 w-48 rounded-2xl border border-white/10 bg-[#111116]/95 p-3 shadow-2xl backdrop-blur-xl">
      <p className="mb-2 text-[10px] font-bold uppercase tracking-[.2em] text-slate-400">Choose your theme</p>
      {themes.map(theme => <button key={theme.id} onClick={() => setActive(theme.id)} className="flex w-full items-center gap-2 rounded-xl px-2 py-2 text-left text-xs text-white hover:bg-white/10">
        <span className="h-4 w-4 rounded-full border border-white/30" style={{ background: theme.color }} />
        <span className="flex-1">{theme.name}</span>{active === theme.id && <Check size={14} />}
      </button>)}
    </div>}
    <button onClick={() => setOpen(v => !v)} aria-label="Change website theme" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/75 text-white shadow-xl backdrop-blur-xl hover:scale-105"><Palette size={19}/></button>
  </div>;
};
