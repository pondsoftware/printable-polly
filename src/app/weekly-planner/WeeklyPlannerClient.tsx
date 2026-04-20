"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "Should my weekly planner start on Monday or Sunday?", answer: "It depends on your preference. Monday-start is common in work/school contexts, while Sunday-start matches most printed calendars. Choose what fits your routine." },
  { question: "Should I include time slots in my weekly planner?", answer: "Time slots help if you have a structured schedule with meetings or classes. For a more flexible lifestyle, an open format with just day columns works well." },
  { question: "What size paper works best for a weekly planner?", answer: "US Letter (8.5x11\") printed in landscape gives the most space per day. Portrait works too if you prefer a taller, narrower layout." },
];

export default function WeeklyPlannerClient() {
  const [startDay, setStartDay] = useState<"monday" | "sunday">("monday");
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [showNotes, setShowNotes] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const days = startDay === "monday"
    ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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
      { "@type": "ListItem", position: 2, name: "Weekly Planner", item: "https://printablepolly.com/weekly-planner" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Weekly Planner Generator</h1>
      <p className="text-gray-600 mb-6">Create a customizable weekly planner. Choose your start day, toggle time slots, and add a notes section.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Day</label>
            <select value={startDay} onChange={(e) => setStartDay(e.target.value as "monday" | "sunday")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="monday">Monday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showTimeSlots} onChange={(e) => setShowTimeSlots(e.target.checked)} className="rounded" />
              Show Time Slots
            </label>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showNotes} onChange={(e) => setShowNotes(e.target.checked)} className="rounded" />
              Notes Section
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="weekly-planner" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "24px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Weekly Planner</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Week of: _______________</p>

            <div className={`grid ${showNotes ? "grid-cols-4" : "grid-cols-7"} gap-1`}>
              {showNotes ? (
                <>
                  {/* 3-column layout with notes */}
                  <div className="col-span-3">
                    <div className="grid grid-cols-1 gap-1">
                      {days.map((day) => (
                        <div key={day} className="border border-gray-300 p-2" style={{ minHeight: showTimeSlots ? "120px" : "100px" }}>
                          <p className="font-bold text-sm border-b border-gray-200 pb-1 mb-1">{day}</p>
                          {showTimeSlots ? (
                            <div className="text-xs text-gray-400 space-y-1">
                              {["8:00", "9:00", "10:00", "11:00", "12:00", "1:00", "2:00", "3:00", "4:00", "5:00"].map((t) => (
                                <div key={t} className="border-b border-gray-100 pb-0.5">{t} ___________________</div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="border-b border-gray-100 h-4" />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border border-gray-300 p-2">
                    <p className="font-bold text-sm border-b border-gray-200 pb-1 mb-2">Notes</p>
                    <div className="space-y-3">
                      {Array.from({ length: 30 }).map((_, i) => (
                        <div key={i} className="border-b border-gray-100 h-4" />
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                days.map((day) => (
                  <div key={day} className="border border-gray-300 p-1" style={{ minHeight: "130px" }}>
                    <p className="font-bold text-xs border-b border-gray-200 pb-1 mb-1">{day}</p>
                    {showTimeSlots ? (
                      <div className="text-xs text-gray-400 space-y-0.5">
                        {["8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm"].map((t) => (
                          <div key={t} className="border-b border-gray-100 text-[10px]">{t}</div>
                        ))}
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {Array.from({ length: 8 }).map((_, i) => (
                          <div key={i} className="border-b border-gray-100 h-3" />
                        ))}
                      </div>
                    )}
                  </div>
                ))
              )}
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
