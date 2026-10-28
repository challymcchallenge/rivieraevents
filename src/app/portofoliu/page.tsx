import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import PortfolioGrid from '@/components/PortfolioGrid';
import Prose from '@/components/Prose';
import WaIcon from '@/components/WaIcon';
import { getPage, getPortofoliu, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('portofoliu');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/portofoliu' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/portofoliu' },
};

export default function PortofoliuPage() {
  const wa = waLink('portofoliu');
  const final = page.sections.find((x) => x.title?.includes('salon din poze'));
  return (
    <>
      <PageHero compact title={page.meta.h1} subtitle={page.meta.subtitlu} image="/images/hero/portofoliu-riviera-004.jpg" alt="Cununie civilă sub arcade de flori albe, în grădina Riviera" />
      <section className="section">
        <div className="wrap"><PortfolioGrid events={getPortofoliu()} /></div>
      </section>
      {final && (
        <section className="section bg-surface">
          <div className="wrap max-w-3xl text-center">
            <h2 className="h2">{final.title}</h2>
            <Prose text={final.body} className="mx-auto mt-4 [&_p]:mx-auto" />
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-2"><WaIcon />{page.meta.cta.text}</a>
          </div>
        </section>
      )}
    </>
  );
}
