# Brief: site Riviera Events by ANNA

**Versiune:** 1.0 (Faza 1), 2026-10-28
**Status:** în așteptarea GATE 1
**Surse:** răspunsurile clientului din sesiunea de brief, [references.md](references.md), annaevents.ro (verificat 2026-10-28).
**Convenție:** `[PRESUPUNERE]` înseamnă o presupunere care trebuie confirmată, `[DESCHIS]` o întrebare fără răspuns.

---

## 1. Context

**Ce este:**
- Riviera Events este un complex de evenimente pe **malul Jiului, în Târgu Jiu**, cu 3 saloane, și face parte din **Grupul ANNA**.
- Grupul mai are complexul **ANNA Events pe Insulița** (Parcul Central), cu 4 saloane, prezentat pe annaevents.ro.

**Ce face noul site:**
- **Pune Riviera în față**: cele 3 saloane Riviera sunt primele.
- **Prezintă și cele 4 saloane ANNA Events**, ca ofertă a grupului.
- annaevents.ro **rămâne neschimbat**. Nu se face migrare.
- Meniurile sunt **aceleași** pe ambele complexe.

| Complex | Salon | Capacitate maximă | Potrivit pentru |
|---|---|---|---|
| **Riviera** (malul Jiului) | Premiere | 300 | nuntă, botez, corporate |
| | Noblesse | 300 | nuntă, botez, corporate |
| | Rosa | 400 | nuntă, botez, corporate |
| **ANNA Events** (Insulița) | Grande | 800 | nuntă, botez, corporate |
| | Ronda | 400 | nuntă, botez, corporate |
| | Magic | 300 | nuntă, botez, corporate |
| | Estuar | 100 | evenimente mici |

**Reguli de funcționare:**
- Fiecare salon găzduiește un singur eveniment odată. Saloanele nu se combină.
- Denumirea corectă e **„Premiere”**. Pe annaevents.ro apare „Premier”, iar în URL „nobles”: inconsecvențe de semnalat echipei care administrează site-ul vechi.

**Capacitatea minimă** a fiecărui salon nu e cunoscută. `[DESCHIS]`

## 2. Obiectiv măsurabil

**Indicator principal:** cereri de ofertă calificate pe lună, adică cereri cu dată, tip eveniment și număr de invitați. Se numără:
- click-uri pe WhatsApp (din bara fixă, calculator sau paginile de salon);
- formulare trimise;
- click-uri pe telefon.

**Ținta:** volumul actual de cereri și de contracte **nu este cunoscut** (confirmat de client). De aceea site-ul trebuie să măsoare cererile de la prima zi. Propunerea:
1. Primele 60 de zile după lansare măsurăm nivelul de bază (`[PRESUPUNERE]`: cu analytics fără cookies, decis în Faza 2).
2. Ținta: **+30% cereri calificate** față de nivelul de bază, după 6 luni. `[PRESUPUNERE]`, cifră de discutat.

> **Notă GATE 2 (regula 8, 2026-10-28):** clientul a ales doar Vercel Web Analytics pe planul Hobby, care **nu măsoară automat clicurile pe WhatsApp și pe telefon**. Indicatorul principal se numără astfel:
> - WhatsApp: manual, din marcajul de sursă din mesajul pre-completat;
> - formular: din emailurile Web3Forms.
>
> Indicatorii secundari de mai jos nu sunt măsurabili automat cât timp site-ul e pe Hobby. Vezi [ADR-005](architecture/adr/005-analytics-si-cookies.md).

**Indicatori secundari:**
- rata de folosire a calculatorului de buget (pornit → trimis pe WhatsApp);
- rata de click pe WhatsApp per pagină de salon.

**Termen:** **cât mai repede** (confirmat de client), ideal înainte de sezonul de rezervări pentru nunțile din 2027. Prioritatea e o v1 lansabilă rapid. Ce nu e esențial trece în v2.

## 3. Public

| Segment | Pondere | Context | Ce caută pe site |
|---|---|---|---|
| **Cupluri care organizează nunta** | peste 60% | Vin de pe telefon, din recomandări și Instagram/Facebook, deci deja „încălziți”. Vârf de căutare în mai–octombrie. | Poze reale, capacitate, „cât costă aproximativ”, dacă data e liberă, cum arată meniul |
| **Părinți care organizează botezul** | o parte din restul | Eveniment mai mic, decizie mai rapidă | Salon potrivit ca mărime, meniu, servicii pentru copii `[PRESUPUNERE]` |
| **Firme** (corporate) | o parte din restul | Petreceri de sfârșit de an, conferințe | Capacitate, logistică, factură, parcare |

