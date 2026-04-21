import { Metadata } from "next";
import UnitConversionsClient from "./UnitConversionsClient";

export const metadata: Metadata = {
  title: "Free Printable Unit Conversion Chart - Length, Weight, Volume | Printable Polly",
  description:
    "Print a unit conversion cheat sheet covering length, weight, volume, temperature, area, and speed. Common conversion factors in clean tables. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/unit-conversions" },
};

export default function UnitConversionsPage() {
  return <UnitConversionsClient />;
}
