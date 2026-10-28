'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import type { Eveniment } from '@/lib/content';
import { lunaAn as dataEv } from '@/lib/format';

const FILTRE = [{ id: 'toate', label: 'Toate' }, { id: 'riviera', label: 'Riviera' }, { id: 'insulita', label: 'ANNA Events, Insulița' }] as const;

/** Grila de evenimente cu filtru animat după complex (docs/design/animatii.md, opțiunea 13). */
export default function PortfolioGrid({ events }: { events: Eveniment[] }) {
  const [f, setF] = useState<(typeof FILTRE)[number]['id']>('toate');
  const reduce = useReducedMotion();
  const list = events.filter((e) => f === 'toate' || e.complex === f);
  return (
    <>
      <div role="group" aria-label="Filtrează după complex" className="mb-8 flex flex-wrap gap-2">
        {FILTRE.map((x) => (
          <button key={x.id} type="button" aria-pressed={f === x.id} onClick={() => setF(x.id)}
            className={`chip ${f === x.id ? 'bg-btn text-btn-text border-btn' : ''}`}>{x.label}</button>
        ))}
      </div>
      <LayoutGroup>
        <motion.ul layout={!reduce} className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((e) => (
            <motion.li key={e.slug} layout={!reduce} initial={reduce ? false : { opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
              <Link href={`/portofoliu/${e.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={e.poze[0].src} alt={e.poze[0].alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                </div>
                <p className="mt-3 text-[13px] font-semibold tracking-[.08em] text-accent-text uppercase">
                  {e.complex === 'riviera' ? 'Riviera' : 'ANNA Events'}{dataEv(e.data) ? ` · ${dataEv(e.data)}` : ''}
                </p>
                <h2 className="mt-1 text-2xl">{e.titlu}</h2>
              </Link>
            </motion.li>
          ))}
        </motion.ul>
      </LayoutGroup>
    </>
  );
}
