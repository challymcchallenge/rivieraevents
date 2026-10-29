'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Confetti, type ConfettiRef } from '@/components/ui/confetti';
import WaIcon from '@/components/WaIcon';

type Opt = { value: string; label: string };
type Field = {
  id: string; label: string; tip: 'select' | 'multiselect' | 'radio' | 'checkbox' | 'date' | 'number' | 'text' | 'tel' | 'email' | 'textarea';
  obligatoriu: boolean; optiuni?: Opt[]; ajutor?: string; min?: number; max?: number; maxLength?: number; autocomplete?: string; implicit?: string; aratDaca?: string;
};
type Pas = { id: string; titlu: string; descriere: string; campuri: Field[] };
export type Formular = {
  trimiteDupaPasul: number; pasi: Pas[];
  final: { marketing: { id: string; label: string }; info: string; buton: string; succes: { titlu: string; text: string }; eroare: { titlu: string; text: string } };
};
type Values = Record<string, string | string[] | boolean>;

const LUNA = 30 * 24 * 3600 * 1000;

/** Scor intern (content/formular.json → scor): Cald / Mediu / Rece, plus URGENT sub 3 luni. Trimis doar în email. */
function scor(v: Values): string {
  let p = 0;
  if (v.stadiu === 'rezervam') p += 2; else if (v.stadiu === 'comparam') p += 1;
  let urgent = false;
  if (typeof v.data === 'string' && v.data) {
    const d = new Date(v.data).getTime() - Date.now();
    if (d < 3 * LUNA) { p += 1; urgent = true; } else if (d <= 18 * LUNA) p += 2;
  }
  if (v.buget && v.buget !== 'discutam') p += 1;
  if (Array.isArray(v.saloane) && v.saloane.length) p += 1;
  if (v.invitati) p += 1;
  if (v.vizita === 'da') p += 1;
  return `${p >= 6 ? 'Cald' : p >= 3 ? 'Mediu' : 'Rece'}${urgent ? ' · URGENT' : ''}`;
}

function validate(f: Field, v: Values): string | null {
  const val = v[f.id];
  const empty = val === undefined || val === '' || (Array.isArray(val) && !val.length);
  if (f.obligatoriu && empty) return 'Completați acest câmp.';
  if (empty) return null;
  if (f.tip === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(val))) return 'Adresa de email nu pare corectă.';
  if (f.tip === 'tel' && !/^(\+?\d[\d\s.-]{8,16})$/.test(String(val).trim())) return 'Scrieți un număr de telefon, de exemplu 0746 085 555.';
  if (f.tip === 'date' && new Date(String(val)).getTime() < Date.now() - 24 * 3600 * 1000) return 'Alegeți o dată din viitor.';
  if (f.tip === 'number' && f.min != null && Number(val) < f.min) return `Minimum ${f.min}.`;
  if (f.tip === 'number' && f.max != null && Number(val) > f.max) return `Maximum ${f.max}.`;
  return null;
}

