import { Metadata } from "next";
import MultiplicationTableClient from "./MultiplicationTableClient";

export const metadata: Metadata = {
  title: "Free Printable Multiplication Table - Times Table PDF | Printable Polly",
  description:
    "Generate printable multiplication tables from 1-12 or 1-20. Print filled for reference or blank for practice. Free and customizable.",
  alternates: { canonical: "https://printablepolly.com/multiplication-table" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Multiplication Table",
  description: "Generate printable multiplication tables from 1-12 or 1-20. Print filled for reference or blank for practice. Free and customizable.",
  url: "https://printablepolly.com/multiplication-table",
  applicationCategory: "EducationalApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MultiplicationTablePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MultiplicationTableClient />
    </>
  );
}
