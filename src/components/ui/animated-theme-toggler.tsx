'use client';

// Magic UI „animated-theme-toggler” (https://magicui.design/r/animated-theme-toggler.json), preluat prin MCP la 2026-10-28.
// Adaptări: fără `cn` (className direct), etichetă în română, doar varianta „circle” (singura folosită).
// Folosit în mod controlat (`theme` + `onThemeChange`): părintele salvează tema în data-theme și localStorage.
import { useCallback, useEffect, useRef } from 'react';
import { Moon, Sun } from 'lucide-react';
import { flushSync } from 'react-dom';

interface AnimatedThemeTogglerProps extends Omit<React.ComponentPropsWithoutRef<'button'>, 'onClick'> {
  duration?: number;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

function clipPaths(cx: number, cy: number, maxRadius: number, vw: number, vh: number): [string, string] {
  const point = `${(cx / vw) * 100}% ${(cy / vh) * 100}%`;
  const r = `${(maxRadius / (Math.hypot(vw, vh) / Math.SQRT2)) * 100}%`;
  return [`circle(0% at ${point})`, `circle(${r} at ${point})`];
}

export const AnimatedThemeToggler = ({ className, duration = 400, theme, onThemeChange, ...props }: AnimatedThemeTogglerProps) => {
  const isDark = theme === 'dark';
  const buttonRef = useRef<HTMLButtonElement>(null);
  const isTransitioningRef = useRef(false);
  const activeAnimRef = useRef<Animation | null>(null);

  const cancelAnim = useCallback(() => {
    activeAnimRef.current?.cancel();
    activeAnimRef.current = null;
  }, []);

  useEffect(() => () => cancelAnim(), [cancelAnim]);

  const toggleTheme = useCallback(() => {
    const button = buttonRef.current;
    if (!button || isTransitioningRef.current) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const maxRadius = Math.hypot(Math.max(x, vw - x), Math.max(y, vh - y));
    const apply = () => onThemeChange(isDark ? 'light' : 'dark');

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (typeof document.startViewTransition !== 'function' || reduced) {
      apply();
      return;
    }
    const clipPath = clipPaths(x, y, maxRadius, vw, vh);
    isTransitioningRef.current = true;
    const transition = document.startViewTransition(() => {
      flushSync(apply);
    });
    transition.finished.finally(() => {
      isTransitioningRef.current = false;
      cancelAnim();
    }).catch(() => {});
    transition.ready.then(() => {
      activeAnimRef.current = document.documentElement.animate(
        { clipPath },
        { duration, easing: 'ease-in-out', fill: 'forwards', pseudoElement: '::view-transition-new(root)' },
      );
    }).catch(() => {});
  }, [duration, isDark, onThemeChange, cancelAnim]);

  return (
    <button type="button" ref={buttonRef} onClick={toggleTheme} className={className} aria-pressed={isDark} {...props}>
      {isDark ? <Sun aria-hidden size={20} /> : <Moon aria-hidden size={20} />}
      <span className="sr-only">{isDark ? 'Temă luminoasă' : 'Temă întunecată'}</span>
    </button>
  );
};