export default function QuoteForm({ form, endpoint, accessKey, waBase }: { form: Formular; endpoint?: string; accessKey?: string; waBase: string }) {
  const [step, setStep] = useState(0);
  const [v, setV] = useState<Values>(() => {
    const init: Values = {};
    form.pasi.forEach((p) => p.campuri.forEach((f) => { if (f.implicit) init[f.id] = f.implicit; }));
    return init;
  });
  const [err, setErr] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const confetti = useRef<ConfettiRef>(null);
  const top = useRef<HTMLDivElement>(null);
  const pas = form.pasi[step];
  const last = step === form.pasi.length - 1;
  const canSubmit = step + 1 >= form.trimiteDupaPasul;

  useEffect(() => {
    // precompletare din calculatorul de buget: /contact?tip=&invitati=&salon=
    const q = new URLSearchParams(window.location.search);
    setV((x) => ({
      ...x,
      ...(q.get('tip') ? { tip: q.get('tip')! } : {}),
      ...(q.get('invitati') ? { invitati: q.get('invitati')! } : {}),
      ...(q.get('salon') ? { saloane: [q.get('salon')!] } : {}),
      paginaSursa: document.referrer ? new URL(document.referrer).pathname : '/contact',
      dinCalculator: q.has('invitati'),
    }));
  }, []);

  const set = (id: string, val: string | string[] | boolean) => { setV((x) => ({ ...x, [id]: val })); setErr((e) => ({ ...e, [id]: '' })); };

  const checkStep = (i: number) => {
    const e: Record<string, string> = {};
    form.pasi[i].campuri.forEach((f) => { const m = validate(f, v); if (m) e[f.id] = m; });
    setErr(e);
    const first = Object.keys(e)[0];
    if (first) document.getElementById(`f-${first}`)?.focus();
    return !first;
  };
  const checkRequired = () => {
    for (let i = 0; i < form.trimiteDupaPasul; i++) if (!checkStep(i)) { setStep(i); return false; }
    return checkStep(step);
  };
  const goto = (i: number) => { setStep(i); top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

  const label = (id: string, val: unknown) => {
    for (const p of form.pasi) for (const f of p.campuri) if (f.id === id && f.optiuni) {
      const arr = Array.isArray(val) ? val : [val];
      return arr.map((x) => f.optiuni!.find((o) => o.value === x)?.label ?? x).join(', ');
    }
    return String(val);
  };
  const dataRo = (d: unknown) => (typeof d === 'string' && d ? d.split('-').reverse().join('.') : '');

  const waFallback = () => {
    const parts = [`Bună ziua, aș dori o ofertă: ${label('tip', v.tip).toLowerCase()}`, v.data ? `pe ${dataRo(v.data)}` : '', v.invitati ? `${v.invitati} invitați` : '',
      Array.isArray(v.saloane) && v.saloane.length ? `saloane: ${label('saloane', v.saloane).replace(/ \([^)]*\)/g, '')}` : '', v.nume ? `Mă numesc ${v.nume}.` : ''];
    return waBase.replace('TEXT', encodeURIComponent(parts.filter(Boolean).join(', ').replace(', Mă', '. Mă')));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!checkRequired()) return;
    if (v.botcheck) return; // honeypot completat: probabil robot
    setStatus('sending');
    const sc = scor(v);
    const payload: Record<string, string | boolean> = {
      access_key: accessKey ?? '',
      subject: `[Site Riviera] Cerere ofertă · ${label('tip', v.tip)} · ${dataRo(v.data)} · ${v.invitati || '?'} inv. · ${sc}`,
      from_name: 'Site Riviera by ANNA Events',
      Prioritate: sc,
    };
    form.pasi.forEach((p) => p.campuri.forEach((f) => {
      const val = v[f.id];
      if (val === undefined || val === '' || (Array.isArray(val) && !val.length)) return;
      payload[f.label] = f.tip === 'date' ? dataRo(val) : f.tip === 'checkbox' ? (val ? 'Da' : 'Nu') : label(f.id, val);
    }));
    payload[form.final.marketing.label] = v[form.final.marketing.id] ? 'Da' : 'Nu';
    payload['Pagina sursă'] = String(v.paginaSursa ?? '');
    payload['Venit din calculator'] = v.dinCalculator ? 'Da' : 'Nu';
    if (typeof v.email === 'string') payload.replyto = v.email;
    try {
      if (!endpoint || !accessKey) throw new Error('Formularul nu e configurat (NEXT_PUBLIC_FORM_ENDPOINT / NEXT_PUBLIC_WEB3FORMS_KEY).');
      const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(payload) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || j.success === false) throw new Error(j.message ?? `HTTP ${r.status}`);
      setStatus('ok');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) void confetti.current?.fire({ particleCount: 120, spread: 80, origin: { y: 0.35 }, colors: ['#FF3131', '#EAE3D7', '#FFFEFA', '#B3121F'] });
    } catch (ex) {
      console.error(ex);
      setStatus('error');
    }
  };

  if (status === 'ok') {
    return (
      <div ref={top} role="status" className="rounded-img bg-surface-2 p-8 lg:p-10">
        <Confetti ref={confetti} manualstart className="pointer-events-none fixed inset-0 z-50 size-full" />
        <span className="grid size-12 place-items-center rounded-full bg-btn text-btn-text"><Check aria-hidden /></span>
        <h2 className="mt-4 text-[clamp(28px,4vw,40px)]">{form.final.succes.titlu}</h2>
        <p className="mt-3 text-muted">{form.final.succes.text}</p>
      </div>
    );
  }

  return (
    <div ref={top} className="scroll-mt-24 rounded-img bg-surface-2 p-6 lg:p-10">
      <Confetti ref={confetti} manualstart className="pointer-events-none fixed inset-0 z-50 size-full" />
      <div className="flex items-baseline justify-between gap-4">
        <p className="field-label" aria-live="polite">Pasul {step + 1} din {form.pasi.length}{step + 1 > form.trimiteDupaPasul ? ' · opțional' : ''}</p>
        <p className="hidden text-sm text-muted sm:block">{pas.titlu}</p>
      </div>
      <div className="mt-2 h-1 bg-line" aria-hidden><div className="h-1 bg-accent transition-[width] duration-300" style={{ width: `${((step + 1) / form.pasi.length) * 100}%` }} /></div>

      <form onSubmit={submit} noValidate className="mt-6">
        {/* honeypot Web3Forms: invizibil pentru oameni */}
        <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" className="hidden" onChange={(e) => set('botcheck', e.target.checked)} aria-hidden />
        <fieldset key={pas.id}>
          <legend className="font-heading text-[clamp(26px,4vw,34px)]">{pas.titlu}</legend>
          <p className="mt-1 text-sm text-muted">{pas.descriere}</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {pas.campuri.filter((f) => !f.aratDaca || v[f.aratDaca]).map((f) => (
              <FieldView key={f.id} f={f} value={v[f.id]} error={err[f.id]} onChange={(x) => set(f.id, x)} />
            ))}
          </div>
        </fieldset>

        {last && (
          <div className="mt-6 space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <input id="f-marketing" type="checkbox" className="mt-0.5 size-5 accent-[var(--color-btn)]" checked={!!v[form.final.marketing.id]} onChange={(e) => set(form.final.marketing.id, e.target.checked)} />
              <label htmlFor="f-marketing">{form.final.marketing.label}</label>
            </div>
          </div>
        )}
        {canSubmit && <p className="mt-6 text-xs text-muted">{form.final.info} <a href="/politica-de-confidentialitate" className="underline">Politica de confidențialitate</a>.</p>}

        {status === 'error' && (
          <div role="alert" className="mt-6 border-l-4 border-accent bg-bg p-4">
            <p className="font-semibold">{form.final.eroare.titlu}</p>
            <p className="mt-1 text-sm text-muted">{form.final.eroare.text}</p>
            <a href={waFallback()} target="_blank" rel="noopener noreferrer" className="btn mt-3"><WaIcon />Trimiteți pe WhatsApp</a>
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          {step > 0 && <button type="button" className="btn2" onClick={() => goto(step - 1)}><ArrowLeft aria-hidden size={18} />Înapoi</button>}
          {!last && (
            <button type="button" className={canSubmit ? 'btn2' : 'btn'} onClick={() => { if (checkStep(step)) goto(step + 1); }}>
              {canSubmit ? 'Mai adaug detalii' : 'Continuați'}<ArrowRight aria-hidden size={18} />
            </button>
          )}
          {canSubmit && (
            <button type="submit" className="btn" disabled={status === 'sending'}>
              {status === 'sending' ? <Loader2 aria-hidden size={18} className="animate-spin" /> : <Check aria-hidden size={18} />}
              {status === 'sending' ? 'Se trimite…' : form.final.buton}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

function FieldView({ f, value, error, onChange }: { f: Field; value: Values[string] | undefined; error?: string; onChange: (v: string | string[] | boolean) => void }) {
  const id = `f-${f.id}`;
  const desc = [f.ajutor ? `${id}-help` : '', error ? `${id}-err` : ''].filter(Boolean).join(' ') || undefined;
  const lbl = <>{f.label}{f.obligatoriu && <span className="text-accent-text"> (obligatoriu)</span>}</>;
  const help = f.ajutor && <p id={`${id}-help`} className="mt-1 text-xs text-muted">{f.ajutor}</p>;
  const errEl = error && <p id={`${id}-err`} className="mt-1 text-sm font-medium text-accent-text">{error}</p>;
  const wide = ['multiselect', 'radio', 'textarea'].includes(f.tip) ? 'sm:col-span-2' : '';

  if (f.tip === 'multiselect' || f.tip === 'radio') {
    const arr = Array.isArray(value) ? value : value ? [String(value)] : [];
    return (
      <fieldset className={wide} aria-describedby={desc}>
        <legend className="field-label">{lbl}</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {f.optiuni!.map((o, i) => (
            <label key={o.value} className="chip">
              <input id={i === 0 ? id : undefined} type={f.tip === 'radio' ? 'radio' : 'checkbox'} name={f.id} value={o.value} className="sr-only"
                checked={arr.includes(o.value)} onChange={(e) => f.tip === 'radio' ? onChange(o.value) : onChange(e.target.checked ? [...arr, o.value] : arr.filter((x) => x !== o.value))} />
              {arr.includes(o.value) && <Check aria-hidden size={14} />}{o.label}
            </label>
          ))}
        </div>
        {help}{errEl}
      </fieldset>
    );
  }
  if (f.tip === 'checkbox') {
    return (
      <div className="flex items-center gap-3 self-end text-sm sm:min-h-12">
        <input id={id} type="checkbox" className="size-5 accent-[var(--color-btn)]" checked={!!value} onChange={(e) => onChange(e.target.checked)} />
        <label htmlFor={id}>{f.label}</label>
      </div>
    );
  }
  const common = { id, name: f.id, 'aria-invalid': !!error || undefined, 'aria-describedby': desc, className: 'field mt-1', required: f.obligatoriu };
  return (
    <div className={wide}>
      <label htmlFor={id} className="field-label">{lbl}</label>
      {f.tip === 'select' ? (
        <select {...common} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)}>
          <option value="">Alegeți…</option>
          {f.optiuni!.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      ) : f.tip === 'textarea' ? (
        <textarea {...common} rows={4} maxLength={f.maxLength} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...common} type={f.tip} autoComplete={f.autocomplete} inputMode={f.tip === 'number' ? 'numeric' : undefined} min={f.min} max={f.max}
          value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />
      )}
      {help}{errEl}
    </div>
  );
}
