# ADR-003: Formular de contact: Route Handler în fra1 → email SMTP, fără stocare

## Status
**Înlocuit de [ADR-006](006-formular-web3forms.md)** (decizia clientului la GATE 2, 2026-10-28). Păstrat pentru istoric.

## Context
- **Canalul principal e WhatsApp.** Formularul e un canal secundar pentru cei care preferă emailul.
- **Cerințele din prompt:** endpoint configurabil prin variabilă de mediu, validare, mesaj de confirmare, fără date personale în repo.
- **Date colectate:** nume, telefon, email, data dorită, tip eveniment, salon, număr de invitați, mesaj, acord GDPR.
- **Regiunea implicită a funcțiilor Vercel e iad1 (SUA).** Poate fi setată la fra1 (verificat 2026-10-28).
- **Alternative externe** (verificat 2026-10-28): Resend păstrează metadatele în SUA; Web3Forms are serverele în US-East; Formspree nu declară locația datelor.

## Decizie
- **Endpoint:** `POST /api/contact`, Route Handler Next.js, cu `regions: ['fra1']`.
- **Validare:** pe server, cu aceeași schemă ca în browser. Câmpurile obligatorii sunt nume, telefon, data, tipul evenimentului și acordul.
- **Trimitere:** email prin SMTP către `CONTACT_TO`. Credențialele vin din variabilele `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` și `SMTP_FROM`, setate doar în Vercel.
- **Fără stocare:** nu se scrie nimic pe disc sau în baze de date. În log-uri nu apar date personale, doar „trimis/eșuat” și un ID.
- **Anti-spam:** câmp honeypot, timp minim de completare și rate-limit pe IP, în memorie, ca protecție de bază. Cloudflare Turnstile e opțiune de rezervă dacă apare spam (`neverificat`: preț și condiții).
- **La eroare:** mesajul spune că cererea nu a putut fi trimisă și oferă butonul WhatsApp pre-completat cu aceleași date.
- **Variabila `CONTACT_ENDPOINT_MODE`** permite înlocuirea SMTP cu un webhook (de ex. un CRM) fără schimbări de cod.

## Consecințe

### Pozitive
- Datele trec doar prin Frankfurt și ajung la serverul de email ANNA. Nu e nevoie de alt furnizor.
- Niciun cost suplimentar.
- Eroarea nu pierde cererea, pentru că vizitatorul e trimis spre WhatsApp.

### Negative
- Depinde de un cont SMTP al ANNA, cu furnizor, regiune și limite **necunoscute încă** `[DESCHIS]`.
- Rate-limit-ul în memorie nu e global între instanțe. E acceptabil pentru volumul așteptat.

### Neutre
- Tipul de eveniment și salonul vin din aceleași fișiere de conținut ca restul site-ului.

## Alternative considerate
- **Resend:** gratuit pentru 3.000 de emailuri pe lună, cu trimitere din regiunea UE, dar **datele contului și log-urile stau în SUA**. Rămâne rezervă dacă ANNA nu are SMTP utilizabil.
- **Web3Forms / Formspree:** respinse, pentru că datele sunt procesate în SUA sau în locație nedeclarată.
- **Stocare într-o bază de date (CRM propriu):** respinsă pentru v1, fiindcă adaugă obligații GDPR (retenție, ștergere) fără un beneficiu cerut.

## Referințe
- https://vercel.com/docs/functions/configuring-functions/region
- https://resend.com/docs/dashboard/domains/regions
- https://docs.web3forms.com/getting-started/faq
