import { Metadata } from "next";
import AlgebraWorksheetsClient from "./AlgebraWorksheetsClient";

export const metadata: Metadata = {
  title: "Free Printable Algebra Worksheets - PDF Generator | Printable Polly",
  description:
    "Generate free printable algebra worksheets with answer keys. Practice one-step, two-step, and multi-step equations. Customize difficulty and print instantly.",
  alternates: { canonical: "https://printablepolly.com/algebra-worksheets" },
};

export default function AlgebraWorksheetsPage() {
  return <AlgebraWorksheetsClient />;
}
