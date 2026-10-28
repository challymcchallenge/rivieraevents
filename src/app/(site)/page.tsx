import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSlideshow from '@/components/HeroSlideshow';
import PachetCard from '@/components/PachetCard';
import SalonCard from '@/components/SalonCard';
import Prose from '@/components/Prose';
import Testimonials from '@/components/Testimonials';
import SoftBackground from '@/components/SoftBackground';
import WaIcon from '@/components/WaIcon';
import { BlurFade } from '@/components/ui/blur-fade';
import { getPachete, getPage, getPozePagini, getSaloane, getSlideshow, getTestimoniale, section, type Pachet } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

const page = getPage('acasa');
export const metadata: Metadata = {
  title: page.meta.seoTitlu,
  description: page.meta.seoDescriere,
  alternates: { canonical: '/' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/' },
};

/** Împarte o secțiune cu ### în puncte: [{titlu, text}] */
function points(body: string) {
  return body.split(/\n(?=### )/).map((b) => b.trim()).filter((b) => b.startsWith('### '))
    .map((b) => { const [h, ...r] = b.split('\n'); return { title: h.slice(4), text: r.join(' ').trim() }; });
}

export default function Home() {
  const saloane = getSaloane();
  const riviera = saloane.filter((s) => s.complex === 'riviera');
  const insulita = saloane.filter((s) => s.complex === 'insulita');
  const slideshow = getSlideshow();
  const wa = waLink('pagina principală');
  const s = (t: string) => section(page, t);
  const dece = points(s('De ce Riviera')?.body ?? '');
  const poze = getPozePagini();
  const pachete = (getPachete().serviciiPremium as Pachet[]).filter((p) => p.imagine).slice(0, 8);

  return (
    <>
      <HeroSlideshow slides={slideshow.slideuri} interval={slideshow.intervalSecunde}>
        <p className="eyebrow text-hero-text/90">Riviera Events by ANNA · Târgu Jiu</p>
        <h1 className="mt-4 max-w-[14ch] text-[clamp(40px,9vw,84px)]">{page.meta.h1}</h1>
        <p className="mt-4 max-w-[46ch] text-lg opacity-95">{page.meta.subtitlu}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />{page.meta.cta.text}</a>
          <Link href="/estimare-buget" className="btn2 border-hero-text text-hero-text">Estimați bugetul</Link>
        </div>
      </HeroSlideshow>

      <section className="section">
        <div className="wrap">
          <BlurFade className="mb-10">
            <p className="eyebrow">Saloanele Riviera</p>
            <h2 className="h2 mt-2">Trei saloane, chiar lângă Jiu</h2>
            <Prose text={s('Saloanele Riviera')?.body ?? ''} className="mt-3" />
          </BlurFade>
          <div className="grid gap-8 lg:grid-cols-3">
            {riviera.map((sal, i) => <BlurFade key={sal.slug} delay={i * 0.08}><SalonCard salon={sal} /></BlurFade>)}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="wrap">
          <BlurFade className="mb-10"><p className="eyebrow">De ce Riviera</p><h2 className="h2 mt-2">Motive să alegeți Riviera</h2></BlurFade>
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dece.map((d, i) => (
              <li key={d.title} className="border-t border-line pt-4">
                <span className="text-[13px] font-semibold tracking-[.1em] text-accent-text">0{i + 1}</span>
                <h3 className="mt-2 text-[26px]">{d.title}</h3>
                <Prose text={d.text} className="mt-2" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid items-center gap-10 lg:grid-cols-2">
          <div className="relative aspect-[4/3] overflow-hidden rounded-img">
            <Image src={poze.acasaBuget.src} alt={poze.acasaBuget.alt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <BlurFade className="rounded-img bg-surface-2 p-8 lg:p-10">
            <p className="eyebrow">Cât costă</p>
            <h2 className="mt-2 text-[clamp(30px,5vw,44px)]">Cât costă un eveniment la Riviera</h2>
            <Prose text={s('Cât costă un eveniment la Riviera')?.body ?? ''} className="mt-3" />
            <Link href="/estimare-buget" className="btn mt-4">Calculați bugetul estimativ</Link>
          </BlurFade>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <BlurFade className="mb-10">
            <p className="eyebrow">Și pe Insulița</p>
            <h2 className="h2 mt-2">Încă patru saloane ANNA Events</h2>
            <Prose text={s('Și pe Insulița')?.body ?? ''} className="mt-3" />
          </BlurFade>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {insulita.map((sal) => <SalonCard key={sal.slug} salon={sal} compact />)}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="wrap">
          <BlurFade className="mb-10">
            <p className="eyebrow">Pachete opționale</p>
            <h2 className="h2 mt-2">Baruri și bunătăți pentru invitați</h2>
            <Prose text={s('Pachete opționale')?.body ?? ''} className="mt-3" />
          </BlurFade>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {pachete.map((p) => <PachetCard key={p.id} p={p} descriere={false} sizes="(min-width:1024px) 25vw, 50vw" />)}
          </div>
          <Link href="/pachete" className="btn2 mt-10">Toate pachetele</Link>
        </div>
      </section>

      <section className="section overflow-hidden">
        <div className="wrap text-center">
          <p className="eyebrow">Ce spun cei care au ales Riviera</p>
          <h2 className="h2 mx-auto mt-2 mb-10 max-w-[20ch]">Nunți, botezuri și petreceri de pe malul Jiului</h2>
        </div>
        <Testimonials items={getTestimoniale('riviera')} />
      </section>

      <section className="relative overflow-hidden">
        <SoftBackground />
        <div className="wrap relative py-24 text-center lg:py-32">
          <div className="mx-auto max-w-[620px] rounded-img bg-bg/70 px-6 py-10 backdrop-blur-sm lg:px-12">
            <h2 className="h2">Vă verificăm data</h2>
            <Prose text={s('Vă verificăm data')?.body ?? ''} className="mx-auto mt-4 [&_p]:mx-auto" />
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-2"><WaIcon />{page.meta.cta.text}</a>
          </div>
        </div>
      </section>
    </>
  );
}
