'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

type Sectiune = { id: string; titlu: string; imagine: string | null; descriere: string };
export type Meniu = { id: string; nume: string; descriereScurta: string; sectiuni: Sectiune[] };

/** Tab-uri cu cele 5 meniuri: linie animată sub tab-ul activ și conținut care apare lin (docs/design/animatii.md, opțiunea 15). */
export default function MenuTabs({ meniuri }: { meniuri: Meniu[] }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const m = meniuri[active];

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const n = (active + d + meniuri.length) % meniuri.length;
    setActive(n);
    tabs.current[n]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Meniuri" onKeyDown={onKey} className="-mx-4 flex gap-1 overflow-x-auto border-b border-line px-4 lg:mx-0 lg:px-0">
        {meniuri.map((x, i) => (
          <button key={x.id} ref={(el) => { tabs.current[i] = el; }} role="tab" id={`tab-${x.id}`} aria-selected={i === active}
            aria-controls={`panel-${x.id}`} tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)}
            className={`relative min-h-12 shrink-0 px-4 font-heading text-xl whitespace-nowrap transition-colors lg:text-2xl ${i === active ? 'text-text' : 'text-muted hover:text-text'}`}>
            {x.nume}
            {i === active && <motion.span layoutId="menu-underline" className="absolute inset-x-2 -bottom-px h-0.5 bg-accent" transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }} />}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={m.id} role="tabpanel" id={`panel-${m.id}`} aria-labelledby={`tab-${m.id}`} tabIndex={0}
          initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: 0.25 }}
          className="pt-8">
          <p className="lead text-lg">{m.descriereScurta}</p>
          <ol className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {m.sectiuni.map((s, i) => (
              <li key={s.id}>
                {s.imagine && (
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                    <Image src={s.imagine} alt={`Meniul ${m.nume}: ${s.titlu.toLowerCase()}`} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
                  </div>
                )}
                <p className="mt-3 text-[13px] font-semibold tracking-[.1em] text-accent-text">0{i + 1}</p>
                <h3 className="mt-1 text-2xl">{s.titlu}</h3>
                <p className="mt-1 text-sm text-muted">{s.descriere}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
