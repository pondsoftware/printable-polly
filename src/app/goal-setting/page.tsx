import { Metadata } from "next";
import GoalSettingClient from "./GoalSettingClient";

export const metadata: Metadata = {
  title: "Free Printable SMART Goal Setting Worksheet - PDF Template | Printable Polly",
  description:
    "Create printable SMART goal-setting worksheets. Define specific, measurable, achievable, relevant, and time-bound goals. Download and print for free.",
  alternates: { canonical: "https://printablepolly.com/goal-setting" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "SMART Goal Setting Worksheet",
  description: "Create printable SMART goal-setting worksheets. Define specific, measurable, achievable, relevant, and time-bound goals. Download and print for free.",
  url: "https://printablepolly.com/goal-setting",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function GoalSettingPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <GoalSettingClient />
    </>
  );
}
