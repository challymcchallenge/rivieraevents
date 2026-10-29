import { BookOpen, Download } from 'lucide-react';
import { getCatalog } from '@/lib/content';

/**
 * Butonul catalogului de evenimente (Keystatic, „Catalog de evenimente”).
 * Cu link extern: deschide catalogul într-un tab nou. Cu fișier: descarcă PDF-ul și arată mărimea.
 * Nu apare deloc dacă nu există nici link, nici fișier.
 */
export default function CatalogButton({ className = 'btn2', label }: { className?: string; label?: string }) {
  const c = getCatalog();
  if (!c) return null;
  if (c.extern) {
    return (
      <a href={c.href} target="_blank" rel="noopener noreferrer" className={className}>
        <BookOpen aria-hidden size={18} />{label ?? 'Vedeți catalogul'}<span className="sr-only"> (se deschide într-un tab nou)</span>
      </a>
    );
  }
  return (
    <a href={c.href} download={c.numeFisier} className={className}>
      <Download aria-hidden size={18} />{label ?? 'Descărcați catalogul'}{' '}<span className="font-normal opacity-80">(PDF, {c.mb} MB)</span>
    </a>
  );
}
