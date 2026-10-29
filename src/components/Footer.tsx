import Link from 'next/link';
import { getCatalog, getSite } from '@/lib/content';
import Bilingual from '@/components/Bilingual';
import { NAV, NAV_EXTRA } from '@/lib/nav';
import { telLink } from '@/lib/whatsapp';

export default function Footer() {
  const site = getSite();
  const { firma } = site;
  const catalog = getCatalog();
  return (
    <footer className="border-t border-line pt-16 pb-28 text-sm text-muted lg:pb-10">
      <div className="wrap grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="col-span-2 lg:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-1-transparent.svg" alt="Riviera Events by ANNA" width={92} height={36} className="mb-4 h-9 w-auto dark:hidden" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-3-transparent.svg" alt="Riviera Events by ANNA" width={92} height={36} className="mb-4 hidden h-9 w-auto dark:block" />
          <p>{site.complexe.riviera.adresa}</p>
          <ul translate="no" className="mt-3 space-y-1">
            {site.telefoane.map((t) => (
              <li key={t.numar}><a href={telLink(t.numar)} className="hover:text-text">{t.numar}</a></li>
            ))}
            <li><a href={`mailto:${site.email}`} className="hover:text-text">{site.email}</a></li>
            {catalog && (
              <li translate="yes" className="pt-2">
                {catalog.extern
                  ? <a href={catalog.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-text">{catalog.eticheta}<span className="sr-only"> (se deschide într-un tab nou)</span></a>
                  : <a href={catalog.href} download={catalog.numeFisier} className="underline underline-offset-4 hover:text-text">{catalog.eticheta} (PDF, {catalog.mb} MB)</a>}
              </li>
            )}
          </ul>
        </div>
        <FooterCol title="Site">
          {[NAV_EXTRA.acasa, ...NAV, NAV_EXTRA.buget, NAV_EXTRA.despre].map((n) => (
            <li key={n.href}><Link href={n.href} className="hover:text-text"><Bilingual ro={n.label} en={n.en} /></Link></li>
          ))}
        </FooterCol>
        <FooterCol title={site.reteaAnna.titlu}>
          {[site.reteaAnna.principal, ...site.reteaAnna.linkuri].map((l) => (
            <li key={l.url}><a href={l.url} target="_blank" rel="noopener noreferrer" className="hover:text-text">{l.nume}</a></li>
          ))}
        </FooterCol>
        <FooterCol title="Urmăriți-ne">
          <li><a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-text">Facebook</a></li>
          <li><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-text">Instagram</a></li>
          <li><a href={site.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-text">YouTube</a></li>
        </FooterCol>
      </div>
      <nav aria-label="Informații legale" className="wrap mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-6 text-[13px]">
        {site.linkuriLegale.map((l) => {
          const ext = l.url.startsWith('http');
          return ext
            ? <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-6 items-center underline underline-offset-4">{l.text}</a>
            : <Link key={l.url} href={l.url} className="inline-flex min-h-6 items-center underline underline-offset-4">{l.text}</Link>;
        })}
        <p translate="no" className="w-full">
          © {new Date().getFullYear()} {firma.denumire} · CUI {firma.cui} · {firma.registruComertului} · {firma.sediu}
        </p>
      </nav>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 font-body text-xs font-semibold tracking-[.16em] text-text uppercase">{title}</h2>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}
