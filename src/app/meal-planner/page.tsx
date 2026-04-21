import { Metadata } from "next";
import MealPlannerClient from "./MealPlannerClient";

export const metadata: Metadata = {
  title: "Free Printable Weekly Meal Planner - PDF Template | Printable Polly",
  description:
    "Plan breakfast, lunch, dinner, and snacks for the entire week. Customize your start day, toggle the snack row, and print your meal planner for free.",
  alternates: { canonical: "https://printablepolly.com/meal-planner" },
};


const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Weekly Meal Planner",
  description: "Plan breakfast, lunch, dinner, and snacks for the entire week. Customize your start day, toggle the snack row, and print your meal planner for free.",
  url: "https://printablepolly.com/meal-planner",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function MealPlannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppJsonLd) }} />
      <MealPlannerClient />
    </>
  );
}
