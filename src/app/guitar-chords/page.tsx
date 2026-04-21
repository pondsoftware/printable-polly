import { Metadata } from "next";
import GuitarChordsClient from "./GuitarChordsClient";

export const metadata: Metadata = {
  title: "Free Printable Guitar Chord Chart - Essential Open Chords PDF | Printable Polly",
  description:
    "Print a guitar chord chart with diagrams for essential open chords, barre chords, and seventh chords. Shows finger positions, open/muted strings. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/guitar-chords" },
};

export default function GuitarChordsPage() {
  return <GuitarChordsClient />;
}
