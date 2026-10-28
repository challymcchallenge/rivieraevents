import Image from 'next/image';
import Link from 'next/link';
import { Martini } from 'lucide-react';
import type { Pachet } from '@/lib/content';

/** Card de pachet (pe /pachete, pe Acasă și la „Alte pachete”): poza principală, numele, descrierea și câte poze are galeria. */
export default function PachetCard({ p, descriere = true, sizes = '(min-width:1024px) 20vw, 50vw' }: { p: Pachet; descriere?: boolean; sizes?: string }) {
  return (
    <Link href={`/pachete/${p.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-img bg-surface-2">
        {p.imagine
          ? <Image src={p.imagine.src} alt={p.imagine.alt} fill sizes={sizes} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
          : <div className="grid size-full place-items-center text-accent-text"><Martini aria-hidden size={48} strokeWidth={1.25} /></div>}
        {p.galerie.length > 1 && (
          <span className="absolute right-2 bottom-2 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white">{p.galerie.length} poze</span>
        )}
      </div>
      <h3 className="mt-3 text-xl group-hover:underline group-hover:underline-offset-4">{p.nume}</h3>
      {descriere && p.descriere && <p className="mt-1 text-sm text-muted">{p.descriere}</p>}
    </Link>
  );
}
