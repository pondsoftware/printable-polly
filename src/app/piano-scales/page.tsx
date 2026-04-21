import { Metadata } from "next";
import PianoScalesClient from "./PianoScalesClient";

export const metadata: Metadata = {
  title: "Free Printable Piano Scales Reference - Major, Minor, Pentatonic | Printable Polly",
  description:
    "Print piano scale diagrams with highlighted keys for all major and minor scales, plus pentatonic and blues scales. Includes finger numbers. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/piano-scales" },
};

export default function PianoScalesPage() {
  return <PianoScalesClient />;
}
