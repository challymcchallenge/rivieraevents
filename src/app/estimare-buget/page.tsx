import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import BudgetCalculator from '@/components/BudgetCalculator';
import { BlurFade } from '@/components/ui/blur-fade';
import { getBuget, getPage, getSaloane, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('estimare-buget');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/estimare-buget' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/estimare-buget' },
};

export default function EstimarePage() {
  const b = getBuget();
  const saloane = getSaloane().map((s) => ({ slug: s.slug, nume: s.nume, complex: s.complex, capacitate: s.capacitate.nunta }));
  const s = (t: string) => section(page, t)?.body ?? '';
  return (
    <>
      <PageHero compact title={page.meta.h1} subtitle={page.meta.subtitlu} image="/images/complex/riviera/complex-riviera-011.jpg" alt="Cină în grădina Riviera, sub candelabre de cristal" />
      <section className="section">
        <div className="wrap grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <BudgetCalculator tipuri={b.tipuri} saloane={saloane} rotunjire={b.rotunjire} ajustari={b.ajustariComplex} nota={b.nota}
            waBase={waLink('estimare buget', 'TEXT')} />
          <div className="space-y-10">
            <BlurFade>
              <h2 className="text-[clamp(28px,4vw,36px)]">Cum se calculează</h2>
              <Prose text={s('Cum se calculează')} className="mt-3" />
            </BlurFade>
            <BlurFade delay={0.1}>
              <h2 className="text-[clamp(28px,4vw,36px)]">Ce urmează</h2>
              <Prose text={s('Ce urmează')} className="mt-3" />
            </BlurFade>
          </div>
        </div>
      </section>
    </>
  );
}
