import { Metadata } from "next";
import GroceryListClient from "./GroceryListClient";

export const metadata: Metadata = {
  title: "Free Printable Grocery List - Organized PDF Template | Printable Polly",
  description:
    "Create printable grocery lists organized by store section. Customize section names and items for efficient shopping. Print or download as PDF.",
  alternates: { canonical: "https://printablepolly.com/grocery-list" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Grocery List",
  description: "Create printable grocery lists organized by store section. Customize section names and items for efficient shopping. Print or download as PDF.",
  url: "https://printablepolly.com/grocery-list",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GroceryListPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GroceryListClient />
    </>
  );
}
