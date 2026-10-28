'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

export const THEME_KEY = 'riviera-tema';

/** Script inline din <head>: aplică tema salvată înainte de prima afișare, ca să nu clipească pagina. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_KEY}');if(t==='dark'||t==='light')document.documentElement.dataset.theme=t;}catch(e){}`;

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  }, []);

  const change = useCallback((t: 'light' | 'dark') => {
    document.documentElement.dataset.theme = t;
    setTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch { /* fără stocare: tema rămâne doar pe pagina curentă */ }
  }, []);

  return (
    <AnimatedThemeToggler
      theme={theme}
      onThemeChange={change}
      className={`grid size-11 place-items-center rounded-full transition-colors hover:bg-white/15 ${className}`}
    />
  );
}
