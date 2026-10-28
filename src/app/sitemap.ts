import type { MetadataRoute } from 'next';
import { getPachete, getPortofoliu, getSaloane, type Pachet } from '@/lib/content';

const BASE = 'https://www.rivieraevents.ro';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed: [string, number][] = [
    ['', 1], ['/saloane', 0.9], ['/estimare-buget', 0.8], ['/pachete', 0.8], ['/meniuri', 0.8], ['/tur-virtual', 0.7],
    ['/portofoliu', 0.7], ['/contact', 0.8], ['/despre', 0.5],
    ['/politica-de-confidentialitate', 0.2], ['/politica-cookies', 0.2], ['/termeni', 0.2],
  ];
  return [
    ...fixed.map(([p, priority]) => ({ url: `${BASE}${p}`, lastModified: now, priority })),
    ...getSaloane().map((s) => ({ url: `${BASE}/saloane/${s.slug}`, lastModified: now, priority: s.complex === 'riviera' ? 0.9 : 0.7 })),
    ...(getPachete().serviciiPremium as Pachet[]).map((p) => ({ url: `${BASE}/pachete/${p.id}`, lastModified: now, priority: 0.6 })),
    ...getPortofoliu().map((e) => ({ url: `${BASE}/portofoliu/${e.slug}`, lastModified: now, priority: 0.5 })),
  ];
}
