'use client';

import { getImageProps } from 'next/image';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Slide } from '@/lib/content';

/**
 * Hero cu 1–10 slide-uri (ADR-007). Textul și butoanele (children) rămân fixe; se schimbă doar fundalul,
 * prin crossfade. Buton de pauză (WCAG 2.2.2), oprire cât timp focusul de tastatură e în hero și când tab-ul e ascuns,
 * fără rotație la prefers-reduced-motion. Slide-urile următoare se încarcă doar când le vine rândul.
 */
export default function HeroSlideshow({ slides, interval = 6, children }: { slides: Slide[]; interval?: number; children: ReactNode }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hold, setHold] = useState(false);
  const [loaded, setLoaded] = useState<Set<number>>(() => new Set([0]));
  const [reduced, setReduced] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const root = useRef<HTMLElement>(null);
  const n = slides.length;

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    if (mq.matches) setPlaying(false);
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    setSaveData(!!conn && (conn.saveData === true || /2g/.test(conn.effectiveType ?? '')));
  }, []);

  const go = useCallback((i: number) => {
    const next = (i + n) % n;
    setLoaded((s) => new Set(s).add(next).add((next + 1) % n));
    setActive(next);
  }, [n]);

  useEffect(() => {
    if (!playing || hold || n < 2) return;
    const t = window.setTimeout(() => go(active + 1), Math.min(10, Math.max(4, interval)) * 1000);
    return () => window.clearTimeout(t);
  }, [active, playing, hold, n, interval, go]);

  useEffect(() => {
    // preîncarcă slide-ul următor după ce pagina e gata
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    idle(() => setLoaded((s) => new Set(s).add(1 % n)));
    const onVis = () => setHold(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [n]);

  return (
    <section ref={root} aria-roledescription="carusel" aria-label="Imagini de prezentare"
      className="relative flex min-h-[88svh] items-end overflow-hidden text-hero-text lg:min-h-[92vh]"
      // Fără pauză la hover: hero-ul ocupă tot ecranul, deci mouse-ul e aproape mereu deasupra lui, iar pe telefon
      // atingerea declanșează „mouseenter” fără „mouseleave”, ceea ce oprea slideshow-ul definitiv.
      // Pauza rămâne la butonul dedicat și cât timp focusul de tastatură (nu un click) e pe un element din hero.
      onFocus={(e) => { if ((e.target as HTMLElement).matches(':focus-visible')) setHold(true); }}
      onBlur={(e) => { if (!root.current?.contains(e.relatedTarget as Node)) setHold(false); }}>
      {slides.map((s, i) => (
        <div key={i} aria-hidden={i !== active} className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === active ? 1 : 0 }}>
          {loaded.has(i) && <SlideMedia slide={s} priority={i === 0} play={i === active && !reduced && !saveData} />}
        </div>
      ))}
      <div aria-hidden className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      <div className="wrap relative z-10 pt-28 pb-10 lg:pb-14">
        {children}
        {n > 1 && (
          <div role="group" aria-label="Control slideshow" className="mt-6 flex items-center gap-1">
            <button type="button" onClick={() => setPlaying((p) => !p)} aria-pressed={!playing}
              aria-label={playing ? 'Pauză slideshow' : 'Pornește slideshow'} className="grid size-11 place-items-center rounded-full hover:bg-white/15">
              {playing ? <Pause aria-hidden size={18} fill="currentColor" /> : <Play aria-hidden size={18} fill="currentColor" />}
            </button>
            <div className="flex">
              {slides.map((_, i) => (
                <button key={i} type="button" onClick={() => go(i)} aria-label={`Slide ${i + 1} din ${n}`} aria-current={i === active ? 'true' : undefined}
                  className="group grid size-6 place-items-center">
                  <span className="block size-2 rounded-full bg-hero-text opacity-50 transition-opacity group-aria-[current=true]:opacity-100" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function SlideMedia({ slide, priority, play }: { slide: Slide; priority: boolean; play: boolean }) {
  if (slide.tip === 'video') {
    const { props: poster } = getImageProps({ src: slide.video.poster, alt: '', fill: true, sizes: '100vw', priority });
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img {...poster} alt={slide.alt} className="object-cover" />
        {play && (
          <video className="absolute inset-0 size-full object-cover" muted autoPlay loop playsInline preload="none" poster={poster.src} aria-hidden>
            {slide.video.mobil && <source src={slide.video.mobil} media="(max-width: 767px)" type="video/mp4" />}
            <source src={slide.video.desktop} type="video/mp4" />
          </video>
        )}
      </>
    );
  }
  const common = { alt: slide.alt, fill: true, sizes: '100vw', priority, quality: 75 } as const;
  const { props: desktop } = getImageProps({ ...common, src: slide.imagine });
  const { props: mobile } = getImageProps({ ...common, src: slide.imagineMobil ?? slide.imagine });
  return (
    <picture>
      <source media="(min-width: 768px)" srcSet={desktop.srcSet} sizes="100vw" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...mobile} alt={slide.alt} className="object-cover" style={{ ...mobile.style, objectPosition: slide.punctFocal ?? '50% 50%' }} />
    </picture>
  );
}
