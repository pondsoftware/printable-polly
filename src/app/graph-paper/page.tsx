import { Metadata } from "next";
import GraphPaperClient from "./GraphPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Graph Paper - Custom Grid PDF Generator | Printable Polly",
  description:
    "Create custom graph paper with adjustable grid size, line color, and weight. Perfect for math, science, engineering, and sketching. Print instantly.",
  alternates: { canonical: "https://printablepolly.com/graph-paper" },
};

export default function GraphPaperPage() {
  return <GraphPaperClient />;
}
