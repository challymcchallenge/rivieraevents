'use client';

import { OPEN_EVENT } from '@/components/CookieConsent';

/** Link din subsol care redeschide bannerul de cookie-uri, ca vizitatorul să-și schimbe alegerea. */
export default function CookieSettingsLink({ className = '' }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))} className={className}>
      Setări cookie-uri
    </button>
  );
}
