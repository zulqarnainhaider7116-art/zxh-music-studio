import React from 'react';
import { Home, Compass, Library, Search } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { NavTab } from '../types/music';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();

  const navItems: { id: NavTab; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'library', label: 'Library', icon: Library },
    { id: 'search', label: 'Search', icon: Search },
  ];

  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#09090d]/95 backdrop-blur-2xl border-t border-white/[0.08] px-4 py-2"
    >
      <div className="max-w-md mx-auto flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-all duration-200 group relative ${
                isActive ? 'text-red-500 font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.7)]' : 'group-hover:scale-105'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_8px_#ef4444]" />
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-wide ${isActive ? 'text-red-400' : 'text-slate-400'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
