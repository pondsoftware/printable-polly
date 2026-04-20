import { Metadata } from "next";
import MathWorksheetsClient from "./MathWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Math Worksheets - PDF Generator with Answer Keys | Printable Polly",
  description:
    "Generate printable math worksheets with random problems. Choose arithmetic, fractions, algebra, or geometry at any difficulty level. Includes answer keys.",
  alternates: { canonical: "https://printablepolly.com/math-worksheets" },
};

export default function MathWorksheetsPage() {
  return <MathWorksheetsClient />;
}
