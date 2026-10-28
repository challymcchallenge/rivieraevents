'use client';

// Magic UI „scroll-progress” (https://magicui.design/r/scroll-progress.json), preluat prin MCP la 2026-10-28.
// Adaptare: culoarea în roșul brandului (în loc de gradientul mov–roz), înălțime 2px, fără `cn`.
import { motion, useScroll } from 'motion/react';

export function ScrollProgress({ className = '' }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div aria-hidden className={`fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-accent ${className}`} style={{ scaleX: scrollYProgress }} />
  );
}