**Canale de intrare, după volum:** recomandări → Instagram/Facebook → Google → annaevents.ro → telefon/WhatsApp direct.
**Concluzie:** majoritatea vizitatorilor sunt pe mobil și deja interesați. Site-ul trebuie să-i **convingă repede** și să le dea **un buton WhatsApp la îndemână**, nu să-i educe de la zero.

## 4. Propunerea de valoare

**Ce vă diferențiază, în ordinea importanței:**
1. **Locația pe malul Jiului**: cadru natural, poze.
2. **Totul într-un singur loc, în grup**: meniuri, torturi de la Cofetăria Anna, baruri tematice, decor, flori, cazare la Hotel ANNA, apartamentul mirilor, parcare.
3. **Flexibilitate**: 3 saloane Riviera plus 4 în grup, de la 100 la 800 de invitați.
4. **Calitatea mâncării** și reputația ANNA în Târgu Jiu.
5. **Experiență**: peste 20 de ani (afirmație de pe annaevents.ro).

**Prețul nu e argument de vânzare.** Site-ul nu se poziționează pe „ieftin”.

**Formulare de lucru** (nu e text final; textele finale se scriu în Faza 3):
> Nunta voastră pe malul Jiului, cu tot ce ține de ea într-un singur loc: saloane pentru 100 până la 800 de invitați, bucătăria ANNA, tort, baruri și cazare pentru oaspeți.

## 5. Obiecții și cum le tratează site-ul

| Obiecție | Răspuns pe site |
|---|---|
| **Preț**: „nu știu cât costă” | **Calculator de buget estimativ (decizia A):** vizitatorul alege tipul evenimentului, numărul de invitați și salonul, și vede un *interval* „între X și Y lei”. Nu apare prețul pe meniu. Butonul „Primiți oferta exactă pe WhatsApp” pre-completează mesajul. Prețurile pe meniu **nu sunt publice** (decizia C). |
| **Preț**, valoare | Lista „Ce include” (tiparul Royal Hall), serviciile grupului, opțional oferte de extrasezon sau zile din săptămână `[DESCHIS: există așa ceva?]` |
| **Data indisponibilă** | Câmpul „data dorită” apare în calculator, formular și mesajul WhatsApp. Mesajul „Verificăm disponibilitatea și vă răspundem în X ore” `[DESCHIS: în cât timp răspundeți?]`. **Fără calendar public în v1.** Ar cere sincronizare cu sistemul de rezervări. |

## 6. Sitemap propus

```
/                              Acasă
/saloane                       Toate saloanele: Riviera primele, filtru după nr. de invitați
  /saloane/rosa                Riviera
  /saloane/noblesse            Riviera
  /saloane/premiere            Riviera
  /saloane/grande              ANNA Events, Insulița
  /saloane/ronda               ANNA Events, Insulița
  /saloane/magic               ANNA Events, Insulița
  /saloane/estuar              ANNA Events, Insulița
/pachete                       Ce include oferta + servicii premium (baruri, tort, decor, cazare)
/meniuri                       Cele 5 meniuri, text pe tab-uri, fără prețuri
/estimare-buget                Calculatorul (accesibil și din bara fixă)
/portofoliu                    Evenimente realizate
  /portofoliu/[eveniment]      Câte o pagină per eveniment (3–5 poze, salon, tip)
/despre                        Grupul ANNA, experiența, echipa
/contact                       Formular, WhatsApp, telefoane, 2 adrese, 2 hărți
/politica-de-confidentialitate
/politica-cookies              Doar dacă există cookies neesențiale (Faza 6)
/termeni
```

**Note:**
- **Pagini per tip de eveniment** (`/nunti`, `/botezuri`, `/corporate`) există la Royal Hall și Villa Trevi și ajută la SEO. **Nu le-am inclus**, pentru că structura ta de conținut din Faza 3 nu le are. `[DESCHIS: le vrem?]`
- **Saloanele de pe Insulița** au **pagini complete** pe noul site (decizie client), cu același șablon ca Riviera. Ele apar și pe annaevents.ro, deci ca să nu concureze cele două site-uri în Google: texte scrise separat (nu copiate), link reciproc spre annaevents.ro, Riviera în centrul paginii principale și al titlurilor. Detaliile tehnice (de ex. canonical) se decid în Faza 2.

## 7. Cerințe funcționale

