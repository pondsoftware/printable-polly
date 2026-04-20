import { Metadata } from "next";
import ComicStripClient from "./ComicStripClient";

export const metadata: Metadata = {
  title: "Free Printable Comic Strip Templates - Blank PDF Panels | Printable Polly",
  description:
    "Print blank comic strip panels for drawing stories. Choose your panel layout and border style, then start creating comics. Free and customizable.",
  alternates: { canonical: "https://printablepolly.com/comic-strip" },
};

export default function ComicStripPage() {
  return <ComicStripClient />;
}
