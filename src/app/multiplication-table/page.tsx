import { Metadata } from "next";
import MultiplicationTableClient from "./MultiplicationTableClient";

export const metadata: Metadata = {
  title: "Free Printable Multiplication Table - Times Table PDF | Printable Polly",
  description:
    "Generate printable multiplication tables from 1-12 or 1-20. Print filled for reference or blank for practice. Free and customizable.",
  alternates: { canonical: "https://printablepolly.com/multiplication-table" },
};

export default function MultiplicationTablePage() {
  return <MultiplicationTableClient />;
}
