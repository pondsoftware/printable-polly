"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How many items should a checklist have?", answer: "It depends on the task. For daily checklists, 10-15 items is manageable. For project checklists, break larger lists into categories with sub-items." },
  { question: "Should I use 1, 2, or 3 columns?", answer: "One column works best for detailed items with longer text. Two columns are great for standard lists. Three columns maximize space for short items." },
  { question: "Can I add a title to my checklist?", answer: "Yes! Enter a custom title in the Title field. This will appear at the top of your printed checklist." },
];

export default function ChecklistClient() {
  const [numItems, setNumItems] = useState(20);
  const [columns, setColumns] = useState(1);
  const [title, setTitle] = useState("Checklist");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const itemsPerColumn = Math.ceil(numItems / columns);

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
      { "@type": "ListItem", position: 2, name: "Checklist", item: "https://printablepolly.com/checklist" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Checklist Generator</h1>
      <p className="text-gray-600 mb-6">Create a blank printable checklist with customizable number of items, columns, and title. Perfect for to-dos, packing lists, and more.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Items</label>
            <input type="number" min="5" max="60" value={numItems} onChange={(e) => setNumItems(parseInt(e.target.value) || 20)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Columns</label>
            <select value={columns} onChange={(e) => setColumns(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="1">1 column</option>
              <option value="2">2 columns</option>
              <option value="3">3 columns</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="checklist" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-4">{title}</h2>

            <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns }).map((_, col) => (
                <div key={col} className="space-y-2">
                  {Array.from({ length: itemsPerColumn }).map((_, item) => {
                    const itemNum = col * itemsPerColumn + item + 1;
                    if (itemNum > numItems) return null;
                    return (
                      <div key={item} className="flex items-center gap-2 border-b border-gray-200 pb-1">
                        <div className="w-4 h-4 border border-gray-400 rounded-sm shrink-0" />
                        <div className="flex-1 h-5" />
                      </div>
                    );
                  })}
                </div>
              ))}
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
