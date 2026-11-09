import React, { useState } from 'react';
import { X, Sparkles, Check } from 'lucide-react';
import { useMusic } from '../context/MusicContext';

const PRESET_COVERS = [
  { id: '1', label: 'Blood Moon', url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80' },
  { id: '2', label: 'Neon Cyberpunk', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80' },
  { id: '3', label: 'Crimson Headphones', url: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=800&q=80' },
  { id: '4', label: 'Vintage Vinyl', url: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80' },
  { id: '5', label: 'Rainy Twilight', url: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=800&q=80' },
  { id: '6', label: 'Nocturnal Highway', url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=800&q=80' },
];

export const CreatePlaylistModal: React.FC = () => {
  const { showCreatePlaylistModal, setShowCreatePlaylistModal, createPlaylist, setSelectedPlaylist } = useMusic();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedCover, setSelectedCover] = useState(PRESET_COVERS[0].url);

  if (!showCreatePlaylistModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newPl = createPlaylist(title, description, selectedCover);
    setShowCreatePlaylistModal(false);
    setTitle('');
    setDescription('');
    setSelectedPlaylist(newPl);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Create New Playlist"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
    >
      <div className="relative w-full max-w-md bg-[#12121a] border border-white/[0.1] rounded-3xl p-6 shadow-2xl space-y-5">
        {/* Close Button */}
        <button
          onClick={() => setShowCreatePlaylistModal(false)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-2 rounded-full bg-white/[0.04] text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-950/60 text-red-400 text-[11px] font-semibold border border-red-800/40 mb-2">
            <Sparkles className="w-3 h-3" />
            <span>Curate Your Sound</span>
          </div>
          <h2 className="font-serif-title text-2xl font-bold text-white tracking-tight">
            Create Playlist
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Assemble a custom tracklist for your personal nocturnal collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Playlist Title *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Midnight Drive, Cyber Reflections..."
              className="w-full bg-[#181824] border border-white/[0.08] focus:border-red-500 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A few words about the mood and vibe..."
              className="w-full bg-[#181824] border border-white/[0.08] focus:border-red-500 rounded-xl px-3.5 py-2 text-sm text-white placeholder-slate-500 focus:outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Choose Atmospheric Cover
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_COVERS.map((preset) => {
                const isSelected = selectedCover === preset.url;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setSelectedCover(preset.url)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      isSelected ? 'border-red-500 shadow-[0_0_12px_#ef4444]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={preset.url}
                      alt={preset.label}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-red-950/40 flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowCreatePlaylistModal(false)}
              className="px-4 py-2 rounded-full text-xs font-medium text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim()}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium text-xs shadow-[0_0_15px_rgba(239,68,68,0.5)] disabled:opacity-50 transition-all"
            >
              Create Playlist
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
