# Analiză site-uri de referință

**Data:** 2026-10-28
**Metodă:** REA `capture_browser_scenario` (Chromium 156, headless), viewport mobil 390×844, plus desktop 1280×800 unde meniul era ascuns. Am extras arborele de accesibilitate și o captură a primului ecran pentru fiecare pagină.
**Limite:** capturile acoperă doar primul ecran; ordinea secțiunilor de mai jos vine din arborele de accesibilitate. Nu am completat și nu am trimis niciun formular. Nu am măsurat viteza de încărcare. Ce nu s-a putut confirma e marcat *neverificat*.
**Regulă:** am extras tipare, nu am copiat texte sau design.

## Site-uri analizate

| Site | Ce este | Pagini capturate |
|---|---|---|
| annaevents.ro | Site-ul actual al grupului (punct de plecare) | acasă, meniu deschis, Salon Rosa, catalog meniuri, contact |
| hanulandritei.ro | Grup de 4 locații de nuntă, Craiova | acasă (mobil + desktop), salon, meniuri |
| empireevents.ro | 2 saloane, București | acasă (mobil + desktop), salon, meniuri |
| ivyevents.ro | 5 saloane, o singură locație | acasă (mobil + desktop), meniu deschis, Ivy Ballroom, ofertă gastronomică |
| royalhall.ro | 1 salon (~300 pers.), București | acasă, oferte, nuntă |
| villatrevi.ro | Resort cu 5 spații de eveniment, Timișoara | acasă (mobil + desktop), saloane, evenimente private |
| eventart.ro | **Nu este o locație**: furnizor de servicii extra (baruri tematice, efecte) | acasă (mobil + desktop), servicii, contact |

## Tipare pe teme

### 1. Prezentarea saloanelor
- **Cel mai bun tipar:** o pagină per salon, cu același șablon (Ivy, Hanul Andritei). Pe Villa Trevi, toate spațiile apar pe o singură pagină, fiecare cu un card: capacitate min–max, „potrivit pentru…”, tur 360.
- **Ivy:** formularul de ofertă de pe pagina salonului are **salonul deja selectat**, iar dedesubt apar celelalte saloane.
- **Hanul Andritei:** are un bloc „Detalii” cu capacitatea și o listă de dotări (bucătărie proprie, aer condiționat, camera mirilor, grădină, parcare).
- **annaevents.ro (actual):** pagina salonului are doar 9 poze și turul virtual. **Nu are text, capacitate sau adresă**, iar butonul duce la formularul general.
- **Lipsește peste tot:** comparație între saloane după numărul de invitați, plan de amplasare, suprafață (m²), video.

### 2. Meniuri și prețuri
- **Niciun site** nu afișează prețuri publice sau intervale.
- **Ivy:** meniurile sunt pe tab-uri, câte unul pe nivel (Silver / Gold / Ballroom), cu felurile pe secțiuni, ușor de parcurs pe mobil. Opțiunile vegetarian / vegan / fără gluten apar într-un paragraf.
- **Royal Hall:** dă valoare fără să arate prețul. Are o listă „ce include oferta standard” (coordonator, tort, șampanie de întâmpinare, degustare gratuită) și oferte speciale: reducere vineri/duminică, extrasezon noiembrie–februarie.
- **annaevents.ro (actual):** catalogul de meniuri e **46 de imagini JPG**, fără titluri sau text. Google nu îl poate citi, e greu pe mobil și nu apare în meniul principal.
- **Oportunitate:** nimeni nu oferă o estimare de buget, deci calculatorul cu interval (decizia A) ar fi o diferență clară.

