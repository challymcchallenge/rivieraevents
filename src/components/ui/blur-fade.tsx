'use client';

// Magic UI „blur-fade” (https://magicui.design/r/blur-fade.json), preluat prin MCP la 2026-10-28.
// Modificat 2026-10-29, după ce pe iPhone/iPad lipseau secțiuni:
// - fără `filter: blur()`: WebKit păstra un strat grafic separat pentru fiecare secțiune apărută (filter: blur(0px)
//   rămânea pe element), iar pe iOS memoria de straturi se termina și unele secțiuni nu se mai desenau;
// - conținutul vine VIZIBIL din server: ascundem doar ce e sub ecran, după ce rulează JavaScript, și îl arătăm
//   la derulare. Dacă animația nu pornește (JS blocat, eroare), secțiunea rămâne vizibilă.
// - respectă prefers-reduced-motion.
import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion, type MotionProps, type UseInViewOptions, type Variants } from 'motion/react';

type MarginType = UseInViewOptions['margin'];

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  inView?: boolean;
  inViewMargin?: MarginType;
}

export function BlurFade({
  children, className, duration = 0.4, delay = 0, offset = 12, direction = 'up',
  inView = true, inViewMargin = '-50px', ...props
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, margin: inViewMargin });
  // false pe server și la prima afișare: secțiunea e vizibilă fără JavaScript
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    if (reduce || !inView || !ref.current) return;
    if (ref.current.getBoundingClientRect().top > window.innerHeight) setArmed(true);
  }, [reduce, inView]);

  const from = direction === 'right' || direction === 'down' ? -offset : offset;
  const horizontal = direction === 'left' || direction === 'right';
  const show = { delay: 0.04 + delay, duration, ease: 'easeOut' as const };
  const variants: Variants = {
    // ascunderea e instantanee (secțiunea e sub ecran), apariția e animată
    hidden: horizontal ? { x: from, opacity: 0, transition: { duration: 0 } } : { y: from, opacity: 0, transition: { duration: 0 } },
    visible: horizontal ? { x: 0, opacity: 1, transition: show } : { y: 0, opacity: 1, transition: show },
  };

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div ref={ref} initial={false} animate={!armed || seen ? 'visible' : 'hidden'} variants={variants} className={className} {...props}>
      {children}
    </motion.div>
  );
}
