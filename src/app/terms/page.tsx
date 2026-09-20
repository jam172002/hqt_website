import type { Metadata } from "next";
import LegalDocument from "@/components/LegalDocument";
import { getSeo } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo("terms");
  return { title: seo.title, description: seo.description };
}

export default function TermsPage() {
  return <LegalDocument page="terms" />;
}
