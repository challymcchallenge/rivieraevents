import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Gallery from '@/components/Gallery';
import PachetCard from '@/components/PachetCard';
import PageHero from '@/components/PageHero';
import WaIcon from '@/components/WaIcon';
import { getPachet, getPachete, getPozePagini, type Pachet } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

export const dynamicParams = false;
export function generateStaticParams() {
  return (getPachete().serviciiPremium as Pachet[]).map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPachet((await params).slug);
  if (!p) return {};
  const title = `${p.nume} la nuntă | Riviera Târgu Jiu`;
  return {
    title, description: p.descriere, alternates: { canonical: `/pachete/${p.id}` },
    openGraph: { title, description: p.descriere, url: `/pachete/${p.id}`, ...(p.imagine ? { images: [p.imagine.src] } : {}) },
  };
}

export default async function PachetPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPachet((await params).slug);
  if (!p) notFound();
  const toate = getPachete().serviciiPremium as Pachet[];
  // Următoarele 5 pachete din listă, ca vizitatorul să le poată răsfoi pe rând.
  const i = toate.findIndex((x) => x.id === p.id);
  const altele = [...toate.slice(i + 1), ...toate.slice(0, i)].slice(0, 5);
  const wa = waLink(`pachet ${p.nume}`, `Bună ziua, aș dori o ofertă care să includă ${p.nume}.`);
  const hero = p.imagine ?? getPozePagini().pachete;

  return (
    <>
      <PageHero compact title={p.nume} subtitle={p.descriere} image={hero.src} alt={hero.alt}>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />Cereți oferta cu {p.nume}</a>
        <Link href="/pachete" className="btn2 border-hero-text text-hero-text">Toate pachetele</Link>
      </PageHero>

      {p.galerie.length > 0 && (
        <section className="section">
          <div className="wrap">
            <p className="eyebrow">Opțional, la orice eveniment</p>
            <h2 className="h2 mt-2 mb-8">{p.nume} la evenimentele noastre</h2>
            <Gallery images={p.galerie} />
          </div>
        </section>
      )}

      <section className="section bg-surface">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h2">Alte pachete</h2>
            <Link href="/pachete" className="underline underline-offset-4">Toate pachetele</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 lg:gap-6">
            {altele.map((x) => <PachetCard key={x.id} p={x} descriere={false} />)}
          </div>
        </div>
      </section>
    </>
  );
}
