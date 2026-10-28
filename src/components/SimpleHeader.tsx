/** Antet fără poză (pagini legale): bandă închisă, ca headerul transparent cu text deschis să rămână lizibil în ambele teme. */
export default function SimpleHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-[#1E1E1E] pt-32 pb-12 text-hero-text dark:bg-surface lg:pt-40 lg:pb-16">
      <div className="wrap">
        <h1 className="max-w-[20ch] text-[clamp(36px,6vw,60px)]">{title}</h1>
        {subtitle && <p className="mt-3 max-w-[60ch] opacity-85">{subtitle}</p>}
      </div>
    </section>
  );
}
