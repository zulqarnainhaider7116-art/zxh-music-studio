import React from 'react';
import { MusicProvider, useMusic } from './context/MusicContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { MiniPlayer } from './components/MiniPlayer';
import { VinylPlayer } from './components/VinylPlayer';
import { HomeDiscover } from './components/HomeDiscover';
import { LibraryView } from './components/LibraryView';
import { SearchView } from './components/SearchView';
import { ExploreView } from './components/ExploreView';
import { PlaylistDetailModal } from './components/PlaylistDetailModal';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import { BrandModal } from './components/BrandModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeTab } = useMusic();

  return (
    <div className="min-h-screen bg-[#08080a] text-slate-100 flex flex-col font-sans selection:bg-red-600 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar />

      {/* Main View Router */}
      <main className="flex-1 w-full relative z-0">
        {activeTab === 'home' && <HomeDiscover />}
        {activeTab === 'explore' && <ExploreView />}
        {activeTab === 'library' && <LibraryView />}
        {activeTab === 'search' && <SearchView />}
      </main>

      {/* Site Footer */}
      <Footer />

      {/* Persistent Mini-Player */}
      <MiniPlayer />

      {/* Persistent Mobile Bottom Navigation */}
      <BottomNav />

      {/* Full-Screen Turntable Vinyl Player */}
      <VinylPlayer />

      {/* Playlist Detail Modal */}
      <PlaylistDetailModal />

      {/* Create Playlist Modal */}
      <CreatePlaylistModal />

      {/* Brand & Developer Modal */}
      <BrandModal />
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
