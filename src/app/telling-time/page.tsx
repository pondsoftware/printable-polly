import { Metadata } from "next";
import TellingTimeClient from "./TellingTimeClient";

export const metadata: Metadata = {
  title: "Free Printable Telling Time Worksheets - Clock Face Generator | Printable Polly",
  description:
    "Generate printable clock worksheets for learning to tell time. Clock faces with hour, half-hour, quarter-hour, or 5-minute increments. 6-9 clocks per page.",
  alternates: { canonical: "https://printablepolly.com/telling-time" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Telling Time Worksheets",
  description: "Generate printable clock worksheets for learning to tell time. Clock faces with hour, half-hour, quarter-hour, or 5-minute increments. 6-9 clocks per page.",
  url: "https://printablepolly.com/telling-time",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function TellingTimePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <TellingTimeClient />
    </>
  );
}
