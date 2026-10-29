"""
Favicon-ul inițial, desenat din logo (2026-10-29): „R”-ul din logo, îngroșat ca să se citească la 16 px,
cu bara roșie de sub el, pe fundalul închis al site-ului. Ieșire: public/images/brand/favicon.png (512×512).
După asta, favicon-ul se schimbă din Keystatic („Logo și favicon”); scripts/favicon.mjs face din el favicon.ico.
    python -E -P scripts/favicon-din-logo.py "Media/Logo 3 Trans Bg.svg"
"""
import sys

import pymupdf
from PIL import Image, ImageDraw, ImageFilter

src = sys.argv[1] if len(sys.argv) > 1 else 'Media/Logo 3 Trans Bg.svg'
pix = pymupdf.open(src)[0].get_pixmap(matrix=pymupdf.Matrix(2, 2), alpha=True)
im = Image.frombytes('RGBA', (pix.width, pix.height), pix.samples)
R = im.crop((226, 100, 554, 760))  # litera R (coordonate măsurate pe randarea la scara 2)
R = R.crop(R.getbbox())

N, BG, RED = 512, (20, 18, 16, 255), (255, 49, 49, 255)
h = 330
w = round(R.width * h / R.height)
alpha = R.getchannel('A').resize((w, h), Image.LANCZOS).filter(ImageFilter.MaxFilter(13))  # îngroșare
letter = Image.new('RGBA', (w, h), (255, 255, 255, 255)); letter.putalpha(alpha)
gap, bh = 30, 44
x, y = (N - w) // 2, (N - (h + gap + bh)) // 2
fav = Image.new('RGBA', (N, N), BG)
fav.alpha_composite(letter, (x, y))
ImageDraw.Draw(fav).rectangle((x - 6, y + h + gap, x + w + 5, y + h + gap + bh - 1), fill=RED)
fav.convert('RGB').save('public/images/brand/favicon.png', optimize=True)
print('public/images/brand/favicon.png', fav.size)
