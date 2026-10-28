import LegalPage, { legalMetadata } from '@/components/LegalPage';

export const metadata = legalMetadata('politica-cookies', '/politica-cookies');

export default function Page() {
  return <LegalPage name="politica-cookies" />;
}
