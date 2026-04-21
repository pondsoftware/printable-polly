import { Metadata } from "next";
import ChecklistClient from "./ChecklistClient";

export const metadata: Metadata = {
  title: "Free Printable Checklist - Custom PDF Generator | Printable Polly",
  description:
    "Create blank printable checklists with customizable items, columns, and titles. Perfect for to-dos, packing lists, and daily planning. Print instantly.",
  alternates: { canonical: "https://printablepolly.com/checklist" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Checklist",
  description: "Create blank printable checklists with customizable items, columns, and titles. Perfect for to-dos, packing lists, and daily planning. Print instantly.",
  url: "https://printablepolly.com/checklist",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function ChecklistPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ChecklistClient />
    </>
  );
}
