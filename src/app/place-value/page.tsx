import { Metadata } from "next";
import PlaceValueClient from "./PlaceValueClient";

export const metadata: Metadata = {
  title: "Free Printable Place Value Worksheets - Ones, Tens, Hundreds | Printable Polly",
  description:
    "Generate printable place value worksheets. Identify digit values, expanded form, compare numbers, and write in standard form. Easy through Hard difficulty levels.",
  alternates: { canonical: "https://printablepolly.com/place-value" },
};

export default function PlaceValuePage() {
  return <PlaceValueClient />;
}
