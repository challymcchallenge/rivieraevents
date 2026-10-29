# Ghid: cum schimbați pozele pe rivieraevents.ro

Panoul de administrare (Keystatic) vă lasă să schimbați fără programator:
- pozele din slideshow-ul de pe prima pagină;
- pozele fiecărui salon;
- pozele fiecărui pachet (Candy Bar, Cocktail Bar etc.);
- **meniurile**: numele, descrierile, felurile și toate pozele lor;
- pozele de sus ale paginilor, poza tortului și pozele apartamentului mirilor;
- portofoliul;
- linkurile tururilor virtuale.

Celelalte texte (paginile, saloanele, pachetele, bugetul) **nu** se schimbă de aici: ele stau în fișierele din `content/` și le modifică echipa tehnică.

> Butoanele din panou sunt în engleză: **Add** (adaugă), **Save** (salvează), **Choose file** (alege fișierul), **Remove** (șterge).

---

## 1. Intrarea în panou

1. Deschideți **https://www.rivieraevents.ro/keystatic**.
   - Până se leagă domeniul, adresa e **https://rivieraevents.vercel.app/keystatic**.
   - Pe adresa vercel.app trebuie să fiți logat și în contul Vercel, pentru că site-ul de test e protejat.
2. Apăsați **Sign in** și intrați cu contul Keystatic Cloud.
3. Pot lucra **maximum 3 persoane** (planul gratuit). Persoanele noi le invită administratorul contului Keystatic Cloud, din **Team → Members**.

**Ce se întâmplă la salvare:**
- La fiecare **Save**, Keystatic salvează modificarea pe GitHub.
- Vercel publică automat site-ul nou în **1–2 minute**.
- Dacă nu vedeți schimbarea, așteptați 2 minute și reîncărcați pagina.

---

## 2. Slideshow-ul de pe prima pagină

Meniu: **Pagina principală → Slideshow pagina principală**.

- **Adăugare:** **Add**, apoi tipul **Imagine** sau **Video**, apoi completați câmpurile:
  - **Imagine (orizontală):** poza pentru calculator. Lățime minimă 1920 px.
  - **Imagine pentru telefon (opțional):** o poză verticală. Fără ea, se decupează poza orizontală.
  - **Punct focal:** unde rămâne subiectul pe telefon când poza se decupează. `50% 50%` = centru, `50% 30%` = mai sus, `30% 50%` = mai la stânga.
  - **Text alternativ:** o frază despre ce se vede, de exemplu „Salonul Rosa, cu candelabrul floral”. E obligatoriu.
- **Ordine:** trageți slide-urile în sus sau în jos. **Primul slide e cel mai important**, pentru că e singurul pe care îl văd toți vizitatorii.
- **Ștergere:** deschideți slide-ul și apăsați **Remove**.
- **Câte slide-uri:** între 1 și 10.
- **Secunde pe slide:** între 4 și 10 (acum 6).
- La final: **Save**.

**Poza sau video-ul pentru telefon:** fiecare slide are câmpul **„Imagine pentru TELEFON”** (la video: **„Video pentru TELEFON”**).
- În lista de slide-uri scrie, la fiecare, „telefon: separat” sau „telefon: aceeași, decupată”.
- **Când schimbați poza de calculator, verificați și poza de telefon:** altfel telefonul arată în continuare poza veche.
- **Remove** la poza de telefon = pe telefon se vede poza de calculator, decupată în jurul **punctului focal**.

**Video (clipul profesionist):**
- Tipul **Video**, apoi încărcați:
  - fișierul pentru desktop: MP4, 16:9, **maximum 8 MB**;
  - opțional, fișierul pentru telefon: 9:16 sau 4:5, **maximum 4 MB**;
  - **posterul**: o poză din primul cadru, care se vede până se încarcă video-ul.
- Un video mai mare de 15 MB oprește publicarea site-ului. Specificațiile pentru videograf sunt în `docs/content-checklist.md`, secțiunea 15.

**De ce nu se mișcă slideshow-ul pe unele dispozitive:** dacă telefonul sau calculatorul are animațiile oprite din setări (accesibilitate), slideshow-ul rămâne pe prima poză. E intenționat, pentru persoanele cărora mișcarea le face rău. Pe Windows, setarea e în **Setări → Accesibilitate → Efecte vizuale → Efecte de animație**.

---

## 3. Pozele unui salon

Meniu: **Saloane → Poze saloane**, apoi alegeți salonul (Rosa, Noblesse etc.).

