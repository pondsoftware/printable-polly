import { Metadata } from "next";
import UsStatesClient from "./UsStatesClient";

export const metadata: Metadata = {
  title: "Free Printable US States & Capitals List - 50 States PDF | Printable Polly",
  description:
    "Print a complete list of all 50 US states with capitals, abbreviations, and regions. Alphabetical or grouped by region. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/us-states" },
};

export default function UsStatesPage() {
  return <UsStatesClient />;
}
