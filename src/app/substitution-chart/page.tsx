import { Metadata } from "next";
import SubstitutionChartClient from "./SubstitutionChartClient";

export const metadata: Metadata = {
  title: "Free Printable Ingredient Substitution Chart - Baking & Cooking | Printable Polly",
  description:
    "Print an ingredient substitution chart for baking and cooking. Substitutes for butter, eggs, milk, cream, sugar, flour, and more with ratios and notes. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/substitution-chart" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Ingredient Substitution Chart",
  description: "Print an ingredient substitution chart for baking and cooking. Substitutes for butter, eggs, milk, cream, sugar, flour, and more with ratios and notes. Free PDF.",
  url: "https://printablepolly.com/substitution-chart",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function SubstitutionChartPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <SubstitutionChartClient />
    </>
  );
}
