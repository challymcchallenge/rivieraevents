'use client';

import { useId, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'motion/react';
import type { Salon } from '@/lib/content';
import SalonCard from '@/components/SalonCard';

const NUME = { riviera: 'Complexul Riviera, pe malul Jiului', insulita: 'Complexul ANNA Events, pe Insulița' } as const;

/**
 * Filtrul de saloane după numărul de invitați (docs/design/animatii.md, opțiunea 13): saloanele care nu încap
 * se estompează și coboară la final, cu animație de layout (fără animație la prefers-reduced-motion).
 */
export default function SalonFilter({ saloane, intro }: { saloane: Salon[]; intro: Record<'riviera' | 'insulita', React.ReactNode> }) {
  const [inv, setInv] = useState<number | ''>('');
  const id = useId();
  const reduce = useReducedMotion();
  const fits = (s: Salon) => inv === '' || s.capacitate.nunta >= inv;
  const potrivite = saloane.filter(fits).length;

  return (
    <>
      <div className="wrap -mt-10 relative z-10">
        <div className="rounded-img bg-surface-2 p-6 lg:flex lg:items-end lg:gap-6 lg:p-8">
          <label htmlFor={id} className="block flex-1">
            <span className="field-label">Câți invitați aveți?</span>
            <input id={id} type="number" inputMode="numeric" min={10} max={1200} step={10} placeholder="de ex. 180" value={inv}
              onChange={(e) => setInv(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} className="field mt-2" />
          </label>
          <p className="mt-3 text-sm text-muted lg:mt-0 lg:mb-3" aria-live="polite">
            {inv === '' ? 'Scrieți numărul aproximativ și vă arătăm saloanele potrivite.' : potrivite ? `${potrivite} ${potrivite === 1 ? 'salon încape' : 'saloane încap'} ${inv} de invitați.` : 'Pentru atâția invitați, scrieți-ne și găsim împreună o soluție.'}
          </p>
        </div>
      </div>
      <LayoutGroup>
        {(['riviera', 'insulita'] as const).map((c) => {
          const list = saloane.filter((s) => s.complex === c).sort((a, b) => Number(fits(b)) - Number(fits(a)));
          return (
            <section key={c} className={`section ${c === 'riviera' ? 'pb-0' : ''}`}>
              <div className="wrap">
                <h2 className="h2">{NUME[c]}</h2>
                <div className="mt-3">{intro[c]}</div>
                <div className={`mt-8 grid gap-8 ${c === 'riviera' ? 'lg:grid-cols-3' : 'grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6'}`}>
                  {list.map((s) => (
                    <motion.div key={s.slug} layout={!reduce} transition={{ duration: 0.4, ease: 'easeOut' }}
                      animate={{ opacity: fits(s) ? 1 : 0.35 }}>
                      <SalonCard salon={s} compact={c === 'insulita'} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </LayoutGroup>
    </>
  );
}
