import { Metadata } from "next";
import ChoreChartClient from "./ChoreChartClient";

export const metadata: Metadata = {
  title: "Free Printable Chore Chart for Kids - PDF Generator | Printable Polly",
  description:
    "Create printable weekly chore charts for kids. Customize chore names and number of tasks, then print or download as PDF. Great for building responsibility.",
  alternates: { canonical: "https://printablepolly.com/chore-chart" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Chore Chart for Kids",
  description: "Create printable weekly chore charts for kids. Customize chore names and number of tasks, then print or download as PDF. Great for building responsibility.",
  url: "https://printablepolly.com/chore-chart",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function ChoreChartPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ChoreChartClient />
    </>
  );
}
