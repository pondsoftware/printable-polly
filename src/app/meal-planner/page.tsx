import { Metadata } from "next";
import MealPlannerClient from "./MealPlannerClient";

export const metadata: Metadata = {
  title: "Free Printable Weekly Meal Planner - PDF Template | Printable Polly",
  description:
    "Plan breakfast, lunch, dinner, and snacks for the entire week. Customize your start day, toggle the snack row, and print your meal planner for free.",
  alternates: { canonical: "https://printablepolly.com/meal-planner" },
};

export default function MealPlannerPage() {
  return <MealPlannerClient />;
}
