import Prose from '@/components/Prose';
import SoftBackground from '@/components/SoftBackground';
import WaIcon from '@/components/WaIcon';
import { waLink } from '@/lib/whatsapp';

/**
 * Blocul final „SAVE THE DATE” (cererea clientului, 2026-10-29): verificarea datei pe WhatsApp.
 * Pe Acasă e generic; pe pagina unui salon, mesajul de WhatsApp numește salonul.
 */
export default function SaveTheDate({ text, pagina, salon }: { text: string; pagina: string; salon?: string }) {
  // Marcajul sursei se adaugă la final de waLink, deci vizitatorul scrie data sub mesaj.
  const wa = waLink(pagina, salon
    ? `Bună ziua! Aș dori să verific dacă salonul ${salon} e liber. Vă scriu mai jos data și numărul de invitați.`
    : 'Bună ziua! Aș dori să verific dacă data noastră e liberă. Vă scriu mai jos data, tipul evenimentului și numărul de invitați.');
  return (
    <section className="relative overflow-hidden">
      <SoftBackground />
      <div className="wrap relative py-24 text-center lg:py-32">
        <div className="mx-auto max-w-[620px] rounded-img bg-bg/70 px-6 py-10 backdrop-blur-sm lg:px-12">
          <h2 lang="en" className="h2 tracking-[.08em] uppercase">Save the date</h2>
          <Prose text={text} className="mx-auto mt-4 [&_p]:mx-auto" />
          <a href={wa} target="_blank" rel="noopener noreferrer" className="btn mt-2"><WaIcon />Verificați data pe WhatsApp</a>
        </div>
      </div>
    </section>
  );
}
