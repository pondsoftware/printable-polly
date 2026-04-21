import { Metadata } from "next";
import ReadingLogClient from "./ReadingLogClient";

export const metadata: Metadata = {
  title: "Free Printable Reading Log - Book Tracker PDF Template | Printable Polly",
  description:
    "Create a printable reading log to track books. Customize the number of rows and choose which columns to include. Perfect for students and book lovers.",
  alternates: { canonical: "https://printablepolly.com/reading-log" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Reading Log",
  description: "Create a printable reading log to track books. Customize the number of rows and choose which columns to include. Perfect for students and book lovers.",
  url: "https://printablepolly.com/reading-log",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function ReadingLogPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <ReadingLogClient />
    </>
  );
}
