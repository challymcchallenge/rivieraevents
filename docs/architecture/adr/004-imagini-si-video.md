# ADR-004: Imagini în repo optimizate de next/image; video pe YouTube cu încărcare la click

## Status
Propus (2026-10-28)

## Context
- **Volumul de imagini:** site-ul trăiește din poze. Avem 7 saloane × 8–15 poze, plus 6 evenimente în portofoliu × 3–5 poze, adică ~150–250 de imagini la lansare `[estimare]`.
- **Clipurile video** există. Grupul ANNA are canal YouTube.
- **Performanța pe mobil** e cerință explicită (formate moderne, lazy loading, dimensiuni declarate).
- **Costul optimizării pe Vercel Pro:** $0,05 la 1.000 de transformări, cu imaginile servite apoi din cache ([docs](https://vercel.com/docs/image-optimization/limits-and-pricing), verificat 2026-10-28). Pentru ~2.400 de transformări inițiale, costul e ~$0,12, acoperit de creditul inclus `[estimare]`.
- **Cookies:** încărcarea automată a YouTube sau Google Maps pune cookie-uri neesențiale, deci ar cere banner de consimțământ.

## Decizie
- **Imagini:**
  - originalele (max. 2560 px pe latura lungă, JPEG de calitate) stau în repo;
  - se afișează **numai** prin `next/image`, cu `sizes` declarat, lazy loading (în afară de imaginea principală, care are `priority`), AVIF și WebP;
  - fiecare imagine are text alternativ (alt) în fișierul de conținut.
- **Video:**
  - YouTube, cu o componentă care afișează doar imaginea de previzualizare;
  - playerul (`youtube-nocookie.com`) se încarcă abia la click.
  - **Fără video de fundal în hero** în v1, pentru performanța pe mobil.
- **Tur 360 și hartă:** aceeași abordare, încărcare la click. Harta e o imagine statică plus un link „Deschide în Google Maps”.
- **Prag de mutare:** dacă imaginile din repo depășesc ~1 GB, le mutăm în Vercel Blob ($0,023/GB pe lună, verificat 2026-10-28) sau în Keystatic Cloud Images.

## Consecințe

### Pozitive
- Niciun serviciu extern pentru imagini.
- Fără cookie-uri neesențiale, deci fără banner de cookies.
- Lățimea de bandă video e suportată de YouTube, nu de Vercel.

### Negative
- Repo-ul crește odată cu portofoliul.
- Un pas în plus (click) pentru video, tur 360 și hartă.

### Neutre
- Pozele originale trebuie redimensionate înainte de commit. Se poate automatiza cu un script.

## Alternative considerate
- **Cloudinary:** respins. Pe planul gratuit nu are video, iar datele stau în SUA (rezidență UE doar pe Enterprise).
- **Video găzduit pe Vercel:** respins, pentru că transferul de date și dimensiunea repo-ului cresc mult.
- **Încărcarea automată a YouTube și a hărții:** respinsă, pentru că pune cookie-uri neesențiale și cere banner.

## Referințe
- https://vercel.com/docs/image-optimization/limits-and-pricing
- https://vercel.com/docs/vercel-blob/usage-and-pricing
