import LegalPage, { legalMetadata } from '@/components/LegalPage';

export const metadata = legalMetadata('politica-de-confidentialitate', '/politica-de-confidentialitate');

export default function Page() {
  return <LegalPage name="politica-de-confidentialitate" />;
}
