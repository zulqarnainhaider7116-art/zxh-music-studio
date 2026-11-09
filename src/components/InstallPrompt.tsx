import React, { useEffect, useState } from 'react';
import { Download, X, Share, Smartphone } from 'lucide-react';

interface InstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const InstallPrompt: React.FC = () => {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);
  const [ios, setIos] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
    if (standalone) return;
    const isIos = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIos(isIos);
    if (isIos && !sessionStorage.getItem('zxh-install-dismissed')) window.setTimeout(() => setVisible(true), 4500);
    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
      if (!sessionStorage.getItem('zxh-install-dismissed')) window.setTimeout(() => setVisible(true), 4500);
    };
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', onBeforeInstall);
  }, []);

  const install = async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === 'accepted') setVisible(false);
    setInstallEvent(null);
  };
  const dismiss = () => { setVisible(false); sessionStorage.setItem('zxh-install-dismissed', '1'); };

  if (!visible || (!installEvent && !ios)) return null;
  return <div className="fixed inset-x-3 bottom-24 z-[90] mx-auto max-w-md">
    <div className="relative overflow-hidden rounded-3xl border border-rose-300/20 bg-[#171019]/95 p-4 text-white shadow-2xl backdrop-blur-2xl">
      <button onClick={dismiss} aria-label="Close install prompt" className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-white/10"><X size={17}/></button>
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-700"><Download size={22}/></div>
        <div><p className="font-brand-title text-sm font-bold">ZXH MUSIC STUDIO</p><p className="mt-1 text-xs text-slate-300">Install the music experience on your device</p></div>
      </div>
      {ios ? <p className="mt-3 flex items-center gap-2 text-xs text-slate-300"><Share size={15}/> Tap Share, then choose “Add to Home Screen”.</p> : <button onClick={install} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 py-3 text-sm font-bold"><Smartphone size={17}/> Install ZXH Music Studio</button>}
      <p className="mt-2 text-center text-[10px] text-slate-500">Powered by ZXH OFFICIAL · ZULQARNAIN X HAIDER</p>
    </div>
  </div>;
};
