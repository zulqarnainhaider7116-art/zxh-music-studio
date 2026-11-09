import React, { useEffect, useRef } from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { Navbar } from './components/Navbar';
import { PlaybackBar } from './components/PlaybackBar';
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

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab } = useMusic();
  const activeTabRef = useRef(activeTab);
  activeTabRef.current = activeTab;
  useEffect(() => {
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
      </main>

      {/* Full Website Footer */}
      <Footer />

      {/* Full-Width Website Bottom Playback Bar (Spotify / YouTube Music Style) */}
      <PlaybackBar />

      {/* Expanded Turntable Vinyl Player Overlay */}
      <VinylPlayer />

      {/* Playlist Detail Modal */}
      <PlaylistDetailModal />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal />

      {/* ZXH OFFICIAL Brand & Developer Dossier Modal */}
      <BrandModal />

      <FloatingMusicBot />
    </div>
  );
};

export default function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}
