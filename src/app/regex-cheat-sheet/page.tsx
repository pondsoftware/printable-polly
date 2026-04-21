import { Metadata } from "next";
import RegexCheatSheetClient from "./RegexCheatSheetClient";

export const metadata: Metadata = {
  title: "Free Printable Regex Cheat Sheet - Regular Expressions Reference | Printable Polly",
  description:
    "Print a regular expressions cheat sheet covering character classes, quantifiers, anchors, groups, lookaround, and common patterns. Free printable PDF.",
  alternates: { canonical: "https://printablepolly.com/regex-cheat-sheet" },
};

export default function RegexCheatSheetPage() {
  return <RegexCheatSheetClient />;
}
