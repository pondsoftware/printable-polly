import { Metadata } from "next";
import IsometricPaperClient from "./IsometricPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Isometric Paper - Triangle Grid PDF Generator | Printable Polly",
  description:
    "Create isometric and triangle grid paper for 3D drawing, architecture, and engineering. Customize grid size and line color. Print instantly.",
  alternates: { canonical: "https://printablepolly.com/isometric-paper" },
};

export default function IsometricPaperPage() {
  return <IsometricPaperClient />;
}
