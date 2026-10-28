# Faza 4: două direcții de design pentru pagina principală

Data: 2026-10-28. Instrument: skill-ul **UI-UX-pro-max** (`search.py --design-system` și `--domain typography`).
Machetele HTML sunt în [mockups/](mockups/); capturile JPG se văd direct pe GitHub. Direcția aleasă la GATE 4 se scrie ca tokeni în `docs/design-system.md`.

## Ce am luat din skill și ce am schimbat

| Rezultat skill | Folosit? | Motiv |
|---|---|---|
| Pattern „Hero + Testimonials + CTA”, CTA în hero și după testimoniale | ✅ | Se potrivește cu conversia pe WhatsApp |
| Stil „Minimalism & Swiss” (direcția A, dial variance 3, density 3) | ✅ adaptat | Mult spațiu alb, grilă clară, pozele duc pagina |
| Paleta „Romantic pink + gold” (#DB2777) | ❌ | Nu e paleta brandului. Am construit paletele pe culorile logo-ului: negru, roșu #FF3131, alb cald #FFFEFA |
| Fonturi Great Vibes + Cormorant Infant | ❌ | Fontul script e greu de citit pe mobil |
| Pereche „Luxury Serif”: Cormorant + Montserrat | ✅ direcția A | Elegantă, are diacritice românești (latin-ext) |
| Pereche „Classic Elegant”: Playfair Display + Inter | ✅ direcția B | Contrast mare, citibilă pe fundal închis, latin-ext |
| Stil „Liquid Glass”, paleta navy (a doua interogare) | ❌ | Gândit pentru interfețe Apple. Nu se potrivește unei locații de evenimente |
| Checklist: contrast 4.5:1, focus vizibil, `prefers-reduced-motion`, ținte de 44 px, fără emoji ca iconițe | ✅ | Aplicat în machete și în verificarea de mai jos |

## Direcția A: Grădina, în lumina zilei

- **Ideea:** Riviera ca loc luminos, pe malul Jiului. Pagina e albă și caldă, ca o invitație, iar fotografiile cu grădina fac diferența.
- **Hero:** grădina văzută de sus, pregătită pentru ceremonie (`complex-riviera-015`).
- **Culori:** alb cald `#FFFEFA`, nisip `#F4EFE6` / `#EAE3D7`, text `#1E1E1E`, text secundar `#5B544C`. Roșul de brand `#FF3131` apare doar în linii și elemente grafice. Etichetele roșii folosesc `#B3121F`, care trece testul de contrast.
- **Butoane:** negre, cu text alb, și colțuri aproape drepte (2 px), ca o tipăritură elegantă.
- **Fonturi:** Cormorant 600 pentru titluri, Montserrat 400–600 pentru text.
- **Machete:** [mobil](mockups/a-gradina-mobil.jpg), [desktop](mockups/a-gradina-desktop.jpg).

## Direcția B: Seara la Riviera

- **Ideea:** atmosfera de seară, cu luminile, candelabrul din Rosa și apusul. Fundalul e cărbune cald, iar butoanele sunt în roșul brandului.
- **Hero:** salonul Rosa, cu candelabrul floral și pereții de sticlă (`rosa-001`).
- **Culori:** fundal `#11100F`, suprafețe `#1C1A18` / `#262320`, text `#FFFEFA`, text secundar `#BDB6AC`. Butoanele sunt roșu `#FF3131` cu text închis, iar etichetele roșii folosesc `#FF5A57`.
- **Forme:** butoane rotunjite complet, poze cu colțuri de 16–24 px.
- **Fonturi:** Playfair Display 600 pentru titluri, Inter 400–600 pentru text.
- **Machete:** [mobil](mockups/b-seara-mobil.jpg), [desktop](mockups/b-seara-desktop.jpg).

## Comune ambelor direcții

- Aceeași structură și aceleași texte din `content/pagini/acasa.mdx`. Diferă doar stilul vizual.
- Sunt gândite întâi pentru mobil. Punctul de schimbare spre desktop e la 1024 px. La 390 px și la 1440 px nu există derulare orizontală (măsurat în captură).
- Butonul WhatsApp e fix: pe mobil ocupă toată lățimea, jos, iar pe desktop e în colțul din dreapta jos. În capturile full-page apare la marginea primului ecran, peste un titlu. Pe telefon el doar plutește peste conținut în timp ce derulați.
- Ținte de atingere de minimum 48 px, etichete vizibile la câmpurile calculatorului și iconițe SVG, fără emoji.
- **Fonturile** se vor încărca în Faza 5 prin `next/font`, de pe serverul nostru. Machetele le iau de pe Google Fonts doar pentru previzualizare. Încărcarea directă de la Google ar trimite IP-ul vizitatorului în SUA (ADR-005: fără banner de cookies).
- **Animații:** maximum o apariție lină la derulare (opacitate și 8–16 px). Animațiile se opresc dacă telefonul are setat `prefers-reduced-motion`.

## Verificare contrast (WCAG 2.2 AA)

Formula WCAG pentru luminanța relativă, calculată pe 2026-10-28.

### Direcția A

| Pereche | Culori | Raport | Prag | Rezultat |
|---|---|---|---|---|
| Text pe fundal | `#1E1E1E` pe `#FFFEFA` | 16.52:1 | 4.5:1 | ✅ |
| Text pe suprafață | `#1E1E1E` pe `#F4EFE6` | 14.56:1 | 4.5:1 | ✅ |
| Text secundar pe fundal | `#5B544C` pe `#FFFEFA` | 7.39:1 | 4.5:1 | ✅ |
| Text secundar pe suprafață 2 | `#5B544C` pe `#EAE3D7` | 5.85:1 | 4.5:1 | ✅ |
| Etichete roșii | `#B3121F` pe `#FFFEFA` | 6.88:1 | 4.5:1 | ✅ |
| Etichete roșii pe suprafață | `#B3121F` pe `#F4EFE6` | 6.07:1 | 4.5:1 | ✅ |
| Buton principal | `#FFFEFA` pe `#1E1E1E` | 16.52:1 | 4.5:1 | ✅ |
| Conturul câmpurilor (corectat) | `#857C72` pe `#FFFEFA` / `#EAE3D7` | 4.06:1 / 3.21:1 | 3:1 | ✅ |
| Roșu de brand ca element grafic | `#FF3131` pe `#FFFEFA` | 3.63:1 | 3:1 | ✅ |
| Roșu de brand ca text mic | `#FF3131` pe `#FFFEFA` | 3.63:1 | 4.5:1 | ❌ nu se folosește așa |

### Direcția B

| Pereche | Culori | Raport | Prag | Rezultat |
|---|---|---|---|---|
| Text pe fundal | `#FFFEFA` pe `#11100F` | 18.83:1 | 4.5:1 | ✅ |
| Text pe suprafață 2 | `#FFFEFA` pe `#262320` | 15.49:1 | 4.5:1 | ✅ |
| Text secundar pe fundal | `#BDB6AC` pe `#11100F` | 9.46:1 | 4.5:1 | ✅ |
| Text secundar pe suprafață 2 | `#BDB6AC` pe `#262320` | 7.78:1 | 4.5:1 | ✅ |
| Etichete roșii | `#FF5A57` pe `#11100F` | 6.20:1 | 4.5:1 | ✅ |
| Etichete roșii pe suprafață 2 | `#FF5A57` pe `#262320` | 5.10:1 | 4.5:1 | ✅ |
| Buton principal (text închis pe roșu) | `#11100F` pe `#FF3131` | 5.19:1 | 4.5:1 | ✅ |
| Conturul câmpurilor (corectat) | `#7A7268` pe `#11100F` / `#262320` | 4.01:1 / 3.30:1 | 3:1 | ✅ |
| Text alb pe roșu de brand | `#FFFEFA` pe `#FF3131` | 3.63:1 | 4.5:1 | ❌ nu se folosește așa |

**Corecturi făcute după verificare:**
- Conturul câmpurilor din calculator avea doar 1.45:1 în A și 1.19:1 în B. L-am închis la culoare până a trecut de 3:1.
- Textul din hero stă peste fotografie, deci contrastul depinde de poză. Am întunecat gradientul în zona textului: minimum 55% de la titlu în jos și 82–88% la bază.
  - În cel mai rău caz, o poză albă, titlul are ~4.1:1, peste pragul de 3:1 pentru text mare.
  - Textul mic, din jumătatea de jos, are peste 4.5:1.
  - Valorile sunt calculate. Verificarea pe pozele reale se face cu Lighthouse în Faza 6.

## Recomandare: direcția A

1. **Diferențiere față de annaevents.ro și de catalogul ANNA.** Grupul folosește deja negru și roșu închis. Riviera iese în evidență prin luminozitate. Asta ajută și la SEO-ul celor două site-uri, care nu trebuie să pară același site.
2. **Argumentul nr. 1 din brief e grădina de pe malul Jiului.** Cele mai bune poze ale Riviera sunt de zi, în grădină, și arată mai bine pe fundal deschis.
3. **Pe telefon, în plin soare,** fundalul deschis se citește mai ușor.

**Ce pierde A față de B:** butonul principal e negru, nu roșu, deci iese mai puțin în evidență. Dacă vreți roșul pe buton, se poate în A cu text închis: `#11100F` pe `#FF3131`, 5.19:1. Doar că pe fundal alb un buton roșu aprins arată mai „comercial”.

## Întrebări pentru GATE 4

1. A, B sau un amestec (de exemplu A cu butoane roșii)?
2. Fontul pentru titluri: Cormorant (mai fin, de invitație) sau Playfair Display (mai puternic)?
3. Logo-ul în header: varianta „RIVIERA” din SVG-urile primite. Există și o variantă doar cu simbolul, pentru favicon?
