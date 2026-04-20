"use client";

import { useState } from "react";

const faqs = [
  { question: "What time interval is best for daily scheduling?", answer: "30-minute intervals work for most people. Use 15 minutes for tightly packed days with many short meetings, or 60 minutes for a broader overview." },
  { question: "What hours should my daily schedule cover?", answer: "A typical workday schedule runs from 8 AM to 6 PM. Extend to 6 AM - 10 PM if you want to plan your full waking hours." },
  { question: "How do I use a time-blocked daily schedule?", answer: "Assign specific tasks or activities to each time block. The key is to plan breaks, buffer time between tasks, and batch similar activities together." },
];

export default function DailySchedule() {
  const [startHour, setStartHour] = useState(6);
  const [endHour, setEndHour] = useState(22);
  const [interval, setInterval] = useState(30);

  const generateTimeSlots = () => {
    const slots: string[] = [];
    for (let h = startHour; h < endHour; h++) {
      for (let m = 0; m < 60; m += interval) {
        const hour12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
        const ampm = h >= 12 ? "PM" : "AM";
        const mins = m.toString().padStart(2, "0");
        slots.push(`${hour12}:${mins} ${ampm}`);
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

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
      { "@type": "ListItem", position: 2, name: "Daily Schedule", item: "https://printablepolly.com/daily-schedule" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Daily Schedule Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable daily time-block schedule. Set your start/end hours and time interval for structured planning.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Hour</label>
            <select value={startHour} onChange={(e) => setStartHour(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              {Array.from({ length: 24 }).map((_, i) => (
                <option key={i} value={i}>{i === 0 ? "12 AM" : i < 12 ? `${i} AM` : i === 12 ? "12 PM" : `${i - 12} PM`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Hour</label>
            <select value={endHour} onChange={(e) => setEndHour(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              {Array.from({ length: 24 }).map((_, i) => (
                <option key={i} value={i + 1}>{i + 1 === 24 ? "12 AM" : i + 1 < 12 ? `${i + 1} AM` : i + 1 === 12 ? "12 PM" : `${i + 1 - 12} PM`}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Interval</label>
            <select value={interval} onChange={(e) => setInterval(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </select>
          </div>
          <button onClick={() => window.print()} className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition-colors">
            🖨️ Print
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: "816px", minHeight: "1056px", padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Daily Schedule</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Date: _______________</p>

            <div className="border border-gray-300">
              {timeSlots.map((slot, i) => (
                <div key={i} className={`flex border-b border-gray-200 ${i % (60 / interval) === 0 ? "border-gray-400" : ""}`}>
                  <div className="w-24 shrink-0 p-2 border-r border-gray-300 text-sm font-medium text-gray-700 bg-gray-50">
                    {slot}
                  </div>
                  <div className="flex-1 p-2" style={{ minHeight: interval === 15 ? "24px" : interval === 30 ? "32px" : "48px" }} />
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
