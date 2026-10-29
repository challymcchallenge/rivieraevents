// Rulează la build (înainte de `next build`): din favicon-ul ales în Keystatic („Logo și favicon”) face
// public/favicon.ico (16, 32 și 48 px, PNG în container ICO) și public/apple-touch-icon.png (180 px, fundal plin).
// Folosește `sharp`, instalat împreună cu Next. Dacă lipsește, păstrează fișierele existente și doar avertizează.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const { favicon } = JSON.parse(fs.readFileSync(path.join(root, 'content', 'media', 'identitate.json'), 'utf8'));
const src = path.join(root, 'public', favicon);

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('  ⚠ favicon: sharp lipsește; rămân favicon.ico și apple-touch-icon.png existente');
  process.exit(0);
}
if (!fs.existsSync(src)) {
  console.warn(`  ⚠ favicon: ${favicon} nu există; rămân fișierele existente`);
  process.exit(0);
}

const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(src).resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer()));

// ICO: antet de 6 octeți, 16 octeți pe imagine, apoi datele PNG (format acceptat de toate browserele actuale)
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); e.writeUInt8(s, 1); e.writeUInt8(0, 2); e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
fs.writeFileSync(path.join(root, 'public', 'favicon.ico'), Buffer.concat([header, ...entries, ...pngs]));

// iPhone: fără transparență (iOS ar pune fundal negru), colțurile le rotunjește sistemul
await sharp(src).resize(180, 180, { fit: 'contain', background: '#141210' }).flatten({ background: '#141210' }).png().toFile(path.join(root, 'public', 'apple-touch-icon.png'));
console.log(`  favicon: ${favicon} → favicon.ico (16/32/48), apple-touch-icon.png (180)`);
