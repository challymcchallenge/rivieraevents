import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { NumberTicker } from '@/components/ui/number-ticker';
import { getPachete, getPage, getSaloane, getSite, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('despre');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/despre' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/despre' },
};

export default function DesprePage() {
  const site = getSite();
  const saloane = getSaloane();
  const s = (t: string) => section(page, t)?.body ?? '';
  const ani = new Date().getFullYear() - site.anInfiintareGrup;
  const cifre = [
    { v: ani, l: 'de ani în Târgu Jiu' },
    { v: saloane.length, l: 'saloane în două complexe' },
    { v: Math.max(...saloane.map((x) => x.capacitate.nunta)), l: 'invitați în cel mai mare salon' },
    { v: getPachete().serviciiPremium.length, l: 'baruri și servicii premium' },
  ];
  return (
    <>
      <PageHero title={page.meta.h1} subtitle={page.meta.subtitlu} image="/images/hero/complex-riviera-015.jpg" alt="Grădina Riviera, pe malul Jiului, văzută de sus">
        <a href={waLink('despre')} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />{page.meta.cta.text}</a>
      </PageHero>
      <section className="border-b border-line">
        <dl className="wrap grid grid-cols-2 gap-y-8 py-12 lg:grid-cols-4">
          {cifre.map((c) => (
            <div key={c.l}>
              <dt className="sr-only">{c.l}</dt>
              <dd className="font-heading text-[clamp(44px,7vw,72px)] leading-none"><NumberTicker value={c.v} /></dd>
              <dd aria-hidden className="mt-2 text-sm text-muted">{c.l}</dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <BlurFade><h2 className="h2">Povestea noastră</h2><Prose text={s('Povestea noastră')} className="mt-4" /></BlurFade>
          <BlurFade delay={0.1}><h2 className="h2">Echipa care vă organizează evenimentul</h2><Prose text={s('Echipa care vă organizează evenimentul')} className="mt-4" /></BlurFade>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="wrap">
          <h2 className="h2">Grupul ANNA</h2>
          <Prose text={s('Grupul ANNA')} className="mt-4" />
          <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {[site.reteaAnna.principal, ...site.reteaAnna.linkuri].map((l) => (
              <li key={l.url} className="border-b border-line"><a href={l.url} target="_blank" rel="noopener noreferrer" className="flex min-h-12 items-center justify-between py-2 hover:text-accent-text">{l.nume}<span aria-hidden>↗</span></a></li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
