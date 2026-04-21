import { Metadata } from "next";
import UsStatesClient from "./UsStatesClient";

export const metadata: Metadata = {
  title: "Free Printable US States & Capitals List - 50 States PDF | Printable Polly",
  description:
    "Print a complete list of all 50 US states with capitals, abbreviations, and regions. Alphabetical or grouped by region. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/us-states" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "US States & Capitals List",
  description: "Print a complete list of all 50 US states with capitals, abbreviations, and regions. Alphabetical or grouped by region. Free printable PDF.",
  url: "https://printablepolly.com/us-states",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function UsStatesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <UsStatesClient />
    </>
  );
}
