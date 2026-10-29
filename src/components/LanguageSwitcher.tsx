'use client';

import { useEffect, useState } from 'react';

/**
 * Comutator RO / EN (ADR-008): traducerea în engleză o face widgetul Google Translate, în browser, pe aceleași adrese.
 * - Scriptul Google se încarcă DOAR după ce vizitatorul alege EN (vizitatorii în română nu încarcă nimic de la Google).
 * - Alegerea se ține minte în localStorage (`riviera-limba`); Google o citește din cookie-ul `googtrans`.
 * - Înapoi la română: ștergem cookie-ul și reîncărcăm pagina (Google modifică textul direct în pagină).
 */
export const LANG_KEY = 'riviera-limba';
type Lang = 'ro' | 'en';

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate?: { TranslateElement: new (opts: object, id: string) => unknown } };
  }
}

function setGoogCookie(value: string | null) {
  const expire = value ? '' : '; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  const v = value ?? '';
  const host = location.hostname;
  document.cookie = `googtrans=${v}; path=/${expire}`;
  document.cookie = `googtrans=${v}; path=/; domain=${host}${expire}`;
  // Google pune cookie-ul și pe domeniul de bază (ex. .rivieraevents.ro); trebuie șters și acolo.
  const parts = host.split('.');
  if (parts.length > 1 && !/^\d+$/.test(parts.at(-1)!)) document.cookie = `googtrans=${v}; path=/; domain=.${parts.slice(-2).join('.')}${expire}`;
}

/**
 * Google Translate înlocuiește nodurile de text din pagină; React nu le mai găsește și aruncă erori la actualizare
 * (facebook/react#11538). Ocolirea recomandată acolo: ignorăm ștergerile și inserările pe noduri mutate de Google.
 */
function patchDomForTranslate() {
  const proto = Node.prototype as Node & { __rivieraPatched?: boolean };
  if (proto.__rivieraPatched) return;
  proto.__rivieraPatched = true;
  const removeChild = proto.removeChild;
  proto.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) return child;
    return removeChild.call(this, child) as T;
  };
  const insertBefore = proto.insertBefore;
  proto.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    if (ref && ref.parentNode !== this) return node;
    return insertBefore.call(this, node, ref) as T;
  };
}

function loadGoogle() {
  if (document.getElementById('gt-script')) return;
  patchDomForTranslate();
  window.googleTranslateElementInit = () => {
    if (!window.google?.translate) return;
    new window.google.translate.TranslateElement({ pageLanguage: 'ro', includedLanguages: 'en', autoDisplay: false }, 'google_translate_element');
  };
  const s = document.createElement('script');
  s.id = 'gt-script';
  s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  s.async = true;
  document.body.appendChild(s);
}

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const [lang, setLang] = useState<Lang>('ro');

  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(LANG_KEY); } catch { /* fără stocare: rămâne română */ }
    if (saved === 'en') {
      setLang('en');
      // și după hidratare: React scoate atributul pus de scriptul din <head>
      document.documentElement.dataset.lang = 'en';
      setGoogCookie('/ro/en');
      // Google pornește abia după ce React a terminat de hidratat pagina: dacă traduce o parte încă nehidratată,
      // React vede alt text decât cel de pe server (eroarea #418) și o redesenează.
      const start = () => ('requestIdleCallback' in window ? window.requestIdleCallback(loadGoogle, { timeout: 2000 }) : setTimeout(loadGoogle, 300));
      if (document.readyState === 'complete') start();
      else window.addEventListener('load', start, { once: true });
    }
  }, []);

  const choose = (next: Lang) => {
    if (next === lang) return;
    try { localStorage.setItem(LANG_KEY, next); } catch { /* alegerea ține doar până la reîncărcare */ }
    if (next === 'ro') {
      setGoogCookie(null);
      location.reload();
      return;
    }
    setLang('en');
    document.documentElement.dataset.lang = 'en';
    setGoogCookie('/ro/en');
    const combo = document.querySelector<HTMLSelectElement>('.goog-te-combo');
    if (combo) {
      combo.value = 'en';
      combo.dispatchEvent(new Event('change'));
    } else {
      loadGoogle();
    }
  };

  const btn = (l: Lang, src: string, label: string) => (
    <button type="button" lang={l} onClick={() => choose(l)} aria-pressed={lang === l} aria-label={label} title={label}
      className={`grid size-11 place-items-center rounded-full transition ${lang === l ? 'bg-white/15' : 'opacity-55 hover:opacity-100'}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt="" width={24} height={24} className={`size-6 rounded-full ${lang === l ? 'ring-2 ring-white/90 ring-offset-1 ring-offset-transparent' : ''}`} />
    </button>
  );

  return (
    <div role="group" aria-label="Limba site-ului / Site language" translate="no" className={`notranslate flex items-center ${className}`}>
      {btn('ro', '/brand/lang-ro.svg', 'Română')}
      {btn('en', '/brand/lang-en.png', 'English (Google Translate)')}
      <div id="google_translate_element" hidden />
    </div>
  );
}
