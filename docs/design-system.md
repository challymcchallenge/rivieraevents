# Design system: Riviera Events

**Decizie GATE 4, 2026-10-28:**
- Site-ul are două teme: **luminoasă** (direcția A, „Grădina”) și **întunecată** (culorile din direcția B, „Seara”).
- Un comutator din header schimbă între ele. **Tema luminoasă e implicită.**
- Fonturile, spațiile și formele sunt aceleași în ambele teme. Tema schimbă doar culorile.

**Unde găsiți restul:**
- Machetă: [docs/design/mockups/acasa.html](design/mockups/acasa.html). Capturile sunt în același folder.
- Raționamentul și verificarea completă de contrast: [docs/design/directii.md](design/directii.md).
- În Faza 5, tokenii de aici intră în `src/app/globals.css`, în blocul Tailwind 4 `@theme` de mai jos. **Componentele nu folosesc culori hex direct, doar tokeni.**

---

## 1. Culori

### Tokeni semantici

| Token | Luminos (implicit) | Întunecat | Folosire |
|---|---|---|---|
| `--color-bg` | `#FFFEFA` | `#11100F` | fundalul paginii |
| `--color-surface` | `#F4EFE6` | `#1C1A18` | secțiuni alternante, „De ce Riviera”, testimoniale |
| `--color-surface-2` | `#EAE3D7` | `#262320` | carduri accentuate, calculator, CTA final (întunecat) |
| `--color-text` | `#1E1E1E` | `#FFFEFA` | text principal, titluri |
| `--color-muted` | `#5B544C` | `#BDB6AC` | text secundar, descrieri |
| `--color-accent` | `#FF3131` | `#FF3131` | roșul brandului. **Doar** pentru linii, puncte, iconițe decorative și fundal de buton cu text închis |
| `--color-accent-text` | `#B3121F` | `#FF5A57` | etichete și supratitluri roșii, linkuri active, inelul de focus |
| `--color-line` | `#DDD4C6` | `#34302B` | separatoare decorative (nu contururi de câmpuri) |
| `--color-field-border` | `#857C72` | `#7A7268` | conturul câmpurilor de formular (≥ 3:1) |
| `--color-field-bg` | `#FFFEFA` | `#11100F` | fundalul câmpurilor |
| `--color-btn` | `#1E1E1E` | `#FF3131` | buton principal |
| `--color-btn-text` | `#FFFEFA` | `#11100F` | text pe butonul principal |
| `--color-btn2-border` / `-text` | `#1E1E1E` | `#FFFEFA` | buton secundar (contur) |
| `--color-final-bg` | `#1E1E1E` | `#262320` | secțiunea „Vă verificăm data” |
| `--color-popup-bg` | `#FFFFFF` | `#1C1A18` | bula WhatsApp |

### Comune ambelor teme

| Token | Valoare | Folosire |
|---|---|---|
| `--color-wa` | `#25D366` | verdele oficial WhatsApp: butonul rotund și butonul din bulă |
| `--color-wa-text` | `#0B1F12` | text pe verde. **Nu text alb**, care are doar 1.98:1 |
| `--color-hero-text` | `#FFFEFA` | text peste fotografia din hero, în ambele teme |
| `--hero-overlay` | `linear-gradient(180deg, rgba(20,18,16,.35) 0%, rgba(20,18,16,.55) 35%, rgba(20,18,16,.82) 100%)` | gradient sub textul din hero |

### Reguli
- `#FF3131` **nu** se folosește ca text mic pe fundal deschis: are doar 3.63:1. Pentru etichete roșii se folosește `--color-accent-text`.
- Pe fundal `#FF3131` textul e mereu `#11100F` (5.19:1). **Niciodată alb** (3.63:1).
- În hero, în ambele teme, butonul principal e alb cu text negru în tema luminoasă și roșu cu text închis în tema întunecată.

### Contrast verificat (WCAG 2.2 AA, 2026-10-28)

