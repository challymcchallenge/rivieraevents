# ADR-002: Conținut în fișiere JSON/MDX, fără CMS în v1; Keystatic pentru panoul media

## Status
**Acceptat cu modificare** (GATE 2, 2026-10-28). **Clientul a cerut panoul media de la lansare**, nu în v1.1. Decizia aplicabilă e cea din secțiunea „Decizie revizuită” de mai jos. Restul documentului e păstrat pentru istoric.

## Decizie revizuită (GATE 2)
1. **Panoul de la lansare:** Keystatic (Next.js), în modul **Keystatic Cloud Free**:
   - maximum 3 editori, **fără cont GitHub** ([keystatic.com/docs/cloud](https://keystatic.com/docs/cloud), verificat 2026-10-28);
   - adresa panoului: `rivieraevents.ro/keystatic`.
2. **Ce se editează din panou (v1):**
   - galeriile de poze ale fiecărui salon: urcare, ștergere, ordine, text alternativ;
   - evenimentele din portofoliu: poze, titlu, salon, dată, scurtă descriere;
   - clipurile video, ca linkuri YouTube;
   - turul 360, ca link.
3. **Ce rămâne în fișiere, editabil doar tehnic:** texte de pagină, meniuri, intervale de buget, pachete. Asta evită greșelile în prețuri. Se pot adăuga în panou ulterior, fără migrare, fiindcă sunt aceleași fișiere.
4. **Unde stau pozele:** în repo, deoarece Keystatic Cloud Images cere planul Pro, de la $10/lună. Fiecare salvare face un commit, care declanșează un deploy de 1–2 minute.
5. **Ce cere Keystatic pe hosting:** cod pe server Node.js (rutele `/keystatic` și `/api/keystatic`) ([docs Next.js](https://keystatic.com/docs/installation-next-js), verificat 2026-10-28). De aceea site-ul **nu poate fi export static**. Vercel suportă asta, inclusiv pe Hobby.
6. **Protecția imaginilor:** Keystatic nu redimensionează pozele urcate `[neverificat]`. Pozele mari din telefon (5–10 MB) trebuie limitate fie printr-un câmp de validare, fie printr-un pas de redimensionare la build. Detaliile se stabilesc în Faza 5.

## Context
- Clientul a cerut **„conținut în fișiere (JSON/MDX), fără CMS în v1”**.
- Tot clientul vrea **un panou în care echipa ANNA să schimbe pozele și clipurile** (brief §7). Cele două cerințe se contrazic parțial. La GATE 1 s-a stabilit că le împăcăm aici.
- Termenul e „cât mai repede”. Un CMS complet în v1 ar întârzia lansarea.
- Opțiuni de panou fără ca editorii să aibă cont GitHub (verificat 2026-10-28):
  - **Keystatic Cloud:** Free cu 3 utilizatori; Pro de la $10/lună per echipă; găzduirea imaginilor în Cloud cere Pro.
  - **TinaCloud:** Free cu 2 utilizatori.
  - **Sanity:** Free cu 20 de locuri, dar conținutul e în baza lor de date, nu în repo.

## Decizie
1. **v1:** tot conținutul e în repo:
   - `content/saloane/*.json`, `content/meniuri.json`, `content/buget.json`, `content/pachete.json`;
   - `content/portofoliu/*.mdx`, `content/pagini/*.mdx`;
   - imaginile în `public/` sau `content/`.
2. **Fișierele se validează la build** cu o schemă. O greșeală oprește deploy-ul, nu strică site-ul.
3. **Structura fișierelor respectă de la început formatul Keystatic** (o colecție per tip de conținut, câmpuri de imagine ca liste ordonate). Astfel panoul se adaugă fără migrare de conținut.
4. **v1.1, după lansare** (propunere, decizia clientului): Keystatic Cloud Free pentru maximum 3 editori ANNA, limitat la galerii (saloane, portofoliu). Textele, meniurile și intervalele de buget rămân editabile doar tehnic, ca să evităm greșeli în prețuri.

## Consecințe

### Pozitive
- Lansare rapidă, fără niciun serviciu în plus.
- Conținutul e versionat în git, deci orice greșeală se poate anula.
- Drumul spre panoul media e clar și ieftin ($0 pentru maximum 3 editori, dacă imaginile rămân în repo).

### Negative
- **Până la v1.1, schimbarea unei poze cere o persoană tehnică** (commit în GitHub).
- Imaginile în repo îl măresc. Pragul de mutare în Vercel Blob e ~1 GB (vezi ADR-004).

### Neutre
- Keystatic face commit în repo la fiecare salvare, deci fiecare salvare declanșează un deploy de 1–2 minute.

## Alternative considerate
- **CMS complet în v1** (Sanity, Tina): respins. Întârzie lansarea și contrazice cerința „fără CMS în v1”. Sanity mută conținutul din repo.
- **Decap CMS:** respins. Editorii au nevoie de cont GitHub/GitLab sau de Git Gateway, iar Netlify a renunțat la Git Gateway pentru instalări noi (verificat 2026-10-28).
- **Cloudinary Media Library:** respins. Pe planul gratuit nu are video și datele stau în SUA. Rezidența în UE e doar pe planul Enterprise (din rezumatul paginii oficiale, neverificat direct).

## Referințe
- https://keystatic.com/docs/cloud
- https://tina.io/pricing
- https://decapcms.org/docs/intro/
- https://www.sanity.io/pricing
