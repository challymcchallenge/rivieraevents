# Modelul de date al conținutului

**Data:** 2026-10-28
**Pentru:** stack-ul ales la GATE 2 (Next.js + Keystatic). Fișierele din `content/` sunt citite de site la build. Galeriile se vor edita și din panoul Keystatic.

**Reguli comune:**
- Fișierele sunt JSON. Textul lung al paginilor stă în `.mdx` (Markdown), cu datele SEO în antet.
- `null` înseamnă „nu știm încă”. Site-ul ascunde câmpul, nu afișează „null”.
- `[NEED: ...]` într-un text marchează o informație lipsă. Build-ul va **avertiza** cât timp mai există un `[NEED`, ca să nu ajungă așa pe site.
- Câmpurile `valabilPanaLa` (meniuri, buget) generează un avertisment la build după data respectivă.
- Schema exactă (validare cu zod și configurarea Keystatic) se scrie în Faza 5, din acest document.

```
content/
  site.json                 date de contact, adrese, social, firmă
  saloane/<slug>.json       câte un fișier pentru fiecare dintre cele 7 saloane
  meniuri.json              cele 5 meniuri, fără prețuri
  pachete.json              ce include oferta + servicii premium + cazare
  buget.json                intervalele pentru calculator
  portofoliu/<slug>.json    câte un fișier pentru fiecare eveniment
  testimoniale.json
  pagini/<pagina>.mdx       textele paginilor + SEO + CTA
```

---

## 1. Salon: `content/saloane/<slug>.json`

| Câmp | Tip | Obligatoriu | Exemplu / notă |
|---|---|---|---|
| `slug` | text | da | `"rosa"`, apare în URL: `/saloane/rosa` |
| `nume` | text | da | `"Salon Rosa"` |
| `complex` | `"riviera"` \| `"insulita"` | da | determină ordinea și adresa |
| `ordine` | număr | da | 1–7; Riviera are 1–3 |
| `capacitate.nunta` | număr | da | `400` (invitați la masă, din catalog) |
| `capacitate.conferinta` | text \| null | nu | `"la cerere, în funcție de amenajare"` (fără cifre, decizie client 2026-10-28) |
| `capacitate.min` | număr \| null | nu | invitați la masă |
| `suprafataMp` | număr \| null | nu | |
| `potrivitPentru` | listă din `nunta`, `botez`, `corporate`, `eveniment-mic` | da | |
| `puncteForte` | listă de texte (3–5) | da | `"Terasă spre Jiu"`, completat de client |
| `dotari` | listă de texte | nu | `"Aer condiționat"` |
| `descriereScurta` | text, max. 160 caractere | da | pe cardul din listă |
| `descriere` | text, 80–150 cuvinte | da | pe pagina salonului |
| `seo.titlu` | text, max. 60 caractere | da | |
| `seo.descriere` | text, max. 155 caractere | da | |
| `galerie` | listă `{ src, alt }` | da | editabilă din Keystatic; `alt` e obligatoriu |
| `tur360` | URL \| null | nu | se încarcă doar la click |
| `video` | listă de URL-uri YouTube | nu | se încarcă doar la click |

**Exemplu de rând (salon):**
```json
{ "slug": "rosa", "nume": "Salon Rosa", "complex": "riviera", "ordine": 1,
  "capacitate": { "nunta": 400, "conferinta": null, "min": null }, "potrivitPentru": ["nunta", "botez", "corporate"] }
```

## 2. Meniuri: `content/meniuri.json`

**Fără prețuri** (decizia de la GATE 1). Un meniu are secțiuni (feluri de mâncare în ordinea servirii), iar fiecare secțiune are preparate.

| Câmp | Tip | Notă |
|---|---|---|
| `valabilPanaLa` | dată `AAAA-LL-ZZ` | avertisment la build după expirare |
| `optiuniSpeciale` | listă de texte | `"Vegetarian"`, `"Fără gluten"` |
| `meniuri[].id` | text | `"gold"` |
| `meniuri[].nume` | text | `"Gold"` |
| `meniuri[].ordine` | număr | ordinea tab-urilor |
| `meniuri[].descriereScurta` | text | 1 frază despre meniu |
| `meniuri[].sectiuni[].titlu` | text | `"Starter"`, `"Starter cald"`, `"Tradițional"`, `"Fel principal"` (structura din catalogul 2026; înlocuiește varianta inițială cu 5 secțiuni, 2026-10-28) |
| `meniuri[].sectiuni[].preparate[].nume` | text | numele preparatului |
| `meniuri[].sectiuni[].preparate[].detalii` | text \| null | ingrediente, garnitură, gramaj |
| `meniuri[].sectiuni[].preparate[].etichete` | listă | `"vegetarian"`, `"fara-gluten"`, `"picant"` |

