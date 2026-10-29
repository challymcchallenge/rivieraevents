'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import Bilingual from '@/components/Bilingual';
import { NAV, NAV_EXTRA } from '@/lib/nav';


/** Header transparent peste imaginea de sus a fiecărei pagini; text și logo deschise în ambele teme. */
type Logo = { src: string; w: number; h: number };
export default function Header({ waHref, logo }: { waHref: string; logo: { deschis: Logo; inchis: Logo } }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="absolute inset-x-0 top-0 z-30 text-hero-text">
      <div className="wrap flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="Riviera by ANNA Events, pagina principală" translate="no" className="notranslate shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.deschis.src} alt="" width={logo.deschis.w} height={logo.deschis.h} className="h-10 w-auto" />
        </Link>
        <nav aria-label="Principal" className="hidden gap-7 text-sm font-medium lg:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? 'page' : undefined}
              className="py-2 underline-offset-8 hover:underline aria-[current=page]:underline"><Bilingual ro={n.label} en={n.en} /></Link>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />
          <button type="button" className="grid size-11 place-items-center rounded-full hover:bg-white/15 lg:hidden"
            aria-label="Deschide meniul" aria-expanded={open} aria-controls="meniu-mobil" onClick={() => setOpen(true)}>
            <Menu aria-hidden size={24} />
          </button>
        </div>
      </div>

      <div id="meniu-mobil" role="dialog" aria-modal="true" aria-label="Meniu" hidden={!open}
        className="fixed inset-0 z-40 bg-bg text-text lg:hidden">
        <div className="wrap flex h-[72px] items-center justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.inchis.src} alt="" width={logo.inchis.w} height={logo.inchis.h} className="h-10 w-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo.deschis.src} alt="" width={logo.deschis.w} height={logo.deschis.h} className="hidden h-10 w-auto dark:block" />
          <button type="button" className="grid size-11 place-items-center" aria-label="Închide meniul" onClick={() => setOpen(false)}>
            <X aria-hidden size={26} />
          </button>
        </div>
        <nav aria-label="Meniu mobil" className="wrap mt-6 flex flex-col">
          <Link href="/" className="border-b border-line py-4 font-heading text-3xl"><Bilingual ro={NAV_EXTRA.acasa.label} en={NAV_EXTRA.acasa.en} /></Link>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="border-b border-line py-4 font-heading text-3xl"><Bilingual ro={n.label} en={n.en} /></Link>
          ))}
          <Link href="/estimare-buget" className="border-b border-line py-4 font-heading text-3xl">Estimare buget</Link>
          <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn mt-8">Scrieți-ne pe WhatsApp</a>
        </nav>
      </div>
    </header>
  );
}
