"""
Pozele pachetelor și pozele paginilor, în forma pe care o citește Keystatic.

Rulare (o singură dată; după asta pozele se schimbă din panoul /keystatic):
    python -E -P scripts/pachete-media.py

Intrări: media-web/ (pozele convertite de import-media.py) și Media/PACHETE/42.jpg (afișul „Cocktails - Open Bar”).
Ieșiri:
  - public/images/pachete/<id>/<id>-NN.jpg + content/media/pachete/<id>.json (colecția Keystatic „Poze pachete”);
  - public/images/pagini/*.jpg + content/media/pagini.json (singleton-ul Keystatic „Poze pagini”).
Pozele noi au latura lungă de maximum 2048 px, JPEG calitate 80, progresiv, fără metadate (fără GPS).
"""
import json
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
MW = ROOT / 'media-web'
PUB = ROOT / 'public'
MAX = 2048


def save(im: Image.Image, dest: Path) -> None:
    im = im.convert('RGB')
    if max(im.size) > MAX:
        im.thumbnail((MAX, MAX), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, 'JPEG', quality=80, optimize=True, progressive=True)


def src(rel: str) -> Image.Image:
    return Image.open(MW / rel)


def crop(path: Path, box) -> Image.Image:
    return Image.open(path).convert('RGB').crop(box)


def many(folder: str, prefix: str, nums) -> list:
    return [f'pachete/{folder}/{prefix}-{n:03d}.jpg' for n in nums]


# Prima poză din fiecare listă e imaginea principală (card + antetul paginii pachetului).
# Selecție vizuală din contact sheet-uri, maximum 15 pe pachet (cererea clientului, 2026-10-29).
AFIS = ROOT / 'Media' / 'PACHETE' / '42.jpg'
PACHETE = {
    'candy-bar': ('Candy Bar', 'Candy Bar cu prăjituri mici și un tort de profiterol, pe mese albe',
                  many('candybar', 'candybar', [1, 9, 16, 17, 3, 20, 52, 55, 60, 29, 70, 80, 93, 100, 101])),
    'cocktail-bar': ('Cocktail Bar', 'Turn de pahare de șampanie sub o arcadă de flori albe, în grădina Riviera', [
        'complex-riviera/complex-riviera-010.jpg',
        (crop(AFIS, (168, 565, 665, 932)), 'Cocktailuri colorate cu fructe, pe fundal întunecat'),
        (crop(AFIS, (168, 142, 665, 508)), 'Cocktailuri și long drinks aliniate pe bar'),
        (crop(AFIS, (168, 988, 665, 1355)), 'Shoturi de tequila cu lime și sare'),
        (crop(MW / 'complex-insulita' / 'complex-insulita-011.jpg', (0, 0, 575, 1066)), 'Pahare de șampanie pe o masă neagră, la intrarea în salon'),
        ('portofoliu-insulita/portofoliu-insulita-031.jpg', 'Miri și invitați ciocnind un pahar lângă tortul de nuntă'),
    ]),
    'cheese-bar': ('Cheese Bar', 'Cheese Bar cu platouri de lemn cu brânzeturi, struguri și grisine',
                   many('cheesebar', 'cheesebar', [13, 21, 1, 2, 4, 6, 7, 9, 11, 14, 16, 23, 25, 27, 29])),
    'lemonade-bar': ('Lemonade Bar', 'Lemonade Bar cu limonade în vase de sticlă și fructe proaspete',
                     many('lemonadebar', 'lemonadebar', [3, 1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14])),
    # Folderul Sushi_Bar are și ~40 de poze cu platouri de brânzeturi: aici intră doar cele cu sushi.
    'sushi-bar': ('Sushi Bar', 'Rulouri de sushi cu somon, așezate pe platou',
                  many('sushi-bar', 'sushi-bar', [16, 11, 12, 13, 14, 15, 17, 18, 35, 42, 43, 44, 45])),
    'tiramisu-bar': ('Tiramisu Bar', 'Ospătar care servește tiramisu la Tiramisu Bar',
                     many('tiramisu-bar', 'tiramisu-bar', [1])),
    # traditional-bar-007…011 arată porc la rotisor: merg la BBQ.
    'bar-traditional': ('Bar tradițional', 'Bar tradițional cu bunătăți românești, în vase încălzite',
                        many('traditional-bar', 'traditional-bar', [5, 6, 1, 2, 3, 4, 12, 13, 14])),
    'gentlemens-corner': ("Gentlemen's Corner", "Gentlemen's Corner cu fotoliu Chesterfield, gramofon și băuturi fine",
                          many('gentlemansbar', 'gentlemansbar', [8, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11, 12, 13, 14])),
    'shot-cake': ('Tort cu shoturi', 'Tort cu shoturi, înconjurat de invitați la petrecere',
                  many('tort-shoturi', 'tort-shoturi', [1, 2, 3])),
    'bbq': ('BBQ la rotiserie', 'Porc la rotisor, rumenit pe jar',
            many('traditional-bar', 'traditional-bar', [7, 8, 9, 10, 11]) + ['portofoliu-insulita/portofoliu-insulita-019.jpg']),
    'meniu-copii': ('Meniu pentru copii', 'Meniu pentru copii, cu burgeri, pizza și cartofi prăjiți',
                    many('meniu-copii', 'meniu-copii', [8, 1, 2, 3, 4, 5, 6, 7, 9])),
}


