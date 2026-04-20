"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What are SMART goals?", answer: "SMART goals are Specific, Measurable, Achievable, Relevant, and Time-bound. This framework helps you set clear, actionable goals with defined success criteria." },
  { question: "How many goals should I set at once?", answer: "Focus on 1-3 major goals at a time. Having too many goals splits your focus and reduces the likelihood of achieving any of them." },
  { question: "How often should I review my goals?", answer: "Review your goals weekly to track progress and make adjustments. Do a deeper review monthly to assess if the goal is still relevant and realistic." },
];

export default function GoalSetting() {
  const [numGoals, setNumGoals] = useState(3);
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
      { "@type": "ListItem", position: 2, name: "Goal Setting", item: "https://printablepolly.com/goal-setting" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Goal Setting Worksheet</h1>
      <p className="text-gray-600 mb-6">Create a printable SMART goal-setting worksheet. Define specific, measurable, achievable, relevant, and time-bound goals.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Goals</label>
            <select value={numGoals} onChange={(e) => setNumGoals(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="1">1 goal</option>
              <option value="2">2 goals</option>
              <option value="3">3 goals</option>
              <option value="4">4 goals</option>
              <option value="5">5 goals</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="goal-setting" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">SMART Goal Setting Worksheet</h2>
            <p className="text-center text-sm text-gray-500 mb-6">Date: _______________</p>

            {Array.from({ length: numGoals }).map((_, i) => (
              <div key={i} className="mb-6 border border-gray-300 rounded p-4">
                <h3 className="font-bold text-lg mb-3">Goal {i + 1}</h3>

                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-sm mb-1">My Goal:</p>
                    <div className="border-b border-gray-300 h-6" />
                    <div className="border-b border-gray-300 h-6 mt-1" />
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="font-semibold text-sm"><span className="text-emerald-600">S</span>pecific — What exactly will I accomplish?</p>
                      <div className="border-b border-gray-200 h-5 mt-1" />
                    </div>
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="font-semibold text-sm"><span className="text-emerald-600">M</span>easurable — How will I know I&apos;ve achieved it?</p>
                      <div className="border-b border-gray-200 h-5 mt-1" />
                    </div>
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="font-semibold text-sm"><span className="text-emerald-600">A</span>chievable — Is this realistic? What resources do I need?</p>
                      <div className="border-b border-gray-200 h-5 mt-1" />
                    </div>
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="font-semibold text-sm"><span className="text-emerald-600">R</span>elevant — Why does this matter to me?</p>
                      <div className="border-b border-gray-200 h-5 mt-1" />
                    </div>
                    <div className="border-l-4 border-emerald-500 pl-3">
                      <p className="font-semibold text-sm"><span className="text-emerald-600">T</span>ime-bound — When will I achieve this by?</p>
                      <div className="border-b border-gray-200 h-5 mt-1" />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold text-sm mb-1">Action Steps:</p>
                    <div className="space-y-1">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className="flex items-center gap-2">
                          <span className="text-sm text-gray-400">{j + 1}.</span>
                          <div className="flex-1 border-b border-gray-200 h-5" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
