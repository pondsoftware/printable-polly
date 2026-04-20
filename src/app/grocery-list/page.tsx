"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "Why organize a grocery list by store section?", answer: "Organizing by section (produce, dairy, meat, etc.) saves time by reducing backtracking. You can walk through the store once and get everything without missing items." },
  { question: "How many items should I put in each section?", answer: "It varies by your shopping needs. The template provides flexible space in each section. Write as many or as few items as needed — unused lines stay blank." },
  { question: "Should I plan meals before making a grocery list?", answer: "Yes! Meal planning helps you buy only what you need, reduces food waste, and saves money. Plan 5-7 dinners, then list the ingredients organized by store section." },
];

const defaultSections = [
  "Produce",
  "Dairy & Eggs",
  "Meat & Seafood",
  "Bakery & Bread",
  "Frozen Foods",
  "Pantry & Canned",
  "Snacks & Beverages",
  "Household & Other",
];

export default function GroceryList() {
  const [sections, setSections] = useState(defaultSections);
  const [itemsPerSection, setItemsPerSection] = useState(6);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const updateSection = (index: number, value: string) => {
    const newSections = [...sections];
    newSections[index] = value;
    setSections(newSections);
  };

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
      { "@type": "ListItem", position: 2, name: "Grocery List", item: "https://printablepolly.com/grocery-list" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Grocery List Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable grocery list organized by store section. Customize section names and items per section for efficient shopping.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Items Per Section</label>
            <select value={itemsPerSection} onChange={(e) => setItemsPerSection(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="4">4 items</option>
              <option value="5">5 items</option>
              <option value="6">6 items</option>
              <option value="8">8 items</option>
              <option value="10">10 items</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Names</label>
            <div className="space-y-1">
              {sections.map((section, i) => (
                <input
                  key={i}
                  type="text"
                  value={section}
                  onChange={(e) => updateSection(i, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              ))}
            </div>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="grocery-list" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Grocery List</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Date: ___________ Store: ___________</p>

            <div className="grid grid-cols-2 gap-4">
              {sections.map((section, i) => (
                <div key={i} className="border border-gray-300 rounded p-3">
                  <h3 className="font-bold text-sm border-b border-gray-300 pb-1 mb-2">{section}</h3>
                  <div className="space-y-1.5">
                    {Array.from({ length: itemsPerSection }).map((_, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-3 h-3 border border-gray-400 rounded-sm shrink-0" />
                        <div className="flex-1 border-b border-gray-200 h-4" />
                      </div>
                    ))}
                  </div>
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
