import { Metadata } from "next";
import StaffPaperClient from "./StaffPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Staff Paper - Blank Sheet Music PDF Generator | Printable Polly",
  description:
    "Create blank sheet music manuscript paper with customizable staves, clef symbols, and line colors. Perfect for composition, music theory, and practice.",
  alternates: { canonical: "https://printablepolly.com/staff-paper" },
};

export default function StaffPaperPage() {
  return <StaffPaperClient />;
}
