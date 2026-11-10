import React, { useEffect, useRef } from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ProfileView } from './components/ProfileView';
import { VinylPlayer } from './components/VinylPlayer';
import { HomeDiscover } from './components/HomeDiscover';
import { LibraryView } from './components/LibraryView';
import { SearchView } from './components/SearchView';
import { ExploreView } from './components/ExploreView';
import { CategoryView } from './components/CategoryView';
import { PlaylistDetailModal } from './components/PlaylistDetailModal';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import { BrandModal } from './components/BrandModal';
import { Footer } from './components/Footer';
import { FloatingMusicBot } from './components/FloatingMusicBot';
import { ThemeSwitcher } from './components/ThemeSwitcher';
import { InstallPrompt } from './components/InstallPrompt';
import { useState } from 'react';
import { Welcome } from './components/Welcome';
import { LoginScreen } from './components/LoginScreen';
import { RegisterScreen } from './components/RegisterScreen';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  useEffect(() => {
    if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
    window.history.pushState({ zxhMusic: true }, '');
    const handleBack = () => {
      if (activeTabRef.current !== 'home') setActiveTab('home');
      window.history.pushState({ zxhMusic: true }, '');
    };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [setActiveTab]);

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      {/* Top Website Header with Navigation & Search */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1 w-full relative z-0">
        {activeTab === 'home' && <HomeDiscover />}
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'hindi' && <CategoryView category="hindi" />}
        {activeTab === 'punjabi' && <CategoryView category="punjabi" />}
        {activeTab === 'naats' && <CategoryView category="naats" />}
        {activeTab === 'playlists' && <LibraryView />}
        {activeTab === 'search' && <SearchView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Full Website Footer */}
      <Footer />

      {/* Four-button navigation replaces the fixed bottom playback bar */}
      <BottomNav />

      {/* Expanded Turntable Vinyl Player Overlay */}
      <VinylPlayer />

      {/* Playlist Detail Modal */}
      <PlaylistDetailModal />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal />

      {/* ZXH OFFICIAL Brand & Developer Dossier Modal */}
      <BrandModal />

      <FloatingMusicBot />
      <ThemeSwitcher />
      <InstallPrompt />
    </div>
  );
};

type AuthScreen = 'welcome' | 'login' | 'register' | 'music';
function AppGate() {
  const [screen, setScreen] = useState<AuthScreen>(() => {
    try { return sessionStorage.getItem('zxh-music-guest') === '1' ? 'music' : 'welcome'; } catch { return 'welcome'; }
  });
  const [gender, setGender] = useState<'boy' | 'girl'>(() => {
    try { return (localStorage.getItem('zxh-auth-gender') as 'boy' | 'girl') || 'girl'; } catch { return 'girl'; }
  });
  const chooseGender = (value: 'boy' | 'girl') => {
    setGender(value);
    try { localStorage.setItem('zxh-auth-gender', value); } catch {}
    setScreen('login');
  };
  const enterGuest = () => {
    try { sessionStorage.setItem('zxh-music-guest', '1'); } catch {}
    setScreen('music');
  };
  if (screen === 'music') return <AppContent />;
  return (
    <div className="min-h-screen">
      {screen === 'welcome' && <Welcome selectedGender={gender} onSelectGender={chooseGender} />}
      {screen === 'login' && <LoginScreen gender={gender} onBack={() => setScreen('welcome')} onSwitchGender={setGender} onRegister={() => setScreen('register')} onGuestContinue={enterGuest} />}
      {screen === 'register' && <RegisterScreen gender={gender} onBack={() => setScreen('login')} onLogin={() => setScreen('login')} />}
    </div>
  );
}
export default function App() {
  return <MusicProvider><AppGate /></MusicProvider>;
}
