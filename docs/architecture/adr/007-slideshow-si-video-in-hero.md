# ADR-007: Slideshow de până la 10 slide-uri, cu video, în hero-ul paginii principale

## Status
**Acceptat** (cerere client, 2026-10-28).
- **Înlocuiește parțial ADR-004**, punctul „Fără video de fundal în hero în v1”.
- **Înlocuiește regula „Fără carusel automat”** din design-system.md §5.
- Restul ADR-004 rămâne valabil: imaginile se afișează prin `next/image`, iar video-urile de prezentare stau pe YouTube și se încarcă la click.

## Context
- Clientul vrea ca primul ecran de pe telefon să arate până la **10 poze** prin rotație. Vrea și să poată pune un **clip video profesionist**, aflat acum în lucru.
- Clientul vrea să schimbe singur slide-urile din panoul de administrare (Keystatic, ADR-002).
- **Ce au arătat verificările:**
  - `@keystatic/core` 0.6.9, publicat pe npm la 2026-08-26, verificat în declarațiile de tip din pachet la 2026-10-28:
    - `fields.array(..., { validation: { length: { max: 10 } } })` există, deci limita de 10 se impune chiar în panou;
    - `fields.file` acceptă orice tip de fișier, dar **nu are limită de mărime**;
    - `fields.image` și `fields.conditional` există.
  - Vercel Hobby, verificat 2026-10-28 ([plans/hobby](https://vercel.com/docs/plans/hobby), ultima actualizare 2026-09-14):
    - **100 GB Fast Data Transfer pe lună**;
    - la depășire, funcția se oprește **până la 30 de zile**;
    - limita de 100 MB la încărcare se aplică doar deploy-urilor prin CLI ([limits](https://vercel.com/docs/limits)).
  - GitHub respinge fișierele de peste 100 MB (limită cunoscută, **neverificată** acum). Keystatic salvează fișierele în repo, prin GitHub.
- **Riscuri de evitat:**
  - un video mare scade scorul de performanță pe mobil (cerința Lighthouse ≥ 90 din Faza 6) și consumă din cei 100 GB;
  - un carusel automat fără buton de pauză încalcă WCAG 2.2.2.

## Decizie
1. **Hero-ul are între 1 și 10 slide-uri.** Fiecare slide e **imagine** sau **video**, ales într-un câmp `fields.conditional` din Keystatic.
2. **Titlul, subtitlul și butoanele rămân fixe.** Se schimbă doar fundalul, cu tranziție lentă (crossfade de 1 s), la fiecare **6 s**. Intervalul se poate configura între 4 și 10 s.
3. **Slide imagine:**
   - o poză pentru desktop (orizontală) și, opțional, una pentru mobil (verticală);
   - fără poza de mobil, se decupează poza de desktop în jurul unui **punct focal** (`object-position`).
   - Alt text obligatoriu.
4. **Slide video:**
   - fișiere **MP4 (H.264)**, găzduite de noi: o variantă pentru desktop (16:9) și una pentru mobil (9:16 sau 4:5);
   - un **poster** obligatoriu, adică o imagine afișată până se încarcă video-ul;
   - redare fără sunet, `autoplay muted playsinline`, fără controale. Sunetul nu are rost pe fundal.
   - **Fără YouTube pe fundal:** ar încărca scripturi și cookie-uri de la terți la deschiderea paginii, contrar ADR-005.
5. **Buget de performanță și de trafic:**
   - **video mobil ≤ 4 MB, video desktop ≤ 8 MB, durată 15–30 s.** Panoul nu poate limita mărimea, așa că build-ul afișează un avertisment peste aceste valori și **eșuează peste 15 MB**;
   - primul slide se încarcă imediat: e imaginea principală a paginii, cu `priority`. Pentru video, imaginea principală e posterul;
   - fiecare slide următor se încarcă abia când urmează. Video-ul nu se descarcă deloc dacă:
     - vizitatorul are `prefers-reduced-motion`;
     - are activată economia de date (`Save-Data`);
     - are conexiune 2G (`navigator.connection.effectiveType`).

     În aceste cazuri se afișează posterul.
6. **Accesibilitate (WCAG 2.2.2, 2.1.1):**
   - buton vizibil **Pauză/Redare** de 44×44px;
   - indicatori de slide (puncte) accesibili din tastatură, cu `aria-label` („Slide 3 din 10”);
   - rotația se oprește la hover, la focus și când tab-ul nu e vizibil;
   - cu `prefers-reduced-motion`, rotația **nu pornește deloc**: rămâne primul slide, iar butonul de pauză arată starea „Redare”.
   - Containerul are `aria-roledescription="carusel"`. Nu se anunță fiecare schimbare de slide, pentru că sunt doar fundaluri.
7. **Găzduirea video-ului:** în repo, prin Keystatic, în `public/media/hero/`.
   - Dacă traficul se apropie de 100 GB pe lună, video-ul se mută pe serverul annaevents.ro, unde stau deja tururile 360, sau în Vercel Blob. În conținut se schimbă doar URL-ul.

## Consecințe
**Pozitive**
- Clientul schimbă singur ordinea și conținutul slide-urilor, fără programator.
- Clipul profesionist poate deschide pagina, fără cookie-uri de la terți.

**Negative**
- Un slideshow cu video e mai greu decât o singură poză. Performanța rămâne ok doar dacă se respectă bugetul de la punctul 5. Se verifică cu Lighthouse în Faza 6.
- Repo-ul crește cu fiecare video (pragul de ~1 GB din ADR-004).
- Studiile UX arată că puțini vizitatori văd slide-urile de după primul. De aceea primul slide trebuie să fie cel mai bun, iar textul nu depinde de slide.

**De urmărit lunar:** consumul de Fast Data Transfer în panoul Vercel, la Usage.

## Alternative considerate
- **O singură poză în hero** (decizia inițială): cea mai rapidă, dar clientul vrea varietate și video.
- **Video YouTube pe fundal:** respins, din cauza cookie-urilor de la terți și a încărcării grele.
- **Video pe Vercel Blob de la început:** acceptabil, dar mai complicat pentru editarea din Keystatic. Rămâne plan de rezervă.
- **Carusel cu text diferit pe fiecare slide:** respins. Vizitatorul nu apucă să citească, iar mesajul principal se pierde.
