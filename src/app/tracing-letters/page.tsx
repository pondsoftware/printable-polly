import { Metadata } from "next";
import TracingLettersClient from "./TracingLettersClient";

export const metadata: Metadata = {
  title: "Free Printable Letter Tracing Worksheets - Pre-K & Kindergarten | Printable Polly",
  description:
    "Generate printable letter tracing worksheets for pre-K and kindergarten. Dotted/dashed uppercase and lowercase letters with full-line tracing practice.",
  alternates: { canonical: "https://printablepolly.com/tracing-letters" },
};

export default function TracingLettersPage() {
  return <TracingLettersClient />;
}
