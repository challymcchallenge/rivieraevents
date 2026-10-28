"""Copiază pozele alese din media-web/ în public/images/ și actualizează căile din content/.

Rulat o singură dată la inițializarea Fazei 5 (2026-10-28). După lansare, pozele se gestionează din Keystatic.
Utilizare: python -E -P scripts/import-media.py
"""
import json
import re
import shutil
import sys
from pathlib import Path

from PIL import Image

sys.stdout.reconfigure(encoding="utf-8")
ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "media-web"
PUB = ROOT / "public"
CONTENT = ROOT / "content"
copied = {}


def put(rel_src: str, dest_dir: str) -> str:
    """Copiază media-web/<rel_src> în public/images/<dest_dir>/ și întoarce calea publică."""
    if rel_src in copied and copied[rel_src].startswith(f"/images/{dest_dir}/"):
        return copied[rel_src]
    src = SRC / rel_src
    assert src.exists(), rel_src
    out = PUB / "images" / dest_dir / src.name
    out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, out)
    copied[rel_src] = f"/images/{dest_dir}/{src.name}"
    return copied[rel_src]


def rj(p):
    return json.loads(p.read_text(encoding="utf-8"))


def wj(p, d):
    p.write_text(json.dumps(d, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def landscape(p: Path) -> bool:
    w, h = Image.open(p).size
    return w >= h


# 1. Hero
s = rj(CONTENT / "acasa-slideshow.json")
for sl in s["slideuri"]:
    sl["imagine"] = put(sl["imagine"], "hero")
    if sl.get("imagineMobil"):
        sl["imagineMobil"] = put(sl["imagineMobil"], "hero")
wj(CONTENT / "acasa-slideshow.json", s)

# 2. Saloane: imagine principală + galerie de 12, eșantionată uniform din toate pozele salonului
PRINCIPALA = {"rosa": "rosa-001", "noblesse": "noblesse-005", "premiere": "premiere-002", "grande": "grande-001",
              "ronda": "ronda-003", "magic": "magic-022", "estuar": "estuar-001"}
for slug, main in PRINCIPALA.items():
    f = CONTENT / "saloane" / f"{slug}.json"
    d = rj(f)
    files = sorted((SRC / "saloane" / slug).glob("*.jpg"))
    step = max(1, len(files) // 12)
    pick = [p for p in files[::step]][:12]
    main_p = SRC / "saloane" / slug / f"{main}.jpg"
    if main_p not in pick:
        pick = [main_p] + pick[:11]
    nume = d["nume"]
    d["imaginePrincipala"] = {"src": put(f"saloane/{slug}/{main}.jpg", f"saloane/{slug}"), "alt": f"{nume}, vedere de ansamblu"}
    d["galerie"] = [{"src": put(f"saloane/{slug}/{p.name}", f"saloane/{slug}"), "alt": f"{nume}, amenajat pentru un eveniment ({i})"}
                    for i, p in enumerate(pick, 1)]
    wj(f, d)

# 3. Portofoliu
for f in sorted((CONTENT / "portofoliu").glob("*.json")):
    d = rj(f)
    if d.get("slug") == "exemplu-format":
        continue
    for p in d["poze"]:
        p["src"] = put(p["src"], f"portofoliu/{d['slug']}")
    wj(f, d)

# 4. Exterior complexe
site = rj(CONTENT / "site.json")
for k in ("riviera", "insulita"):
    for p in site["complexe"][k].get("galerieExterior", []):
        p["src"] = put(p["src"], f"complex/{k}")
wj(CONTENT / "site.json", site)

# 5. Meniuri (pozele din catalog)
m = rj(CONTENT / "meniuri.json")
for men in m["meniuri"]:
    for key in ("copertaCatalog", "fotografiiCatalog"):
        if men.get(key):
            men[key] = put(men[key], "meniuri")
    for se in men["sectiuni"]:
        if se.get("imagine"):
            se["imagine"] = put(se["imagine"], "meniuri")
wj(CONTENT / "meniuri.json", m)

# 6. Pachete: câte o poză pe serviciu premium + tort + apartament
FOLDER = {"candy-bar": "candybar", "cheese-bar": "cheesebar", "lemonade-bar": "lemonadebar", "sushi-bar": "sushi-bar",
          "tiramisu-bar": "tiramisu-bar", "bar-traditional": "traditional-bar", "gentlemens-corner": "gentlemansbar",
          "shot-cake": "tort-shoturi"}
k = rj(CONTENT / "pachete.json")
for x in k["serviciiPremium"]:
    fol = FOLDER.get(x["id"])
    if not fol:
        x["imagine"] = None
        continue
    files = sorted((SRC / "pachete" / fol).glob("*.jpg"))
    land = [p for p in files if landscape(p)]
    p = (land or files)[0]
    x["imagine"] = {"src": put(f"pachete/{fol}/{p.name}", "pachete"), "alt": x["nume"]}
k["tort"]["imagine"] = {"src": put("altele/altele-005.jpg", "pachete"), "alt": "Tort de nuntă de la Cofetăria Anna"}
APT = ["apartamentul-mirilor-007", "apartamentul-mirilor-005", "apartamentul-mirilor-009", "apartamentul-mirilor-011", "apartamentul-mirilor-019"]
for c in k["cazare"]:
    if c["nume"] == "Apartamentul mirilor":
        c["galerie"] = [{"src": put(f"apartamentul-mirilor/{a}.jpg", "apartament"), "alt": "Apartamentul mirilor de la Riviera"} for a in APT]
wj(CONTENT / "pachete.json", k)

# 7. Brand
(PUB / "brand").mkdir(parents=True, exist_ok=True)
for f in (ROOT / "assets" / "brand").iterdir():
    shutil.copy2(f, PUB / "brand" / f.name)

total = sum((PUB / "images").rglob("*.jpg").__iter__().__class__ and [p.stat().st_size for p in (PUB / "images").rglob("*.jpg")])
print(f"copiate: {len(copied)} poze, {total / 1024 / 1024:.0f} MB")
