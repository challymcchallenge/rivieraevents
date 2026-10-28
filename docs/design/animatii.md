# Animații și interactivitate: opțiuni

> **Decizie client (2026-10-28):** pachetul **Echilibrat** + **fundaluri animate 3D**. Varianta aleasă e descrisă în secțiunea „Fundal animat 3D: Silk” de la final. Am semnalat riscul de performanță pe mobil, iar măsurile de protecție sunt obligatorii.

Data: 2026-10-28.
- **Surse:** catalogul **Magic UI** (MCP `magicuidesign`, 78 de componente) și **ReactBits** (MCP `reactbits`, varianta TypeScript + Tailwind). Numele componentelor de mai jos sunt exact cele returnate de cele două servere MCP.
- Dependențele marcate „confirmat” vin din registry-ul Magic UI. Cele marcate „de confirmat” se verifică la instalare, în Faza 5.

## Reguli de la care pornim

1. **Maximum 3–4 componente animate pe pagină.** E regula proiectului de la început. Pe pagina principală, slideshow-ul din hero ocupă deja un loc (ADR-007).
2. **`prefers-reduced-motion`:** cine are animațiile oprite din telefon vede conținutul direct, fără mișcare.
3. **Lighthouse pe mobil ≥ 90** (Faza 6). Fără efecte grele WebGL sau canvas care rulează continuu.
4. **Pe telefon nu există hover.** Interacțiunile importante merg prin atingere, glisare și derulare. Efectele de hover sunt doar un bonus pe desktop.
5. **Titlul principal (H1) nu pornește invizibil.** Altfel ar întârzia LCP, adică momentul în care pagina pare încărcată.
6. **Stilul rămâne elegant**, de invitație. Fără efecte „tech”: glitch, ASCII, neon.

## Meniu de opțiuni

| # | Ce vede vizitatorul | Componentă (sursă) | Unde | Mobil | Cost | Dependențe |
|---|---|---|---|---|---|---|
| 1 | Secțiunile apar lin, cu o ușoară estompare, când derulați | `blur-fade` (Magic UI) | toate paginile | ✅ | mic | `motion`, confirmat (e deja în stack) |
| 2 | Cifre care cresc: „35 de ani · 7 saloane · 800 de invitați · 10 baruri” | `number-ticker` (Magic UI) | Acasă, Despre | ✅ | mic | `motion`, confirmat |
| 3 | Comutatorul de temă dezvăluie noua temă printr-un cerc care se extinde | `animated-theme-toggler` (Magic UI) | header | ✅ | foarte mic | `lucide-react`, confirmat. Pe browserele fără View Transitions, tema se schimbă instant |
| 4 | Buton „Vedeți clipul”: clipul complet, cu sunet, într-o fereastră peste pagină | `hero-video-dialog` (Magic UI) | Acasă, Despre | ✅ | mic; video-ul se încarcă la click | `motion`, confirmat. Clipul pe YouTube nocookie, încărcat la click (ADR-004) |
| 5 | Calculator de buget în 3 pași | `Stepper` (ReactBits) | Estimare buget | ✅ | mediu | de confirmat (importă iconițe `@hugeicons`, le înlocuim cu `lucide`) |
| 6 | Glisor elastic pentru numărul de invitați, cu suma care se actualizează pe loc | `Elastic Slider` (ReactBits) + `number-ticker` | Estimare buget | ✅ | mic | de confirmat |
| 7 | Confetti o singură dată, când apare estimarea sau după trimiterea formularului | `confetti` (Magic UI) | Estimare buget, Contact | ✅ | mic, doar la eveniment | `canvas-confetti`, confirmat |
| 8 | Testimoniale ca un teanc de carduri pe care le glisați cu degetul | `Stack` (ReactBits) | Acasă (mobil) | ✅ | mic | `motion`, confirmat din codul sursă |
| 9 | Testimoniale care derulează încet, pe orizontală | `marquee` (Magic UI) | Acasă (desktop) | — | mic | necesită buton de pauză (WCAG 2.2.2) |
| 10 | Galerie de poze în coloane, cu apariție animată, care se deschide pe tot ecranul | `Masonry` (ReactBits) + lightbox | pagina salonului, Portofoliu | ✅ | mediu | de confirmat |
| 11 | Lupă pe poze: vedeți detaliile decorului | `lens` (Magic UI) | pagina salonului | — (doar desktop) | mic | `motion`, confirmat |
| 12 | Cardurile saloanelor se înclină 3D după mouse | `Tilted Card` (ReactBits) | Saloane | — (doar desktop) | mic | de confirmat |
| 13 | Saloanele se rearanjează animat când alegeți numărul de invitați | animație de layout cu `motion`, fără componentă de catalog | Saloane | ✅ | mic | `motion` |
| 14 | Bară subțire de progres la derulare | `scroll-progress` (Magic UI) | Meniuri, politici | ✅ | foarte mic | de confirmat |
| 15 | Tab-urile de meniu cu linie animată și conținut care apare lin | `motion`, fără componentă de catalog | Meniuri | ✅ | mic | `motion` |

