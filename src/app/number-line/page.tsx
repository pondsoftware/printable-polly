import { Metadata } from "next";
import NumberLineClient from "./NumberLineClient";

export const metadata: Metadata = {
  title: "Free Printable Number Lines - Custom PDF Generator | Printable Polly",
  description:
    "Generate printable number lines with customizable start, end, and interval values. Choose labeled or blank for practice. Print instantly for free.",
  alternates: { canonical: "https://printablepolly.com/number-line" },
};

export default function NumberLinePage() {
  return <NumberLineClient />;
}
