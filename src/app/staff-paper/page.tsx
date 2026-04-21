import { Metadata } from "next";
import StaffPaperClient from "./StaffPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Staff Paper - Blank Sheet Music PDF Generator | Printable Polly",
  description:
    "Create blank sheet music manuscript paper with customizable staves, clef symbols, and line colors. Perfect for composition, music theory, and practice.",
  alternates: { canonical: "https://printablepolly.com/staff-paper" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Staff Paper",
  description: "Create blank sheet music manuscript paper with customizable staves, clef symbols, and line colors. Perfect for composition, music theory, and practice.",
  url: "https://printablepolly.com/staff-paper",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function StaffPaperPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <StaffPaperClient />
    </>
  );
}