| Pereche | Luminos | Întunecat |
|---|---|---|
| text / bg | 16.52:1 ✅ | 18.83:1 ✅ |
| muted / bg | 7.39:1 ✅ | 9.46:1 ✅ |
| muted / surface-2 | 5.85:1 ✅ | 7.78:1 ✅ |
| accent-text / bg | 6.88:1 ✅ | 6.20:1 ✅ |
| btn-text / btn | 16.52:1 ✅ | 5.19:1 ✅ |
| field-border / bg (UI, prag 3:1) | 4.06:1 ✅ | 4.01:1 ✅ |
| wa-text / wa | 8.69:1 ✅ | 8.69:1 ✅ |
| hero-text peste overlay, caz extrem (poză albă) | titlu ≥ 4.1:1, text mic ≥ 4.5:1 (calculat; de verificat în Lighthouse, Faza 6) | idem |

Butonul rotund WhatsApp e verde pe fundal deschis (1.97:1). E logo de brand, deci exceptat de la regula de contrast. Îl delimităm totuși cu o umbră (`drop-shadow`) și are etichetă accesibilă.

---

## 2. Tipografie

| Rol | Font | Greutăți | Mărime |
|---|---|---|---|
| Titluri (h1–h3, citate, sume) | **Cormorant** | 500, 600, 700 | h1 `clamp(40px, 9vw, 84px)`, h2 `clamp(32px, 6vw, 52px)`, h3 22–30px |
| Text, butoane, etichete | **Montserrat** | 400, 500, 600 | text 16px / 1.6; lead 18px; mic 13–14px (doar note și footer) |
| Supratitlu (eyebrow) | Montserrat 600 | | 12px, `letter-spacing: .18em`, majuscule |

- **Încărcare:** prin `next/font/google`, care descarcă fonturile la build și le servește de pe domeniul nostru. Browserul nu face nicio cerere spre Google, deci nu e nevoie de banner (ADR-005).
- **Subset `latin-ext`, obligatoriu** pentru ă, â, î, ș, ț. Font de rezervă: `Georgia, serif` pentru titluri și `system-ui, sans-serif` pentru text.
- Textul nu scade sub 13px. `line-height` 1.6 la text și 1.1 la titluri. Rândurile au maximum 56ch la text și 14ch la h1.

---

## 3. Spațiere, layout, forme

| Token | Valoare |
|---|---|
| `--space-1` … `--space-6` | 8, 16, 24, 40, 64, 96 px |
| Lățime conținut | max 1200px; margini laterale 16px pe mobil, 40px de la 1024px |
| Breakpoint principal | **1024px** (mobil-first; machetele verificate la 390 și 1440, fără derulare orizontală) |
| Breakpoint-uri de testat (Faza 6) | 360, 390, 768, 1280, 1920 |
| `--radius` | **2px** pentru butoane, câmpuri, poze (stil tipăritură). Excepții: bula WhatsApp 16px, butoanele WhatsApp complet rotunde |
| Proporții poze | carduri saloane 4:5, saloane Insulița 1:1, poze alăturate textului 4:3, hero pe tot ecranul (`88svh` mobil, `92vh` desktop) |
| Secțiuni | padding vertical 64px pe mobil, 96px pe desktop |

---

## 4. Componente

### Hero: slideshow (ADR-007)
- Între 1 și 10 slide-uri din `content/acasa-slideshow.json`, schimbate prin crossfade de 1 s la fiecare `intervalSecunde` (implicit 6 s). **Titlul, subtitlul și butoanele nu se schimbă.**
- Pe mobil se folosește `imagineMobil`, iar dacă lipsește, imaginea de desktop decupată după `punctFocal`.
- **Slide video:** `<video muted autoplay loop playsinline poster>`, fără controale, fără sunet. Pe telefon se folosește versiunea pentru mobil.
  - În locul video-ului se afișează doar posterul dacă vizitatorul are `prefers-reduced-motion`, `Save-Data` sau o conexiune 2G.
  - Video-ul nu se descarcă până nu urmează slide-ul lui.
- **Controale**, jos în stânga pe mobil și jos în dreapta pe desktop, deasupra gradientului:
  - butonul **Pauză/Redare**, 44×44px, cu `aria-label` și `aria-pressed`;
  - **puncte** de 8px, cu zonă de atingere de 24px, câte unul pe slide; punctul activ e alb plin, celelalte au opacitate 50%.
