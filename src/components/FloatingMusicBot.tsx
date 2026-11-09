import React, { useEffect, useRef, useState } from 'react';
import { useMusic } from '../context/MusicContext';

const speak = (message: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-US';
  utterance.rate = 0.96;
  utterance.pitch = 1.18;
  utterance.volume = 0.9;
  window.speechSynthesis.speak(utterance);
};

export const FloatingMusicBot: React.FC = () => {
  const { currentTrack, isPlaying, setActiveTab } = useMusic();
  const [message, setMessage] = useState('Hey! Welcome to ZXH Music Studio. Let’s enjoy some music together!');
  const [expanded, setExpanded] = useState(true);
  const lastTrack = useRef<string | null>(null);
  const welcomed = useRef(false);

  useEffect(() => {
    if (welcomed.current) return;
    welcomed.current = true;
    const greeting = 'Welcome to Z X H Music Studio! Discover your favourite music and enjoy your listening experience.';
    setMessage(greeting);
    const timer = window.setTimeout(() => speak(greeting), 900);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isPlaying || !currentTrack) return;
    const key = currentTrack.id;
    if (lastTrack.current === key) return;
    lastTrack.current = key;
    const announcement = `Now playing ${currentTrack.title} by ${currentTrack.artist}. Music playing. Enjoy your music!`;
    setMessage(announcement);
    speak(announcement);
  }, [currentTrack?.id, currentTrack?.title, currentTrack?.artist, isPlaying]);

  const welcomeAgain = () => {
    const greeting = 'Welcome to Z X H Music Studio! I am your music buddy. Explore, play, and enjoy your music!';
    setMessage(greeting);
    speak(greeting);
    setExpanded(true);
  };

  return (
    <aside className="fixed left-2 sm:left-4 bottom-28 sm:bottom-32 z-[60] flex flex-col items-start gap-1.5 max-w-[190px]" aria-label="ZXH music assistant">
      {expanded && (
        <div className="relative rounded-2xl rounded-bl-sm border border-pink-300/30 bg-[#15101c]/95 backdrop-blur-xl px-3 py-2 shadow-[0_8px_35px_rgba(236,72,153,.25)]">
          <p className="text-[10px] sm:text-xs leading-relaxed text-white">{message}</p>
          <div className="mt-2 flex gap-2">
            <button onClick={() => { setActiveTab('explore'); setMessage('Let’s explore music together!'); }} className="text-[10px] font-semibold text-pink-300">Explore music</button>
            <button onClick={welcomeAgain} className="text-[10px] font-semibold text-slate-300">Speak again</button>
          </div>
        </div>
          <p className="mt-2 border-t border-white/10 pt-2 text-[9px] text-slate-400">Powered by <strong className="text-pink-300">ZXH OFFICIAL</strong><br/>Developed by <strong className="text-white">ZULQARNAIN X HAIDER</strong></p>
          <div className="mt-1 flex flex-wrap gap-x-2 gap-y-1 text-[9px]">
            <a href="https://mr-zxh-official.vercel.app" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-white">Portfolio</a>
            <a href="https://zxh-official-tools.pages.dev/" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-white">Tools Hub</a>
            <a href="https://zxh-official-mods.pages.dev/" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-white">Mods</a>
            <a href="https://t.me/zxh_official786" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-white">Telegram</a>
          </div>
        </div>
      )}
      <button onClick={() => setExpanded(v => !v) onDoubleClick={welcomeAgain} aria-label="Toggle ZXH music bot" title="ZXH Music Buddy — tap to open, double tap to hear welcome" className="relative w-[76px] h-[92px] sm:w-[92px] sm:h-[108px] rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 animate-[zxh-float_3.8s_ease-in-out_infinite]">
        <svg viewBox="0 0 100 112" className="w-full h-full drop-shadow-[0_0_16px_rgba(244,114,182,.45)]" role="img" aria-label="Cute white robot mascot wearing pink headphones">
          <defs>
            <linearGradient id="botShell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#d9dce8"/></linearGradient>
            <linearGradient id="botPink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffd5e5"/><stop offset="1" stopColor="#ed8fb5"/></linearGradient>
          </defs>
          <path d="M16 43 Q0 20 8 13 Q21 18 25 35 M84 43 Q100 20 92 13 Q79 18 75 35" fill="#f8b9d1" stroke="#fff0f6" strokeWidth="2"/>
          <path d="M24 45 Q18 9 50 8 Q82 9 76 45" fill="none" stroke="#f5a6c5" strokeWidth="9" strokeLinecap="round"/>
          <path d="M24 45 Q18 9 50 8 Q82 9 76 45" fill="none" stroke="#fff0f6" strokeWidth="3" strokeLinecap="round"/>
          <rect x="9" y="34" width="15" height="30" rx="7" fill="url(#botPink)" stroke="#fff0f6" strokeWidth="2"/>
          <rect x="76" y="34" width="15" height="30" rx="7" fill="url(#botPink)" stroke="#fff0f6" strokeWidth="2"/>
          <rect x="18" y="22" width="64" height="57" rx="20" fill="url(#botShell)" stroke="#f5a6c5" strokeWidth="2.5"/>
          <rect x="24" y="30" width="52" height="41" rx="15" fill="#090b13"/>
          <path d="M34 49 Q39 37 44 49 M56 49 Q61 37 66 49" fill="none" stroke="#69efff" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M42 58 Q50 65 58 58" fill="none" stroke="#69efff" strokeWidth="3" strokeLinecap="round"/>
          <path d="M37 80 Q50 74 63 80 L72 103 Q50 110 28 103Z" fill="url(#botShell)" stroke="#f5a6c5" strokeWidth="2"/>
          <circle cx="50" cy="91" r="7" fill="url(#botPink)" stroke="#fff0f6" strokeWidth="2"/>
          <path d="M29 87 L18 98 M71 87 L82 98" stroke="#f3b1cb" strokeWidth="7" strokeLinecap="round"/>
          <circle cx="17" cy="99" r="7" fill="url(#botPink)"/><circle cx="83" cy="99" r="7" fill="url(#botPink)"/>
          <path d="M20 77 L6 88 M80 77 L94 88" stroke="#f7c5d9" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 86 L5 82 M88 86 L95 82" stroke="#f7c5d9" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="absolute -top-1 -right-0 rounded-full bg-pink-500 w-3 h-3 border-2 border-[#08080a] animate-pulse" />
      </button>
      <style>{`@keyframes zxh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}`}</style>
    </aside>
  );
};
