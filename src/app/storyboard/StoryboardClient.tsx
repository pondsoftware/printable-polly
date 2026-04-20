"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is a storyboard used for?", answer: "Storyboards are used to plan visual sequences before production. They're essential in filmmaking, animation, video production, advertising, and even UX design. Each panel represents a shot or scene, with notes describing action, dialogue, or camera directions." },
  { question: "How many panels should a storyboard have?", answer: "It depends on your project. A short scene might need 4-6 panels, while a full short film could need dozens. Start with 6-8 panels per page — you can always print more pages. Use fewer panels (4) if you need more space for detailed drawings and notes." },
  { question: "Can students use these storyboard templates?", answer: "Absolutely! Storyboards are great for education. Students can use them to plan creative writing projects, organize presentations, sequence historical events, or plan video assignments. The drawing area encourages visual thinking alongside written notes." },
];

type PanelsPerPage = 4 | 6 | 8;

export default function StoryboardClient() {
  const [panelsPerPage, setPanelsPerPage] = useState<PanelsPerPage>(6);
  const [showLabels, setShowLabels] = useState(true);
  const [projectTitle, setProjectTitle] = useState("");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const rows = panelsPerPage / 2;

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
      { "@type": "ListItem", position: 2, name: "Storyboard", item: "https://printablepolly.com/storyboard" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Storyboard Template</h1>
      <p className="text-gray-600 mb-6">Print storyboard panels with space for drawing and notes. Ideal for planning films, animations, videos, and creative projects.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Panels Per Page</label>
            <select value={panelsPerPage} onChange={(e) => setPanelsPerPage(parseInt(e.target.value) as PanelsPerPage)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="4">4 panels</option>
              <option value="6">6 panels</option>
              <option value="8">8 panels</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showLabels"
              checked={showLabels}
              onChange={(e) => setShowLabels(e.target.checked)}
              className="rounded border-gray-300"
            />
            <label htmlFor="showLabels" className="text-sm font-medium text-gray-700">Show Panel Labels</label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Title</label>
            <input
              type="text"
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              placeholder="My Project"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>

          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="storyboard" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <div className="flex justify-between items-baseline mb-4">
              <h2 className="text-xl font-bold">{projectTitle || "Storyboard"}</h2>
              <p className="text-sm text-gray-500">Page ___ of ___</p>
            </div>

            <div className="grid grid-cols-2 gap-x-5" style={{ gap: `${panelsPerPage === 8 ? 12 : panelsPerPage === 6 ? 16 : 20}px` }}>
              {Array.from({ length: panelsPerPage }).map((_, i) => {
                const drawingHeight = panelsPerPage === 8 ? 90 : panelsPerPage === 6 ? 120 : 170;

                return (
                  <div key={i}>
                    {showLabels && (
                      <p className="text-xs font-semibold text-gray-600 mb-1">Scene {i + 1}</p>
                    )}
                    <div
                      className="border-2 border-gray-800 bg-white"
                      style={{ height: `${drawingHeight}px` }}
                    />
                    <div className="mt-1 space-y-1">
                      <div className="border-b border-gray-300 h-4" />
                      <div className="border-b border-gray-300 h-4" />
                      <div className="border-b border-gray-300 h-4" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link key="/comic-strip" href="/comic-strip" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">💬</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Comic Strip</h3>
            </Link>
            <Link key="/coloring-pages" href="/coloring-pages" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎨</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Coloring Pages</h3>
            </Link>
            <Link key="/lined-paper" href="/lined-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">📝</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Lined Paper</h3>
            </Link>
            <Link key="/bingo-cards" href="/bingo-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
              <span className="text-2xl">🎱</span>
              <h3 className="font-medium text-gray-900 text-sm mt-1">Bingo Cards</h3>
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
