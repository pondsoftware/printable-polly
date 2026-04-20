"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How do I use a monthly budget tracker?", answer: "Start by listing all income sources at the top. Then estimate or track actual spending for each expense category. At the end of the month, compare your totals to see where your money went and where you can adjust." },
  { question: "What expense categories should I track?", answer: "The template includes the most common categories: Housing, Transportation, Food, Utilities, Insurance, Entertainment, Savings, and Other. These cover the majority of household expenses and give you a clear picture of your spending." },
  { question: "How many line items per category do I need?", answer: "Most people need 3-4 line items per category. For example, under Housing you might list rent/mortgage, property tax, and HOA. Use the control to adjust if you need more or fewer rows." },
];

const CATEGORIES = [
  "Housing",
  "Transportation",
  "Food",
  "Utilities",
  "Insurance",
  "Entertainment",
  "Savings",
  "Other",
];

export default function BudgetTracker() {
  const [lineItems, setLineItems] = useState(4);
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
      { "@type": "ListItem", position: 2, name: "Budget Tracker", item: "https://printablepolly.com/budget-tracker" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Monthly Budget Tracker</h1>
      <p className="text-gray-600 mb-6">Track monthly income and expenses by category. Adjust line items per category, then print or download your budget sheet.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Items Per Category</label>
            <select value={lineItems} onChange={(e) => setLineItems(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="3">3 items</option>
              <option value="4">4 items</option>
              <option value="5">5 items</option>
              <option value="6">6 items</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="budget-tracker" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Monthly Budget Tracker</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Month: ___________ Year: ___________</p>

            {/* Income Section */}
            <div className="mb-4">
              <h3 className="font-bold text-sm bg-emerald-50 border border-gray-300 px-2 py-1">Income</h3>
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-2 py-1 text-left bg-gray-50 w-3/4">Source</th>
                    <th className="border border-gray-300 px-2 py-1 text-right bg-gray-50 w-1/4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 3 }).map((_, i) => (
                    <tr key={i}>
                      <td className="border border-gray-300 px-2 py-1 h-6"></td>
                      <td className="border border-gray-300 px-2 py-1 h-6 text-right">$</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="border border-gray-300 px-2 py-1 text-right bg-gray-50">Total Income</td>
                    <td className="border border-gray-300 px-2 py-1 text-right bg-gray-50">$</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Expense Categories */}
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.map((category) => (
                <div key={category}>
                  <h3 className="font-bold text-xs bg-emerald-50 border border-gray-300 border-b-0 px-2 py-1">{category}</h3>
                  <table className="w-full border-collapse text-xs">
                    <thead>
                      <tr>
                        <th className="border border-gray-300 px-1 py-0.5 text-left bg-gray-50 w-3/4">Item</th>
                        <th className="border border-gray-300 px-1 py-0.5 text-right bg-gray-50 w-1/4">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: lineItems }).map((_, i) => (
                        <tr key={i}>
                          <td className="border border-gray-300 px-1 py-0.5 h-5"></td>
                          <td className="border border-gray-300 px-1 py-0.5 h-5 text-right text-gray-400">$</td>
                        </tr>
                      ))}
                      <tr className="font-bold">
                        <td className="border border-gray-300 px-1 py-0.5 text-right bg-gray-50 text-xs">Subtotal</td>
                        <td className="border border-gray-300 px-1 py-0.5 text-right bg-gray-50">$</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4">
              <table className="w-full border-collapse text-sm">
                <tbody>
                  <tr className="font-bold">
                    <td className="border border-gray-300 px-2 py-1 bg-gray-50 w-3/4 text-right">Total Expenses</td>
                    <td className="border border-gray-300 px-2 py-1 bg-gray-50 w-1/4 text-right">$</td>
                  </tr>
                  <tr className="font-bold text-emerald-700">
                    <td className="border border-gray-300 px-2 py-1 bg-emerald-50 text-right">Remaining (Income - Expenses)</td>
                    <td className="border border-gray-300 px-2 py-1 bg-emerald-50 text-right">$</td>
                  </tr>
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
