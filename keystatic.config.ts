import { collection, config, fields, singleton } from '@keystatic/core';

// Panoul de administrare (ADR-002, ADR-007): pozele (slideshow, saloane, pachete, pagini), tururile, portofoliul
// și, din 2026-10-29, meniurile întregi (texte + poze), la cererea clientului.
// Textele, meniurile și bugetul rămân în content/*.json și content/pagini/*.mdx.
// Schemele au exact forma fișierelor din content/media/ și content/portofoliu/: Keystatic refuză cheile nedeclarate.
//
// Stocare: local în dezvoltare; Keystatic Cloud în producție, când există NEXT_PUBLIC_KEYSTATIC_PROJECT (format „echipa/proiect”).
const project = process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT as `${string}/${string}` | undefined;

const SALOANE = [
  { label: 'Rosa', value: 'rosa' }, { label: 'Noblesse', value: 'noblesse' }, { label: 'Premiere', value: 'premiere' },
  { label: 'Grande', value: 'grande' }, { label: 'Ronda', value: 'ronda' }, { label: 'Magic', value: 'magic' }, { label: 'Estuar', value: 'estuar' },
];
const COMPLEX = [{ label: 'Riviera', value: 'riviera' }, { label: 'ANNA Events, Insulița', value: 'insulita' }];
const ALT = 'Descrieți ce se vede în poză (pentru cititoarele de ecran și Google).';
const FELURI = [
  { label: 'Starter', value: 'starter' }, { label: 'Starter cald', value: 'starter-cald' },
  { label: 'Tradițional', value: 'traditional' }, { label: 'Fel principal', value: 'main' },
] as const;
const felLabel = (v: string) => FELURI.find((x) => x.value === v)?.label ?? v;

// O poză de pagină: fișierul (în public/images/pagini) și textul alternativ.
const poza = (label: string, description?: string) => fields.object({
  src: fields.image({ label: 'Poză', directory: 'public/images/pagini', publicPath: '/images/pagini/', validation: { isRequired: true } }),
  alt: fields.text({ label: 'Text alternativ', description: ALT }),
}, { label, description });

