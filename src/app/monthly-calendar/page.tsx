"use client";

import { useState } from "react";

const faqs = [
  { question: "Can I print a calendar for any month and year?", answer: "Yes! Select any month and year from the dropdowns. The calendar automatically calculates the correct days and layout." },
  { question: "Does the calendar account for leap years?", answer: "Yes, the calendar correctly handles leap years. February will show 29 days in leap years." },
  { question: "Can I add notes to the monthly calendar?", answer: "Toggle the 'Notes Area' option to add a lined section at the bottom for monthly goals, reminders, or other notes." },
];

export default function MonthlyCalendar() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [startDay, setStartDay] = useState<"sunday" | "monday">("sunday");
  const [showNotes, setShowNotes] = useState(false);

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayHeaders = startDay === "sunday"
    ? ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m: number, y: number) => {
    const day = new Date(y, m, 1).getDay();
    if (startDay === "monday") return day === 0 ? 6 : day - 1;
    return day;
  };

  const daysInMonth = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfMonth(month, year);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

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
      { "@type": "ListItem", position: 2, name: "Monthly Calendar", item: "https://printablepolly.com/monthly-calendar" },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Monthly Calendar Generator</h1>
      <p className="text-gray-600 mb-6">Generate a printable monthly calendar for any month and year. Choose your start day and add a notes section.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Month</label>
            <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              {monthNames.map((name, i) => (
                <option key={name} value={i}>{name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
            <input type="number" min="2000" max="2100" value={year} onChange={(e) => setYear(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Day</label>
            <select value={startDay} onChange={(e) => setStartDay(e.target.value as "sunday" | "monday")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="sunday">Sunday</option>
              <option value="monday">Monday</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showNotes} onChange={(e) => setShowNotes(e.target.checked)} className="rounded" />
              Notes Area
            </label>
          </div>
          <button onClick={() => window.print()} className="w-full bg-emerald-600 text-white font-medium py-2 px-4 rounded hover:bg-emerald-700 transition-colors">
            🖨️ Print
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: "816px", minHeight: "1056px", padding: "32px" }}>
            <h2 className="text-2xl font-bold text-center mb-4">
              {monthNames[month]} {year}
            </h2>

            <div className="grid grid-cols-7 border-t border-l border-gray-300">
              {dayHeaders.map((day) => (
                <div key={day} className="border-r border-b border-gray-300 p-2 text-center font-bold text-sm bg-gray-50">
                  {day}
                </div>
              ))}
              {Array.from({ length: totalCells }).map((_, i) => {
                const dayNum = i - firstDay + 1;
                const isValidDay = dayNum >= 1 && dayNum <= daysInMonth;
                return (
                  <div key={i} className="border-r border-b border-gray-300 p-1" style={{ minHeight: showNotes ? "80px" : "110px" }}>
                    {isValidDay && <span className="text-sm font-medium">{dayNum}</span>}
                  </div>
                );
              })}
            </div>

            {showNotes && (
              <div className="mt-4 border border-gray-300 p-3" style={{ minHeight: "150px" }}>
                <p className="font-bold text-sm mb-2">Notes</p>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b border-gray-200 h-5" />
                  ))}
                </div>
              </div>
            )}
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
