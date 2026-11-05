import { LegalPage, legalMetadata } from "@/components/sections/legal-page";

export const metadata = legalMetadata("imprint");

export default function Page() {
  return <LegalPage slug="imprint" />;
}
