import { Metadata } from "next";
import SightWordsClient from "./SightWordsClient";

export const metadata: Metadata = {
  title: "Free Printable Sight Word Practice Sheets - PDF Generator | Printable Polly",
  description:
    "Generate printable sight word practice sheets by grade level. Each word includes a printed example, dotted tracing guide, and blank lines for writing practice.",
  alternates: { canonical: "https://printablepolly.com/sight-words" },
};

export default function SightWordsPage() {
  return <SightWordsClient />;
}
