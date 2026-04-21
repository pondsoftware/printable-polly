import { Metadata } from "next";
import HtmlCssReferenceClient from "./HtmlCssReferenceClient";

export const metadata: Metadata = {
  title: "Free Printable HTML & CSS Reference Sheet - Quick Guide | Printable Polly",
  description:
    "Print an HTML & CSS quick reference covering common tags, selectors, box model, flexbox, grid, and essential properties. Compact and readable. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/html-css-reference" },
};

export default function HtmlCssReferencePage() {
  return <HtmlCssReferenceClient />;
}