### Nu recomandăm
| Ce | De ce |
|---|---|
| Fundaluri WebGL (`Aurora`, `Silk`, `Galaxy`, `Particles`, `Light Rays`…) | Consumă bateria și procesorul pe telefon și scad scorul Lighthouse. Nu se potrivesc unei locații elegante. |
| Efecte de cursor (`Splash Cursor`, `Blob Cursor`, `Target Cursor`, `smooth-cursor`) | Merg doar pe desktop și distrag atenția de la poze. |
| Text glitch, ASCII, decriptat (`Glitch Text`, `ASCII Text`, `Decrypted Text`, `hyper-text`) | Stil „tech”, nepotrivit pentru nunți. |
| Galerii 3D (`Circular Gallery`, `Rolling Gallery`, `Flying Posters`) | Sunt grele și greu de folosit cu tastatura. Pozele se văd mai prost decât într-o galerie simplă. |
| `Split Text` pe titlul principal | Întârzie apariția titlului (LCP) și aduce GSAP ca dependență în plus. |
| Buton WhatsApp care pulsează continuu (`pulsating-button`) | Obosește vizitatorul și încalcă WCAG 2.2.2. Bula WhatsApp atrage deja atenția. |

## Trei pachete

### 1. Discret
Opțiunile 1, 2 și 3. Pagina e vie, dar liniștită. Risc de performanță aproape zero.

### 2. Echilibrat (recomandat)
Pachetul discret, plus interactivitate acolo unde ajută la conversie: calculatorul, testimonialele, galeriile și clipul.

| Pagina | Componente animate (max 4) | Interacțiune |
|---|---|---|
| Acasă | slideshow hero (ADR-007), `blur-fade`, `number-ticker`, testimoniale `Stack` pe mobil / `marquee` pe desktop | comutator temă animat (3), bula WhatsApp, „Vedeți clipul” (4) când e gata clipul |
| Saloane | `blur-fade`, rearanjare după numărul de invitați (13) | filtrul de invitați |
| Pagina unui salon | `Masonry` + lightbox (10), `blur-fade` | turul 360 la click, `lens` (11) pe desktop |
| Estimare buget | `Stepper` (5), `Elastic Slider` (6), `number-ticker` pe sumă, `confetti` (7) la rezultat | trimitere pe WhatsApp cu datele completate |
| Meniuri | tab-uri animate (15), `scroll-progress` (14), `blur-fade` | |
| Portofoliu | `Masonry` + lightbox (10), filtru animat (13) | |
| Despre | `blur-fade`, `number-ticker` | „Vedeți clipul” (4) |
| Contact | `confetti` (7) după trimiterea formularului | |

**Estimare** (de măsurat în Faza 5): +30–60 KB JavaScript comprimat față de un site fără animații. Fiecare componentă se încarcă doar pe paginile care o folosesc.

