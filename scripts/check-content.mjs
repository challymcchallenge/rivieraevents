// Verificări înainte de build (rulează din `npm run build`).
// - avertizează pentru golurile [NEED: ...] rămase în content/ (nu apar pe site, dar trebuie completate);
// - avertizează când un `valabilPanaLa` a expirat;
// - ADR-007: avertizează pentru video peste buget (mobil 4 MB, desktop 8 MB) și oprește build-ul peste 15 MB.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
let warnings = 0;
let errors = 0;
const warn = (m) => { warnings++; console.warn(`  ⚠ ${m}`); };
const fail = (m) => { errors++; console.error(`  ✖ ${m}`); };

function walk(dir, exts) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p, exts) : exts.some((x) => p.endsWith(x)) ? [p] : [];
  });
}

console.log('Verificare conținut:');
const today = new Date().toISOString().slice(0, 10);
for (const f of walk(path.join(root, 'content'), ['.json', '.mdx'])) {
  if (f.includes('exemplu-format') || f.includes('testimoniale-demo')) continue;
  const t = fs.readFileSync(f, 'utf8');
  const n = (t.match(/\[NEED/g) || []).length;
  if (n) warn(`${path.relative(root, f)}: ${n} × [NEED]`);
  for (const m of t.matchAll(/"valabilPanaLa":\s*"(\d{4}-\d{2}-\d{2})"/g)) {
    if (m[1] < today) warn(`${path.relative(root, f)}: valabilPanaLa ${m[1]} a expirat`);
  }
}

for (const f of walk(path.join(root, 'public', 'media'), ['.mp4', '.webm'])) {
  const mb = fs.statSync(f).size / 1024 / 1024;
  const limita = /mobil/i.test(f) ? 4 : 8;
  if (mb > 15) fail(`${path.relative(root, f)}: ${mb.toFixed(1)} MB, peste limita de 15 MB (ADR-007)`);
  else if (mb > limita) warn(`${path.relative(root, f)}: ${mb.toFixed(1)} MB, peste bugetul de ${limita} MB (ADR-007)`);
}

console.log(`  ${warnings} avertismente, ${errors} erori`);
if (errors) process.exit(1);
