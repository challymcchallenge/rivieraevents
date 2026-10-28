'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// ReactBits Silk se încarcă abia după ce pagina e gata (docs/design/animatii.md, „Protecții”).
const Silk = dynamic(() => import('@/components/reactbits/Silk'), { ssr: false });

const COLORS = {
  light: { color: '#EAE3D7', sheenColor: '#FFFEFA', lightMode: true },
  dark: { color: '#1C1A18', sheenColor: '#3A2A26', lightMode: false },
};

/**
 * Fundal animat 3D cu protecții: gradient static până la încărcare și ca variantă permanentă la
 * prefers-reduced-motion, Save-Data, memorie sub 4 GB sau fără WebGL2. dpr maxim 1 pe mobil și 1.5 pe desktop.
 */
export default function SilkBackground() {
  const [enabled, setEnabled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const lowMem = typeof nav.deviceMemory === 'number' && nav.deviceMemory < 4;
    const webgl2 = !!document.createElement('canvas').getContext('webgl2');
    setMobile(window.matchMedia('(max-width: 767px)').matches);
    const read = () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    read();
    const mo = new MutationObserver(read);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    if (reduce || nav.connection?.saveData || lowMem || !webgl2) return () => mo.disconnect();
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void) => number }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 2000));
    idle(() => setEnabled(true));
    return () => mo.disconnect();
  }, []);

  const c = COLORS[theme];
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ background: `radial-gradient(120% 90% at 30% 20%, ${c.sheenColor} 0%, ${c.color} 60%)` }}>
      {enabled && (
        <Silk key={theme} color={c.color} sheenColor={c.sheenColor} lightMode={c.lightMode} speed={mobile ? 0.6 : 1}
          dpr={mobile ? 1 : 1.5} mouseInteraction={!mobile} clickRipple={false} className="absolute inset-0" />
      )}
    </div>
  );
}
