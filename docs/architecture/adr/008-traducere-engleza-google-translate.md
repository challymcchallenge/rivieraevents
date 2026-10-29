# ADR-008: Versiunea în engleză prin Google Translate, în browser

## Status
**Acceptat** (cerere client, 2026-10-29).
- **Schimbă decizia din brief** „Limba: doar română” (brief.md, §„În afara scopului” și §„Ton”): conținutul rămâne scris doar în română, dar vizitatorul îl poate citi tradus automat în engleză.

## Context
- Clientul vrea un comutator de limbă lângă butonul de temă, care să traducă tot site-ul în engleză, **fără un site separat**. Clientul a furnizat iconițele `lang-ro-icon.svg` și `lang-en-icon.svg`.
- Volumul de text: ~10.600 de cuvinte în `content/` (numărat 2026-10-29).
- Variante prezentate clientului (2026-10-29):
  1. **Traducere scrisă de noi**, pagini `/en/…`, câmpuri EN în Keystatic. Calitate bună, SEO în engleză; textele în engleză trebuie actualizate la fiecare schimbare.
  2. **Traducere automată la publicare** (Google Cloud Translation API), pagini `/en/…`, corecturi în Keystatic. Primele 500.000 de caractere pe lună gratuite, apoi 20 USD/milion ([prețuri](https://cloud.google.com/products/translate/pricing), verificat 2026-10-29). Cere cont Google Cloud; dacă cere card la planul gratuit: **neverificat**.
  3. **Widgetul Google Translate în browser**, pe aceleași adrese.
- **Clientul a ales varianta 3.**

## Decizie
- Componenta `LanguageSwitcher` (în header, lângă tema): două butoane, RO și EN, cu steagurile clientului.
- Scriptul `translate.google.com/translate_a/element.js` se încarcă **doar după ce vizitatorul apasă EN**. Vizitatorii în română nu încarcă nimic de la Google.
- Alegerea se ține minte în `localStorage` (`riviera-limba`). Google citește limba din cookie-ul `googtrans` (`/ro/en`).
- Înapoi la română: se șterge cookie-ul și se reîncarcă pagina.
- Bara și balonul Google sunt ascunse din CSS (`globals.css`).
- `translate="no"` pe: comutator, logo, numele saloanelor, numele din testimoniale, telefoane, datele firmei, titlul „SAVE THE DATE”.
- Google Translate modifică textul direct în pagină, iar React aruncă erori când actualizează noduri mutate (facebook/react#11538). Ocolire: `removeChild` și `insertBefore` ignoră nodurile mutate. Se aplică doar după ce vizitatorul alege EN.

## Consecințe
- **Plus:** nimic de întreținut; traducerea urmează automat orice text nou, inclusiv cel din Keystatic; zero cost; zero impact pe performanță pentru vizitatorii în română.
- **Minus:**
  - Google indexează doar româna (fără pagini `/en/`, fără SEO în engleză).
  - Calitatea e a traducerii automate: termenii de meniu sau numele proprii pot ieși ciudat. Nu se pot corecta.
  - Pagina apare câteva sute de milisecunde în română, apoi se traduce.
  - **Nu se traduc:** mesajele precompletate de WhatsApp, emailul formularului către echipă, textele alternative ale pozelor (Google traduce doar textul vizibil; neverificat pentru `alt`), PDF-ul catalogului.
  - Google nu mai oferă oficial widgetul pentru site-uri noi; scriptul funcționează în continuare (**neverificat** dacă și cât timp mai e susținut). Dacă se oprește, comutatorul rămâne fără efect: varianta 1 sau 2 devine necesară.
- **Date personale:** după click pe EN, textul paginii ajunge la Google, iar Google poate pune cookie-uri proprii. Politica de cookies și cea de confidențialitate au fost completate. Fără banner de acord: scriptul pornește doar la cererea explicită a vizitatorului. [NEED: verificare juridică a acestei abordări]
