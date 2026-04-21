import { Metadata } from "next";
import MeasurementConversionsClient from "./MeasurementConversionsClient";

export const metadata: Metadata = {
  title: "Free Printable Kitchen Measurement Conversions Chart | Printable Polly",
  description:
    "Print a kitchen measurement conversion cheat sheet with teaspoons to tablespoons, cups to quarts, ml to cups, grams to ounces, and common ingredient weights. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/measurement-conversions" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kitchen Measurement Conversions Chart",
  description: "Print a kitchen measurement conversion cheat sheet with teaspoons to tablespoons, cups to quarts, ml to cups, grams to ounces, and common ingredient weights. Free PDF.",
  url: "https://printablepolly.com/measurement-conversions",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MeasurementConversionsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MeasurementConversionsClient />
    </>
  );
}
