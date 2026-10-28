import type { Metadata } from 'next';
import Image from 'next/image';
import { Martini } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import TourButton from '@/components/TourButton';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { clean, getPachete, getPage, getSaloane, section } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('pachete');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/pachete' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/pachete' },
};

type Premium = { id: string; nume: string; descriere: string; imagine: { src: string; alt: string } | null };

export default function PachetePage() {
  const p = getPachete();
  const s = (t: string) => section(page, t)?.body ?? '';
  const wa = waLink('pachete');
  const apartament = p.cazare.find((c: { nume: string }) => c.nume === 'Apartamentul mirilor');
  const riviera = getSaloane().filter((x) => x.complex === 'riviera' && x.turApartament);
  const premium = (p.serviciiPremium as Premium[]).map((x) => ({ ...x, descriere: clean(x.descriere) }));

  return (
    <>
      <PageHero title={page.meta.h1} subtitle={page.meta.subtitlu} image="/images/complex/riviera/complex-riviera-010.jpg" alt="Turn de șampanie sub o arcadă de flori albe, în grădina Riviera">
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />{page.meta.cta.text}</a>
      </PageHero>

      <section className="section">
        <div className="wrap grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <BlurFade>
            <p className="eyebrow">În prețul evenimentului</p>
            <h2 className="h2 mt-2">Inclus în ofertă</h2>
            <Prose text={s('Inclus în ofertă')} className="mt-4" />
          </BlurFade>
          <BlurFade delay={0.1}>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {p.includeStandard.map((x: { titlu: string }) => (
                <li key={x.titlu} className="flex gap-3 border-b border-line py-3"><span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />{x.titlu}</li>
              ))}
            </ul>
          </BlurFade>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="wrap">
          <BlurFade className="mb-10">
            <p className="eyebrow">Opționale</p>
            <h2 className="h2 mt-2">Baruri și servicii premium</h2>
            <Prose text={s('Baruri și servicii premium')} className="mt-3" />
          </BlurFade>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-6">
            {premium.map((x) => (
              <article key={x.id}>
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  {x.imagine ? <Image src={x.imagine.src} alt={x.imagine.alt} fill sizes="(min-width:1024px) 20vw, 50vw" className="object-cover" />
                    : <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--color-surface),var(--color-surface-2))] text-accent-text"><Martini aria-hidden size={48} strokeWidth={1.25} /></div>}
                </div>
                <h3 className="mt-3 text-xl">{x.nume}</h3>
                {x.descriere && <p className="mt-1 text-sm text-muted">{x.descriere}</p>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden lg:aspect-[4/3]">
            <Image src={p.tort.imagine.src} alt={p.tort.imagine.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <BlurFade>
            <h2 className="h2">Tortul mirilor, de la Cofetăria Anna</h2>
            <Prose text={s('Tortul mirilor, de la Cofetăria Anna')} className="mt-4" />
            <a href={p.tort.linkCatalog} target="_blank" rel="noopener noreferrer" className="btn2 mt-2">Catalogul de torturi</a>
          </BlurFade>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="wrap grid gap-12 lg:grid-cols-2">
          <BlurFade>
            <h2 className="h2">Decor și flori</h2>
            <Prose text={s('Decor și flori')} className="mt-4" />
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="h2">Cazare pentru invitați</h2>
            <Prose text={s('Cazare pentru invitați')} className="mt-4" />
          </BlurFade>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <BlurFade className="max-w-3xl">
            <p className="eyebrow">Inclus la fiecare salon Riviera</p>
            <h2 className="h2 mt-2">Apartamentul mirilor</h2>
            <Prose text={s('Apartamentul mirilor')} className="mt-4" />
            <div className="mt-2 flex flex-wrap gap-3">
              {riviera.map((x) => <TourButton key={x.slug} url={x.turApartament!} title={`Tur virtual, apartamentul mirilor, ${x.nume}`} label={`Tur: apartamentul ${x.nume.replace('Salon ', '')}`} />)}
            </div>
          </BlurFade>
          <div className="mt-10 grid grid-cols-2 gap-3 lg:grid-cols-5">
            {apartament?.galerie?.map((im: { src: string; alt: string }, i: number) => (
              <div key={im.src} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 aspect-[4/3] lg:aspect-auto lg:row-span-2' : 'aspect-[4/3]'}`}>
                <Image src={im.src} alt={im.alt} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
