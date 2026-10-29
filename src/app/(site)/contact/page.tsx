import type { Metadata } from 'next';
import Image from 'next/image';
import PageHero from '@/components/PageHero';
import Prose from '@/components/Prose';
import QuoteForm, { type Formular } from '@/components/QuoteForm';
import WaIcon from '@/components/WaIcon';
import { getFormular, getPage, getPozePagini, getSite, section } from '@/lib/content';
import { telLink, waLink } from '@/lib/whatsapp';

const page = getPage('contact');
export const metadata: Metadata = {
  title: page.meta.seoTitlu, description: page.meta.seoDescriere, alternates: { canonical: '/contact' },
  openGraph: { title: page.meta.seoTitlu, description: page.meta.seoDescriere, url: '/contact' },
};

// Harta e o imagine statică cu link spre Google Maps (ADR-004): nicio cerere spre Google până la click.
const maps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

export default function ContactPage() {
  const site = getSite();
  const s = (t: string) => section(page, t)?.body ?? '';
  const wa = waLink('contact');
  const hero = getPozePagini().contact;
  return (
    <>
      <PageHero compact title={page.meta.h1} subtitle={page.meta.subtitlu} image={hero.src} alt={hero.alt}>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="btn bg-[#FFFEFA] text-[#1E1E1E] dark:bg-btn dark:text-btn-text"><WaIcon />{page.meta.cta.text}</a>
      </PageHero>

      <section className="section pt-10">
        <div className="wrap grid gap-12 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <h2 className="h2">Cerere de ofertă</h2>
            <Prose text={s('Cerere de ofertă')} className="mt-3 mb-6" />
            <QuoteForm form={getFormular() as Formular} endpoint={process.env.NEXT_PUBLIC_FORM_ENDPOINT} accessKey={process.env.NEXT_PUBLIC_WEB3FORMS_KEY}
              waBase={waLink('formular contact', 'TEXT')} />
          </div>
          <aside className="space-y-10">
            <div>
              <h2 className="text-[clamp(26px,4vw,34px)]">Telefon și email</h2>
              <ul className="mt-3 space-y-1">
                {site.telefoane.map((t) => <li key={t.numar}><a href={telLink(t.numar)} translate="no" className="text-lg hover:underline">{t.numar}</a> <span className="text-sm text-muted">· {t.rol}</span></li>)}
                <li className="pt-2"><a href={`mailto:${site.email}`} className="hover:underline">{site.email}</a></li>
              </ul>
            </div>
            <div>
              <h2 className="text-[clamp(26px,4vw,34px)]">Adrese</h2>
              {(['riviera', 'insulita'] as const).map((k) => (
                <div key={k} className="mt-4">
                  <p className="font-semibold">{site.complexe[k].nume}</p>
                  <p className="text-muted">{site.complexe[k].adresa}</p>
                  <a href={maps(site.complexe[k].adresa)} target="_blank" rel="noopener noreferrer" className="group mt-2 block" aria-label={`Deschide în Google Maps: ${site.complexe[k].adresa}`}>
                    <div className="relative aspect-[16/9] overflow-hidden rounded-img">
                      <Image src={site.complexe[k].galerieExterior?.[0]?.src ?? '/images/complex/riviera/complex-riviera-015.jpg'} alt="" fill sizes="(min-width:1024px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <span className="mt-2 inline-block text-sm underline underline-offset-4">Deschide în Google Maps</span>
                  </a>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-[clamp(26px,4vw,34px)]">Vizitarea saloanelor</h2>
              <Prose text={s('Vizitarea saloanelor')} className="mt-3" />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
