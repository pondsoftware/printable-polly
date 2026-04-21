import { Metadata } from "next";
import SubstitutionChartClient from "./SubstitutionChartClient";

export const metadata: Metadata = {
  title: "Free Printable Ingredient Substitution Chart - Baking & Cooking | Printable Polly",
  description:
    "Print an ingredient substitution chart for baking and cooking. Substitutes for butter, eggs, milk, cream, sugar, flour, and more with ratios and notes. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/substitution-chart" },
};

export default function SubstitutionChartPage() {
  return <SubstitutionChartClient />;
}
