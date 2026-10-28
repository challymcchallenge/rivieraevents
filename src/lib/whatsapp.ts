import site from '@content/site.json';

/**
 * Link wa.me cu mesaj precompletat. Mesajul se termină cu marcajul de sursă
 * „(trimis de pe rivieraevents.ro, {pagina})”, ca cererile de pe site să poată fi numărate manual (ADR-005).
 */
export function waLink(pagina: string, text?: string): string {
  const marcaj = site.whatsapp.marcajSursa.replace('{pagina}', pagina);
  const mesaj = `${text ?? site.whatsapp.textImplicit} ${marcaj}`;
  return `https://wa.me/${site.whatsapp.numar}?text=${encodeURIComponent(mesaj)}`;
}

export const telLink = (numar: string) => `tel:+4${numar.replace(/\s/g, '')}`;
