import React, { useEffect, useRef } from 'react';
import { useMusic } from '../context/MusicContext';

const speak = (message: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = 'en-US';
  utterance.rate = 0.94;
  utterance.pitch = 1.2;
  window.speechSynthesis.speak(utterance);
};

export const FloatingMusicBot: React.FC = () => {
  const { currentTrack, isPlaying } = useMusic();
  const welcomed = useRef(false);
  const lastTrack = useRef<string | null>(null);

  useEffect(() => {
    const greeting = 'Welcome to Z X H Music Studio! I am your music buddy. Explore and enjoy your music.';
    const attemptWelcome = () => {
      if (welcomed.current) return;
      welcomed.current = true;
      speak(greeting);
    };
    const timer = window.setTimeout(attemptWelcome, 1200);
    window.addEventListener('pointerdown', attemptWelcome, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('pointerdown', attemptWelcome);
    };
  }, []);

  useEffect(() => {
    if (!isPlaying || !currentTrack || lastTrack.current === currentTrack.id) return;
    lastTrack.current = currentTrack.id;
    speak('Now playing ' + currentTrack.title + ' by ' + currentTrack.artist + '. Music playing. Enjoy your music!');
  }, [currentTrack?.id, currentTrack?.title, currentTrack?.artist, isPlaying]);

  return (
    <aside className="fixed right-2 sm:right-5 bottom-24 sm:bottom-28 z-[60] pointer-events-none" aria-label="ZXH floating music robot">
      <div className="w-[112px] h-[132px] sm:w-[150px] sm:h-[176px] animate-[zxh-float_3.8s_ease-in-out_infinite] drop-shadow-[0_0_22px_rgba(244,114,182,.32)]">
        <svg viewBox="0 0 100 112" className="w-full h-full" role="img" aria-label="White and pink winged robot wearing pink headphones">
          <defs>
            <linearGradient id="zxhBotShell" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fff"/><stop offset="1" stopColor="#d9dce8"/></linearGradient>
            <linearGradient id="zxhBotPink" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffd5e5"/><stop offset="1" stopColor="#ed8fb5"/></linearGradient>
          </defs>
          <path d="M16 48 Q-2 22 8 13 Q21 18 25 39 M84 48 Q102 22 92 13 Q79 18 75 39" fill="#f8b9d1" stroke="#fff0f6" strokeWidth="2"/>
          <path d="M24 45 Q18 7 50 7 Q82 7 76 45" fill="none" stroke="#f5a6c5" strokeWidth="11" strokeLinecap="round"/>
          <path d="M24 45 Q18 7 50 7 Q82 7 76 45" fill="none" stroke="#fff0f6" strokeWidth="3" strokeLinecap="round"/>
          <rect x="8" y="34" width="17" height="32" rx="8" fill="url(#zxhBotPink)" stroke="#fff0f6" strokeWidth="2"/>
          <rect x="75" y="34" width="17" height="32" rx="8" fill="url(#zxhBotPink)" stroke="#fff0f6" strokeWidth="2"/>
          <rect x="17" y="22" width="66" height="58" rx="21" fill="url(#zxhBotShell)" stroke="#f5a6c5" strokeWidth="2.5"/>
          <rect x="23" y="30" width="54" height="42" rx="15" fill="#090b13"/>
          <path d="M33 49 Q39 36 45 49 M55 49 Q61 36 67 49" fill="none" stroke="#69efff" strokeWidth="4" strokeLinecap="round"/>
          <path d="M41 59 Q50 67 59 59" fill="none" stroke="#69efff" strokeWidth="3.5" strokeLinecap="round"/>
          <path d="M35 81 Q50 74 65 81 L73 105 Q50 112 27 105Z" fill="url(#zxhBotShell)" stroke="#f5a6c5" strokeWidth="2"/>
          <circle cx="50" cy="92" r="8" fill="url(#zxhBotPink)" stroke="#fff0f6" strokeWidth="2"/>
          <path d="M29 87 L17 99 M71 87 L83 99" stroke="#f3b1cb" strokeWidth="8" strokeLinecap="round"/>
          <circle cx="16" cy="100" r="8" fill="url(#zxhBotPink)"/><circle cx="84" cy="100" r="8" fill="url(#zxhBotPink)"/>
          <path d="M19 78 Q7 72 4 84 M81 78 Q93 72 96 84" fill="none" stroke="#f7c5d9" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>
      <style>{`@keyframes zxh-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
    </aside>
  );
};
