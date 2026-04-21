import { Metadata } from "next";
import MusicTheoryClient from "./MusicTheoryClient";

export const metadata: Metadata = {
  title: "Free Printable Music Theory Cheat Sheet - Notes, Keys, Intervals | Printable Polly",
  description:
    "Print a music theory reference covering note values, time signatures, key signatures, intervals, dynamics, and tempo markings. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/music-theory" },
};

export default function MusicTheoryPage() {
  return <MusicTheoryClient />;
}
