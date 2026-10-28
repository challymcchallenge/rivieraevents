# ADR-005: Analytics fără cookie-uri, fără banner de cookies

## Status
**Acceptat: varianta C, doar Vercel Web Analytics pe Hobby** (decizia clientului, 2026-10-28).

**Ce înseamnă:**
- Se măsoară vizitele, paginile și sursele de trafic, până la 50.000 de evenimente pe lună. Peste limită, colectarea se oprește până luna următoare.
- **Nu se pot măsura clicurile pe WhatsApp, pe telefon sau în calculator** (evenimentele custom sunt doar pe Pro).
- Fără cookie-uri, deci fără banner.

**Atenuare gratuită pentru conversii** (propunere, fără instrument de analytics):
1. **Fiecare mesaj WhatsApp pre-completat se termină cu un marcaj de sursă**, de exemplu „(trimis de pe rivieraevents.ro, pagina Salon Rosa)”. Echipa ANNA poate număra cererile venite de pe site direct în WhatsApp.
2. **Cererile din formular** se numără din emailurile Web3Forms (subiect fix, de exemplu „[Site Riviera] Cerere ofertă”).
3. Trecerea pe Vercel Pro activează evenimentele custom fără schimbări mari: codul de tracking poate fi pregătit și dezactivat printr-o variabilă de mediu `[PRESUPUNERE]`, de confirmat în Faza 5.

Tabelul de mai jos e păstrat pentru istoric.

**De ce:** pe planul Hobby ales de client, Vercel Web Analytics are 50.000 de evenimente pe lună, dar **evenimentele custom sunt doar pe Pro** ([docs](https://vercel.com/docs/analytics/limits-and-pricing), verificat 2026-10-28). Decizia de mai jos nu mai poate măsura clicurile pe WhatsApp, care sunt indicatorul principal al site-ului (brief §2).

**Propunere revizuită:**

| Variantă | Ce măsoară | Cost | Rezidență date | Status verificare |
|---|---|---|---|---|
| **A. Umami Cloud Free** (recomandat) | Vizite + evenimente custom (WhatsApp, telefon, formular, calculator) | $0, 100.000 evenimente pe lună, 1 site, retenție 6 luni | Servere în SUA și UE; alegerea regiunii e neverificată | Prețul verificat 2026-10-28 ([umami.is/pricing](https://umami.is/pricing)). Lipsa cookie-urilor trebuie verificată înainte de implementare |
| B. Plausible | Vizite + evenimente custom | $9/lună | UE, verificat | Verificat 2026-10-28 |
| C. Vercel Web Analytics Hobby | Doar vizite, **fără conversii** | $0 | Vercel (SUA, SCC) | Verificat 2026-10-28 |

**Principiul rămâne:** fără cookie-uri, deci fără banner de cookies. Restul documentului e păstrat pentru istoric.

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