- **Imaginea principală:** apare sus, pe pagina salonului (titlul se scrie peste ea). Orizontală, minimum 1920 px. **Choose file** o înlocuiește.
- **Poza de copertă:** apare pe cardul salonului, pe **Acasă** și pe pagina **Saloane**. Se decupează vertical (saloanele Riviera) sau pătrat (Insulița), deci alegeți o poză cu subiectul în centru. **Remove** = cardul folosește imaginea principală.
- **Galerie:** recomandat 10–15 poze.
  - **Add**, apoi **Choose file**, apoi scrieți textul alternativ.
  - **Ordine:** trageți pozele. Primele se văd primele în galerie.
  - **Ștergere:** deschideți poza, apoi **Remove**.
- **Linkuri tur virtual:** linkul turului salonului și, la Riviera, al apartamentului mirilor. Un câmp gol înseamnă că butonul de tur nu apare.
- **Nu schimbați câmpul „Salon”** (numele). El leagă pozele de textul salonului.
- La final: **Save**.

---

## 4. Pozele unui pachet

Meniu: **Pachete → Poze pachete**, apoi alegeți pachetul (Candy Bar, Cocktail Bar, Sushi Bar etc.).

- **Imaginea principală:** apare pe cardul pachetului (pe Acasă și pe pagina Pachete) și sus, pe pagina pachetului.
- **Galerie:** maximum 15 poze. Se văd pe pagina pachetului, în grila de tip mozaic.
  - **Add**, apoi **Choose file**, apoi scrieți textul alternativ.
  - **Ordine:** trageți pozele. Recomandat: prima poză din galerie = imaginea principală.
  - **Ștergere:** deschideți poza, apoi **Remove**.
- **Nu schimbați câmpurile „Pachet” și „Slug”.** Ele leagă pozele de textul pachetului.
- Numele și descrierea pachetului nu se schimbă de aici, ci din `content/pachete.json` (echipa tehnică).
- La final: **Save**.

---

## 4b. Meniurile

Meniu: **Meniuri**, apoi alegeți meniul (Premium Platinum, Gold, Silver, Bronze, Vegetarian).

- **Numele meniului** și **Ordinea pe pagină** (1 = primul tab). **Nu schimbați „Slug”-ul** unui meniu publicat.
- **Descriere scurtă:** o frază, sub numele meniului. **Fără prețuri.**
- **Felurile meniului:** Starter, Starter cald, Tradițional, Fel principal. Fiecare are o descriere și poza de pe card.
  - Regula clientului: **fără numele preparatelor** (concurența copiază). Descrieți momentul, nu rețeta.
- **Galerie:** toate pozele meniului (maximum 60).
  - **Add**, apoi **Choose file**, apoi alegeți **Felul din poză** și scrieți textul alternativ.
  - Pe site, pozele se așază automat în ordinea felurilor (Starter → Fel principal), deci felul ales contează.
- **Meniu nou:** **Add** în lista de meniuri, completați tot și dați-i o ordine. Apare ca tab nou pe pagina Meniuri.
- La salvare, Keystatic redenumește fișierele pozelor (ex. `galerie/3/src.jpg`). E normal: felul rămâne salvat în câmpul „Felul din poză”.
- La final: **Save**.

---

## 5. Pozele paginilor

Meniu: **Pagini → Poze pagini**.

| Câmp | Unde apare |
|---|---|
| Saloane, Pachete, Meniuri, Estimare buget, Portofoliu, Despre noi, Contact, Tur virtual: **poza de sus** | antetul paginii respective, sub titlu |
| Pagina principală: poza de lângă „Cât costă” | secțiunea cu bugetul de pe prima pagină |
| Tortul mirilor | paginile Pachete și Meniuri |
| Apartamentul mirilor | pagina Pachete, la final (prima poză e cea mare) și cardul apartamentului de pe Tur virtual |

- Pentru pozele de sus: **orizontale**, minimum 1920 px lățime. Titlul se scrie peste poză, deci alegeți poze fără text și cu subiectul în centru.
- Pozele de sus ale saloanelor, pachetelor și evenimentelor din portofoliu se schimbă din secțiunile lor (imaginea principală).
- La final: **Save**.

---

## 6. Portofoliul

Meniu: **Portofoliu**.

- **Eveniment nou:** **Add**, apoi completați:
  - **Titlu:** fără numele mirilor, de exemplu „Nuntă cu flori albe în grădină”;
  - **Tip**, **Complex**, **Salon** (sau „Nu se știe”);
  - **Luna:** de exemplu `2026-06`;
  - **Descriere:** 1–2 fraze;
  - **Poze:** 4–6, fiecare cu text alternativ;
  - **bifa „Clienții și-au dat acordul de publicare”.**
- **Fără bifa de acord, evenimentul nu apare pe site.** Așa puteți pregăti un eveniment înainte să aveți acordul.
- La final: **Save**.

---

## 7. Tururile virtuale

Meniu: **Saloane → Tururi virtuale 360**.

- Fiecare tur are un titlu, un complex și un link (de pe annaevents.ro). Un link gol înseamnă că turul nu apare pe pagina „Tur virtual”.
- La final: **Save**.

