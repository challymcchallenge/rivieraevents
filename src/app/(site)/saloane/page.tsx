import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import SalonFilter from '@/components/SalonFilter';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { getPage, getPozePagini, getSaloane, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('saloane');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/saloane' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/saloane' },
};

export default function SaloanePage() {
  const s = (t: string) => section(page, t)?.body ?? '';
  const wa = waLink('saloane', 'Bună ziua, aș dori să aflu ce salon mi se potrivește pentru evenimentul meu.');
  return (
    <>
      <PageHero title={page.meta.h1} subtitle={page.meta.subtitlu} image={getPozePagini().saloane.src} alt={getPozePagini().saloane.alt}>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />{page.meta.cta.text}</a>
      </PageHero>
      <SalonFilter saloane={getSaloane()} intro={{
        riviera: <Prose text={s('Complexul Riviera, pe malul Jiului')} />,
        insulita: <Prose text={s('Complexul ANNA Events, pe Insulița')} />,
      }} />
      <section className="section bg-surface">
        <div className="wrap grid gap-10 lg:grid-cols-2">
          <BlurFade>
            <h2 className="h2">Lumini în orice culoare</h2>
            <Prose text={s('Lumini în orice culoare')} className="mt-4" />
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="h2">Nu știți încă ce salon vi se potrivește?</h2>
            <Prose text={s('Nu știți încă ce salon vi se potrivește?')} className="mt-4" />
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-2"><WaIcon />{page.meta.cta.text}</a>
          </BlurFade>
        </div>
      </section>
    </>
  );
}
