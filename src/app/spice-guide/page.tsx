import { Metadata } from "next";
import SpiceGuideClient from "./SpiceGuideClient";

export const metadata: Metadata = {
  title: "Free Printable Spice & Herb Pairing Guide - Cooking Cheat Sheet | Printable Polly",
  description:
    "Print a spice and herb pairing guide with flavor profiles, cuisine pairings, and common spice blends. Italian, Mexican, Indian, Asian, Mediterranean, and BBQ. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/spice-guide" },
};

export default function SpiceGuidePage() {
  return <SpiceGuideClient />;
}
