'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Stepper, { Step } from '@/components/reactbits/Stepper';
import ElasticSlider from '@/components/reactbits/ElasticSlider';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Confetti, type ConfettiRef } from '@/components/ui/confetti';
import WaIcon from '@/components/WaIcon';

type Tip = { id: string; nume: string; leiPePersoana: { min: number | null; max: number | null } };
type SalonMin = { slug: string; nume: string; complex: 'riviera' | 'insulita'; capacitate: number };

// Culorile Stepper-ului (ReactBits) legate de tokenii temei, ca să urmeze comutatorul luminos/întunecat.
const STEPPER_VARS = {
  '--stepper-frame': 'var(--color-surface-2)', '--stepper-frame-edge': 'var(--color-line)', '--stepper-frame-highlight': 'transparent',
  '--stepper-tile': 'var(--color-bg)', '--stepper-tile-edge': 'var(--color-field-border)', '--stepper-well': 'var(--color-surface)',
  '--stepper-track': 'var(--color-line)', '--stepper-ink': 'var(--color-text)', '--stepper-muted': 'var(--color-muted)',
  '--stepper-faint': 'var(--color-field-border)', '--stepper-ring': 'var(--color-accent-text)',
  '--stepper-solid': 'var(--color-btn)', '--stepper-solid-ink': 'var(--color-btn-text)',
} as CSSProperties;

/**
 * Calculatorul de buget (docs/design/animatii.md, opțiunile 5–7): 3 pași (ReactBits Stepper), glisor elastic pentru invitați,
 * suma animată (Magic UI Number Ticker) și confetti o singură dată la rezultat. Arată doar un interval total, niciodată prețul pe persoană.
 */
