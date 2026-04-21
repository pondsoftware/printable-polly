import { Metadata } from "next";
import FlashCardsClient from "./FlashCardsClient";

export const metadata: Metadata = {
  title: "Free Printable Flash Cards Generator - Math, Vocabulary, Custom | Printable Polly",
  description:
    "Generate printable flash cards for math facts, vocabulary, or custom content. 6-8 cards per page with cut lines. Customize font size and card border style.",
  alternates: { canonical: "https://printablepolly.com/flash-cards" },
};

export default function FlashCardsPage() {
  return <FlashCardsClient />;
}
