'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const SEEN = 'riviera-bula-wa';

/**
 * Buton rotund WhatsApp + bulă (design-system.md §4). Bula apare O SINGURĂ DATĂ în browserul vizitatorului
 * (localStorage, cererea clientului 2026-10-29: „apare o dată, după închidere niciodată”), după ce vizitatorul
 * a derulat dincolo de imaginea de sus sau după 20 s, și nu apare pe /contact. La trecerea pe altă pagină dispare.
 * Fără localStorage (stocare blocată), bula nu apare deloc, ca să nu revină la fiecare pagină.
 */
export default function WhatsAppWidget({ href, text, buton }: { href: string; text: string; buton: string }) {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
    if (pathname.startsWith('/contact')) return;
    try { if (localStorage.getItem(SEEN)) return; } catch { return; }
    const open = () => {
      setShow(true);
      try { localStorage.setItem(SEEN, '1'); } catch { /* ignorat */ }
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => { if (window.scrollY > window.innerHeight * 0.85) open(); };
    const t = window.setTimeout(open, 20000);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.clearTimeout(t); window.removeEventListener('scroll', onScroll); };
  }, [pathname]);

  const close = () => {
    setShow(false);
    try { localStorage.setItem(SEEN, '1'); } catch { /* ignorat */ }
  };

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 lg:right-8 lg:bottom-8">
      {show && (
        <aside aria-label="Mesaj WhatsApp"
          className="relative w-[min(300px,calc(100vw-32px))] rounded-bubble bg-popup-bg p-[18px] pb-4 text-[15px] leading-snug text-text shadow-[0_10px_30px_rgba(0,0,0,.2)] motion-safe:animate-[fadeIn_.2s_ease-out]">
          <button type="button" onClick={close} aria-label="Închide mesajul"
            className="absolute top-1 right-1 grid size-9 place-items-center text-muted"><X aria-hidden size={18} /></button>
          <p className="pr-6">{text}</p>
          <a href={href} target="_blank" rel="noopener noreferrer" onClick={close}
            className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-wa px-[18px] text-sm font-semibold text-wa-text">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/whatsapp-192.png" alt="" width={20} height={20} className="size-5" />
            {buton}
          </a>
        </aside>
      )}
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label="Scrieți-ne pe WhatsApp"
        className="size-[60px] rounded-full drop-shadow-[0_6px_14px_rgba(0,0,0,.28)] transition-transform hover:scale-105">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/whatsapp-192.png" alt="" width={60} height={60} className="size-[60px]" />
      </a>
    </div>
  );
}
