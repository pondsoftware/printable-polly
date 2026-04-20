import { Metadata } from "next";
import CornellNotesClient from "./CornellNotesClient";

export const metadata: Metadata = {
  title: "Free Printable Cornell Notes Template - PDF Generator | Printable Polly",
  description:
    "Print Cornell note-taking templates with cue column, notes section, and summary area. The proven method for effective studying. Customize and print free.",
  alternates: { canonical: "https://printablepolly.com/cornell-notes" },
};

export default function CornellNotesPage() {
  return <CornellNotesClient />;
}