def pachete() -> None:
    for pid, (nume, alt_main, items) in PACHETE.items():
        assert len(items) <= 15, pid
        galerie = []
        for i, it in enumerate(items, 1):
            alt = alt_main if i == 1 else f'{nume}, la un eveniment ANNA ({i})'
            if isinstance(it, tuple):
                it, alt = it
            im = it if isinstance(it, Image.Image) else src(it)
            rel = f'/images/pachete/{pid}/{pid}-{i:02d}.jpg'
            save(im, PUB / rel.lstrip('/'))
            galerie.append({'src': rel, 'alt': alt})
        out = ROOT / 'content' / 'media' / 'pachete' / f'{pid}.json'
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps({'pachet': nume, 'imaginePrincipala': galerie[0], 'galerie': galerie},
                                  ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        print(pid, len(galerie))


# Pozele paginilor. Keystatic cere ca fișierele să fie sub publicPath (/images/pagini/), deci le copiem acolo.
def pagina(key_src: str, alt: str, name: str | None = None) -> dict:
    dest = PUB / 'images' / 'pagini' / (name or Path(key_src).name)
    dest.parent.mkdir(parents=True, exist_ok=True)
    if key_src.startswith('media-web/'):
        save(Image.open(ROOT / key_src), dest)
    else:
        shutil.copyfile(PUB / key_src.lstrip('/'), dest)
    return {'src': f'/images/pagini/{dest.name}', 'alt': alt}


def pagini() -> None:
    p = json.loads((ROOT / 'content' / 'pachete.json').read_text(encoding='utf-8'))
    apt = next(c for c in p['cazare'] if c['nume'] == 'Apartamentul mirilor')
    d = {
        'saloane': pagina('/images/saloane/rosa/rosa-001.jpg', 'Salonul Rosa, cu candelabrul floral și pereții de sticlă', 'saloane-rosa.jpg'),
        'pachete': pagina('media-web/pachete/candybar/candybar-009.jpg', 'Candy Bar cu prăjituri, sub un perete de flori și candelabre', 'pachete-candy-bar.jpg'),
        'meniuri': pagina('/images/meniuri/meniu-masa.jpg', 'Masă aranjată pentru nuntă, cu farfurii, tacâmuri aurii și meniul invitaților'),
        'estimareBuget': pagina('/images/complex/riviera/complex-riviera-011.jpg', 'Cină în grădina Riviera, sub candelabre de cristal'),
        'portofoliu': pagina('/images/hero/portofoliu-riviera-004.jpg', 'Cununie civilă sub arcade de flori albe, în grădina Riviera'),
        'despre': pagina('/images/hero/complex-riviera-015.jpg', 'Grădina Riviera, pe malul Jiului, văzută de sus'),
        'contact': pagina('media-web/complex-insulita/complex-insulita-027.jpg', 'Complexul ANNA Events de pe Insulița, seara, cu piscina luminată', 'contact-insulita-seara.jpg'),
        'turVirtual': pagina('/images/saloane/grande/grande-001.jpg', 'Salonul Grande, pregătit pentru eveniment', 'tur-virtual-grande.jpg'),
        'acasaBuget': pagina('/images/complex/riviera/complex-riviera-011.jpg', 'Cină în grădina Riviera, sub candelabre de cristal'),
        'tort': pagina(p['tort']['imagine']['src'], p['tort']['imagine']['alt']),
        'apartament': [pagina(g['src'], g['alt']) for g in apt['galerie']],
    }
    out = ROOT / 'content' / 'media' / 'pagini.json'
    out.write_text(json.dumps(d, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('pagini', len(d))


if __name__ == '__main__':
    pachete()
    pagini()
