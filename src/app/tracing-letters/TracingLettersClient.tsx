"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type LetterCase = "uppercase" | "lowercase" | "mixed";
type LettersPerPage = 4 | 6 | 8;

const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LOWERCASE = "abcdefghijklmnopqrstuvwxyz".split("");

function getLetters(letterCase: LetterCase): string[] {
  switch (letterCase) {
    case "uppercase":
      return UPPERCASE;
    case "lowercase":
      return LOWERCASE;
    case "mixed":
      return UPPERCASE.flatMap((u, i) => [u, LOWERCASE[i]]);
  }
}

const faqs = [
  { question: "What age is letter tracing appropriate for?", answer: "Letter tracing is ideal for children ages 3-6 (pre-K through kindergarten). Children should first be comfortable holding a pencil and making basic strokes. Start with uppercase letters as they have simpler strokes, then progress to lowercase. Most children are ready for tracing around age 3-4." },
  { question: "Should children learn uppercase or lowercase first?", answer: "Most educators recommend starting with uppercase letters because they use simpler, more distinct strokes (mostly straight lines and circles). Once uppercase is mastered, move to lowercase. The 'Mixed' option lets you practice both together, alternating on each line." },
  { question: "How can I make letter tracing more effective?", answer: "Have children say the letter name and sound while tracing. Use the 'say it, trace it, write it' method: say the letter, trace the dotted version, then try writing it independently. Print multiple sheets and practice a few letters each day rather than the whole alphabet at once." },
];

export default function TracingLettersClient() {
  const [letterCase, setLetterCase] = useState<LetterCase>("uppercase");
  const [lettersPerPage, setLettersPerPage] = useState<LettersPerPage>(6);
  const [startIndex, setStartIndex] = useState(0);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const allLetters = getLetters(letterCase);
  const totalPages = Math.ceil(allLetters.length / lettersPerPage);
  const displayLetters = allLetters.slice(startIndex, startIndex + lettersPerPage);

  const handleNext = () => {
    if (startIndex + lettersPerPage < allLetters.length) {
      setStartIndex(startIndex + lettersPerPage);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(Math.max(0, startIndex - lettersPerPage));
    }
  };

  const currentPage = Math.floor(startIndex / lettersPerPage) + 1;
  const rowHeight = Math.floor((height - 120) / lettersPerPage);
  const tracingCount = Math.max(4, Math.floor((width - 140) / 48));

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
      { "@type": "ListItem", position: 2, name: "Tracing Letters", item: "https://printablepolly.com/tracing-letters" },
    ],
  };

  const caseLabel = letterCase === "uppercase" ? "Uppercase" : letterCase === "lowercase" ? "Lowercase" : "Mixed";

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Letter Tracing Worksheets</h1>
      <p className="text-gray-600 mb-6">Generate printable letter tracing worksheets for pre-K and kindergarten. Dotted letters for tracing practice with a full line of repetitions for each letter.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Letter Case</label>
            <select value={letterCase} onChange={(e) => { setLetterCase(e.target.value as LetterCase); setStartIndex(0); }} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="uppercase">Uppercase Only</option>
              <option value="lowercase">Lowercase Only</option>
              <option value="mixed">Mixed (Upper + Lower)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Letters Per Page</label>
            <select value={lettersPerPage} onChange={(e) => { setLettersPerPage(parseInt(e.target.value) as LettersPerPage); setStartIndex(0); }} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="4">4 letters (extra large)</option>
              <option value="6">6 letters (large)</option>
              <option value="8">8 letters (medium)</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              &larr; Prev
            </button>
            <button
              onClick={handleNext}
              disabled={startIndex + lettersPerPage >= allLetters.length}
              className="flex-1 bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Next &rarr;
            </button>
          </div>
          <p className="text-xs text-gray-500 text-center">Page {currentPage} of {totalPages}</p>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="tracing-letters" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Letter Tracing Practice</h2>
            <p className="text-center text-sm text-gray-500 mb-1">{caseLabel} Letters</p>
            <p className="text-center text-sm text-gray-400 mb-4">Name: ___________________________ Date: _______________</p>

            <div className="space-y-0">
              {displayLetters.map((letter, i) => (
                <div
                  key={`${letter}-${i}`}
                  className="flex items-center border-b border-gray-200"
                  style={{ height: `${rowHeight}px` }}
                >
                  {/* Solid example letter */}
                  <div
                    className="font-bold text-gray-800 shrink-0 flex items-center justify-center"
                    style={{
                      fontSize: `${Math.min(rowHeight * 0.7, 64)}px`,
                      width: "60px",
                      fontFamily: "serif",
                    }}
                  >
                    {letter}
                  </div>

                  {/* Dotted tracing letters */}
                  <div className="flex items-center gap-1 flex-1">
                    {Array.from({ length: tracingCount }, (_, j) => (
                      <div
                        key={j}
                        className="shrink-0 flex items-center justify-center"
                        style={{
                          fontSize: `${Math.min(rowHeight * 0.7, 64)}px`,
                          fontFamily: "serif",
                          color: "transparent",
                          WebkitTextStroke: "1.5px #d1d5db",
                          width: "48px",
                        }}
                      >
                        {letter}
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
          <Link href="/handwriting-practice" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">✏️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Handwriting Practice</h3>
          </Link>
          <Link href="/sight-words" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">👁️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Sight Words</h3>
          </Link>
          <Link href="/spelling-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📝</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Spelling Worksheets</h3>
          </Link>
          <Link href="/coloring-pages" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎨</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Coloring Pages</h3>
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
