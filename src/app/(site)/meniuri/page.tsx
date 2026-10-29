import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import CatalogButton from '@/components/CatalogButton';
import MenuTabs from '@/components/MenuTabs';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { getListaMeniuri, getPachete, getPage, getPozePagini, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('meniuri');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/meniuri' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/meniuri' },
};

export default function MeniuriPage() {
  const tort = getPachete().tort;
  const poze = getPozePagini();
  const s = (t: string) => section(page, t)?.body ?? '';
  const wa = waLink('meniuri', 'Bună ziua, aș dori o ofertă cu unul dintre meniurile ANNA.');
  const meniuri = getListaMeniuri();

  return (
    <>
      <ScrollProgress />
      <PageHero title={page.meta.h1} subtitle={page.meta.subtitlu} image={poze.meniuri.src} alt={poze.meniuri.alt}>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />{page.meta.cta.text}</a>
        <CatalogButton className="btn2 border-hero-text text-hero-text" />
      </PageHero>

      <section className="section">
        <div className="wrap">
          <BlurFade className="mb-8 max-w-3xl">
            <h2 className="h2">Patru momente la masă</h2>
            <Prose text={s('Patru momente la masă')} className="mt-4" />
          </BlurFade>
          <MenuTabs meniuri={meniuri} />
        </div>
      </section>

      <section className="section bg-surface">
        <div className="wrap grid gap-12 lg:grid-cols-3">
          <BlurFade>
            <h2 className="text-[clamp(28px,4vw,36px)]">Bufet dulce</h2>
            <Prose text={s('Bufet dulce')} className="mt-3" />
          </BlurFade>
          <BlurFade delay={0.08}>
            <h2 className="text-[clamp(28px,4vw,36px)]">Băuturi incluse</h2>
            <Prose text={s('Băuturi incluse')} className="mt-3" />
          </BlurFade>
          <BlurFade delay={0.16}>
            <h2 className="text-[clamp(28px,4vw,36px)]">Opțiuni speciale</h2>
            <Prose text={s('Opțiuni speciale')} className="mt-3" />
          </BlurFade>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-img lg:aspect-[4/3]">
            <Image src={poze.tort.src} alt={poze.tort.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <BlurFade>
            <h2 className="h2">Tortul mirilor, de la Cofetăria Anna</h2>
            <Prose text={s('Tortul mirilor, de la Cofetăria Anna')} className="mt-4" />
            <a href={tort.linkCatalog} target="_blank" rel="noopener noreferrer" className="btn2 mt-2">Catalogul de torturi</a>
          </BlurFade>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="wrap max-w-3xl text-center">
          <h2 className="h2">Cât costă</h2>
          <Prose text={s('Cât costă')} className="mx-auto mt-4 [&_p]:mx-auto" />
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link href="/estimare-buget" className="btn">Calculați bugetul estimativ</Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn2"><WaIcon />{page.meta.cta.text}</a>
          </div>
        </div>
      </section>
    </>
  );
}
