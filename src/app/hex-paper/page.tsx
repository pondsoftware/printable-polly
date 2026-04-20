import { Metadata } from "next";
import HexPaperClient from "./HexPaperClient";

export const metadata: Metadata = {
  title: "Free Printable Hexagonal Graph Paper - PDF Generator | Printable Polly",
  description:
    "Create printable hexagonal grid paper with adjustable hex size and line color. Ideal for organic chemistry, RPG maps, game boards, and tessellation design.",
  alternates: { canonical: "https://printablepolly.com/hex-paper" },
};

export default function HexPaperPage() {
  return <HexPaperClient />;
}