---

## 7b. Catalogul de evenimente

Meniu: **Pagini → Catalog de evenimente (PDF)**.

- Butonul catalogului apare pe Acasă (la pachete), pe paginile Pachete și Meniuri și în subsolul site-ului.
- **Numele catalogului:** apare în subsol și în numele fișierului descărcat, ex. „Catalogul de evenimente 2027”.
- **Catalogul de la anul, varianta simplă: un link.** În Canva: **Share → View-only link → Copy**, apoi lipiți linkul la **Link spre catalog**. Butoanele devin „Vedeți catalogul” și deschid linkul într-un tab nou. Linkul are prioritate față de fișier.
- **Varianta cu fișier PDF:** **Choose file** la **Fișierul PDF** și ștergeți linkul.
  - Fișierul trebuie să aibă **maximum 25 MB**. Exportul direct din Canva are ~150 MB: GitHub îl refuză (peste 100 MB), iar publicarea se oprește peste 95 MB.
  - Echipa tehnică îl micșorează cu `scripts/catalog-pdf.py` (150 MB → ~18 MB, textul rămâne intact, fiecare pagină e verificată).
- La final: **Save**.

---

## 7b2. Logo și favicon

Meniu: **Pagini → Logo și favicon**.

- **Logo cu text alb:** apare peste pozele de sus ale paginilor și în tema întunecată. În panou se vede slab, pe fundal alb: e normal.
- **Logo cu text negru:** apare în subsol și în meniul de pe telefon, în tema luminoasă.
  - Pentru ambele: **SVG** (cel mai clar) sau PNG cu fundal transparent, orizontal. Pe site au înălțimea de 40 px; lățimea urmează proporția logoului.
- **Favicon:** iconița din tabul browserului și de pe ecranul telefonului (dacă vizitatorul salvează site-ul).
  - **PNG pătrat, minimum 512×512 px, cu fundal plin.** Se vede la 16–32 px, deci un simbol simplu (acum: „R” alb cu bara roșie, pe negru), nu logoul întreg.
  - La publicare, site-ul face singur din el `favicon.ico` și iconița pentru iPhone.
  - Browserele țin favicon-ul vechi în memorie câteva zile; ca să-l vedeți pe cel nou imediat, deschideți site-ul într-o fereastră privată.
- La final: **Save**.

---

## 7c. Versiunea în engleză

- Steagurile din header (RO / EN) traduc site-ul **automat, cu Google Translate**, direct în browserul vizitatorului (ADR-008). Nu există pagini separate în engleză.
- **Nu aveți nimic de tradus:** orice text nou, inclusiv din Keystatic, apare tradus automat.
- **Ce nu se traduce intenționat:** numele saloanelor, ale meniurilor (Gold, Silver…) și ale clienților din testimoniale, telefoanele, datele firmei, titlul „SAVE THE DATE”.
- **Meniul de sus și de jos** (Saloane, Pachete…) are traducerea scrisă de noi (Venues, Packages…), pentru că Google traduce prost cuvintele izolate. Se schimbă din `src/lib/nav.ts` (echipa tehnică).
- **Limitări:** traducerea automată poate avea greșeli și nu se poate corecta din panou. Mesajele de WhatsApp precompletate, emailul formularului și catalogul PDF rămân în română.

---

## 8. Reguli pentru poze

| | Recomandare |
|---|---|
| Format | JPG (sau WebP) |
| Mărime | latura lungă **2000–2560 px**, sub **1,5 MB** |
| De ce contează | Site-ul micșorează singur pozele pentru vizitatori, dar panoul nu micșorează fișierele pe care le încărcați, iar pozele mari încarcă depozitul site-ului |
| Orientare | orizontale pentru slideshow și imaginea principală; verticale doar la „Imagine pentru telefon” |
| Persoane | doar cu acordul lor (mirii, invitații care se văd clar) |
| Text alternativ | descrieți scurt ce se vede; nu „poza 1” |

Pentru pozele direct din telefon (5–10 MB): micșorați-le înainte de încărcare. În Windows, cu aplicația Fotografii → **Redimensionare** → 2048 px.

---

## 9. Dacă ceva nu merge

| Problemă | Ce faceți |
|---|---|
| Nu vedeți modificarea pe site | Așteptați 2 minute și reîncărcați. Dacă tot nu apare, în Vercel → **Deployments** verificați dacă ultima publicare are starea **Ready** sau **Error**. |
| La **Save** apare o eroare | Verificați că toate câmpurile cu * sunt completate (de exemplu textul alternativ) și că video-ul nu depășește limita. |
| Publicarea are starea **Error** | Trimiteți echipei tehnice linkul publicării din Vercel. Site-ul rămâne pe versiunea anterioară, deci vizitatorii nu văd nimic stricat. |
