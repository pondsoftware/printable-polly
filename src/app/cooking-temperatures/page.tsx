import { Metadata } from "next";
import CookingTemperaturesClient from "./CookingTemperaturesClient";

export const metadata: Metadata = {
  title: "Free Printable Cooking Temperatures Chart - Meat, Oven, Candy | Printable Polly",
  description:
    "Print a cooking temperature reference chart with USDA safe meat temperatures, oven F/C/Gas Mark conversions, baking temps, and candy stages. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/cooking-temperatures" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Cooking Temperatures Chart",
  description: "Print a cooking temperature reference chart with USDA safe meat temperatures, oven F/C/Gas Mark conversions, baking temps, and candy stages. Free printable PDF.",
  url: "https://printablepolly.com/cooking-temperatures",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function CookingTemperaturesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <CookingTemperaturesClient />
    </>
  );
}
