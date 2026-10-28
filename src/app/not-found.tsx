import Link from 'next/link';
import SilkBackground from '@/components/SilkBackground';

export default function NotFound() {
  return (
    <section className="relative grid min-h-[80svh] place-items-center overflow-hidden">
      <SilkBackground />
      <div aria-hidden className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 to-transparent" />
      <div className="wrap relative text-center">
        <p className="eyebrow">Eroare 404</p>
        <h1 className="mx-auto mt-3 max-w-[16ch] text-[clamp(38px,7vw,64px)]">Pagina nu mai e aici</h1>
        <p className="mx-auto mt-4 max-w-[44ch] text-muted">Poate a fost mutată. Vă așteaptă în schimb saloanele de pe malul Jiului.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn">Pagina principală</Link>
          <Link href="/saloane" className="btn2">Saloanele</Link>
        </div>
      </div>
    </section>
  );
}
