import { Metadata } from "next";
import SpellingWorksheetsClient from "./SpellingWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Spelling Worksheets - Word Practice Generator | Printable Polly",
  description:
    "Generate printable spelling worksheets with write-each-word-3-times grids, fill-in-the-blank sentences, and word scrambles. Choose Easy, Medium, or Hard difficulty.",
  alternates: { canonical: "https://printablepolly.com/spelling-worksheets" },
};

export default function SpellingWorksheetsPage() {
  return <SpellingWorksheetsClient />;
}
