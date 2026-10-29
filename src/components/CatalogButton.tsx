import { Download } from 'lucide-react';
import { getCatalog } from '@/lib/content';

/**
 * Link de descărcare pentru catalogul de evenimente (PDF din public/catalog/), cu mărimea fișierului.
 * Nu apare deloc dacă fișierul lipsește, ca site-ul să nu aibă un link stricat.
 */
export default function CatalogButton({ className = 'btn2', label = 'Descărcați catalogul' }: { className?: string; label?: string }) {
  const c = getCatalog();
  if (!c) return null;
  return (
    <a href={c.href} download className={className}>
      <Download aria-hidden size={18} />{label}{' '}<span className="font-normal opacity-80">(PDF, {c.mb} MB)</span>
    </a>
  );
}
