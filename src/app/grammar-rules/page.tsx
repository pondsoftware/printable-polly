import { Metadata } from "next";
import GrammarRulesClient from "./GrammarRulesClient";

export const metadata: Metadata = {
  title: "Free Printable English Grammar Cheat Sheet - Rules & Examples | Printable Polly",
  description:
    "Print an English grammar cheat sheet with parts of speech, punctuation rules, common mistakes, sentence structure, and confused words. Free PDF.",
  alternates: { canonical: "https://printablepolly.com/grammar-rules" },
};

export default function GrammarRulesPage() {
  return <GrammarRulesClient />;
}
