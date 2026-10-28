# Checklist materiale: Faza 3

**Data:** 2026-10-28
**Sursă:** [brief.md](brief.md) §8. Bifați ce trimiteți. Unde scrie „fișier”, completați direct fișierul din `content/` sau trimiteți datele în orice format, iar eu le transcriu.

Legendă prioritate: **P1** = blochează lansarea · **P2** = necesar, dar se poate lansa cu un text provizoriu · **P3** = nice-to-have

## 1. Poze saloane

Pentru fiecare salon: **8–15 poze** cu salonul **amenajat** pentru eveniment, plus 1–2 cu salonul gol (arată spațiul), plus 1 poză de exterior sau intrare.
Format: JPG, latura lungă de minimum 2000 px, **originalele**, nu capturi de ecran sau poze descărcate de pe Facebook. Spuneți și cine e fotograful, ca să-l putem credita dacă e nevoie.

| Salon | Complex | Poze (8–15) | Poză goală | Exterior | Prioritate |
|---|---|---|---|---|---|
| Rosa | Riviera | ☐ | ☐ | ☐ | P1 |
| Noblesse | Riviera | ☐ | ☐ | ☐ | P1 |
| Premiere | Riviera | ☐ | ☐ | ☐ | P1 |
| Grande | Insulița | ☐ | ☐ | ☐ | P1 |
| Ronda | Insulița | ☐ | ☐ | ☐ | P1 |
| Magic | Insulița | ☐ | ☐ | ☐ | P1 |
| Estuar | Insulița | ☐ | ☐ | ☐ | P1 |
| **Complexul Riviera**, exterior, malul Jiului, terasă (pentru prima pagină) | Riviera | ☐ 3–5 poze | | | **P1** |

## 2. Date saloane (fișier: `content/saloane/<salon>.json`)

| Informație | Rosa | Noblesse | Premiere | Grande | Ronda | Magic | Estuar | Prioritate |
|---|---|---|---|---|---|---|---|---|
| Capacitate minimă (invitați) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | P2 |
| Capacitate maximă | 400 ✅ | 300 ✅ | 300 ✅ | 1200 ✅ | 900 ✅ | 700 ✅ | 100 ✅ | — |
| Suprafață (m²) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | P3 |
| 3–5 puncte forte (ex. terasă, ring de dans, lumină naturală, scenă) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | **P1** |
| Dotări (aer condiționat, camera mirilor, intrare separată, sistem de sunet) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | P2 |
| Link tur 360 (cel de pe annaevents.ro) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | P2 |
| Clip video YouTube (dacă există) | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | P3 |

**Adresa exactă a complexului de pe Insulița** (stradă, număr): ☐ **P1**. Riviera: Aleea Digului nr. 5 ✅

## 3. Meniuri (fișier: `content/meniuri.json`)

- ◐ **P1** Primit `Media/CATALOG EVENIMENTE - 2026.pdf` (150 MB), de extras felurile. Fișierul sursă al catalogului 2026 (Word, PDF sau Excel), cu toate felurile pentru fiecare meniu: Premium Platinum, Gold, Silver, Bronze, Vegetarian. Azi există doar ca 46 de imagini pe annaevents.ro.
- ☐ **P2** Ce opțiuni speciale oferiți: vegetarian ✅, fără gluten ✅, vegan ☐, meniu copii ✅ (9 poze HEIC, conținut ☐), altele ☐
- ☐ **P2** Până când e valabil catalogul (de ex. 31.12.2026)
- ☐ **P3** 1–3 poze cu preparate pentru fiecare meniu

## 4. Pachete și servicii (fișier: `content/pachete.json`)

- ☐ **P1** **Ce include oferta standard** pentru o nuntă, de exemplu coordonator, degustare, tort, șampanie de întâmpinare, decor de bază, parcare. Doar ce oferiți efectiv.
- ☐ **P2** Același lucru pentru botez și pentru corporate, dacă diferă.
- ☐ **P2** O frază de descriere și o poză pentru fiecare serviciu premium: Candy Bar, Cocktail Bar, Cheese Bar, Lemonade Bar, Sushi Bar, Tiramisu Bar, bar tradițional, Gentlemen's Corner, tort cu shoturi, BBQ (rotiserie). Poze primite pentru toate, mai puțin Cocktail Bar și BBQ.
- ☐ **P2** Cazare: ce oferiți invitaților (Hotel ANNA, Hotel ANNA Junior), condiții, și ce include apartamentul mirilor.
- ☐ **P3** Oferte de extrasezon sau de zile din săptămână (ex. vineri/duminică, noiembrie–februarie), dacă există.

## 5. Intervale pentru calculatorul de buget (fișier: `content/buget.json`)

- ☐ **P1** Pentru **nuntă**, **botez** și **corporate**: costul minim și maxim pe invitat, în lei, cu meniul inclus. Nu se afișează pe site ca preț, doar ca interval total estimat.
- ☐ **P2** Dacă meniul diferă între Riviera și Insulița: intervale separate.
- ☐ **P2** Numărul minim de invitați pentru care se închiriază un salon, dacă există.
- ☐ **P3** Interval pentru servicii extra (ex. Candy Bar: între X și Y lei).
- ☐ **P1** Anul de valabilitate.

## 6. Portofoliu: 6 evenimente (fișier: `content/portofoliu/<eveniment>.json`)