**Exemplu de rând (un preparat):**
```json
{ "nume": "Piept de rață cu sos de vișine", "detalii": "piure de țelină, 180 g", "etichete": ["fara-gluten"] }
```
*(preparat inventat, doar ca exemplu de format)*

## 3. Pachete: `content/pachete.json`

| Câmp | Tip | Notă |
|---|---|---|
| `includeStandard[]` | `{ tip, titlu, detalii }` | `tip` = `nunta` / `botez` / `corporate` / `toate` |
| `serviciiPremium[]` | `{ id, nume, descriere, imagine }` | Candy Bar etc. |
| `cazare[]` | `{ nume, descriere, link }` | Hotel ANNA, Hotel ANNA Junior, apartamentul mirilor |
| `oferte[]` | `{ titlu, detalii, valabilPanaLa }` | opțional: extrasezon, zile din săptămână |

**Exemplu de rând (ce include):**
```json
{ "tip": "nunta", "titlu": "Degustare pentru miri", "detalii": "[NEED: câte persoane, când]" }
```

## 4. Calculator de buget: `content/buget.json`

**Cum calculează:**
- interval = invitați × lei/persoană (min… max) + servicii extra alese;
- rotunjit la sute de lei;
- afișat ca „între X și Y lei”.

Prețul pe meniu nu apare nicăieri.

| Câmp | Tip | Notă |
|---|---|---|
| `valabilPanaLa` | dată | |
| `moneda` | `"lei"` | |
| `rotunjire` | număr | `100` |
| `tipuri[]` | `{ id, nume, leiPePersoana: { min, max }, invitatiMinim }` | `nunta`, `botez`, `corporate` |
| `ajustariComplex` | `{ riviera: 1, insulita: 1 }` | multiplicator, dacă prețurile diferă între complexe |
| `extra[]` | `{ id, nume, mod: "per_persoana" \| "fix", min, max }` | servicii premium, opțional |
| `nota` | text | „Estimare orientativă…” (afișată sub rezultat) |

**Exemplu de rând (tip eveniment):**
```json
{ "id": "nunta", "nume": "Nuntă", "leiPePersoana": { "min": null, "max": null }, "invitatiMinim": null }
```
Cât timp valorile sunt `null`, calculatorul nu afișează sumă. Afișează doar „Cereți oferta pe WhatsApp”.

## 5. Portofoliu: `content/portofoliu/<slug>.json`

| Câmp | Tip | Notă |
|---|---|---|
| `slug`, `titlu` | text | `"ceremonie-pe-piscina-anna-events"`, `"Ceremonie pe piscină"` (fără numele mirilor, 2026-10-28) |
| `complex` | `riviera` / `insulita` | filtrul de pe pagina Portofoliu |
| `tip` | `nunta` / `botez` / `corporate` | |
| `salon` | slug salon \| null | link spre pagina salonului, dacă se știe |
| `data` | `AAAA-LL` \| null | luna și anul, dacă se știu |
| `descriere` | text, 1–2 fraze | |
| `poze` | listă `{ src, alt }`, 4–6 | editabile din Keystatic |
| `acordClient` | `true` / `false` | **evenimentul nu se publică fără `true`** |

## 6. Testimoniale: `content/testimoniale.json`

`[{ "nume": "Andreea și Mihai", "tip": "nunta", "salon": "rosa", "data": "2025-09", "text": "…", "acord": true }]`
Se afișează doar cele cu `acord: true`.

## 7. Date de site: `content/site.json`

Telefoane cu rol, WhatsApp (număr + text implicit + marcaj de sursă, vezi ADR-005), email, adrese pentru ambele complexe (cu coordonate pentru hartă și schema.org), program de vizitare, social, datele firmei.

## 7a. Fișierele editate din Keystatic (Faza 5, 2026-10-28)

Keystatic refuză orice cheie nedeclarată în schemă. De aceea pozele, tururile și portofoliul stau în fișiere separate, fără note interne, iar textele cu note rămân în `content/*.json` și `content/pagini/*.mdx`.

