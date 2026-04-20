import { Metadata } from "next";
import ColoringPagesClient from "./ColoringPagesClient";

export const metadata: Metadata = {
  title: "Free Printable Geometric Coloring Pages - PDF Generator | Printable Polly",
  description:
    "Generate beautiful geometric coloring pages including mandalas, mosaics, kaleidoscopes, and tessellations. Customize patterns and print for free.",
  alternates: { canonical: "https://printablepolly.com/coloring-pages" },
};

export default function ColoringPagesPage() {
  return <ColoringPagesClient />;
}
