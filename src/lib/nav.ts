// `en`: eticheta în engleză, afișată când vizitatorul alege EN (ADR-008). Google Translate traduce prost cuvintele
// fără context (ex. „Saloane” → „Fairs”), așa că meniul are traducerea scrisă de noi și e marcat translate="no".
export const NAV = [
  { href: '/saloane', label: 'Saloane', en: 'Venues' },
  { href: '/pachete', label: 'Pachete', en: 'Packages' },
  { href: '/meniuri', label: 'Meniuri', en: 'Menus' },
  { href: '/tur-virtual', label: 'Tur virtual', en: 'Virtual tour' },
  { href: '/portofoliu', label: 'Portofoliu', en: 'Portfolio' },
  { href: '/contact', label: 'Contact', en: 'Contact' },
];
export const NAV_EXTRA = {
  acasa: { href: '/', label: 'Acasă', en: 'Home' },
  buget: { href: '/estimare-buget', label: 'Estimare buget', en: 'Budget estimate' },
  despre: { href: '/despre', label: 'Despre', en: 'About us' },
};
