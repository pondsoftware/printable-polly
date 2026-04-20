"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How do I use a reading log?", answer: "Write down each book as you start it, noting the title, author, and start date. When you finish, record the end date and rate the book. Over time, your log becomes a personal record of everything you've read." },
  { question: "Are reading logs good for kids?", answer: "Yes! Reading logs help kids build a consistent reading habit, track progress toward school goals, and feel a sense of accomplishment. Many schools require or encourage reading logs as part of their literacy programs." },
  { question: "How many books should I aim to read per month?", answer: "There's no right number — it depends on your schedule and reading speed. Most avid readers aim for 2-4 books per month. The goal is consistency, not quantity. A reading log helps you stay aware of your pace." },
];

export default function ReadingLogClient() {
  const [numRows, setNumRows] = useState(15);
  const [includeRating, setIncludeRating] = useState(true);
  const [includeNotes, setIncludeNotes] = useState(true);
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
      { "@type": "ListItem", position: 2, name: "Reading Log", item: "https://printablepolly.com/reading-log" },
    ],
  };

  const columnCount = 4 + (includeRating ? 1 : 0) + (includeNotes ? 1 : 0);

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Reading Log Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable reading log to track books you&apos;ve read. Customize the number of rows and choose which columns to include.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Rows</label>
            <select value={numRows} onChange={(e) => setNumRows(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="10">10 rows</option>
              <option value="15">15 rows</option>
              <option value="20">20 rows</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={includeRating} onChange={(e) => setIncludeRating(e.target.checked)} className="rounded border-gray-300" />
              Include Rating Column
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={includeNotes} onChange={(e) => setIncludeNotes(e.target.checked)} className="rounded border-gray-300" />
              Include Notes Column
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="reading-log" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Reading Log</h2>
            <div className="flex justify-center gap-8 text-sm text-gray-500 mb-4">
              <span>Name: ___________________</span>
              <span>Grade/Class: _______________</span>
              <span>Date Range: _______________</span>
            </div>

            <table className="w-full border-collapse border border-gray-300 text-xs">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-1.5 bg-gray-50 text-left" style={{ width: "4%" }}>#</th>
                  <th className="border border-gray-300 p-1.5 bg-gray-50 text-left">Book Title</th>
                  <th className="border border-gray-300 p-1.5 bg-gray-50 text-left" style={{ width: "18%" }}>Author</th>
                  <th className="border border-gray-300 p-1.5 bg-gray-50 text-center" style={{ width: "12%" }}>Date Started</th>
                  <th className="border border-gray-300 p-1.5 bg-gray-50 text-center" style={{ width: "12%" }}>Date Finished</th>
                  {includeRating && (
                    <th className="border border-gray-300 p-1.5 bg-gray-50 text-center" style={{ width: "10%" }}>Rating</th>
                  )}
                  {includeNotes && (
                    <th className="border border-gray-300 p-1.5 bg-gray-50 text-left" style={{ width: "18%" }}>Notes</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: numRows }).map((_, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 p-1.5 text-gray-400 text-center">{i + 1}</td>
                    <td className="border border-gray-300 p-1.5" style={{ height: "28px" }} />
                    <td className="border border-gray-300 p-1.5" />
                    <td className="border border-gray-300 p-1.5 text-center text-gray-300">__/__/__</td>
                    <td className="border border-gray-300 p-1.5 text-center text-gray-300">__/__/__</td>
                    {includeRating && (
                      <td className="border border-gray-300 p-1.5 text-center text-gray-300 tracking-widest">☆☆☆☆☆</td>
                    )}
                    {includeNotes && (
                      <td className="border border-gray-300 p-1.5" />
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link key="/cornell-notes" href="/cornell-notes" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎓</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Cornell Notes</h3>
            </Link>
            <Link key="/handwriting-practice" href="/handwriting-practice" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">✏️</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Handwriting Practice</h3>
            </Link>
            <Link key="/sight-words" href="/sight-words" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">👁️</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Sight Words</h3>
            </Link>
            <Link key="/checklist" href="/checklist" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">☑️</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Checklist</h3>
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
