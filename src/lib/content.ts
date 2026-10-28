import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import { parse as parseYaml } from 'yaml';

const ROOT = path.join(process.cwd(), 'content');

function readJson<T>(rel: string): T {
  return JSON.parse(fs.readFileSync(path.join(ROOT, rel), 'utf8')) as T;
}

export type Img = { src: string; alt: string };
export type Cta = { text: string; actiune: 'whatsapp' | 'estimare' | 'telefon' | 'formular' };
export type PageMeta = { seoTitlu: string; seoDescriere: string; h1: string; subtitlu?: string; cta: Cta };
export type Section = { title: string | null; body: string };
export type Page = { meta: PageMeta; sections: Section[] };

/** Scoate marcajele de lucru: comentariile HTML și golurile [NEED: ...], care nu ajung niciodată pe site. */
export function clean(text: string): string {
  return text
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s*\[NEED:[^\]]*\]\.?/g, '')
    .replace(/\s*\[PRESUPUNERE\]/g, '');
}

export function getPage(name: string): Page {
  const raw = fs.readFileSync(path.join(ROOT, 'pagini', `${name}.mdx`), 'utf8');
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) throw new Error(`Frontmatter lipsă în pagini/${name}.mdx`);
  const meta = parseYaml(m[1]) as PageMeta;
  const sections: Section[] = [];
  let cur: Section = { title: null, body: '' };
  for (const line of clean(m[2]).split(/\r?\n/)) {
    const h = line.match(/^## (.+)$/);
    if (h) {
      if (cur.title || cur.body.trim()) sections.push(cur);
      cur = { title: h[1].trim(), body: '' };
    } else cur.body += line + '\n';
  }
  if (cur.title || cur.body.trim()) sections.push(cur);
  const sub = meta.subtitlu ? clean(meta.subtitlu).trim() : '';
  // un subtitlu rămas fără valoare după scoaterea [NEED] (ex. „Ultima actualizare:”) nu se afișează
  return { meta: { ...meta, subtitlu: sub && !sub.endsWith(':') ? sub : undefined }, sections };
}

export function section(page: Page, title: string): Section | undefined {
  return page.sections.find((s) => s.title === title);
}

// ---------- tipuri de conținut ----------
export type Salon = {
  slug: string; nume: string; complex: 'riviera' | 'insulita'; ordine: number;
  capacitate: { nunta: number; conferinta: string | null; min: number | null };
  potrivitPentru: string[]; puncteForte: string[]; dotari: string[];
  descriereScurta: string; descriere: string; seo: { titlu: string; descriere: string };
  imaginePrincipala: Img; galerie: Img[]; tur360: string | null; turApartament?: string;
};
export type Site = {
  nume: string; domeniu: string;
  whatsapp: { numar: string; afisat: string; textImplicit: string; marcajSursa: string; bula: { text: string; buton: string } };
  telefoane: { numar: string; rol: string }[]; email: string;
  complexe: Record<'riviera' | 'insulita', { nume: string; adresa: string; descriereLocatie: string; galerieExterior?: Img[] }>;
  social: Record<'facebook' | 'instagram' | 'youtube', string>;
  reteaAnna: { titlu: string; principal: { nume: string; url: string }; linkuri: { nume: string; url: string }[] };
  linkuriLegale: { text: string; url: string }[];
  firma: { denumire: string; cui: string; registruComertului: string; sediu: string };
  anInfiintareGrup: number; programVizitare: string; timpRaspuns: string;
};
export type Slide =
  | { tip: 'imagine'; imagine: string; imagineMobil: string | null; punctFocal?: string; alt: string }
  | { tip: 'video'; video: { desktop: string; mobil?: string | null; poster: string }; alt: string };
export type Slideshow = { intervalSecunde: number; slideuri: Slide[] };
export type Testimonial = { id: string; nume: string; complex: string; tip: string; tipAfisat?: string | null; data: string; text: string; acordClient: boolean };
export type Eveniment = { slug: string; titlu: string; tip: string; complex: 'riviera' | 'insulita'; salon: string | null; data: string | null; descriere: string; poze: Img[]; acordClient: boolean };
export type Tur = { id: string; titlu: string; complex: 'riviera' | 'insulita'; url: string | null; status: string };

export const getSite = () => readJson<Site>('site.json');
export const getSlideshow = () => readJson<Slideshow>('acasa-slideshow.json');
export const getPachete = () => readJson<any>('pachete.json');
export const getMeniuri = () => readJson<any>('meniuri.json');
export const getBuget = () => readJson<any>('buget.json');
export const getFormular = () => readJson<any>('formular.json');
export const getTururi = () => readJson<{ tururi: Tur[] }>('tururi.json').tururi.filter((t) => t.url);

export function getTestimoniale(complex?: string): Testimonial[] {
  const all = readJson<{ testimoniale: Testimonial[] }>('testimoniale.json').testimoniale.filter((t) => t.acordClient);
  return complex ? all.filter((t) => t.complex === complex) : all;
}

export function getSaloane(): Salon[] {
  return fs.readdirSync(path.join(ROOT, 'saloane'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJson<Salon>(`saloane/${f}`))
    .map((s) => ({ ...s, descriere: clean(s.descriere), puncteForte: s.puncteForte.map(clean).filter(Boolean) }))
    .sort((a, b) => a.ordine - b.ordine);
}
export const getSalon = (slug: string) => getSaloane().find((s) => s.slug === slug);

export function getPortofoliu(): Eveniment[] {
  return fs.readdirSync(path.join(ROOT, 'portofoliu'))
    .filter((f) => f.endsWith('.json'))
    .map((f) => readJson<Eveniment>(`portofoliu/${f}`))
    .filter((e) => e.acordClient && e.slug !== 'exemplu-format')
    .sort((a, b) => (a.complex === b.complex ? (b.data ?? '').localeCompare(a.data ?? '') : a.complex === 'riviera' ? -1 : 1));
}
export const getEveniment = (slug: string) => getPortofoliu().find((e) => e.slug === slug);
