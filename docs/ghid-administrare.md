# Ghid: cum schimbați pozele pe rivieraevents.ro

Panoul de administrare (Keystatic) vă lasă să schimbați fără programator:
- pozele din slideshow-ul de pe prima pagină;
- pozele fiecărui salon;
- pozele fiecărui pachet (Candy Bar, Cocktail Bar etc.);
- pozele de sus ale paginilor, poza tortului și pozele apartamentului mirilor;
- portofoliul;
- linkurile tururilor virtuale.

Textele, meniurile și prețurile **nu** se schimbă de aici: ele stau în fișierele din `content/` și le modifică echipa tehnică.

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

- **Imaginea principală:** apare pe cardul salonului și în partea de sus a paginii lui. **Choose file** o înlocuiește.
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
