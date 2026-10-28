import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Gallery from '@/components/Gallery';
import WaIcon from '@/components/WaIcon';
import { lunaAn as dataEv } from '@/lib/format';
import { getEveniment, getPortofoliu } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPortofoliu().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = getEveniment((await params).slug);
  if (!e) return {};
  const title = `${e.titlu} | Portofoliu ${e.complex === 'riviera' ? 'Riviera Events' : 'ANNA Events'}`;
  return { title, description: e.descriere.slice(0, 155), alternates: { canonical: `/portofoliu/${e.slug}` }, openGraph: { title, images: [e.poze[0].src] } };
}

export default async function EvenimentPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEveniment((await params).slug);
  if (!e) notFound();
  const all = getPortofoliu();
  const i = all.findIndex((x) => x.slug === e.slug);
  const next = all[(i + 1) % all.length];
  const wa = waLink(`portofoliu ${e.slug}`, `Bună ziua, am văzut pe site evenimentul „${e.titlu}” și aș dori o ofertă.`);
  return (
    <>
      <PageHero compact title={e.titlu} subtitle={`${e.complex === 'riviera' ? 'Riviera Events, pe malul Jiului' : 'ANNA Events, pe Insulița'}${dataEv(e.data) ? ` · ${dataEv(e.data)}` : ''}`}
        image={e.poze[0].src} alt={e.poze[0].alt} />
      <section className="section">
        <div className="wrap">
          <p className="lead max-w-3xl text-lg">{e.descriere}</p>
          <div className="mt-10"><Gallery images={e.poze} /></div>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn"><WaIcon />Vreau un eveniment ca acesta</a>
            <Link href={`/portofoliu/${next.slug}`} className="underline underline-offset-4">Următorul: {next.titlu} →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
