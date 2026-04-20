"use client";

import { useState } from "react";

const faqs = [
  { question: "How many habits should I track at once?", answer: "Start with 3-5 habits. Tracking too many at once can be overwhelming. Once your initial habits become automatic, add more gradually." },
  { question: "How long does it take to build a habit?", answer: "Research suggests it takes an average of 66 days for a new behavior to become automatic, though it varies from 18 to 254 days depending on the complexity." },
  { question: "Should I track habits daily or weekly?", answer: "Daily tracking works best for habits you want to do every day. For habits you only do on certain days, you can leave those days blank or mark them as N/A." },
];

export default function HabitTracker() {
  const [numHabits, setNumHabits] = useState(5);
  const [daysInMonth, setDaysInMonth] = useState(31);
  const [habits, setHabits] = useState<string[]>(["", "", "", "", "", "", "", "", "", ""]);

  const updateHabit = (index: number, value: string) => {
    const newHabits = [...habits];
    newHabits[index] = value;
    setHabits(newHabits);
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
      { "@type": "ListItem", position: 2, name: "Habit Tracker", item: "https://printablepolly.com/habit-tracker" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Habit Tracker Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable monthly habit tracker. Set the number of habits, days in month, and customize labels.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Habits</label>
            <select value={numHabits} onChange={(e) => setNumHabits(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n} habits</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Days in Month</label>
            <select value={daysInMonth} onChange={(e) => setDaysInMonth(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="28">28 days</option>
              <option value="29">29 days</option>
              <option value="30">30 days</option>
              <option value="31">31 days</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Habit Labels</label>
            <div className="space-y-1">
              {Array.from({ length: numHabits }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Habit ${i + 1}`}
                  value={habits[i] || ""}
                  onChange={(e) => updateHabit(i, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              ))}
            </div>
          </div>
          <button onClick={() => window.print()} className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition-colors">
            🖨️ Print
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: "816px", minHeight: "1056px", padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Habit Tracker</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Month: _______________</p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 text-xs">
                <thead>
                  <tr>
                    <th className="border border-gray-300 p-1 bg-gray-50 text-left" style={{ minWidth: "120px" }}>Habit</th>
                    {Array.from({ length: daysInMonth }).map((_, i) => (
                      <th key={i} className="border border-gray-300 p-1 bg-gray-50 text-center" style={{ minWidth: "20px" }}>
                        {i + 1}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: numHabits }).map((_, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 p-1 font-medium">
                        {habits[i] || `Habit ${i + 1}`}
                      </td>
                      {Array.from({ length: daysInMonth }).map((_, j) => (
                        <td key={j} className="border border-gray-300 p-1 text-center" style={{ height: "24px" }} />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
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
