'use client';

// Magic UI „number-ticker” (https://magicui.design/r/number-ticker.json), preluat prin MCP la 2026-10-28.
// Adaptări: format românesc (ro-RO, puncte la mii), culoare din tema site-ului, fără animație la prefers-reduced-motion.
import { useEffect, useRef, type ComponentPropsWithoutRef } from 'react';
import { useInView, useMotionValue, useReducedMotion, useSpring } from 'motion/react';

interface NumberTickerProps extends ComponentPropsWithoutRef<'span'> {
  value: number;
  startValue?: number;
  direction?: 'up' | 'down';
  delay?: number;
  decimalPlaces?: number;
}

const fmt = (n: number, d: number) => Intl.NumberFormat('ro-RO', { minimumFractionDigits: d, maximumFractionDigits: d }).format(Number(n.toFixed(d)));

export function NumberTicker({ value, startValue = 0, direction = 'up', delay = 0, className = '', decimalPlaces = 0, ...props }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const motionValue = useMotionValue(direction === 'down' ? value : startValue);
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: '0px' });

  useEffect(() => {
    if (reduce) { if (ref.current) ref.current.textContent = fmt(direction === 'down' ? startValue : value, decimalPlaces); return; }
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isInView) timer = setTimeout(() => motionValue.set(direction === 'down' ? startValue : value), delay * 1000);
    return () => { if (timer !== null) clearTimeout(timer); };
  }, [motionValue, isInView, delay, value, direction, startValue, reduce, decimalPlaces]);

  useEffect(() => springValue.on('change', (latest) => {
    if (ref.current) ref.current.textContent = fmt(latest, decimalPlaces);
  }), [springValue, decimalPlaces]);

  return <span ref={ref} className={`inline-block tabular-nums ${className}`} {...props}>{fmt(startValue, decimalPlaces)}</span>;
}
