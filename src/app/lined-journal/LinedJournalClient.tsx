"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type LineSpacing = "wide" | "medium" | "narrow";

const LINE_HEIGHTS: Record<LineSpacing, number> = {
  wide: 36,
  medium: 28,
  narrow: 22,
};

const faqs = [
  { question: "What line spacing is best for elementary students?", answer: "Wide spacing (3/4 inch) is best for kindergarten through 1st grade as children are still developing fine motor control. Medium spacing (1/2 inch) works well for 2nd-3rd grade. Narrow spacing (3/8 inch) is appropriate for 4th grade and up when handwriting is more refined." },
  { question: "Should I include the drawing box at the top?", answer: "Yes! Research shows that combining drawing with writing helps young children express ideas they can't yet fully articulate in words. The drawing box encourages creativity and helps reluctant writers get started. It's especially valuable for pre-K through 2nd grade." },
  { question: "How can I use these journal pages in the classroom or at home?", answer: "Use them for daily journal prompts, creative writing exercises, reading response journals, or science observation logs. Write a prompt on the board and let children draw a picture first, then write about it. Printing multiple copies creates an instant journal when stapled together." },
];

export default function LinedJournalClient() {
  const [lineSpacing, setLineSpacing] = useState<LineSpacing>("wide");
  const [showDrawingBox, setShowDrawingBox] = useState(true);
  const [showDateLine, setShowDateLine] = useState(true);
  const [showPromptLine, setShowPromptLine] = useState(false);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const lineHeight = LINE_HEIGHTS[lineSpacing];
  const drawingBoxHeight = showDrawingBox ? Math.floor(height * 0.3) : 0;
  const headerHeight = 60 + (showDateLine ? 30 : 0) + (showPromptLine ? 30 : 0);
  const availableHeight = height - 64 - headerHeight - drawingBoxHeight - 20;
  const numLines = Math.floor(availableHeight / lineHeight);

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
      { "@type": "ListItem", position: 2, name: "Lined Journal", item: "https://printablepolly.com/lined-journal" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Lined Journal Pages</h1>
      <p className="text-gray-600 mb-6">Generate printable journal pages with lines and an optional drawing area at the top. Perfect for elementary creative writing, daily journals, and story writing.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Spacing</label>
            <select value={lineSpacing} onChange={(e) => setLineSpacing(e.target.value as LineSpacing)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="wide">Wide (K-1st grade)</option>
              <option value="medium">Medium (2nd-3rd grade)</option>
              <option value="narrow">Narrow (4th+ grade)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showDrawingBox} onChange={(e) => setShowDrawingBox(e.target.checked)} className="rounded" />
              Drawing Box
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showDateLine} onChange={(e) => setShowDateLine(e.target.checked)} className="rounded" />
              Date Line
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showPromptLine} onChange={(e) => setShowPromptLine(e.target.checked)} className="rounded" />
              Prompt/Title Line
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="lined-journal" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            {/* Header */}
            {showDateLine && (
              <div className="flex justify-end mb-2">
                <span className="text-sm text-gray-500">Date: _______________</span>
              </div>
            )}

            {showPromptLine && (
              <div className="mb-3">
                <div className="border-b-2 border-gray-400" style={{ height: "28px" }}>
                  <span className="text-xs text-gray-400">Title / Prompt:</span>
                </div>
              </div>
            )}

            {/* Drawing Box */}
            {showDrawingBox && (
              <div
                className="border-2 border-gray-300 rounded mb-4 flex items-center justify-center"
                style={{ height: `${drawingBoxHeight}px` }}
              >
                <span className="text-gray-300 text-sm">Draw here</span>
              </div>
            )}

            {/* Writing Lines */}
            <div>
              {Array.from({ length: numLines }, (_, i) => (
                <div
                  key={i}
                  className="border-b border-gray-300"
                  style={{ height: `${lineHeight}px` }}
                >
                  {lineSpacing === "wide" && (
                    <div
                      className="border-b border-dashed border-gray-200"
                      style={{ height: `${lineHeight * 0.6}px` }}
                    />
                  )}
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
          <Link href="/lined-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📝</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Lined Paper</h3>
          </Link>
          <Link href="/handwriting-practice" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">✏️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Handwriting Practice</h3>
          </Link>
          <Link href="/storyboard" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎬</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Storyboard</h3>
          </Link>
          <Link href="/tracing-letters" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔤</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Tracing Letters</h3>
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
