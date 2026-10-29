"""
Catalogul de evenimente, micșorat pentru descărcare de pe site.

Rulare (cere PyMuPDF: `python -m pip install --user pymupdf`):
    python -E -P scripts/catalog-pdf.py "Media/CATALOG EVENIMENTE - 2026.pdf" [catalog-evenimente-riviera-2026.pdf]

Ieșire: public/catalog/<al doilea argument>. Apoi, în Keystatic („Catalog de evenimente”), alegeți fișierul nou și numele catalogului.
- Fiecare poză JPEG e redusă la rezoluția la care apare în pagină (DPI țintă, implicit 54 ≈ 1350 px lățimea paginii),
  cu maximum 1600 px pe latura lungă, JPEG calitate 62.
- Pozele PNG mai mari de 300 KB (și cele cu transparență) devin JPEG la aceeași regulă de mărime; masca de transparență
  (/SMask) rămâne separată și neatinsă, cum permite standardul PDF.
- Textul rămâne text (vectorial). La final se compară fiecare pagină cu originalul.
`Document.rewrite_images()` din PyMuPDF NU se folosește: strică paginile cu transparență (verificat 2026-10-29).
"""
import io
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageChops, ImageStat

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'public' / 'catalog' / 'catalog-evenimente-riviera-2026.pdf'
DPI, CAP, Q = 54, 1600, 62


def needed_px(doc: pymupdf.Document) -> dict:
    """Pentru fiecare poză: lățimea maximă (px) necesară în oricare pagină, la DPI-ul țintă."""
    need = {}
    for page in doc:
        for im in page.get_images(full=True):
            x = im[0]
            for r in page.get_image_rects(x):
                need[x] = max(need.get(x, 0), r.width * DPI / 72)
    return need


def main(src: str, name: str | None = None) -> None:
    out = OUT.parent / name if name else OUT
    doc = pymupdf.open(src)
    need = needed_px(doc)
    done, saved = set(), 0
    for page in doc:
        for im in page.get_images(full=True):
            x, smask, w, h, filt = im[0], im[1], im[2], im[3], im[8]
            if x in done or smask or filt != 'DCTDecode':
                continue
            done.add(x)
            target_w = min(w, max(need.get(x, w), 1))
            scale = min(target_w / w, CAP / max(w, h), 1)
            raw = doc.xref_stream_raw(x)
            pil = Image.open(io.BytesIO(raw))
            if pil.mode not in ('RGB', 'L'):
                continue  # CMYK etc.: le lăsăm cum sunt
            if scale < 1:
                pil = pil.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
            buf = io.BytesIO()
            pil.save(buf, 'JPEG', quality=Q, optimize=True, progressive=True)
            if len(buf.getvalue()) < len(raw) * 0.9:
                page.replace_image(x, stream=buf.getvalue())
                saved += len(raw) - len(buf.getvalue())
    # Pozele PNG mari: doar imaginea de bază devine JPEG; /SMask (transparența) rămâne cum e.
    for page in doc:
        for im in page.get_images(full=True):
            x, w, h, filt = im[0], im[2], im[3], im[8]
            if x in done or filt != 'FlateDecode' or len(doc.xref_stream_raw(x) or b'') < 300_000:
                continue
            done.add(x)
            if doc.xref_get_key(x, 'BitsPerComponent')[1] != '8':
                continue
            base = Image.frombytes('RGB', (w, h), doc.xref_stream(x)) if len(doc.xref_stream(x)) == w * h * 3 else None
            if base is None:
                continue
            target_w = min(w, max(need.get(x, w), 1))
            scale = min(target_w / w, CAP / max(w, h), 1)
            if scale < 1:
                base = base.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
            buf = io.BytesIO()
            base.save(buf, 'JPEG', quality=Q, optimize=True, progressive=True)
            before = len(doc.xref_stream_raw(x))
            doc.update_stream(x, buf.getvalue(), compress=False)
            doc.xref_set_key(x, 'Filter', '/DCTDecode')
            doc.xref_set_key(x, 'DecodeParms', 'null')
            doc.xref_set_key(x, 'Width', str(base.width))
            doc.xref_set_key(x, 'Height', str(base.height))
            saved += before - len(buf.getvalue())
    doc.set_metadata({'title': 'Catalog evenimente 2026 · Riviera Events by ANNA', 'author': 'ANNA COMPLEX 1991 SRL',
                      'subject': 'Meniuri, pachete și servicii pentru evenimente', 'creator': '', 'producer': '', 'keywords': ''})
    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(out, garbage=4, deflate=True, clean=True)
    print(f'{out.stat().st_size / 1048576:.1f} MB; poze recomprimate: {len(done)}; economie {saved / 1048576:.0f} MB')

    # Verificare: fiecare pagină comparată cu originalul (diferența medie, 0–255).
    a, b, m = pymupdf.open(src), pymupdf.open(out), pymupdf.Matrix(0.12, 0.12)
    worst = []
    for i in range(a.page_count):
        pa, pb = a[i].get_pixmap(matrix=m), b[i].get_pixmap(matrix=m)
        ia = Image.frombytes('RGB', (pa.width, pa.height), pa.samples)
        ib = Image.frombytes('RGB', (pb.width, pb.height), pb.samples)
        worst.append((round(sum(ImageStat.Stat(ImageChops.difference(ia, ib)).mean) / 3, 2), i + 1))
    worst.sort(reverse=True)
    print('cele mai mari diferențe pe pagină:', worst[:5])
    assert worst[0][0] < 8, 'o pagină arată diferit de original'


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else None)
