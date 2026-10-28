import type { Metadata } from 'next';
import KeystaticApp from './keystatic';

export const metadata: Metadata = { title: 'Administrare | Riviera Events', robots: { index: false, follow: false } };

// Layout rădăcină separat: panoul Keystatic nu folosește headerul, footerul și stilurile site-ului.
export default function KeystaticLayout() {
  return (
    <html lang="ro">
      <body>
        <KeystaticApp />
      </body>
    </html>
  );
}
