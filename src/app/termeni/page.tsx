import LegalPage, { legalMetadata } from '@/components/LegalPage';

export const metadata = legalMetadata('termeni', '/termeni');

export default function Page() {
  return <LegalPage name="termeni" />;
}