### 3. Butoane de contact și conversie
- **WhatsApp:** există pe annaevents.ro (iconiță în header) și pe Royal Hall (buton flotant). Pe Ivy, un link `wa.me` *neverificat vizual*. **Niciunul nu pre-completează mesajul.** Hanul Andritei, Empire, Villa Trevi și Eventart nu au WhatsApp deloc.
- **Butoane fixe pe mobil:** niciun site nu are o bară fixă jos (WhatsApp / Sună / Estimare).
- **Primul ecran pe mobil:** pe aproape toate, **nu există niciun buton în hero**. Royal Hall are textul pus în imagine, Villa Trevi și Ivy nu au buton, iar Hanul Andritei are un header de ~250 px.
- **Bannerul de cookies acoperă aproximativ jumătate din primul ecran** pe annaevents.ro, Ivy și Villa Trevi.
- **Formulare care califică cererea:**
  - Ivy (pe pagina salonului): tip eveniment, salon, nivel meniu, dată, număr invitați.
  - Empire (în footer, pe fiecare pagină): tip eveniment, dată, număr invitați.
  - annaevents.ro: dată, tip, salon (cu capacitate), intervale de invitați.
  - Royal Hall și Hanul Andritei: **nu cer data și numărul de invitați**, deși sunt cele mai importante informații pentru ofertă.
- **Telefoane:** pe annaevents.ro și Eventart sunt **text simplu, nu linkuri tel:**, deci nu se pot apela cu o atingere.

### 4. Încredere
- **Cel mai credibil tipar:** testimoniale cu numele cuplului, data și **salonul folosit** (Ivy, Hanul Andritei).
- **Hanul Andritei:** pune în față persoana care organizează și o „nuntă de probă”, adică o degustare anuală. Ambele reduc anxietatea cuplului.
- **Royal Hall:** cifre (ani de experiență, peste 2000 de evenimente) și un FAQ înainte de formular (capacitate, meniu vegetarian, decor, formație și fotograf).
- **Lipsește peste tot:** rating Google, număr de evenimente pe pagina principală, portofoliu de nunți reale cu poveste.

### 5. Servicii extra
- **Eventart:** fiecare serviciu are pagina lui, iar formularul are **căsuțe de bifat pentru servicii**. Tiparul e util pentru pasul de servicii extra din calculator.
- **Royal Hall și annaevents.ro:** serviciile extra (baruri tematice) sunt blocuri pe pagina principală.

## annaevents.ro: ce păstrăm și ce îmbunătățim

**Păstrăm:**
- Logica formularului: dată, tip eveniment, salon cu capacitate, intervale de invitați.
- Turul virtual 360 pe fiecare salon.
- Cele 5 meniuri cu nume, plus opțiunile vegetarian și fără gluten.
- Lista serviciilor premium.
- Testimonialele reale.
- Argumentele: peste 20 de ani de experiență, cazare, parcare.
- Iconița WhatsApp.

**Îmbunătățim:**
- **Salon:** bloc de date cheie (capacitate, complex, adresă, potrivit pentru), descriere unică, buton WhatsApp specific salonului.
- **Riviera pe primul loc**, cu adresă și hartă pentru fiecare complex. Azi există doar Insulița.
- **Denumiri unitare:** Premiere, Noblesse.
- **Meniuri** ca pagină text, nu imagini.
- **Bară fixă pe mobil**, telefoane ca linkuri tel:, banner de cookies compact.
- **Fără „2025”** în butoane.
- **Primul ecran** spune clar ce, unde și pentru câți invitați, în locul „SAVE THE DATE”.

## Ce ia Riviera Events din fiecare

| Tipar | Sursă |
|---|---|
| O pagină per salon, același șablon, formular cu salonul pre-selectat | Ivy |
| Card de salon: capacitate min–max, „potrivit pentru”, tur 360 | Villa Trevi |
| Date cheie și dotări pe pagina salonului | Hanul Andritei |
| Testimoniale cu salonul și data | Ivy, Hanul Andritei |
| „Ce include” și oferte de sezon sau zile din săptămână, fără listă de prețuri | Royal Hall |
| FAQ înainte de formular | Royal Hall |
| Meniuri pe tab-uri, pe nivel | Ivy |
| Calificarea cererii: tip, dată, invitați | Empire, annaevents.ro |
| Căsuțe de bifat pentru servicii extra | Eventart |
| **Ce nu are nimeni:** WhatsApp pre-completat, bară fixă pe mobil, estimare de buget, comparație saloane după invitați | oportunitate Riviera |

Capturile brute (arbore de accesibilitate și PNG) sunt în directorul temporar al sesiunii. Nu le-am pus în repo.
