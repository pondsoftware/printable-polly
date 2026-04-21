import { Metadata } from "next";
import MeasurementConversionsClient from "./MeasurementConversionsClient";

export const metadata: Metadata = {
  title: "Free Printable Kitchen Measurement Conversions Chart | Printable Polly",
  description:
    "Print a kitchen measurement conversion cheat sheet with teaspoons to tablespoons, cups to quarts, ml to cups, grams to ounces, and common ingredient weights. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/measurement-conversions" },
};

export default function MeasurementConversionsPage() {
  return <MeasurementConversionsClient />;
}
