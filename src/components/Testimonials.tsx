'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import Stack from '@/components/reactbits/Stack';
import { Marquee } from '@/components/ui/marquee';
import type { Testimonial } from '@/lib/content';

const LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
const TIP: Record<string, string> = { nunta: 'Nuntă', botez: 'Botez', corporate: 'Eveniment de firmă' };
const when = (t: Testimonial) => { const [y, m] = t.data.split('-'); return `${t.tipAfisat ?? TIP[t.tip] ?? ''}, ${LUNI[Number(m) - 1]} ${y}`; };

function Card({ t, short = false }: { t: Testimonial; short?: boolean }) {
  return (
    <figure className="flex h-full flex-col justify-between rounded-img bg-surface-2 p-6 text-left">
      <blockquote className={`font-heading text-xl leading-snug ${short ? 'line-clamp-[9]' : ''}`}>„{t.text}”</blockquote>
      <figcaption className="mt-4 text-sm text-muted"><strong translate="no" className="font-semibold text-text">{t.nume}</strong><br />{when(t)}</figcaption>
    </figure>
  );
}

/** Mobil: teanc de carduri glisabil (ReactBits Stack). Desktop: derulare lentă (Magic UI Marquee) cu buton de pauză. */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  const [paused, setPaused] = useState(false);
  return (
    <>
      <div className="mx-auto h-[440px] w-full max-w-[340px] lg:hidden">
        <Stack cards={items.map((t) => <Card key={t.id} t={t} short />)} layout="cascade" visible={3} spread={0.4} radius={12} />
      </div>
      <p className="mt-6 text-center text-sm text-muted lg:hidden">Glisați cardul pentru următorul testimonial.</p>
      <div className="hidden lg:block">
        <Marquee pauseOnHover className={`[--duration:70s] [--gap:1.5rem] ${paused ? '[&>div]:[animation-play-state:paused]' : ''}`} repeat={2}>
          {items.map((t) => <div key={t.id} className="w-[420px]"><Card t={t} /></div>)}
        </Marquee>
        <div className="mt-4 flex justify-center">
          <button type="button" onClick={() => setPaused((p) => !p)} aria-pressed={paused} className="btn2 min-h-11 px-4 text-sm">
            {paused ? <Play aria-hidden size={16} /> : <Pause aria-hidden size={16} />}{paused ? 'Pornește derularea' : 'Oprește derularea'}
          </button>
        </div>
      </div>
    </>
  );
}
