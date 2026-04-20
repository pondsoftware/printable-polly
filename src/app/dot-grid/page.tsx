import { Metadata } from "next";
import DotGridClient from "./DotGridClient";

export const metadata: Metadata = {
  title: "Free Printable Dot Grid Paper - Custom PDF Generator | Printable Polly",
  description:
    "Create custom dot grid paper for bullet journaling, sketching, and note-taking. Adjust dot spacing, size, and color. Print instantly for free.",
  alternates: { canonical: "https://printablepolly.com/dot-grid" },
};

export default function DotGridPage() {
  return <DotGridClient />;
}
