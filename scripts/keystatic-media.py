"""Mută datele editabile din Keystatic în fișiere cu exact forma schemelor din keystatic.config.ts.

Keystatic refuză fișierele cu chei nedeclarate în schemă, deci textele (cu note interne) rămân în content/,
iar pozele, tururile și portofoliul trec în content/media/ și content/portofoliu/ fără chei în plus.
Rulat o singură dată, 2026-10-28.
"""
import json
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
C = ROOT / "content"
M = C / "media"
(M / "saloane").mkdir(parents=True, exist_ok=True)


def rj(p):
    return json.loads(p.read_text(encoding="utf-8"))


def wj(p, d):
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def img(o):
    return {"src": o["src"], "alt": o["alt"]}


# 1. Saloane: media separată de text
for f in sorted((C / "saloane").glob("*.json")):
    d = rj(f)
    wj(M / "saloane" / f.name, {
        "salon": d["nume"].replace("Salon ", ""),
        "imaginePrincipala": img(d["imaginePrincipala"]),
        "galerie": [img(x) for x in d.get("galerie", [])],
        "tur360": d.get("tur360") or "",
        "turApartament": d.get("turApartament") or "",
    })
    for k in ("imaginePrincipala", "galerie", "tur360", "turApartament"):
        d.pop(k, None)
    wj(f, d)

# 2. Slideshow: discriminant/value, ca fields.conditional
s = rj(C / "acasa-slideshow.json")
slides = []
for x in s["slideuri"]:
    if x["tip"] == "imagine":
        slides.append({"discriminant": "imagine", "value": {"imagine": x["imagine"], "imagineMobil": x.get("imagineMobil") or None,
                                                             "punctFocal": x.get("punctFocal") or "50% 50%", "alt": x["alt"]}})
wj(M / "slideshow.json", {"intervalSecunde": s["intervalSecunde"], "slideuri": slides})
(C / "acasa-slideshow.json").unlink()

# 3. Tururi
t = rj(C / "tururi.json")
wj(M / "tururi.json", {"tururi": [{"id": x["id"], "titlu": x["titlu"], "complex": x["complex"], "url": x.get("url") or ""} for x in t["tururi"]]})
(C / "tururi.json").unlink()

# 4. Portofoliu: fără slug în fișier (numele fișierului e slug-ul), fără note și dimensiuni
for f in sorted((C / "portofoliu").glob("*.json")):
    d = rj(f)
    if f.stem == "exemplu-format":
        f.unlink()
        continue
    wj(f, {"titlu": d["titlu"], "tip": d["tip"], "complex": d["complex"], "salon": d.get("salon") or "necunoscut",
           "data": d.get("data") or "", "descriere": d["descriere"], "poze": [img(x) for x in d["poze"]], "acordClient": bool(d["acordClient"])})
print("ok")
