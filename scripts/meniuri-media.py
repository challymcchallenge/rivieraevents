"""
Pozele meniurilor (Media/MENIURI/<meniu>/) → public/images/meniuri/<id>/<id>-<fel>-NN.jpg
și content/meniuri/<id>.json (colecția Keystatic „Meniuri”).

Rulare (o singură dată; după asta meniurile și pozele se schimbă din panoul /keystatic):
    python -E -P scripts/meniuri-media.py

Felul fiecărei poze e ales vizual, după seria de fotografii și paginile de meniu din catalog (2026-10-29).
Pozele au maximum 2048 px pe latura lungă, JPEG calitate 80, progresiv, fără metadate.
Atenție: la prima salvare din Keystatic, panoul redenumește fișierele după câmp (ex. galerie/3/src.jpg).
Felul rămâne salvat în câmpul „fel” al fiecărei poze.
"""
import json
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / 'Media' / 'MENIURI'
MAX = 2048
FELURI = {'starter': 'Starter', 'starter-cald': 'Starter cald', 'traditional': 'Tradițional', 'main': 'Fel principal'}
FISIER = {'starter': 'starter', 'starter-cald': 'starter-cald', 'traditional': 'traditional', 'main': 'fel-principal'}


def r(*nums):
    return [f'RStudio-{n:04d}.jpg' for n in nums]


# Tradiționalul (0135, 0160–0162) e același la toate meniurile.
TRAD = r(135, 160, 161, 162)
# Prima poză din fiecare fel e cea de pe cardul felului.
MENIURI = {
    'gold': ('MENIU GOLD', {
        'starter': r(63, 65, 66, 67, 68, 69, 70, 71, 73, 77, 79),
        'starter-cald': r(91, 89, 90, 98, 100, 103, 104, 105),
        'traditional': TRAD,
        'main': r(209, 208, 211, 212, 213, 216, 217),
    }),
    'silver': ('MENIU SILVER', {
        'starter': r(153, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 150, 151, 152, 154, 155, 156),
        # 0148 (pește cu sos galben) nu apare în catalog la Silver: de confirmat cu clientul.
        'starter-cald': r(199, 204, 205, 206, 148),
        'traditional': TRAD,
        'main': r(44, 39, 40, 41),
    }),
    'bronze': ('MENIU BRONZE', {
        'starter': r(3, 2, 5, 7, 8, 9, 10, 11, 12, 21, 22),
        'starter-cald': r(341, 338, 339, 342) + ['STARTER CALD (2).jpg'],
        'traditional': TRAD,
        'main': r(110, 109, 111, 112, 113, 114, 116, 117, 118, 119),
    }),
    'premium-platinum': ('PREMIUM PLATINUM', {
        'starter': r(286, 276, 277, 278, 279, 280, 281, 283, 284, 285, 288, 289),
        'starter-cald': r(303, 295, 300, 304, 305) + ['RStudio-0294 - STARTER CALD.jpg', 'STARTER CALD.jpg'],
        'traditional': TRAD,
        'main': r(328, 327, 329, 330) + ['MAIN.jpg'],
    }),
    'vegetarian': ('VEGETARIAN', {
        'starter': r(188, 182, 183, 184, 185, 186, 187, 189, 190, 191, 192, 193, 194, 195, 196) + ['STARTER.jpg'],
        'starter-cald': r(173, 171, 172, 174, 175, 176, 177, 178, 179, 180) + ['STARTER CALD.jpg'],
        'traditional': TRAD,
        'main': r(248, 247, 249, 250, 251, 252, 253) + ['MAIN.jpg'],
    }),
}


def convert(src: Path, dest: Path) -> None:
    im = ImageOps.exif_transpose(Image.open(src)).convert('RGB')
    if max(im.size) > MAX:
        im.thumbnail((MAX, MAX), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, 'JPEG', quality=80, optimize=True, progressive=True)


def main() -> None:
    vechi = {m['id']: m for m in json.loads((ROOT / 'content' / 'meniuri.json').read_text(encoding='utf-8'))['meniuri']}
    for mid, (folder, feluri) in MENIURI.items():
        v = vechi[mid]
        toate = {f.name.lower() for f in (SRC / folder).iterdir() if f.suffix.lower() == '.jpg'}
        alese = [f.lower() for lst in feluri.values() for f in lst]
        assert len(alese) == len(set(alese)), f'{mid}: poză dublată'
        assert set(alese) == toate, f'{mid}: lipsesc {toate - set(alese)}, în plus {set(alese) - toate}'
        galerie, carduri = [], {}
        for fel, files in feluri.items():
            for i, name in enumerate(files, 1):
                rel = f'/images/meniuri/{mid}/{mid}-{FISIER[fel]}-{i:02d}.jpg'
                convert(SRC / folder / name, ROOT / 'public' / rel.lstrip('/'))
                galerie.append({'src': rel, 'fel': fel, 'alt': f'Meniul {v["nume"]}: {FELURI[fel].lower()} ({i})'})
                carduri.setdefault(fel, rel)
        desc = {s['id']: s['descriere'] for s in v['sectiuni']}
        data = {
            'nume': v['nume'],
            'ordine': v['ordine'],
            'descriereScurta': v['descriereScurta'],
            'feluri': [{'fel': fel, 'descriere': desc[fel], 'imagine': carduri[fel]} for fel in FELURI],
            'galerie': galerie,
        }
        out = ROOT / 'content' / 'meniuri' / f'{mid}.json'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8', newline='\n')
        print(mid, len(galerie))


if __name__ == '__main__':
    main()
