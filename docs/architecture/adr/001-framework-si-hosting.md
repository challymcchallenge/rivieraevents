# ADR-001: Next.js + Tailwind + Magic UI/ReactBits pe Vercel (Hobby, decis de client)

## Status
**Acceptat cu modificare** (GATE 2, 2026-10-28).
- **Clientul a ales planul Vercel Hobby (gratuit), permanent.** SOFI recomandase Pro.
- **Risc acceptat explicit de client:**
  - Hobby e limitat la „non-commercial personal use only”.
  - Vercel poate suspenda proiectul.
- **Atenuare:**
  - Trecerea pe Pro e doar o schimbare de plan în cont, fără modificări de cod.
  - Emailurile de la Vercel trebuie urmărite.
  - Restul deciziei (framework, Tailwind, componente, regiunea fra1) rămâne cum e mai jos.

## Context
- Avem un site de prezentare pentru o locație de evenimente, cu trafic mic, buget minim și o singură persoană care îl întreține (docs/brief.md).
- Majoritatea vizitatorilor vin de pe telefon. Ținta Lighthouse pe mobil e ≥ 90 la performanță și ≥ 95 la accesibilitate.
- Clientul a cerut ca una dintre opțiuni să fie obligatoriu Next.js + Tailwind + Magic UI/ReactBits pe Vercel, cu conținut în fișiere. Fazele 5–6 folosesc serverele MCP Magic UI și ReactBits, adică componente React.
- Contul și proiectul Vercel `rivieraevents` există deja, legate de GitHub.
- **Fapt verificat 2026-10-28:** planul Vercel Hobby e limitat la „non-commercial personal use only” ([fair use](https://vercel.com/docs/limits/fair-use-guidelines)). Site-ul e comercial, deci e nevoie de **Pro: $20/lună per loc de developer, cu $20 credit de utilizare inclus** ([pricing](https://vercel.com/pricing)).

## Decizie
- **Framework:** Next.js (App Router), cu paginile generate static.
- **Stil:** Tailwind CSS 4, cu tokenii din `docs/design-system.md` (Faza 4).
- **Componente animate:** doar cele returnate efectiv de serverele MCP Magic UI și ReactBits.
- **Hosting:** Vercel Pro, cu funcțiile în regiunea `fra1`.
- **Versiuni de pornire** (npm, verificate 2026-10-28): next 16.4.3, react 19.3.1, tailwindcss 4.3.3, motion 14.7.1. Se fixează în `package.json` la inițializare.

## Consecințe

### Pozitive
- Mediul nativ pentru Magic UI și ReactBits.
- Proiectul Vercel și legătura cu GitHub există deja. Primim deploy automat și preview pentru fiecare modificare.
- `next/image` optimizează imaginile fără niciun alt serviciu.
- Route Handlers pentru formular, în aceeași aplicație.

### Negative
- **~$20/lună** pentru Vercel Pro, față de $0 la Opțiunea B.
- Mai mult JavaScript trimis în browser decât la Astro. Performanța pe mobil cere disciplină: limită de animații și buget verificat în CI.
- Compatibilitatea Magic UI cu Next 16 / React 19 e **neverificată**. Pagina lor menționează Next.js 15. Se verifică prin MCP în Faza 5.

### Neutre
- Dependență medie de Vercel pentru optimizarea imaginilor și funcții. Exit în câteva zile `[estimare]`.

## Alternative considerate
- **Astro + insule React pe Cloudflare Pages Free (Opțiunea B):** costă $0–9/lună și are cea mai bună performanță implicită. Am respins-o ca recomandare pentru că e mai departe de cerința explicită a clientului. Formularul ar avea nevoie de un furnizor de email prin API (Resend, metadate în SUA), iar uzul comercial pe planul gratuit e **neverificat**. Rămâne alternativa principală dacă bugetul de $0 e strict.
- **Next.js cu export static pe un hosting gratuit:** respinsă. `next/image` nu funcționează la export static fără un loader extern, iar Route Handlers nu sunt disponibile ([docs](https://nextjs.org/docs/app/guides/static-exports), verificat 2026-10-28).
- **Vercel Hobby:** respinsă, pentru că nu se permite uz comercial.

## Referințe
- https://vercel.com/docs/limits/fair-use-guidelines
- https://vercel.com/pricing
- https://nextjs.org/docs/app/guides/static-exports
- docs/architecture/architecture.md §2–3
