import { Metadata } from "next";
import UnitConversionsClient from "./UnitConversionsClient";

export const metadata: Metadata = {
  title: "Free Printable Unit Conversion Chart - Length, Weight, Volume | Printable Polly",
  description:
    "Print a unit conversion cheat sheet covering length, weight, volume, temperature, area, and speed. Common conversion factors in clean tables. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/unit-conversions" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Unit Conversion Chart",
  description: "Print a unit conversion cheat sheet covering length, weight, volume, temperature, area, and speed. Common conversion factors in clean tables. Free PDF.",
  url: "https://printablepolly.com/unit-conversions",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function UnitConversionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <UnitConversionsClient />
    </>
  );
}