- Rotația se oprește la hover, la focus în hero și când tab-ul e ascuns. Cu `prefers-reduced-motion` nu pornește deloc.
- **Încărcare:** primul slide are `priority`. Următorul se preîncarcă doar după ce pagina e gata, iar restul doar când le vine rândul.
- Bula WhatsApp nu acoperă controalele: pe mobil apare abia după ce vizitatorul a derulat dincolo de hero.

### Header
- E transparent peste hero, cu text și logo deschise la culoare (`logo-3-transparent.svg`) în ambele teme.
- Pe desktop meniul are 6 linkuri: Saloane, Pachete, Meniuri, Tur virtual, Portofoliu, Contact. Pe mobil e un buton-hamburger de 44×44px.
- **Comutatorul de temă** e lângă meniu: buton de 44×44px, cu iconiță lună în tema luminoasă și soare în cea întunecată.
  - Atribute: `aria-label="Temă întunecată"` și `aria-pressed`.
  - Alegerea se salvează în `localStorage` (`riviera-tema`). E o preferință cerută de vizitator, nu un cookie, deci nu cere consimțământ.
  - Tema se aplică printr-un script mic în `<head>`, înainte de afișare, ca să nu apară o clipire la încărcare.
  - Fără preferință salvată, tema e luminoasă.

### Butoane
- **Principal:** fundal `--color-btn`, text `--color-btn-text`, înălțime minimă 48px, padding 0 24px, Montserrat 600 15px, iconiță WhatsApp de 20px (SVG, `aria-hidden`).
- **Secundar:** contur 1.5px, aceeași înălțime.
- **Un singur buton principal pe ecran.** Textele lor sunt în `content/pagini/*.mdx`, la câmpul `cta`.

### WhatsApp: buton rotund și bulă (după modelul biztech.ro)
- **Buton rotund:**
  - 60×60px, logo-ul oficial WhatsApp (`assets/brand/whatsapp-192.png`; în Faza 5 îl înlocuim cu SVG).
  - Fix în dreapta jos, la 16px pe mobil și 32px pe desktop. Umbră `drop-shadow(0 6px 14px rgba(0,0,0,.28))`.
  - `aria-label="Scrieți-ne pe WhatsApp"`.
- **Bula:**
  - Lățime `min(300px, 100vw - 32px)`, colțuri de 16px, umbră, butonul × de 36px în dreapta sus (`aria-label="Închide mesajul"`).
  - Text din `site.json` → `whatsapp.bula`. Buton verde „Deschideți WhatsApp”, cu text `--color-wa-text`.
- **Când apare bula:**
  - Abia după ce vizitatorul a derulat dincolo de hero, sau după 20 de secunde. Pe mobil nu trebuie să acopere butoanele din hero.
  - O singură dată pe sesiune. Închiderea se ține minte în `sessionStorage`.
  - Nu mută focusul. Apare cu fade de 200ms, sau fără animație la `prefers-reduced-motion`.
  - Nu apare pe `/contact`, unde formularul e principalul canal.
- **Mesajul WhatsApp:** ambele butoane deschid `https://wa.me/40746085555?text=…`, cu textul implicit și marcajul de sursă din `site.json`.

### Câmpuri (calculator, formular)
- Etichetă vizibilă deasupra câmpului (Montserrat 500 14px, `--color-muted`). Câmpul are înălțime minimă 48px, contur `--color-field-border` și fundal `--color-field-bg`.
- Erorile apar sub câmp, în `--color-accent-text`, cu text explicit, nu doar prin culoare.

### Carduri de salon
Poză 4:5, apoi numele (Cormorant 30px), capacitatea (eyebrow `--color-accent-text`) și o frază (`--color-muted`). Tot cardul e un link.

### Footer
- 4 coloane pe desktop, una sub alta pe mobil:
  - date de contact, cu logo-ul închis în tema luminoasă și cel deschis în cea întunecată;
  - Site;
  - Rețeaua ANNA (din `site.json`);
  - Urmăriți-ne.
