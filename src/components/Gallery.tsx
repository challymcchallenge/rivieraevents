'use client';

import { useEffect, useState } from 'react';
import Masonry from '@/components/reactbits/Masonry';
import type { Img } from '@/lib/content';

// Grila primește poze redimensionate de optimizatorul Next (640 px), lightbox-ul una mare (1920 px).
// Lățimile trebuie să fie din deviceSizes (next.config.ts), iar calitatea 75 (singura permisă implicit în Next 16).
const opt = (src: string, w: number) => `/_next/image?url=${encodeURIComponent(src)}&w=${w}&q=75`;

export default function Gallery({ images }: { images: (Img & { w?: number; h?: number })[] }) {
  // 2 coloane pe telefon, 3 pe tabletă, 4 pe desktop
  const [cols, setCols] = useState(2);
  useEffect(() => {
    const set = () => setCols(window.innerWidth >= 1024 ? 4 : window.innerWidth >= 640 ? 3 : 2);
    set();
    window.addEventListener('resize', set);
    return () => window.removeEventListener('resize', set);
  }, []);
  return (
    <Masonry
      items={images.map((im, i) => ({ id: i, img: opt(im.src, 640), full: opt(im.src, 1920), alt: im.alt, width: im.w, height: im.h }))}
      columns={cols}
      gap={cols === 2 ? 8 : 12}
      radius={12}
      captions="none"
      hoverEffect="zoom"
      draggable={false}
      lightbox
    />
  );
}