export default config({
  storage: project ? { kind: 'cloud' } : { kind: 'local' },
  ...(project ? { cloud: { project } } : {}),
  ui: {
    brand: { name: 'Riviera Events' },
    navigation: { 'Pagina principală': ['slideshow'], Saloane: ['saloane', 'tururi'], Pachete: ['pachete'], Meniuri: ['meniuri'], Pagini: ['pagini'], Portofoliu: ['portofoliu'] },
  },
  singletons: {
    slideshow: singleton({
      label: 'Slideshow pagina principală',
      path: 'content/media/slideshow',
      format: { data: 'json' },
      schema: {
        intervalSecunde: fields.integer({ label: 'Secunde pe slide', description: 'Între 4 și 10.', defaultValue: 6, validation: { min: 4, max: 10 } }),
        slideuri: fields.array(
          fields.conditional(
            fields.select({ label: 'Tip slide', options: [{ label: 'Imagine', value: 'imagine' }, { label: 'Video', value: 'video' }], defaultValue: 'imagine' }),
            {
              imagine: fields.object({
                imagine: fields.image({ label: 'Imagine (orizontală, min. 1920 px)', directory: 'public/images/hero', publicPath: '/images/hero/', validation: { isRequired: true } }),
                imagineMobil: fields.image({ label: 'Imagine pentru telefon (verticală, opțional)', directory: 'public/images/hero', publicPath: '/images/hero/' }),
                punctFocal: fields.text({ label: 'Punct focal pe telefon', description: 'Ex. „50% 50%” = centru; „50% 30%” = mai sus. Folosit doar fără imagine pentru telefon.', defaultValue: '50% 50%' }),
                alt: fields.text({ label: 'Text alternativ', description: ALT, validation: { length: { min: 5 } } }),
              }),
              video: fields.object({
                desktop: fields.file({ label: 'Video desktop (MP4 H.264, 16:9, max. 8 MB)', directory: 'public/media/hero', publicPath: '/media/hero/', validation: { isRequired: true } }),
                mobil: fields.file({ label: 'Video telefon (MP4, 9:16 sau 4:5, max. 4 MB, opțional)', directory: 'public/media/hero', publicPath: '/media/hero/' }),
                poster: fields.image({ label: 'Poster (primul cadru)', directory: 'public/images/hero', publicPath: '/images/hero/', validation: { isRequired: true } }),
                alt: fields.text({ label: 'Text alternativ', description: ALT, validation: { length: { min: 5 } } }),
              }),
            },
          ),
          {
            label: 'Slide-uri (1–10)',
            description: 'Primul slide e cel mai important: îl văd toți vizitatorii. Trageți pentru a schimba ordinea.',
            itemLabel: (p) => `${p.discriminant === 'video' ? 'Video' : 'Imagine'}: ${(p.value.fields as { alt: { value: string } }).alt.value || 'fără descriere'}`,
            validation: { length: { min: 1, max: 10 } },
          },
        ),
      },
    }),
    tururi: singleton({
      label: 'Tururi virtuale 360',
      path: 'content/media/tururi',
      format: { data: 'json' },
      schema: {
        tururi: fields.array(
          fields.object({
            id: fields.text({ label: 'Identificator', description: 'Slug-ul salonului (ex. rosa) sau apartament-rosa. Fără spații.' }),
            titlu: fields.text({ label: 'Titlu' }),
            complex: fields.select({ label: 'Complex', options: COMPLEX, defaultValue: 'riviera' }),
            url: fields.text({ label: 'Link tur (annaevents.ro)', description: 'Gol = turul nu apare pe site.' }),
          }),
          { label: 'Tururi', itemLabel: (p) => p.fields.titlu.value || 'Tur nou' },
        ),
      },
    }),
    pagini: singleton({
      label: 'Poze pagini',
      path: 'content/media/pagini',
      format: { data: 'json' },
      schema: {
        saloane: poza('Saloane: poza de sus'),
        pachete: poza('Pachete: poza de sus'),
        meniuri: poza('Meniuri: poza de sus'),
        estimareBuget: poza('Estimare buget: poza de sus'),
        portofoliu: poza('Portofoliu: poza de sus'),
        despre: poza('Despre noi: poza de sus'),
        contact: poza('Contact: poza de sus'),
        turVirtual: poza('Tur virtual: poza de sus'),
        acasaBuget: poza('Pagina principală: poza de lângă „Cât costă”'),
        tort: poza('Tortul mirilor', 'Apare pe paginile Pachete și Meniuri.'),
        apartament: fields.array(
          fields.object({
            src: fields.image({ label: 'Poză', directory: 'public/images/pagini', publicPath: '/images/pagini/', validation: { isRequired: true } }),
            alt: fields.text({ label: 'Text alternativ', description: ALT }),
          }),
          { label: 'Apartamentul mirilor (pagina Pachete)', description: 'Prima poză e cea mare. Recomandat 5 poze.', itemLabel: (p) => p.fields.alt.value || 'Poză', validation: { length: { min: 1, max: 9 } } },
        ),
      },
    }),
  },
  collections: {
    meniuri: collection({
      label: 'Meniuri',
      path: 'content/meniuri/*',
      slugField: 'nume',
      format: { data: 'json' },
      schema: {
        nume: fields.slug({ name: { label: 'Numele meniului', description: 'Ex. Gold. Slug-ul (adresa) nu se schimbă după publicare.' } }),
        ordine: fields.integer({ label: 'Ordinea pe pagină', description: '1 = primul tab.', defaultValue: 1, validation: { min: 1, max: 20 } }),
        descriereScurta: fields.text({ label: 'Descriere scurtă', description: 'O frază, sub numele meniului. Fără prețuri.', multiline: true }),
        feluri: fields.array(
          fields.object({
            fel: fields.select({ label: 'Fel', options: FELURI, defaultValue: 'starter' }),
            descriere: fields.text({ label: 'Descriere', description: 'Fără numele preparatelor (decizia clientului).', multiline: true }),
            imagine: fields.image({ label: 'Poza de pe cardul felului', directory: 'public/images/meniuri', publicPath: '/images/meniuri/' }),
          }),
          { label: 'Felurile meniului', itemLabel: (p) => felLabel(p.fields.fel.value), validation: { length: { min: 1, max: 8 } } },
        ),
        galerie: fields.array(
          fields.object({
            src: fields.image({ label: 'Poză', directory: 'public/images/meniuri', publicPath: '/images/meniuri/', validation: { isRequired: true } }),
            fel: fields.select({ label: 'Felul din poză', description: 'Pe site, pozele se grupează după fel.', options: FELURI, defaultValue: 'starter' }),
            alt: fields.text({ label: 'Text alternativ', description: ALT }),
          }),
          { label: 'Galerie (toate pozele meniului)', itemLabel: (p) => `${felLabel(p.fields.fel.value)}: ${p.fields.alt.value || 'poză'}`, validation: { length: { max: 60 } } },
        ),
      },
    }),
    pachete: collection({
      label: 'Poze pachete',
      path: 'content/media/pachete/*',
      slugField: 'pachet',
      format: { data: 'json' },
      schema: {
        pachet: fields.slug({ name: { label: 'Pachet', description: 'Numele pachetului. Nu îl schimbați: leagă pozele de textul pachetului.' } }),
        imaginePrincipala: fields.object({
          src: fields.image({ label: 'Imaginea principală', directory: 'public/images/pachete', publicPath: '/images/pachete/', validation: { isRequired: true } }),
          alt: fields.text({ label: 'Text alternativ', description: ALT }),
        }, { label: 'Imaginea principală (card și antet)' }),
        galerie: fields.array(
          fields.object({
            src: fields.image({ label: 'Poză', directory: 'public/images/pachete', publicPath: '/images/pachete/', validation: { isRequired: true } }),
            alt: fields.text({ label: 'Text alternativ', description: ALT }),
          }),
          { label: 'Galerie (maximum 15 poze)', itemLabel: (p) => p.fields.alt.value || 'Poză', validation: { length: { max: 15 } } },
        ),
      },
    }),
    saloane: collection({
      label: 'Poze saloane',
      path: 'content/media/saloane/*',
      slugField: 'salon',
      format: { data: 'json' },
      schema: {
        salon: fields.slug({ name: { label: 'Salon', description: 'Numele salonului. Nu îl schimbați: leagă pozele de textul salonului.' } }),
        imaginePrincipala: fields.object({
          src: fields.image({ label: 'Imaginea principală', directory: 'public/images/saloane', publicPath: '/images/saloane/', validation: { isRequired: true } }),
          alt: fields.text({ label: 'Text alternativ', description: ALT }),
        }, { label: 'Imaginea principală (card și antet)' }),
        galerie: fields.array(
          fields.object({
            src: fields.image({ label: 'Poză', directory: 'public/images/saloane', publicPath: '/images/saloane/', validation: { isRequired: true } }),
            alt: fields.text({ label: 'Text alternativ', description: ALT }),
          }),
          { label: 'Galerie (recomandat 10–15 poze)', itemLabel: (p) => p.fields.alt.value || 'Poză' },
        ),
        tur360: fields.text({ label: 'Link tur virtual al salonului' }),
        turApartament: fields.text({ label: 'Link tur virtual al apartamentului mirilor (doar Riviera)' }),
      },
    }),
    portofoliu: collection({
      label: 'Portofoliu',
      path: 'content/portofoliu/*',
      slugField: 'titlu',
      format: { data: 'json' },
      schema: {
        titlu: fields.slug({ name: { label: 'Titlu', description: 'Fără numele mirilor, ex. „Ceremonie pe piscină”.' } }),
        tip: fields.select({ label: 'Tip eveniment', options: [{ label: 'Nuntă', value: 'nunta' }, { label: 'Botez', value: 'botez' }, { label: 'Eveniment de firmă', value: 'corporate' }, { label: 'Alt eveniment', value: 'alt' }], defaultValue: 'nunta' }),
        complex: fields.select({ label: 'Complex', options: COMPLEX, defaultValue: 'riviera' }),
        salon: fields.select({ label: 'Salon', options: [{ label: 'Nu se știe / nu contează', value: 'necunoscut' }, ...SALOANE], defaultValue: 'necunoscut' }),
        data: fields.text({ label: 'Luna evenimentului', description: 'Format AAAA-LL, ex. 2025-08. Gol dacă nu se știe.' }),
        descriere: fields.text({ label: 'Descriere (1–2 fraze)', multiline: true }),
        poze: fields.array(
          fields.object({
            src: fields.image({ label: 'Poză', directory: 'public/images/portofoliu', publicPath: '/images/portofoliu/', validation: { isRequired: true } }),
            alt: fields.text({ label: 'Text alternativ', description: ALT }),
          }),
          { label: 'Poze (4–6)', itemLabel: (p) => p.fields.alt.value || 'Poză', validation: { length: { min: 1, max: 12 } } },
        ),
        acordClient: fields.checkbox({ label: 'Clienții și-au dat acordul de publicare', description: 'Fără bifă, evenimentul NU apare pe site.', defaultValue: false }),
      },
    }),
  },
});
