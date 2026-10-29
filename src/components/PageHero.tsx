import Image from 'next/image';
import type { ReactNode } from 'react';

/** Antetul paginilor interioare: poză cu gradient, titlu, subtitlu și butonul principal al paginii. */
export default function PageHero({ title, subtitle, image, alt, children, compact = false }: {
  title: ReactNode; subtitle?: string; image: string; alt: string; children?: ReactNode; compact?: boolean;
}) {
  return (
    <section className={`relative flex items-end text-hero-text ${compact ? 'min-h-[52svh] lg:min-h-[56vh]' : 'min-h-[64svh] lg:min-h-[70vh]'}`}>
      <Image src={image} alt={alt} fill priority sizes="100vw" className="object-cover" />
      <div aria-hidden className="absolute inset-0" style={{ background: 'var(--hero-overlay)' }} />
      <div className="wrap relative z-10 pt-28 pb-12 lg:pb-16">
        <h1 className="max-w-[18ch] text-[clamp(38px,7vw,72px)]">{title}</h1>
        {subtitle && <p className="mt-4 max-w-[52ch] text-lg opacity-95">{subtitle}</p>}
        {children && <div className="mt-6 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
