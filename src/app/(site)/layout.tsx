import type { Metadata, Viewport } from 'next';
import { Cormorant, Montserrat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import { themeInitScript } from '@/components/ThemeToggle';
import JsonLd from '@/components/JsonLd';
import { getIdentitate, getSite } from '@/lib/content';
import { waLink } from '@/lib/whatsapp';

// next/font descarcă fonturile la build și le servește de pe domeniul nostru (fără cereri spre Google din browser).
const cormorant = Cormorant({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'], variable: '--font-cormorant', display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin', 'latin-ext'], weight: ['400', '500', '600'], variable: '--font-montserrat', display: 'swap' });

const identitate = getIdentitate();
export const metadata: Metadata = {
  metadataBase: new URL('https://www.rivieraevents.ro'),
  // Favicon-ul din Keystatic; favicon.ico și apple-touch-icon.png le generează scripts/favicon.mjs la build.
  icons: {
    icon: [{ url: '/favicon.ico', sizes: '48x48' }, { url: identitate.favicon, sizes: '512x512', type: identitate.favicon.endsWith('.svg') ? 'image/svg+xml' : 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  title: { default: 'Riviera by ANNA Events Târgu Jiu | Saloane de nuntă pe malul Jiului', template: '%s' },
  description: 'Saloane pentru nunți, botezuri și evenimente de firmă pe malul Jiului, în Târgu Jiu.',
  openGraph: { type: 'website', locale: 'ro_RO', siteName: 'Riviera by ANNA Events', images: ['/images/complex/riviera/complex-riviera-015.jpg'] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [{ media: '(prefers-color-scheme: light)', color: '#FFFEFA' }, { media: '(prefers-color-scheme: dark)', color: '#11100F' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const site = getSite();
  const wa = waLink('buton WhatsApp');
  return (
    <html lang="ro" data-theme="light" suppressHydrationWarning className={`${cormorant.variable} ${montserrat.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <JsonLd />
      </head>
      <body>
        <a href="#continut" className="sr-only z-50 bg-bg p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2">Sari la conținut</a>
        <Header waHref={wa} logo={{ deschis: identitate.deschis, inchis: identitate.inchis }} />
        <main id="continut">{children}</main>
        <Footer />
        <WhatsAppWidget href={wa} text={site.whatsapp.bula.text} buton={site.whatsapp.bula.buton} />
        <Analytics />
      </body>
    </html>
  );
}
