import { notFound } from 'next/navigation';

// Orice adresă necunoscută ajunge aici, ca pagina 404 să aibă headerul și footerul site-ului
// (cu două layout-uri rădăcină, not-found.tsx din (site) nu prinde singur adresele necunoscute).
export default function CatchAll() {
  notFound();
}
