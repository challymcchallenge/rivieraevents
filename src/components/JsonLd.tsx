import { getIdentitate, getSaloane, getSite } from '@/lib/content';

const BASE = 'https://www.rivieraevents.ro';

/** schema.org: organizația și cele două complexe ca EventVenue (cu saloanele ca locuri conținute). */
export default function JsonLd() {
  const site = getSite();
  const saloane = getSaloane();
  const tel = `+40${site.whatsapp.numar.slice(2)}`;
  const venue = (k: 'riviera' | 'insulita', id: string) => ({
    '@type': ['EventVenue', 'LocalBusiness'],
    '@id': `${BASE}/#${id}`,
    name: site.complexe[k].nume,
    url: k === 'riviera' ? BASE : 'https://www.annaevents.ro/',
    telephone: tel,
    email: site.email,
    image: `${BASE}${site.complexe[k].galerieExterior?.[0]?.src ?? '/images/complex/riviera/complex-riviera-015.jpg'}`,
    address: { '@type': 'PostalAddress', streetAddress: site.complexe[k].adresa.split(',')[0], addressLocality: 'Târgu Jiu', addressRegion: 'Gorj', addressCountry: 'RO' },
    maximumAttendeeCapacity: Math.max(...saloane.filter((s) => s.complex === k).map((s) => s.capacitate.nunta)),
    containsPlace: saloane.filter((s) => s.complex === k).map((s) => ({
      '@type': 'EventVenue', name: s.nume, url: `${BASE}/saloane/${s.slug}`, maximumAttendeeCapacity: s.capacitate.nunta,
    })),
    parentOrganization: { '@id': `${BASE}/#organizatie` },
  });
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${BASE}/#organizatie`, name: site.nume, legalName: site.firma.denumire, url: BASE,
        logo: `${BASE}${getIdentitate().inchis.src}`, telephone: tel, email: site.email, foundingDate: String(site.anInfiintareGrup),
        sameAs: Object.values(site.social), taxID: site.firma.cui,
      },
      venue('riviera', 'riviera'),
      venue('insulita', 'insulita'),
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
