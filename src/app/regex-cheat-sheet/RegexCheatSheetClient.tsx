"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

interface PatternEntry {
  pattern: string;
  description: string;
  example?: string;
}

interface Section {
  title: string;
  entries: PatternEntry[];
}

const sections: Section[] = [
  {
    title: "Character Classes",
    entries: [
      { pattern: ".", description: "Any character (except newline)", example: "a.c → abc, a1c" },
      { pattern: "\\d", description: "Digit [0-9]", example: "\\d{3} → 123" },
      { pattern: "\\D", description: "Non-digit [^0-9]" },
      { pattern: "\\w", description: "Word char [a-zA-Z0-9_]", example: "\\w+ → hello_1" },
      { pattern: "\\W", description: "Non-word character" },
      { pattern: "\\s", description: "Whitespace [\\t\\n\\r\\f ]" },
      { pattern: "\\S", description: "Non-whitespace" },
      { pattern: "[abc]", description: "Any of a, b, or c" },
      { pattern: "[^abc]", description: "Not a, b, or c" },
      { pattern: "[a-z]", description: "Character range" },
    ],
  },
  {
    title: "Quantifiers",
    entries: [
      { pattern: "*", description: "0 or more", example: "a* → \"\", a, aa" },
      { pattern: "+", description: "1 or more", example: "a+ → a, aa, aaa" },
      { pattern: "?", description: "0 or 1 (optional)", example: "colou?r → color, colour" },
      { pattern: "{n}", description: "Exactly n times", example: "\\d{4} → 2024" },
      { pattern: "{n,}", description: "n or more times" },
      { pattern: "{n,m}", description: "Between n and m times" },
      { pattern: "*?", description: "Lazy (match minimum)" },
      { pattern: "+?", description: "Lazy one or more" },
    ],
  },
  {
    title: "Anchors & Boundaries",
    entries: [
      { pattern: "^", description: "Start of string/line", example: "^Hello → match at start" },
      { pattern: "$", description: "End of string/line", example: "end$ → match at end" },
      { pattern: "\\b", description: "Word boundary", example: "\\bcat\\b → \"cat\" not \"catch\"" },
      { pattern: "\\B", description: "Not a word boundary" },
      { pattern: "(?=...)", description: "Lookahead", example: "\\d(?=px) → 5 in \"5px\"" },
      { pattern: "(?!...)", description: "Negative lookahead" },
      { pattern: "(?<=...)", description: "Lookbehind", example: "(?<=\\$)\\d+ → 99 in \"$99\"" },
      { pattern: "(?<!...)", description: "Negative lookbehind" },
    ],
  },
  {
    title: "Groups & Alternation",
    entries: [
      { pattern: "(abc)", description: "Capturing group", example: "(\\d+) → capture digits" },
      { pattern: "(?:abc)", description: "Non-capturing group" },
      { pattern: "(?P<name>...)", description: "Named group" },
      { pattern: "\\1", description: "Backreference to group 1" },
      { pattern: "a|b", description: "Alternation (or)", example: "cat|dog → cat or dog" },
    ],
  },
  {
    title: "Common Patterns",
    entries: [
      { pattern: "[\\w.]+@[\\w.]+\\.\\w+", description: "Email (basic)" },
      { pattern: "\\d{3}[-.\\s]?\\d{3}[-.\\s]?\\d{4}", description: "US Phone number" },
      { pattern: "https?://[\\w./\\-?&#=]+", description: "URL" },
      { pattern: "\\d{4}-\\d{2}-\\d{2}", description: "Date (YYYY-MM-DD)" },
      { pattern: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}", description: "IPv4 Address" },
      { pattern: "#?[0-9a-fA-F]{6}", description: "Hex Color" },
    ],
  },
  {
    title: "Flags / Modifiers",
    entries: [
      { pattern: "g", description: "Global (all matches)" },
      { pattern: "i", description: "Case-insensitive" },
      { pattern: "m", description: "Multiline (^ and $ per line)" },
      { pattern: "s", description: "Dotall (. matches newline)" },
      { pattern: "x", description: "Extended (ignore whitespace)" },
    ],
  },
];

const faqs = [
  { question: "What is the difference between * and + in regex?", answer: "The * quantifier matches zero or more occurrences (the preceding element is optional and can repeat). The + quantifier requires at least one occurrence. For example, 'a*' matches empty string, 'a', 'aa', while 'a+' matches 'a', 'aa' but not empty string." },
  { question: "When should I use non-capturing groups?", answer: "Use (?:...) when you need grouping for alternation or quantifiers but don't need to reference the matched text later. This is more efficient and keeps your capture group numbering clean. Example: (?:cat|dog)s matches 'cats' or 'dogs' without capturing." },
  { question: "How do I test and debug regular expressions?", answer: "Use online tools like regex101.com or regexr.com that provide real-time matching, explanation of patterns, and test strings. Most code editors also support regex in find/replace. Print this cheat sheet for quick offline reference." },
];

export default function RegexCheatSheetClient() {
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://printablepolly.com" },
      { "@type": "ListItem", position: 2, name: "Regex Cheat Sheet", item: "https://printablepolly.com/regex-cheat-sheet" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Regex Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A printable regular expressions reference covering character classes, quantifiers, anchors, groups, and common patterns. Essential for any developer.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="regex-cheat-sheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "28px" }}>
            <div className="text-center mb-5">
              <h2 className="text-xl font-bold text-gray-900">Regular Expressions Reference</h2>
              <p className="text-xs text-gray-500 mt-1">printablepolly.com</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-bold text-emerald-700 border-b border-emerald-200 pb-1 mb-2">{section.title}</h3>
                  <div className="space-y-1">
                    {section.entries.map((entry) => (
                      <div key={entry.pattern + entry.description} className="flex items-start gap-2">
                        <code className="text-[10px] font-mono bg-gray-50 border border-gray-200 rounded px-1 py-0.5 text-emerald-800 whitespace-nowrap shrink-0 min-w-[60px]">
                          {entry.pattern}
                        </code>
                        <span className="text-[10px] text-gray-600 leading-tight">
                          {entry.description}
                          {entry.example && <span className="text-gray-400 block">{entry.example}</span>}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/git-cheat-sheet" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔀</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Git Cheat Sheet</h3>
          </Link>
          <Link href="/keyboard-shortcuts" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">⌨️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Keyboard Shortcuts</h3>
          </Link>
          <Link href="/html-css-reference" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🌐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">HTML & CSS Reference</h3>
          </Link>
          <Link href="/math-formulas" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📊</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Math Formulas</h3>
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
