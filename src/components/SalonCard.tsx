import Image from 'next/image';
import Link from 'next/link';
import type { Salon } from '@/lib/content';

export default function SalonCard({ salon, compact = false, sizes }: { salon: Salon; compact?: boolean; sizes?: string }) {
  return (
    <Link href={`/saloane/${salon.slug}`} className="group block">
      <div className={`relative overflow-hidden rounded-img ${compact ? 'aspect-square' : 'aspect-[4/5]'}`}>
        <Image src={salon.coperta.src} alt={salon.coperta.alt} fill
          sizes={sizes ?? (compact ? '(min-width:1024px) 25vw, 50vw' : '(min-width:1024px) 33vw, 100vw')}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <h3 translate="no" className={`mt-3 ${compact ? 'text-2xl' : 'text-3xl'}`}>{salon.nume.replace('Salon ', '')}</h3>
      <p className="mt-1 text-[13px] font-semibold tracking-[.08em] text-accent-text uppercase">
        până la {salon.capacitate.nunta} de invitați
      </p>
      {!compact && <p className="mt-2 text-muted">{salon.descriereScurta}</p>}
    </Link>
  );
}
