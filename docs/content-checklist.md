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

- ☐ **P1** Fișierul sursă al catalogului 2026 (Word, PDF sau Excel), cu toate felurile pentru fiecare meniu: Premium Platinum, Gold, Silver, Bronze, Vegetarian. Azi există doar ca 46 de imagini pe annaevents.ro.
- ☐ **P2** Ce opțiuni speciale oferiți: vegetarian ✅, fără gluten ✅, vegan ☐, meniu copii ☐, altele ☐
- ☐ **P2** Până când e valabil catalogul (de ex. 31.12.2026)
- ☐ **P3** 1–3 poze cu preparate pentru fiecare meniu

## 4. Pachete și servicii (fișier: `content/pachete.json`)

- ☐ **P1** **Ce include oferta standard** pentru o nuntă, de exemplu coordonator, degustare, tort, șampanie de întâmpinare, decor de bază, parcare. Doar ce oferiți efectiv.
- ☐ **P2** Același lucru pentru botez și pentru corporate, dacă diferă.
- ☐ **P2** O frază de descriere și o poză pentru fiecare serviciu premium: Candy Bar, Cocktail Bar, Cheese Bar, Lemonade Bar, Sushi Bar, Gentlemen's Corner, Shot cake, BBQ (rotiserie).
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

- ☐ **P1** 3–6 testimoniale **reale**: numele (de ex. „Andreea și Mihai”), tipul evenimentului, **salonul**, luna și anul, 1–3 fraze, plus **acordul** de publicare.
- ☐ **P2** Confirmare: putem refolosi cele 8 testimoniale de pe annaevents.ro? Pentru care salon a fost fiecare eveniment?
- ☐ **P3** Rating Google Business (scor, număr de recenzii), doar dacă e public și îl putem cita.

## 8. Despre și încredere

- ☐ **P1** Confirmare: **peste 20 de ani** de experiență e corect? Din ce an?
- ☐ **P2** Câte evenimente organizați pe an (aproximativ)? O cifră reală e mai convingătoare decât orice adjectiv.
- ☐ **P2** Coordonatorul de evenimente: nume, poză, 2 fraze. Oamenii preferă să știe cu cine vorbesc.
- ☐ **P3** Bucătarul-șef sau echipa de bucătărie: nume, poză.
- ☐ **P3** Organizați degustări? Când și în ce condiții?

## 9. Contact și legal

- ☐ **P1** Numărul WhatsApp pentru Riviera (0746 085 555 sau altul?)
- ☐ **P1** Ce telefon e pentru ce (rezervări, corporate etc.). Azi sunt 4 numere fără etichetă.
- ☐ **P1** Email pentru cereri: rezervari@annaevents.ro sau o adresă nouă pe rivieraevents.ro?
- ☐ **P2** Program de vizitare a saloanelor (zile, ore, cu programare?)
- ☐ **P2** Riviera are conturi separate de Facebook/Instagram sau folosim pe cele ANNA Events?
- ☐ **P1** Datele firmei: denumire, CUI, nr. Registrul Comerțului, sediu (pentru footer și politica de confidențialitate)
- ☐ **P2** Persoana de contact pentru protecția datelor (GDPR)

## 10. Identitate

- ☐ **P1** Logo Riviera Events în format vectorial (SVG, AI, EPS sau PDF) și, dacă există, varianta albă
- ☐ **P2** Logo Grup ANNA / ANNA Events (pentru secțiunea Insulița și footer)
- ☐ **P3** Culori sau fonturi de brand existente (altfel le propunem în Faza 4)

## 11. Conturi (pentru Faza 5)

- ☐ Cont Web3Forms, cu adresa care primește cererile
- ☐ Cont Keystatic Cloud și numele celor maximum 3 editori
- ☐ Domeniul rivieraevents.ro: cumpărat? La ce registrar?
