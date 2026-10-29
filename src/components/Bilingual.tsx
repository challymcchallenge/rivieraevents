/**
 * Text scurt cu traducere scrisă de noi (ADR-008): se vede `ro` sau `en` după `data-lang` de pe <html>.
 * Google Translate nu îl atinge (translate="no"), pentru că traduce greșit cuvintele fără context.
 */
export default function Bilingual({ ro, en }: { ro: string; en: string }) {
  return (
    <span translate="no" className="notranslate">
      <span className="lang-ro">{ro}</span>
      <span className="lang-en" lang="en">{en}</span>
    </span>
  );
}
