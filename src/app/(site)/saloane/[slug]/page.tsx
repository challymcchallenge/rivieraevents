import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import SaveTheDate from '@/components/SaveTheDate';
import Gallery from '@/components/Gallery';
import SalonCard from '@/components/SalonCard';
import TourButton from '@/components/TourButton';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { getSalon, getSaloane, getSite } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

export const dynamicParams = false;
export function generateStaticParams() {
  return getSaloane().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const s = getSalon((await params).slug);
  if (!s) return {};
  return {
    title: s.seo.titlu, description: s.seo.descriere, alternates: { canonical: `/saloane/${s.slug}` },
    openGraph: { title: s.seo.titlu, description: s.seo.descriere, url: `/saloane/${s.slug}`, images: [s.imaginePrincipala.src] },
  };
}

export default async function SalonPage({ params }: { params: Promise<{ slug: string }> }) {
  const salon = getSalon((await params).slug);
  if (!salon) notFound();
  const site = getSite();
  const complex = site.complexe[salon.complex];
  const scurt = salon.nume.replace('Salon ', '');
  const wa = waLink(`salon ${scurt}`, `Bună ziua, aș dori o ofertă pentru salonul ${scurt}.`);
  const altele = getSaloane().filter((s) => s.complex === salon.complex && s.slug !== salon.slug);
  const facts = [
    { k: 'Nuntă, la masă', v: `până la ${salon.capacitate.nunta} de invitați` },
    ...(salon.capacitate.conferinta ? [{ k: 'Conferințe', v: salon.capacitate.conferinta }] : []),
    { k: 'Complex', v: complex.nume },
    { k: 'Adresa', v: complex.adresa },
    { k: 'Parcare', v: site.parcare.scurt },
  ];

  return (
    <>
      <PageHero title={<span translate="no">{salon.nume}</span>} subtitle={salon.descriereScurta} image={salon.imaginePrincipala.src} alt={salon.imaginePrincipala.alt}>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />Cereți oferta pentru {scurt}</a>
        {salon.tur360 && <TourButton url={salon.tur360} title={`Tur virtual 360, ${salon.nume}`} className="btn2 border-hero-text text-hero-text" />}
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <BlurFade>
            <p className="eyebrow">{complex.descriereLocatie}</p>
            <h2 className="h2 mt-2">Despre salonul {scurt}</h2>
            <p className="lead mt-4 text-lg">{salon.descriere}</p>
            {salon.turApartament && (
              <div className="mt-6"><TourButton url={salon.turApartament} title={`Tur virtual, apartamentul mirilor, ${salon.nume}`} label="Tur virtual: apartamentul mirilor" /></div>
            )}
          </BlurFade>
          <BlurFade delay={0.1}>
            <dl className="border-t border-line">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[9rem_1fr] gap-4 border-b border-line py-3 text-sm">
                  <dt className="text-muted">{f.k}</dt><dd className="font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
            {salon.puncteForte.length > 0 && (
              <>
                <h3 className="mt-8 text-2xl">Ce îl face special</h3>
                <ul className="mt-3 space-y-2">
                  {salon.puncteForte.map((p) => <li key={p} className="flex gap-3 text-muted"><span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent" />{p}</li>)}
                </ul>
              </>
            )}
          </BlurFade>
        </div>
      </section>

      {salon.galerie.length > 0 && (
        <section className="section pt-0">
          <div className="wrap">
            <h2 className="h2 mb-8">Galerie</h2>
            <Gallery images={salon.galerie} />
          </div>
        </section>
      )}

      <section className="section bg-surface">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="h2">Alte saloane {salon.complex === 'riviera' ? 'la Riviera' : 'pe Insulița'}</h2>
            <Link href="/saloane" className="underline underline-offset-4">Toate saloanele</Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {altele.map((s) => <SalonCard key={s.slug} salon={s} compact />)}
          </div>
        </div>
      </section>

      <SaveTheDate pagina={`salon ${scurt}, save the date`} salon={scurt}
        text={`Spuneți-ne data și cam câți invitați aveți. Vă spunem pe WhatsApp dacă salonul ${scurt} e liber și vă trimitem oferta. De regulă vă răspundem în aceeași zi.`} />
    </>
  );
}
