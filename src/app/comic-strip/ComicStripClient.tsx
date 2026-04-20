"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What age group are these comic strip templates for?", answer: "These templates work for all ages! Young children (5-8) can draw simple stories in the larger panel layouts like 2x2, while older kids and teens can use 2x3 or 3x3 layouts for more complex narratives. Adults use them for storyboarding and creative projects too." },
  { question: "What's the best panel layout for beginners?", answer: "Start with the 2x2 layout (4 panels). It gives plenty of drawing space and keeps the story simple: setup, conflict, climax, and resolution. The single strip of 4 is also great for simple comic strips and gag comics." },
  { question: "Can I use these for classroom activities?", answer: "Yes! Comic strip templates are excellent for literacy activities. Students can retell stories, illustrate vocabulary words, create historical narratives, or practice sequential storytelling. Print different layouts for differentiated instruction." },
];

type PanelLayout = "2x2" | "2x3" | "3x3" | "strip4";
type BorderStyle = "solid" | "rounded" | "thick";

const layoutConfig: Record<PanelLayout, { rows: number; cols: number }> = {
  "2x2": { rows: 2, cols: 2 },
  "2x3": { rows: 2, cols: 3 },
  "3x3": { rows: 3, cols: 3 },
  strip4: { rows: 1, cols: 4 },
};

function getBorderClasses(style: BorderStyle): string {
  switch (style) {
    case "solid":
      return "border-2 border-gray-800";
    case "rounded":
      return "border-2 border-gray-800 rounded-lg";
    case "thick":
      return "border-4 border-gray-900";
  }
}

export default function ComicStripClient() {
  const [layout, setLayout] = useState<PanelLayout>("2x3");
  const [borderStyle, setBorderStyle] = useState<BorderStyle>("solid");
  const [showTitle, setShowTitle] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const { rows, cols } = layoutConfig[layout];
  const totalPanels = rows * cols;
  const isStrip = layout === "strip4";

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
      { "@type": "ListItem", position: 2, name: "Comic Strip", item: "https://printablepolly.com/comic-strip" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Comic Strip Template</h1>
      <p className="text-gray-600 mb-6">Print blank comic strip panels for drawing stories. Choose your layout, border style, and start creating comics.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panel Layout</label>
            <select value={layout} onChange={(e) => setLayout(e.target.value as PanelLayout)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="2x2">2x2 (4 panels)</option>
              <option value="2x3">2x3 (6 panels)</option>
              <option value="3x3">3x3 (9 panels)</option>
              <option value="strip4">Single Strip (4 panels)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Border Style</label>
            <select value={borderStyle} onChange={(e) => setBorderStyle(e.target.value as BorderStyle)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="solid">Solid</option>
              <option value="rounded">Rounded</option>
              <option value="thick">Thick</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showTitle"
              checked={showTitle}
              onChange={(e) => setShowTitle(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showTitle" className="text-sm font-medium text-gray-700">Show Title Area</label>
          </div>

          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="comic-strip" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm flex flex-col" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            {showTitle && (
              <div className="mb-4 text-center">
                <div className="text-lg font-bold mb-2">
                  Title: _________________________________&nbsp;&nbsp;&nbsp;By: _________________________________
                </div>
              </div>
            )}

            <div
              className={`flex-1 grid gap-3 ${isStrip ? "" : ""}`}
              style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: isStrip ? "1fr" : `repeat(${rows}, 1fr)`,
              }}
            >
              {Array.from({ length: totalPanels }).map((_, i) => (
                <div
                  key={i}
                  className={`${getBorderClasses(borderStyle)} bg-white min-h-0`}
                  style={{ minHeight: isStrip ? "300px" : undefined }}
                />
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
