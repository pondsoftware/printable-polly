import { Metadata } from "next";
import CookingTemperaturesClient from "./CookingTemperaturesClient";

export const metadata: Metadata = {
  title: "Free Printable Cooking Temperatures Chart - Meat, Oven, Candy | Printable Polly",
  description:
    "Print a cooking temperature reference chart with USDA safe meat temperatures, oven F/C/Gas Mark conversions, baking temps, and candy stages. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/cooking-temperatures" },
};

export default function CookingTemperaturesPage() {
  return <CookingTemperaturesClient />;
}