Pentru fiecare: tip (nuntă/botez/corporate), salon, lună și an, **3–5 poze**, 1–2 fraze despre eveniment și **acordul clienților** pentru publicare.

| # | Tip | Salon | Lună/an | Poze 3–5 | Descriere | Acord client | Prioritate |
|---|---|---|---|---|---|---|---|
| 1 | | | | ☐ | ☐ | ☐ | P1 |
| 2 | | | | ☐ | ☐ | ☐ | P1 |
| 3 | | | | ☐ | ☐ | ☐ | P1 |
| 4 | | | | ☐ | ☐ | ☐ | P2 |
| 5 | | | | ☐ | ☐ | ☐ | P2 |
| 6 | | | | ☐ | ☐ | ☐ | P2 |

Recomand cel puțin 3 nunți, 1 botez și 1 eveniment corporate, cu Riviera majoritar.

## 7. Testimoniale

- ☐ **P1** 3–6 testimoniale **reale** (nu inventăm: recenziile false sunt practică comercială interzisă, Directiva UE 2019/2161; vezi mesajul-model de mai jos): numele (de ex. „Andreea și Mihai”), tipul evenimentului, **salonul**, luna și anul, 1–3 fraze, plus **acordul** de publicare.
- ☐ **P1** Confirmare: cele 9 testimoniale de pe annaevents.ro (citite 2026-10-28) sunt de la clienți reali, cu acord? Doar unul are salonul (Ronda). Putem refolosi Pentru care salon a fost fiecare eveniment?
- ☐ **P3** Rating Google Business (scor, număr de recenzii), doar dacă e public și îl putem cita.

## 8. Despre și încredere

- ☐ **P1** Confirmare: **peste 20 de ani** de experiență e corect? Din ce an?
- ☐ **P2** Câte evenimente organizați pe an (aproximativ)? O cifră reală e mai convingătoare decât orice adjectiv.
- ☐ **P2** Coordonatorul de evenimente: nume, poză, 2 fraze. Oamenii preferă să știe cu cine vorbesc.
- ☐ **P3** Bucătarul-șef sau echipa de bucătărie: nume, poză.
- ☐ **P3** Organizați degustări? Când și în ce condiții?

## 9. Contact și legal

- ✅ **P1** Numărul WhatsApp: 0746 085 555
- ◐ **P1** Toate 4 numerele apar la Contact; doar 0746 085 555 are WhatsApp. [PRESUPUNERE] celelalte 3 = „Rezervări”.
- ✅ **P1** Email: rezervari@rivieraevents.ro (de creat la furnizorul de email al domeniului)
- ☐ **P2** Program de vizitare a saloanelor (zile, ore, cu programare?)
- ☐ **P2** Riviera are conturi separate de Facebook/Instagram sau folosim pe cele ANNA Events?
- ☐ **P1** Datele firmei: denumire, CUI, nr. Registrul Comerțului, sediu (pentru footer și politica de confidențialitate)
- ☐ **P2** Persoana de contact pentru protecția datelor (GDPR)

## 10. Identitate

- ◐ **P1** Primite 4 PNG de 690×272 px (prea mici pentru ecrane retina). Lipsește logo Riviera Events în format vectorial (SVG, AI, EPS sau PDF) și, dacă există, varianta albă
- ☐ **P2** Logo Grup ANNA / ANNA Events (pentru secțiunea Insulița și footer)
- ☐ **P3** Culori sau fonturi de brand existente (altfel le propunem în Faza 4)

## 11. Conturi (pentru Faza 5)

- ☐ Cont Web3Forms, cu adresa care primește cererile
- ☐ Cont Keystatic Cloud și numele celor maximum 3 editori
- ☐ Domeniul rivieraevents.ro: cumpărat? La ce registrar?

## 11. Poze primite (2026-10-28)

- ✅ Folderul `Media/` (2,9 GB, ignorat de git). Convertite 423 de poze în `media-web/` (157 MB, max. 2560 px, fără date GPS/EXIF). Lista completă: `media-web/manifest.csv`.
- ☐ **197 de poze HEIC** (iPhone) încă neconvertite, între care **toate cele 14 de la Estuar**, 55 Sushi Bar, 82 Candy Bar, 9 Meniu copii.
- ☐ **8 poze stricate** în `Apartamentul Mirilor` (DSC01012, 01022, 01027, 01029, 01031, 01033, 01074, 01081): fișierele sunt trunchiate, trebuie copiate din nou de pe sursă.
- ☐ Fără poze: Cocktail Bar, BBQ.
- ☐ **Tururile 360** (krpano, ~530 MB: Grande, Noblesse, Premiere, Apartamentul mirilor) nu intră în repo. De decis unde se găzduiesc (vezi ADR-004). Rosa, Ronda, Magic, Estuar nu au tur.
- ☐ Video `PACHETE/CandyBar/IMG_9215.mov`: se urcă pe YouTube (ADR-004).
- ☐ Portofoliu: acordul clienților pentru pozele în care apar oameni.

## Mesaj-model pentru testimoniale (WhatsApp, după eveniment)

> Bună ziua, [nume]! Ne-am bucurat să vă avem alături la [tip eveniment] din [luna], în salonul [salon]. Dacă aveți un minut, ne-ar ajuta mult două-trei fraze despre cum v-ați simțit. Cu acordul dumneavoastră, le-am publica pe rivieraevents.ro, cu prenumele și luna evenimentului. Vă mulțumim!
