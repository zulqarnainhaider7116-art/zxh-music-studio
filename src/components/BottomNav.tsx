import React from 'react';
import { Home, Search, Compass, UserRound } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();

  const navItems = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'search' as const, label: 'Search', icon: Search },
    { id: 'explore' as const, label: 'Explore', icon: Compass },
    { id: 'profile' as const, label: 'Profile', icon: UserRound },
  ];

  return (
    <nav 
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-2xl border-t border-blue-100 shadow-[0_-8px_30px_rgba(37,99,235,.08)] px-4 py-2"
    >
      <div className="max-w-xl mx-auto grid grid-cols-4 items-center justify-items-center">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-label={item.label}
              className={`flex flex-col items-center justify-center py-1 px-3 transition-all duration-200 group relative ${
                isActive ? 'text-blue-600 font-semibold' : 'text-slate-500 hover:text-blue-700'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 text-blue-600 drop-shadow-[0_0_8px_rgba(59,130,246,0.25)]' : 'group-hover:scale-105'
                  }`}
                />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_8px_#3b82f6]" />
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-wide ${isActive ? 'text-blue-600' : 'text-slate-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
