# ADR-006: Formular de contact prin Web3Forms

## Notă 2026-10-28 (regula 8)
- Formularul a devenit un formular în 5 pași, cu 25 de câmpuri (`content/formular.json`).
- Fallback-ul pe WhatsApp trimite **doar câmpurile cheie**: tip, dată, invitați, saloane și nume.
- Planul gratuit Web3Forms: **250 de trimiteri pe lună** (pagina oficială de prețuri, prin căutare, 2026-10-28; accesul direct a dat 403).
- **Contradicție de verificat:** surse terțe spun că planul gratuit păstrează istoricul trimiterilor **30 de zile**. Textul de mai jos spune că trimiterile nu se stochează. Se verifică în contul Web3Forms, înainte de lansare.

## Status
**Acceptat** (decizia clientului la GATE 2, 2026-10-28). Înlocuiește [ADR-003](003-formular-contact.md).

## Context
- Clientul a ales planul gratuit Vercel Hobby și Web3Forms pentru formular.
- **Canalul principal rămâne WhatsApp.** Formularul e canal secundar.
- **Cerințele din prompt:** endpoint configurabil prin variabilă de mediu, validare, mesaj de confirmare, fără date personale în repo.
- **Fapte despre Web3Forms** (FAQ oficial, verificat 2026-10-28, [docs.web3forms.com](https://docs.web3forms.com/getting-started/faq)):
  - serverele sunt în **US-East**;
  - trimiterile **nu se stochează**, ci se trimit pe email sau la un webhook;
  - log-urile care conțin date personale se șterg periodic, **la ~2 luni**;
  - cheia de acces e **publică**: cine o are poate doar să vă trimită emailuri;
  - protecție la spam: captcha (hCaptcha, reCaptcha sau Turnstile), firewall propriu; restricția pe domeniu e doar pe planul Pro;
  - **DPA nu apare**; furnizorul spune că „crede” că e conform GDPR, dar recomandă consult juridic.
- **Limita planului gratuit:** 250 de trimiteri pe lună (din rezumatul paginii de prețuri, neverificat direct, pagina a răspuns 403).

## Decizie
- **Trimitere din browser:** formularul face `POST` direct spre Web3Forms. Nu avem funcție proprie pe server pentru formular.
- **Configurare:** variabila de mediu `NEXT_PUBLIC_FORM_ENDPOINT` (implicit `https://api.web3forms.com/submit`) și `NEXT_PUBLIC_WEB3FORMS_KEY`. Cheia e publică prin design, dar **stă în variabila de mediu din Vercel, nu în repo**. Schimbarea furnizorului înseamnă schimbarea variabilelor și a unui singur modul de trimitere.
- **Validare:** în browser, cu schemă. Câmpurile obligatorii sunt nume, telefon, data dorită, tipul evenimentului și acordul GDPR.
- **Confirmare:** mesaj pe pagină, fără redirect.
- **La eroare:** butonul WhatsApp pre-completat cu aceleași date.
- **Anti-spam:** câmp honeypot. Captcha (de preferat Turnstile) doar dacă apare spam, pentru că poate adăuga cookie-uri sau scripturi terțe `[neverificat]`.
- **Destinatar:** adresa de email setată în contul Web3Forms. Cine creează contul și ce adresă folosește e `[DESCHIS]`.
- **Politica de confidențialitate** menționează explicit:
  - Web3Forms ca procesator;
  - transferul în SUA;
  - lipsa stocării și ștergerea log-urilor la ~2 luni.

## Consecințe

### Pozitive
- $0. Fără cont SMTP de configurat. Fără cod pe server pentru formular.
- Furnizorul se poate schimba ușor (endpoint configurabil).

### Negative
- **Date personale procesate în SUA, fără DPA publicat.** E un risc de conformitate acceptat de client, de confirmat cu un consultant juridic.
- Limita gratuită de 250 de trimiteri pe lună (neverificată) e suficientă pentru volumul așteptat, dar nu are rezervă la vârfuri de spam.
- Fără restricție pe domeniu în planul gratuit, cheia publică poate fi folosită de alții pentru spam.

### Neutre
- Pentru formular, regiunea fra1 nu mai contează. Rămâne setată pentru Keystatic.

## Alternative considerate
- **Route Handler + SMTP ANNA (ADR-003):** date doar în UE, dar cere un cont SMTP dedicat. Clientul a ales Web3Forms.
- **Resend:** trimitere din UE, dar datele contului sunt în SUA, iar integrarea cere cod pe server.
- **Formspree:** 50 de trimiteri pe lună pe planul gratuit, locația datelor nedeclarată.

## Referințe
- https://docs.web3forms.com/getting-started/faq
- docs/architecture/adr/003-formular-contact.md
