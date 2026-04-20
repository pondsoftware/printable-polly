import { Metadata } from "next";
import LinedPaperClient from "./LinedPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Lined Paper - Ruled Paper PDF Generator | Printable Polly",
  description:
    "Create custom ruled paper with college, wide, or narrow line spacing. Add or remove margins and choose your line color. Print free lined paper instantly.",
  alternates: { canonical: "https://printablepolly.com/lined-paper" },
};

export default function LinedPaperPage() {
  return <LinedPaperClient />;
}
