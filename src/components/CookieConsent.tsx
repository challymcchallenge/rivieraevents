'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

/**
 * Banner de acord pentru Google Analytics 4 (ADR-005, modificat 2026-10-29 la cererea clientului).
 * - GA se încarcă DOAR după „Accept”. La „Refuz” nu pleacă nimic spre Google și se șterg cookie-urile _ga existente.
 * - Alegerea se ține minte 12 luni (localStorage `riviera-cookies`), apoi bannerul întreabă din nou.
 * - Linkul „Setări cookie-uri” din subsol redeschide bannerul (evenimentul `riviera-cookies-open`).
 * - Cât timp bannerul e deschis, <html data-cookie-banner="open">: bula WhatsApp așteaptă (WhatsAppWidget).
 */
export const CONSENT_KEY = 'riviera-cookies';
export const OPEN_EVENT = 'riviera-cookies-open';
export const DONE_EVENT = 'riviera-cookies-done';
const MAX_AGE = 365 * 24 * 3600 * 1000;

type Choice = { v: 'accept' | 'refuz'; data: string };

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; [k: `ga-disable-${string}`]: boolean }
}

function readChoice(): Choice | null {
  try {
    const c = JSON.parse(localStorage.getItem(CONSENT_KEY) ?? 'null') as Choice | null;
    return c && Date.now() - new Date(c.data).getTime() < MAX_AGE ? c : null;
  } catch { return null; }
}

function loadGA(id: string) {
  window[`ga-disable-${id}`] = false;
  if (window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  // gtag trebuie să pună în dataLayer obiectul `arguments`, exact ca în fragmentul oficial Google
  window.gtag = function gtag() { window.dataLayer!.push(arguments); }; // eslint-disable-line prefer-rest-params
  window.gtag('js', new Date());
  window.gtag('config', id, { cookie_expires: 34128000 }); // ~13 luni, nu 2 ani (implicit GA)
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}

function removeGA(id: string) {
  window[`ga-disable-${id}`] = true; // oprirea oficială GA, valabilă imediat pe pagina curentă
  const host = location.hostname;
  const parts = host.split('.');
  const domains = ['', `; domain=${host}`, parts.length > 1 ? `; domain=.${parts.slice(-2).join('.')}` : ''];
  for (const name of document.cookie.split(';').map((c) => c.trim().split('=')[0]).filter((n) => n === '_ga' || n.startsWith('_ga_'))) {
    for (const d of domains) document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`;
  }
}

export default function CookieConsent({ gaId }: { gaId: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const c = readChoice();
    if (c?.v === 'accept') loadGA(gaId);
    if (!c) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, [gaId]);

  useEffect(() => {
    if (open) document.documentElement.dataset.cookieBanner = 'open';
    else delete document.documentElement.dataset.cookieBanner;
  }, [open]);

  const choose = (v: Choice['v']) => {
    try { localStorage.setItem(CONSENT_KEY, JSON.stringify({ v, data: new Date().toISOString() })); } catch { /* alegerea ține doar pe pagina curentă */ }
    if (v === 'accept') loadGA(gaId); else removeGA(gaId);
    setOpen(false);
    delete document.documentElement.dataset.cookieBanner; // înainte de eveniment: bula WhatsApp verifică atributul
    window.dispatchEvent(new Event(DONE_EVENT));
  };

  if (!open) return null;
  return (
    <section aria-label="Cookie-uri" className="fixed inset-x-4 bottom-24 z-50 rounded-bubble bg-popup-bg p-4 text-sm text-text shadow-[0_10px_30px_rgba(0,0,0,.25)] lg:inset-x-auto lg:bottom-8 lg:left-8 lg:max-w-md lg:p-5">
      <p>
        Folosim <strong>Google Analytics</strong> ca să vedem ce pagini vă sunt utile, doar dacă sunteți de acord. Fără acord, nu trimitem nimic la Google.{' '}
        <Link href="/politica-cookies" className="underline underline-offset-4">Detalii</Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => choose('refuz')} className="btn2 min-h-11 justify-center px-3 text-sm">Refuz</button>
        <button type="button" onClick={() => choose('accept')} className="btn2 min-h-11 justify-center px-3 text-sm">Accept</button>
      </div>
    </section>
  );
}