**Obligatorii în v1:**
1. **Bară fixă pe mobil** cu WhatsApp, Sună și Estimare. WhatsApp e canalul principal.
2. **WhatsApp pre-completat**:
   - pe pagina de salon: salonul;
   - din calculator: tip, dată, invitați, salon, interval.
   - Număr: 0746 085 555 `[PRESUPUNERE: același ca pe annaevents.ro]`.
3. **Calculator de buget** (intervale), cu datele într-un fișier editabil.
4. **Formular de contact** cu dată, tip eveniment, salon, număr de invitați (intervale ca pe annaevents.ro), nume, telefon, email, mesaj și acord GDPR. Endpoint configurabil, fără date personale în repo.
5. **Pagină de salon** cu același șablon:
   - date cheie (capacitate, complex, adresă, potrivit pentru);
   - descriere unică;
   - galerie;
   - tur 360 (există pe annaevents.ro);
   - buton WhatsApp pentru salon;
   - celelalte saloane.
6. **Comparare saloane** după numărul de invitați, pe /saloane.
7. **Meniuri** în format text, pe tab-uri: Premium Platinum, Gold, Silver, Bronze, Vegetarian. Fără prețuri. Mențiune vegetarian / fără gluten.
8. **Testimoniale** cu salonul și data.
9. **SEO tehnic:** sitemap.xml, robots.txt, Open Graph, schema.org EventVenue / LocalBusiness pentru **2 adrese**.
10. **Mobile-first**, banner de cookies compact (sau deloc, dacă nu folosim cookies neesențiale).

**De evaluat în Faza 2:**
- **Panou de administrare pentru media.** Cerință: *cineva de la ANNA poate urca, șterge și reordona poze și clipuri (galerii de salon, portofoliu) fără GitHub*. Textele, meniurile și intervalele de buget pot rămâne în fișiere. Notă: această cerință și opțiunea obligatorie „fără CMS în v1” trebuie împăcate în Faza 2.
- **Găzduirea clipurilor video:** fișiere proprii sau YouTube (grupul are deja canal YouTube).

**În afara v1:**
- Calendar public de disponibilitate.
- Prețuri publice pe meniu.
- Plată sau avans online.
- Versiune în engleză (limba: doar RO).
- Migrarea sau modificarea annaevents.ro.

## 8. Conținut necesar, pe pagini

Legendă: ✅ există (confirmat de client sau vizibil pe annaevents.ro) · ❓ de confirmat · ❌ lipsește

### Acasă
- **Text:** titlu cu ce, unde și pentru câți invitați; 3–5 diferențiatori; scurtă prezentare Riviera și grup; titlu SEO și meta description. *(Faza 3)*
- **Poze:** 1 hero (Riviera, malul Jiului, peisaj ✅❓); 1 poză per salon ✅
- **Date:** lista saloanelor cu capacități ✅; 3–6 testimoniale ✅ (8 pe annaevents.ro, de confirmat dacă se pot folosi); cifre de încredere: ani de experiență ✅, număr de evenimente ❌
- **Video (opțional):** clip de prezentare ❓

### Saloane (x7), per salon
- **Text:** descriere de 80–150 de cuvinte, unică *(Faza 3)*; 3–5 puncte forte ❌ (ex. terasă, ring de dans, lumină naturală)
- **Date:**
  - capacitate maximă ✅
  - capacitate minimă ❌
  - suprafață m² ❌
  - complex și adresă: Riviera ✅ (Aleea Digului nr. 5); Insulița ❓
  - potrivit pentru ✅
  - dotări ❌ (aer condiționat, scenă, camera mirilor, acces separat, parcare)
- **Poze:** 8–15 per salon, amenajat ✅ (9 pe annaevents.ro, de verificat calitatea și sursa originală)
- **Tur 360:** ✅ există; URL-ul de embed trebuie confirmat ❓
- **Plan de amplasare a meselor:** ❌ (opțional)

### Pachete
- **Text:** ce include oferta standard ❌ (de ex. coordonator, degustare, tort, șampanie de întâmpinare: de confirmat ce oferiți efectiv)
- **Servicii premium:** Candy Bar, Cocktail Bar, Cheese Bar, Lemonade Bar, Sushi Bar, Gentlemen's Corner, Shot cake, BBQ ✅, cu descriere scurtă ❌ și 1 poză fiecare ❓
- **Torturi:** Cofetăria Anna, catalog ✅ (pe annaevents.ro, ca imagini)
- **Cazare:** Hotel ANNA, Hotel ANNA Junior, apartamentul mirilor ✅, cu detalii ❓
- **Oferte de sezon sau zile din săptămână:** ❓

