import { Metadata } from "next";
import PeriodicTableClient from "./PeriodicTableClient";

export const metadata: Metadata = {
  title: "Free Printable Periodic Table of Elements - Color PDF | Printable Polly",
  description:
    "Print a color-coded periodic table of elements with atomic number, symbol, name, and atomic mass. Full or simplified version. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/periodic-table" },
};

export default function PeriodicTablePage() {
  return <PeriodicTableClient />;
}