| Fișier | Ce conține | Schema |
|---|---|---|
| `content/media/slideshow.json` | slide-urile hero; fiecare e `{ "discriminant": "imagine" \| "video", "value": {…} }` | singleton `slideshow` |
| `content/media/tururi.json` | `{ tururi: [{ id, titlu, complex, url }] }`; `url` gol = turul nu apare | singleton `tururi` |
| `content/media/saloane/<slug>.json` | `{ salon, imaginePrincipala {src, alt}, galerie [{src, alt}], tur360, turApartament }` | colecția `saloane` |
| `content/portofoliu/<slug>.json` | `{ titlu, tip, complex, salon, data, descriere, poze [{src, alt}], acordClient }`; slug-ul = numele fișierului | colecția `portofoliu` |

- Pozele se salvează în `public/images/<hero|saloane/<slug>|portofoliu/<slug>>/`, iar video-urile în `public/media/hero/`.
- Câmpurile de imagine goale se omit din fișier: Keystatic nu acceptă `null`.
- Dimensiunile pozelor (w/h) nu se mai salvează. `src/lib/content.ts` le citește din fișier la build.

## 7b. Slideshow pagina principală: `content/media/slideshow.json` (ADR-007)

În Keystatic e un *singleton* „Pagina principală → Slideshow”: `fields.array` cu `validation.length: { min: 1, max: 10 }`, iar fiecare element e un `fields.conditional` (imagine / video).

| Câmp | Tip | Obligatoriu | Notă |
|---|---|---|---|
| `intervalSecunde` | număr 4–10 | da | implicit 6 |
| `slideuri[].tip` | `imagine` / `video` | da | |
| `slideuri[].imagine` | imagine, orizontală | da (tip imagine) | min. 1920 px lățime; se afișează prin `next/image` |
| `slideuri[].imagineMobil` | imagine, verticală | nu | dacă lipsește, se decupează `imagine` după `punctFocal` |
| `slideuri[].punctFocal` | text `"X% Y%"` | nu | implicit `"50% 50%"` |
| `slideuri[].video.desktop` | fișier MP4 H.264, 16:9 | da (tip video) | ≤ 8 MB; build-ul avertizează peste prag și eșuează peste 15 MB |
| `slideuri[].video.mobil` | fișier MP4 H.264, 9:16 sau 4:5 | nu | ≤ 4 MB; dacă lipsește, mobilul vede posterul |
| `slideuri[].video.poster` | imagine | da (tip video) | primul cadru; e imaginea principală (LCP) dacă slide-ul e primul |
| `slideuri[].alt` | text | da | descrie ce se vede, pentru cititoare de ecran |

## 7c. Formular cerere de ofertă: `content/formular.json`

5 pași, 25 de câmpuri. **Obligatorii (5):** tip eveniment, data, nume, telefon, email. Butonul „Trimiteți cererea” apare **după pasul 2**, iar pașii 3–5 (salon și meniu, buget și extra, despre dumneavoastră) sunt opționali.

| Element | Notă |
|---|---|
| `pasi[].campuri[]` | `id`, `label`, `tip` (`select`, `multiselect`, `radio`, `checkbox`, `date`, `number`, `text`, `tel`, `email`, `textarea`), `obligatoriu`, `optiuni[] {value, label}`, `ajutor` |
| `optiuni[].value` | **nu se schimbă**: apare în email și în scor |
| `subiectEmail` | șablonul subiectului; începe mereu cu `[Site Riviera] Cerere ofertă` (numărare manuală, ADR-005) |
| `scor` | reguli de calificare (Cald / Mediu / Rece), calculate în browser și trimise doar în email |
| `ascunse` | pagina sursă, venit din calculator + estimarea, `utm_*` din URL, `botcheck` (honeypot) |
| `final.marketing` | bifă separată, **nebifată implicit**, pentru oferte pe email |

Saloanele și pachetele opționale sunt generate din `saloane/*.json` și `pachete.json`, ca să rămână sincronizate.

## 8. Pagini: `content/pagini/<pagina>.mdx`

Antet (frontmatter) obligatoriu pentru fiecare pagină:

```yaml
seoTitlu: "max. 60 caractere"
seoDescriere: "max. 155 caractere"
h1: "titlul vizibil"
cta:
  text: "textul butonului principal"
  actiune: whatsapp | estimare | telefon | formular
```

Corpul paginii: secțiuni marcate cu `## Titlu secțiune`. Componentele (carduri de saloane, testimoniale, calculator) sunt inserate de șablonul paginii, nu scrise în text.