### Meniuri
- **Date:** cele 5 meniuri, felurile pe secțiuni (aperitiv, ciorbă, fel intermediar, fel principal, desert) ✅. Azi sunt **46 de imagini JPG** pe annaevents.ro și trebuie transcrise în text. Avem nevoie de fișierul sursă (Word/PDF) ❓
- **Opțiuni speciale:** vegetarian, fără gluten ✅; altele (vegan, copii) ❓
- **Poze:** 1–3 per meniu ✅❓

### Estimare buget
- **Date:** pentru fiecare tip de eveniment, interval minim–maxim în lei/persoană ❌. Opțional: costul serviciilor extra ca interval ❌. Anul de valabilitate ❌.
- **Text:** mențiune legală „estimare orientativă, nu ofertă fermă” *(Faza 3)*

### Portofoliu
- **Date:** 6 evenimente, fiecare cu tip, salon, lună/an, 3–5 poze și 1–2 fraze ❓ (există „Evenimente 2025” pe annaevents.ro)
- **Acord:** permisiunea cuplurilor pentru folosirea pozelor și a numelor ❓

### Despre
- **Text:** istoria grupului, peste 20 de ani, echipa sau coordonatorul de evenimente ❓
- **Poze:** echipă, bucătărie ❓
- **Rețeaua ANNA:** linkuri spre cele 9 afaceri din grup ✅

### Contact
- **Telefoane:** 4 numere ✅. Trebuie stabilit ce rol are fiecare (rezervări, WhatsApp, corporate) ❓
- **Email:** rezervari@annaevents.ro ✅. Folosim același sau unul nou pe domeniul Riviera? ❓
- **Adrese:** Riviera ✅ **Aleea Digului nr. 5, Târgu Jiu**; Insulița ❓ (doar descriere generală, fără stradă și număr)
- **Program de vizitare a saloanelor** ❓
- **Social:** Facebook, Instagram, YouTube ✅. Riviera are conturi separate? ❓

### Legal
- **Firma** (denumire, CUI, sediu), pentru footer și politica de confidențialitate ❓
- **Cine primește datele din formular** (operatorul de date) ❓

### Identitate
- **Logo Riviera Events** în format vectorial (SVG/AI/PDF) ✅❓
- **Ghid de brand:** culori, fonturi ❓ (dacă nu există, propunem în Faza 4)

## 9. Restricții

- **Buget:** minim. Trafic mic. Întreținut de **o singură persoană**.
- **Limba:** doar română. Adresare cu „dumneavoastră”.
- **GDPR:** politica de confidențialitate, consimțământ doar pentru cookies neesențiale, găzduire și formular în UE sau documentate.
- **Domeniu:** **www.rivieraevents.ro** (confirmat de client). Dacă e deja cumpărat și la ce registrar `[DESCHIS]`, necesar pentru DNS în Faza 6.
- **Repo / hosting:** GitHub `challymcchallenge/rivieraevents`, proiect Vercel `rivieraevents` (create pe 2026-10-28). Stack-ul final se decide în Faza 2.

## 10. Întrebări deschise (pentru GATE 1)

**Rezolvate (2026-10-28):**
- Volumul actual de cereri: necunoscut, deci măsurăm de la lansare.
- Termen: cât mai repede.
- Saloanele de pe Insulița: pagini complete.
- Adresa Riviera: Aleea Digului nr. 5, Târgu Jiu.
- Domeniu: www.rivieraevents.ro.

**Încă deschise (nu blochează Faza 2):**
1. **Ce tip de eveniment vreți să crească?** (`[PRESUPUNERE]`: nunțile.)
2. **Pagini per tip de eveniment** (nunți, botezuri, corporate): da sau nu?
3. **Cine urcă pozele** după lansare: tu sau cineva din echipa ANNA?
4. **Adresa exactă** a complexului de pe Insulița.
5. **Numărul de WhatsApp** pentru Riviera: același 0746 085 555?
6. **În cât timp răspundeți** la o cerere (pentru mesajul de disponibilitate)?
7. **Oferte de extrasezon** sau de zile din săptămână: există?
8. **Domeniul rivieraevents.ro**: e deja cumpărat? La ce registrar?
9. **Testimonialele și pozele** de pe annaevents.ro: le putem refolosi?

> **Modificare 2026-10-28 (regula 8):** capacitățile de pe Insulița erau 1.200 / 900 / 700. Clientul a ales cifrele din catalogul 2026: Grande 800, Ronda 400, Magic 300, Estuar 100.
