import { Metadata } from "next";
import BudgetTrackerClient from "./BudgetTrackerClient";

export const metadata: Metadata = {
  title: "Free Printable Monthly Budget Tracker - PDF Template | Printable Polly",
  description:
    "Track monthly income and expenses by category with this free printable budget tracker. Customize line items, then print or download your budget sheet.",
  alternates: { canonical: "https://printablepolly.com/budget-tracker" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Monthly Budget Tracker",
  description: "Track monthly income and expenses by category with this free printable budget tracker. Customize line items, then print or download your budget sheet.",
  url: "https://printablepolly.com/budget-tracker",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function BudgetTrackerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <BudgetTrackerClient />
    </>
  );
}
