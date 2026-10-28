const LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];

/** „2025-08” → „august 2025”; null dacă nu se știe data. */
export function lunaAn(d: string | null): string | null {
  if (!d) return null;
  const [y, m] = d.split('-');
  return `${LUNI[Number(m) - 1]} ${y}`;
}
