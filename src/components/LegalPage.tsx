import type { Metadata } from 'next';
import Prose from '@/components/Prose';
import SimpleHeader from '@/components/SimpleHeader';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { getPage } from '@/lib/content';

export function legalMetadata(name: string, path: string): Metadata {
  const p = getPage(name);
  return { title: p.meta.seoTitlu, description: p.meta.seoDescriere, alternates: { canonical: path } };
}

/** Paginile legale: toate secțiunile din content/pagini/<name>.mdx, în ordine. */
export default function LegalPage({ name }: { name: string }) {
  const p = getPage(name);
  return (
    <>
      <ScrollProgress />
      <SimpleHeader title={p.meta.h1} subtitle={p.meta.subtitlu} />
      <section className="section">
        <div className="wrap max-w-3xl">
          {p.sections.map((s, i) => (
            <div key={i}>
              {s.title && <h2 className="mt-12 mb-4 text-[clamp(26px,4vw,34px)] first:mt-0">{s.title}</h2>}
              <Prose text={s.body} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