### 3. Spectaculos
Pachetul echilibrat, plus `Tilted Card` (12), `lens` peste tot, saloane care se suprapun ca niște carduri la derulare (`Scroll Stack`) și testimoniale `marquee` și pe mobil.
- **Depășește regula de maximum 3–4 componente pe pagină.** Ar trebui schimbată regula.
- **Risc real** de a coborî sub 90 în Lighthouse pe mobil.
- Nu îl recomandăm pentru un site al cărui scop e o cerere pe WhatsApp.

## Interactivități fără animații speciale (deja în plan)
- Calculatorul de buget, cu trimitere pe WhatsApp și datele deja completate.
- Filtrul de saloane după numărul de invitați.
- Tururile virtuale 360 (10 tururi).
- Slideshow-ul din hero, cu buton de pauză.
- Tema luminoasă sau întunecată.
- Bula WhatsApp.

## Fundal animat 3D: `Silk` (ReactBits), ales de client

> **Scos pe 2026-10-29, la cererea clientului („să scoatem animațiile 3D să meargă mai repede situl”).** Fișierele `Silk.tsx` și `SilkBackground.tsx` au fost șterse. Pe Acasă și 404 a rămas un gradient CSS static (`SoftBackground`), fără JavaScript. Tur virtual și Contact au antet cu poză (`PageHero`). Secțiunea de mai jos rămâne ca istoric al deciziei.

**De ce `Silk`:**
- Simulează o țesătură de mătase în mișcare, care seamănă cu voalurile drapate de pe tavanele saloanelor Rosa, Noblesse și Premiere.
- E scris direct în WebGL, cu un singur fișier de ~21 KB și **fără three.js** (verificat în sursa de pe GitHub, 2026-10-28). Alternativa `Light Rays`, cu raze de lumină „de candelabru”, are aceeași construcție.
- Are proprietăți reale pentru protecția performanței: `paused`, `dpr`, `lightMode`, `intro`, `fade`, `mouseInteraction`, `clickRipple`, `color`, `sheenColor`, `speed`.

**Unde apare.** Regula de 3–4 animații pe pagină rămâne:

| Pagina | Unde | Compensare |
|---|---|---|
| Acasă | fundalul secțiunii finale „Vă verificăm data” | `number-ticker` dispare de pe Acasă și rămâne pe Despre. Pe Acasă rămân 4: slideshow, `blur-fade`, testimoniale, `Silk` |
| Tur virtual | fundalul antetului paginii | 2 componente: `Silk`, `blur-fade` |
| Contact | fundalul antetului paginii | 3 componente: `Silk`, `blur-fade`, `confetti` |
| 404 | fundal pe toată pagina | |

**Culori:**
- **Tema luminoasă:** `lightMode`, culoare `#EAE3D7` (nisip), luciu `#FFFEFA`.
- **Tema întunecată:** culoare `#1C1A18`, luciu discret `#3A2A26`, adică un roșu foarte stins.
- **Textul peste fundal:** stă pe un strat semi-transparent în culoarea fundalului (`--color-bg` cu opacitate de 70%). Contrastul se verifică pe captură în Faza 6.

**Protecții (obligatorii):**
1. **Se încarcă abia după ce pagina e gata** (`next/dynamic`, `ssr: false`, la `requestIdleCallback`). Până atunci se vede un gradient CSS static în aceleași culori, deci pagina nu așteaptă WebGL-ul.
2. **`paused`** când secțiunea nu e pe ecran (IntersectionObserver) și când tab-ul e ascuns.
3. **`dpr`:** maximum 1 pe mobil și 1.5 pe desktop, ca telefonul să nu randeze la rezoluție retina.
4. **Pe mobil:** `mouseInteraction` și `clickRipple` sunt oprite, iar `speed` e redus.
5. **Fără animație (doar gradientul static)** dacă:
   - vizitatorul are `prefers-reduced-motion`;
   - are `Save-Data`;
   - browserul nu are WebGL;
   - telefonul raportează puțină memorie (`navigator.deviceMemory` sub 4).
6. **Măsurare în Faza 6:** Lighthouse pe mobil ≥ 90, cu fundalul activ. Dacă scorul scade sub 90, fundalul rămâne doar pe desktop. Asta e o decizie de rezervă, de confirmat atunci.
