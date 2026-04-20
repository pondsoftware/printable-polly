"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How do I use a weekly meal planner?", answer: "Write down what you plan to eat for each meal every day of the week. Start by picking dinners first, then fill in breakfasts and lunches. This helps you build an accurate grocery list and reduces last-minute takeout spending." },
  { question: "Should I start my meal plan on Monday or Sunday?", answer: "It depends on when you shop. If you grocery shop on weekends, start on Monday so your plan aligns with fresh ingredients. If you shop midweek, Sunday may work better. Use the start day option to choose." },
  { question: "How does meal planning save money?", answer: "Meal planning reduces impulse buys, cuts food waste by using ingredients across multiple meals, and eliminates expensive last-minute takeout. Most families save 20-30% on groceries by planning ahead." },
];

const DAYS_MON = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const DAYS_SUN = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function MealPlanner() {
  const [startDay, setStartDay] = useState<"monday" | "sunday">("monday");
  const [includeSnacks, setIncludeSnacks] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const days = startDay === "monday" ? DAYS_MON : DAYS_SUN;
  const meals = includeSnacks ? ["Breakfast", "Lunch", "Dinner", "Snacks"] : ["Breakfast", "Lunch", "Dinner"];

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
      { "@type": "ListItem", position: 2, name: "Meal Planner", item: "https://printablepolly.com/meal-planner" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Weekly Meal Planner</h1>
      <p className="text-gray-600 mb-6">Plan breakfast, lunch, dinner, and snacks for the entire week. Customize your start day, toggle the snack row, and print.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Day</label>
            <select value={startDay} onChange={(e) => setStartDay(e.target.value as "monday" | "sunday")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="monday">Monday</option>
              <option value="sunday">Sunday</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="include-snacks" checked={includeSnacks} onChange={(e) => setIncludeSnacks(e.target.checked)} className="rounded border-gray-300" />
            <label htmlFor="include-snacks" className="text-sm font-medium text-gray-700">Include Snacks Row</label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="meal-planner" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Weekly Meal Planner</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Week of: ___________</p>

            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-300 bg-emerald-50 px-2 py-2 text-left w-20">Day</th>
                  {meals.map((meal) => (
                    <th key={meal} className="border border-gray-300 bg-emerald-50 px-2 py-2 text-left">{meal}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td className="border border-gray-300 px-2 py-1 font-semibold bg-gray-50 text-xs">{day}</td>
                    {meals.map((meal) => (
                      <td key={meal} className="border border-gray-300 px-2 py-1" style={{ height: includeSnacks ? "68px" : "80px" }}></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4">
              <h3 className="font-bold text-sm border-b border-gray-300 pb-1 mb-2">Notes / Shopping List</h3>
              <div className="space-y-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="border-b border-gray-200 h-4" />
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
