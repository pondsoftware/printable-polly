import { Metadata } from "next";
import FractionsWorksheetsClient from "./FractionsWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Fractions Worksheets - PDF Generator | Printable Polly",
  description:
    "Generate free printable fractions worksheets with answer keys. Practice adding, subtracting, and simplifying fractions at any difficulty level.",
  alternates: { canonical: "https://printablepolly.com/fractions-worksheets" },
};

export default function FractionsWorksheetsPage() {
  return <FractionsWorksheetsClient />;
}
