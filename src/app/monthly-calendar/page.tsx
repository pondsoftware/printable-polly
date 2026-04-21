import { Metadata } from "next";
import MonthlyCalendarClient from "./MonthlyCalendarClient";

export const metadata: Metadata = {
  title: "Free Printable Monthly Calendar - PDF Generator | Printable Polly",
  description:
    "Generate a printable monthly calendar for any month and year. Choose your start day, add a notes section, and print or download as PDF.",
  alternates: { canonical: "https://printablepolly.com/monthly-calendar" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Monthly Calendar",
  description: "Generate a printable monthly calendar for any month and year. Choose your start day, add a notes section, and print or download as PDF.",
  url: "https://printablepolly.com/monthly-calendar",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MonthlyCalendarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MonthlyCalendarClient />
    </>
  );
}
