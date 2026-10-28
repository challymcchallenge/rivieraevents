import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import TourButton from '@/components/TourButton';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { getPage, getPozePagini, getSaloane, getTururi, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('tur-virtual');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/tur-virtual' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/tur-virtual' },
};

export default function TurVirtualPage() {
  const saloane = getSaloane();
  const poze = getPozePagini();
  const apt = poze.apartament[0];
  const imageFor = (id: string) => id.startsWith('apartament-') ? apt : saloane.find((s) => s.slug === id)?.imaginePrincipala;
  const tururi = getTururi();
  const wa = waLink('tur virtual', 'Bună ziua, am văzut turul virtual și aș dori să programez o vizită la saloane.');
  const s = (t: string) => section(page, t)?.body ?? '';

  return (
    <>
      <PageHero compact title={page.meta.h1} subtitle={page.meta.subtitlu} image={poze.turVirtual.src} alt={poze.turVirtual.alt} />
      {(['riviera', 'insulita'] as const).map((c) => {
        const titlu = c === 'riviera' ? 'Riviera, pe malul Jiului' : 'ANNA Events, pe Insulița';
        return (
          <section key={c} className={`section ${c === 'riviera' ? '' : 'bg-surface'}`}>
            <div className="wrap">
              <BlurFade className="mb-8"><h2 className="h2">{titlu}</h2><Prose text={s(titlu)} className="mt-3" /></BlurFade>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {tururi.filter((t) => t.complex === c).map((t) => {
                  const img = imageFor(t.id);
                  return (
                    <li key={t.id}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-img bg-surface-2">
                        {img && <Image src={img.src} alt="" fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover" />}
                        <span className="absolute top-3 left-3 bg-black/70 px-2 py-1 text-xs font-semibold tracking-wider text-white uppercase">360°</span>
                      </div>
                      <h3 className="mt-3 text-2xl">{t.titlu}</h3>
                      <div className="mt-3"><TourButton url={t.url!} title={`Tur virtual 360, ${t.titlu}`} label="Deschideți turul" /></div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        );
      })}
      <section className="section">
        <div className="wrap max-w-3xl text-center">
          <h2 className="h2">V-a plăcut ce ați văzut?</h2>
          <Prose text={s('V-a plăcut ce ați văzut?')} className="mx-auto mt-4 [&_p]:mx-auto" />
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-2"><WaIcon />{page.meta.cta.text}</a>
        </div>
      </section>
    </>
  );
}