export default function BudgetCalculator({ tipuri, saloane, rotunjire, ajustari, nota, waBase }: {
  tipuri: Tip[]; saloane: SalonMin[]; rotunjire: number; ajustari: Record<string, number>; nota: string; waBase: string;
}) {
  const [tip, setTip] = useState(tipuri[0].id);
  const [inv, setInv] = useState(150);
  const [salon, setSalon] = useState<string>('recomandati');
  const [done, setDone] = useState(false);
  const confetti = useRef<ConfettiRef>(null);

  const t = tipuri.find((x) => x.id === tip)!;
  const s = saloane.find((x) => x.slug === salon);
  const k = s ? ajustari[s.complex] ?? 1 : 1;
  const round = (n: number) => Math.round(n / rotunjire) * rotunjire;
  const min = t.leiPePersoana.min != null ? round(inv * t.leiPePersoana.min * k) : null;
  const max = t.leiPePersoana.max != null ? round(inv * t.leiPePersoana.max * k) : null;
  const potrivite = saloane.filter((x) => x.capacitate >= inv);
  const lei = (n: number) => new Intl.NumberFormat('ro-RO').format(n);

  useEffect(() => { if (salon !== 'recomandati' && !potrivite.some((x) => x.slug === salon)) setSalon('recomandati'); }, [inv]); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = () => {
    setDone(true);
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      void confetti.current?.fire({ particleCount: 110, spread: 75, origin: { y: 0.4 }, colors: ['#FF3131', '#EAE3D7', '#FFFEFA', '#B3121F'] });
    }
  };

  const salonText = s ? `salonul ${s.nume.replace('Salon ', '')}` : 'salonul potrivit (aș dori o recomandare)';
  const estimare = min != null && max != null ? ` Estimarea de pe site: ${lei(min)} – ${lei(max)} lei.` : '';
  const mesaj = `Bună ziua, aș dori o ofertă: ${t.nume.toLowerCase()}, aproximativ ${inv} de invitați, ${salonText}.${estimare}`;
  const waHref = waBase.replace('TEXT', encodeURIComponent(mesaj));
  const formHref = `/contact?tip=${tip}&invitati=${inv}${s ? `&salon=${s.slug}` : ''}`;

  return (
    <div className="relative">
      <Confetti ref={confetti} manualstart className="pointer-events-none fixed inset-0 z-50 size-full" />
      <Stepper theme="light" width="100%" radius={4} style={STEPPER_VARS} onFinalStepCompleted={finish} onStepChange={() => setDone(false)}
        nextButtonText="Continuați" backButtonText="Înapoi" completeButtonText="Vedeți estimarea"
        completedContent={
          <div className="py-2">
            <p className="field-label">Buget estimativ pentru {inv} de invitați, {t.nume.toLowerCase()}</p>
            {min != null && max != null ? (
              <p className="mt-2 font-heading text-[clamp(34px,7vw,52px)] leading-tight">
                {/* Stepper-ul anunță deja conținutul (aria-live); cifrele animate sunt ascunse cititoarelor de ecran, care primesc valoarea finală */}
                <span aria-hidden>{done && <><NumberTicker value={min} /> – <NumberTicker value={max} /></>} lei</span>
                <span className="sr-only">{lei(min)} – {lei(max)} lei</span>
              </p>
            ) : (
              <p className="mt-2 text-lg">Pentru acest tip de eveniment vă trimitem direct oferta.</p>
            )}
            <p className="mt-3 text-sm text-muted">{nota}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn"><WaIcon />Primiți oferta exactă pe WhatsApp</a>
              <Link href={formHref} className="btn2">Completați cererea de ofertă</Link>
            </div>
            <button type="button" className="mt-5 text-sm underline underline-offset-4" onClick={() => location.reload()}>Recalculați</button>
          </div>
        }>
        <Step title="Evenimentul">
          <fieldset>
            <legend className="font-heading text-2xl">Ce sărbătoriți?</legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {tipuri.map((x) => (
                <label key={x.id} className="chip"><input type="radio" name="tip" value={x.id} checked={tip === x.id} onChange={() => setTip(x.id)} className="sr-only" />{x.nume}</label>
              ))}
            </div>
          </fieldset>
        </Step>
        <Step title="Invitații">
          <p className="font-heading text-2xl" id="inv-label">Câți invitați aveți?</p>
          <div className="mt-6 px-1">
            <ElasticSlider value={inv} onChange={(v) => setInv(Math.round(v))} startingValue={30} maxValue={800} isStepped stepSize={10}
              ariaLabel="Număr de invitați" valuePosition="top" formatValue={(v) => `${Math.round(v)} invitați`}
              rangeColor="var(--color-btn)" trackColor="var(--color-line)" iconColor="var(--color-muted)" contentColor="var(--color-text)" />
          </div>
          <label className="mt-4 block max-w-48">
            <span className="field-label">Sau scrieți numărul</span>
            <input type="number" inputMode="numeric" min={30} max={800} step={10} value={inv} aria-describedby="inv-label"
              onChange={(e) => setInv(Math.min(800, Math.max(30, Number(e.target.value) || 30)))} className="field mt-1" />
          </label>
        </Step>
        <Step title="Salonul">
          <fieldset>
            <legend className="font-heading text-2xl">Ce salon vă interesează?</legend>
            <p className="mt-1 text-sm text-muted">Vă arătăm doar saloanele în care încap {inv} de invitați.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {potrivite.map((x) => (
                <label key={x.slug} className="chip"><input type="radio" name="salon" value={x.slug} checked={salon === x.slug} onChange={() => setSalon(x.slug)} className="sr-only" />
                  {x.nume.replace('Salon ', '')} <span className="opacity-70">· {x.complex === 'riviera' ? 'Riviera' : 'Insulița'}</span></label>
              ))}
              <label className="chip"><input type="radio" name="salon" value="recomandati" checked={salon === 'recomandati'} onChange={() => setSalon('recomandati')} className="sr-only" />Nu știu încă</label>
            </div>
          </fieldset>
        </Step>
      </Stepper>
    </div>
  );
}