- **Rândul legal, separat printr-o linie:**
  - Politica de confidențialitate, Politica de cookies, Termeni și condiții, ANPC, Soluționarea alternativă a litigiilor (SAL);
  - © an, firma, CUI, nr. Registrul Comerțului, sediu.
  - Linkurile sunt subliniate, cu înălțime minimă de 24px.

---

## 5. Mișcare
- Maximum **3–4 componente animate pe pagină** (Magic UI și ReactBits, Faza 5). Pe pagina principală, slideshow-ul din hero ocupă unul din aceste locuri.
- Apariția la derulare se face prin opacitate și o deplasare de 8–16px, în 300–400ms, `ease-out`. Hover-ul durează 150–250ms.
- `prefers-reduced-motion: reduce`: toate animațiile se opresc, iar conținutul apare direct în starea finală.
- Singurul carusel automat e slideshow-ul din hero, cu buton de pauză (ADR-007). În rest, fără carusele automate. Video-ul din hero respectă bugetul din ADR-007: mobil ≤ 4 MB, desktop ≤ 8 MB.
- **Fundal animat 3D:** `Silk` (ReactBits), decizie client 2026-10-28. Apare pe Acasă (secțiunea finală), Tur virtual, Contact și 404. Încărcarea e întârziată, se pune pe pauză când nu e pe ecran, are `dpr` maximum 1 pe mobil și, la `prefers-reduced-motion` sau `Save-Data`, rămâne un gradient static. Detalii în [design/animatii.md](design/animatii.md).
- **Pachet de animații:** Echilibrat ([design/animatii.md](design/animatii.md)).

---

## 6. Iconițe și imagini
- Iconițele sunt SVG cu linie de 2px, stil Lucide, fără emoji. Iconițele decorative au `aria-hidden`, iar butoanele care au doar iconiță au `aria-label`.
- Pozele se afișează doar prin `next/image`, cu `sizes` declarat și text alternativ din fișierele de conținut. Doar hero-ul are `priority`.
- Logo-uri în `assets/brand/`:
  - `logo-1-transparent.svg`: închis, pentru fundal deschis;
  - `logo-3-transparent.svg`: deschis, pentru fundal închis și pentru hero;
  - `whatsapp-192.png`.
- ☐ Lipsește un logo doar cu simbolul, pentru favicon.

---

## 7. Tailwind 4: blocul `@theme` (de copiat în Faza 5)

```css
@import "tailwindcss";

@theme {
  --color-bg: #FFFEFA;          --color-surface: #F4EFE6;     --color-surface-2: #EAE3D7;
  --color-text: #1E1E1E;        --color-muted: #5B544C;
  --color-accent: #FF3131;      --color-accent-text: #B3121F;
  --color-line: #DDD4C6;        --color-field-border: #857C72; --color-field-bg: #FFFEFA;
  --color-btn: #1E1E1E;         --color-btn-text: #FFFEFA;
  --color-final-bg: #1E1E1E;    --color-popup-bg: #FFFFFF;
  --color-wa: #25D366;          --color-wa-text: #0B1F12;     --color-hero-text: #FFFEFA;

  --font-heading: var(--font-cormorant), Georgia, serif;     /* next/font: variable: '--font-cormorant' */
  --font-body: var(--font-montserrat), system-ui, sans-serif;

  --radius-sm: 2px;  --radius-bubble: 16px;
  --breakpoint-lg: 64rem; /* 1024px */
}

[data-theme="dark"] {
  --color-bg: #11100F;          --color-surface: #1C1A18;     --color-surface-2: #262320;
  --color-text: #FFFEFA;        --color-muted: #BDB6AC;
  --color-accent-text: #FF5A57;
  --color-line: #34302B;        --color-field-border: #7A7268; --color-field-bg: #11100F;
  --color-btn: #FF3131;         --color-btn-text: #11100F;
  --color-final-bg: #262320;    --color-popup-bg: #1C1A18;
  color-scheme: dark;
}
```

Sintaxa `@theme` e cea din Tailwind 4.x. Versiunea 4.3.3 a fost verificată pe npm la 2026-10-28, iar redefinirea variabilelor sub `[data-theme="dark"]` se verifică la inițializare, în Faza 5.
