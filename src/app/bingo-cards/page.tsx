import { Metadata } from "next";
import BingoCardsClient from "./BingoCardsClient";

export const metadata: Metadata = {
  title: "Free Printable Bingo Cards - Custom PDF Generator | Printable Polly",
  description:
    "Create and print custom bingo cards with classic numbers or your own words. Perfect for parties, classrooms, and game nights. No signup required.",
  alternates: { canonical: "https://printablepolly.com/bingo-cards" },
};

export default function BingoCardsPage() {
  return <BingoCardsClient />;
}
