"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is the Cornell note-taking method?", answer: "The Cornell method divides the page into three sections: a narrow left column for cues/questions, a wide right column for notes, and a bottom section for summarizing. This structure helps with review and retention." },
  { question: "What are the ideal proportions for Cornell notes?", answer: "The standard layout uses a 2.5-inch cue column on the left, the remaining space for notes, and a 2-inch summary section at the bottom." },
  { question: "Who invented the Cornell note system?", answer: "Walter Pauk, an education professor at Cornell University, developed the system in the 1950s. It remains one of the most effective note-taking methods for students." },
];

export default function CornellNotesClient() {
  const [title, setTitle] = useState("Cornell Notes");
  const [showLines, setShowLines] = useState(true);
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
      { "@type": "ListItem", position: 2, name: "Cornell Notes", item: "https://printablepolly.com/cornell-notes" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Cornell Notes Template</h1>
      <p className="text-gray-600 mb-6">Print a Cornell note-taking template with cue column, notes section, and summary area. The proven method for effective studying.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showLines} onChange={(e) => setShowLines(e.target.checked)} className="rounded" />
              Show Guide Lines
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="cornell-notes" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            {/* Title area */}
            <div className="text-center border-b-2 border-gray-800 pb-2 mb-4">
              <h2 className="text-xl font-bold">{title}</h2>
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>Date: _______________</span>
                <span>Subject: _______________</span>
                <span>Page: ____</span>
              </div>
            </div>

            {/* Main content area */}
            <div className="flex border-2 border-gray-800" style={{ height: "800px" }}>
              {/* Cue column */}
              <div className="border-r-2 border-gray-800 p-2" style={{ width: "200px" }}>
                <p className="text-xs font-bold text-gray-600 text-center mb-2">CUES / QUESTIONS</p>
                {showLines && (
                  <div className="space-y-0">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-200 h-7" />
                    ))}
                  </div>
                )}
              </div>
              {/* Notes section */}
              <div className="flex-1 p-2">
                <p className="text-xs font-bold text-gray-600 text-center mb-2">NOTES</p>
                {showLines && (
                  <div className="space-y-0">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className="border-b border-gray-200 h-7" />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary section */}
            <div className="border-2 border-t-0 border-gray-800 p-2" style={{ height: "140px" }}>
              <p className="text-xs font-bold text-gray-600 text-center mb-2">SUMMARY</p>
              {showLines && (
                <div className="space-y-0">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="border-b border-gray-200 h-7" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link key="/lined-paper" href="/lined-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">📝</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Lined Paper</h3>
            </Link>
            <Link key="/dot-grid" href="/dot-grid" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">⊡</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Dot Grid Paper</h3>
            </Link>
            <Link key="/reading-log" href="/reading-log" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">📚</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Reading Log</h3>
            </Link>
            <Link key="/weekly-planner" href="/weekly-planner" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">📅</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Weekly Planner</h3>
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
