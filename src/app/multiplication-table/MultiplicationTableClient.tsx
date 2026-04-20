"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "Should I use a 1-12 or 1-20 multiplication table?", answer: "1-12 is standard for elementary school. 1-20 is useful for advanced students or when working with larger numbers in everyday math." },
  { question: "Should I use a filled or blank table?", answer: "Start with a filled table as a reference sheet. Once comfortable, switch to a blank table to practice recall. You can print both — one for reference and one for practice." },
  { question: "What age should kids start learning multiplication?", answer: "Most children begin learning multiplication in 2nd or 3rd grade (ages 7-9). Start with 2s, 5s, and 10s, then move to other numbers." },
];

export default function MultiplicationTableClient() {
  const [range, setRange] = useState(12);
  const [filled, setFilled] = useState(true);
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
      { "@type": "ListItem", position: 2, name: "Multiplication Table", item: "https://printablepolly.com/multiplication-table" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Multiplication Table Generator</h1>
      <p className="text-gray-600 mb-6">Generate a printable multiplication table. Choose range (1-12 or 1-20) and print filled for reference or blank for practice.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Range</label>
            <select value={range} onChange={(e) => setRange(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="10">1 - 10</option>
              <option value="12">1 - 12</option>
              <option value="15">1 - 15</option>
              <option value="20">1 - 20</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select value={filled ? "filled" : "blank"} onChange={(e) => setFilled(e.target.value === "filled")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="filled">Filled (Reference)</option>
              <option value="blank">Blank (Practice)</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="multiplication-table" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-4">
              Multiplication Table (1-{range}) {!filled && "— Practice"}
            </h2>

            <table className="w-full border-collapse text-center" style={{ fontSize: range > 12 ? "10px" : "12px" }}>
              <thead>
                <tr>
                  <th className="border border-gray-400 p-1 bg-emerald-100 font-bold">×</th>
                  {Array.from({ length: range }).map((_, i) => (
                    <th key={i} className="border border-gray-400 p-1 bg-emerald-100 font-bold">
                      {i + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: range }).map((_, row) => (
                  <tr key={row}>
                    <td className="border border-gray-400 p-1 bg-emerald-100 font-bold">{row + 1}</td>
                    {Array.from({ length: range }).map((_, col) => (
                      <td key={col} className="border border-gray-400 p-1" style={{ minWidth: range > 12 ? "28px" : "36px", height: range > 12 ? "24px" : "30px" }}>
                        {filled ? (row + 1) * (col + 1) : ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
