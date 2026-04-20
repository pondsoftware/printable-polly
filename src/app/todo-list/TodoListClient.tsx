"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How should I prioritize my to-do list?", answer: "Use the High/Medium/Low system: High priority items are urgent and important (do first), Medium items are important but less urgent, and Low items can wait or be delegated." },
  { question: "How many tasks should be on a daily to-do list?", answer: "Aim for 3-5 high-priority items, 3-5 medium, and optional low-priority items. Most people overestimate what they can complete in a day." },
  { question: "When should I write my to-do list?", answer: "Write tomorrow's to-do list the night before. This lets your brain process overnight and helps you start the day with clear direction." },
];

export default function TodoListClient() {
  const [highItems, setHighItems] = useState(5);
  const [medItems, setMedItems] = useState(5);
  const [lowItems, setLowItems] = useState(5);
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
      { "@type": "ListItem", position: 2, name: "To-Do List", item: "https://printablepolly.com/todo-list" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">To-Do List Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable to-do list with priority sections (High, Medium, Low). Stay organized by tackling important tasks first.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">High Priority Items</label>
            <input type="number" min="1" max="15" value={highItems} onChange={(e) => setHighItems(parseInt(e.target.value) || 5)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medium Priority Items</label>
            <input type="number" min="1" max="15" value={medItems} onChange={(e) => setMedItems(parseInt(e.target.value) || 5)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Low Priority Items</label>
            <input type="number" min="1" max="15" value={lowItems} onChange={(e) => setLowItems(parseInt(e.target.value) || 5)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="todo-list" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">To-Do List</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Date: _______________</p>

            {/* High Priority */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 border-b-2 border-red-400 pb-1">
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">HIGH</span>
                <h3 className="font-bold text-sm">Priority — Do First</h3>
              </div>
              <div className="space-y-2">
                {Array.from({ length: highItems }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-gray-200 pb-1">
                    <div className="w-4 h-4 border-2 border-red-300 rounded-sm shrink-0" />
                    <div className="flex-1 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Priority */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 border-b-2 border-yellow-400 pb-1">
                <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-0.5 rounded">MED</span>
                <h3 className="font-bold text-sm">Priority — Important</h3>
              </div>
              <div className="space-y-2">
                {Array.from({ length: medItems }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-gray-200 pb-1">
                    <div className="w-4 h-4 border-2 border-yellow-300 rounded-sm shrink-0" />
                    <div className="flex-1 h-5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Low Priority */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3 border-b-2 border-blue-400 pb-1">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">LOW</span>
                <h3 className="font-bold text-sm">Priority — If Time Allows</h3>
              </div>
              <div className="space-y-2">
                {Array.from({ length: lowItems }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2 border-b border-gray-200 pb-1">
                    <div className="w-4 h-4 border-2 border-blue-300 rounded-sm shrink-0" />
                    <div className="flex-1 h-5" />
                  </div>
                ))}
              </div>
            </div>
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
