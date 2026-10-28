# ADR-005: Analytics fără cookie-uri, fără banner de cookies

## Status
Propus (2026-10-28)

## Context
- Obiectivul site-ului e măsurat în **cereri calificate pe lună** (brief §2). Volumul actual nu e cunoscut, așa că măsurarea trebuie să existe de la lansare.
- Pe site-urile analizate, bannerul de cookies acoperă jumătate din ecranul telefonului (docs/references.md).
- Opțiuni verificate pe 2026-10-28:
  - **Vercel Web Analytics:** fără cookie-uri, cu un hash al cererii șters după 24 h. Pe Pro costă $0,03 la 1.000 de evenimente. Evenimentele custom sunt doar pe Pro.
  - **Plausible:** de la $9/lună, găzduit în UE, fără cookie-uri.
  - **Umami Cloud:** gratuit până la 100.000 de evenimente pe lună, dar regiunea e neverificată.

## Decizie
- **Instrument:** Vercel Web Analytics (pe Pro, inclus în credit). Nu se pune pe site niciun cookie de analytics.
- **Evenimente custom pentru conversie:**
  - `whatsapp_click`, cu sursa: bara fixă, salon, calculator;
  - `phone_click`;
  - `form_submit` (succes sau eroare);
  - `estimator_complete`.
- **Fără Google Analytics, Meta Pixel sau alte scripturi de marketing în v1.**
- **Fără banner de cookies**, cât timp nu există cookie-uri neesențiale (vezi ADR-004 pentru YouTube și hartă).

## Consecințe

### Pozitive
- Primul ecran pe mobil rămâne curat.
- Conformitate simplă.
- Avem date de conversie de la prima zi.

### Negative
- Fără Meta Pixel nu se pot face campanii de retargeting pe Instagram sau Facebook. Dacă ANNA vrea reclame plătite, adăugarea pixelului **aduce înapoi bannerul de consimțământ**. E o decizie de marketing de luat separat.
- Datele de analytics stau la Vercel (SUA, cu SCC).

### Neutre
- Costul de ~$0,45 pe lună la 15.000 de evenimente `[estimare]` intră în creditul Pro.

## Alternative considerate
- **Plausible:** cea mai bună rezidență a datelor (UE), dar costă în plus $9/lună. E alternativa dacă rezidența în UE devine obligatorie.
- **Google Analytics 4:** respins pentru v1, pentru că folosește cookie-uri și cere banner de consimțământ.

## Referințe
- https://vercel.com/docs/analytics/privacy-policy
- https://vercel.com/docs/analytics/limits-and-pricing
- https://plausible.io/#pricing
- https://umami.is/pricing
