import { Metadata } from "next";
import BudgetTrackerClient from "./BudgetTrackerClient";

export const metadata: Metadata = {
  title: "Free Printable Monthly Budget Tracker - PDF Template | Printable Polly",
  description:
    "Track monthly income and expenses by category with this free printable budget tracker. Customize line items, then print or download your budget sheet.",
  alternates: { canonical: "https://printablepolly.com/budget-tracker" },
};

export default function BudgetTrackerPage() {
  return <BudgetTrackerClient />;
}
