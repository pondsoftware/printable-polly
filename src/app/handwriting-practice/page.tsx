import { Metadata } from "next";
import HandwritingPracticeClient from "./HandwritingPracticeClient";

export const metadata: Metadata = {
  title: "Free Printable Handwriting Practice Sheets - PDF Generator | Printable Polly",
  description:
    "Generate printable handwriting practice sheets with traceable text in print or cursive. Choose preset texts or type your own. Free and customizable.",
  alternates: { canonical: "https://printablepolly.com/handwriting-practice" },
};

export default function HandwritingPracticePage() {
  return <HandwritingPracticeClient />;
}
