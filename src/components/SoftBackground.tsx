/**
 * Fundal decorativ static (gradient în culorile temei). A înlocuit fundalul 3D Silk la cererea clientului,
 * pentru viteză (2026-10-29): fără WebGL și fără JavaScript.
 */
export default function SoftBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0"
      style={{ background: 'radial-gradient(120% 90% at 30% 20%, var(--color-surface) 0%, var(--color-surface-2) 70%)' }} />
  );
}
