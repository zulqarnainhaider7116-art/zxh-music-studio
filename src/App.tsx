import React, { useEffect, useRef } from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { ProfileView } from './components/ProfileView';
import { VinylPlayer } from './components/VinylPlayer';
import { PlaybackBar } from './components/PlaybackBar';
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
import { InstallPrompt } from './components/InstallPrompt';
import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { WelcomeScreen } from './components/WelcomeScreen';

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
    <div className="zxh-boys-world min-h-screen flex flex-col font-sans relative">
      {/* Top Website Header with Navigation & Search */}
      <Navbar />

      {/* Main Content Router */}
      <main className="flex-1 w-full relative z-0">
        {activeTab === 'home' && <HomeDiscover />}
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'hindi' && <CategoryView category="hindi" />}
        {activeTab === 'punjabi' && <CategoryView category="punjabi" />}
        {activeTab === 'english' && <CategoryView category="english" />}
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
      <PlaybackBar />

      {/* Playlist Detail Modal */}
      <PlaylistDetailModal />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal />

      {/* ZXH OFFICIAL Brand & Developer Dossier Modal */}
      <BrandModal />

      <FloatingMusicBot />
      <InstallPrompt />
    </div>
  );
};

type AuthScreen = 'welcome' | 'login' | 'music';
function AppGate() {
  const [screen, setScreen] = useState<AuthScreen>(() => {
    try { return sessionStorage.getItem('zxh-music-guest') === '1' ? 'music' : 'welcome'; } catch { return 'welcome'; }
  });
  const enterGuest = () => {
    try { sessionStorage.setItem('zxh-music-guest', '1'); } catch {}
    setScreen('music');
  };
  if (screen === 'music') return <AppContent />;
  if (screen === 'welcome') return <WelcomeScreen onGetStarted={() => setScreen('login')} onGuestContinue={enterGuest} />;
  return <div className="min-h-screen"><LoginScreen gender="boy" onBack={() => setScreen('welcome')} onGuestContinue={enterGuest} /></div>;
}
export default function App() {
  return <MusicProvider><AppGate /></MusicProvider>;
}
