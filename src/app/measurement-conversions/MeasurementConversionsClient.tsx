"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How many tablespoons are in a cup?", answer: "There are 16 tablespoons in 1 cup. This is one of the most common kitchen conversions. Half a cup is 8 tablespoons, and a quarter cup is 4 tablespoons." },
  { question: "What is the difference between fluid ounces and weight ounces?", answer: "Fluid ounces measure volume (how much space a liquid takes up), while weight ounces measure mass. They are not interchangeable — 1 fluid oz of water weighs about 1 oz, but 1 fluid oz of honey weighs more due to its density." },
  { question: "Why do ingredient weights matter in baking?", answer: "Measuring by weight (grams) is more accurate than volume (cups) because ingredients pack differently. A loosely scooped cup of flour can vary by 30g or more, which affects baking results significantly." },
];

const volumeConversions = [
  { from: "1 teaspoon (tsp)", to_us: "5 ml", notes: "1/3 tablespoon" },
  { from: "1 tablespoon (tbsp)", to_us: "15 ml", notes: "3 teaspoons" },
  { from: "1/4 cup", to_us: "60 ml", notes: "4 tablespoons" },
  { from: "1/3 cup", to_us: "80 ml", notes: "5 tbsp + 1 tsp" },
  { from: "1/2 cup", to_us: "120 ml", notes: "8 tablespoons" },
  { from: "2/3 cup", to_us: "160 ml", notes: "10 tbsp + 2 tsp" },
  { from: "3/4 cup", to_us: "180 ml", notes: "12 tablespoons" },
  { from: "1 cup", to_us: "240 ml", notes: "16 tablespoons" },
  { from: "1 pint", to_us: "480 ml", notes: "2 cups" },
  { from: "1 quart", to_us: "960 ml", notes: "4 cups" },
  { from: "1 gallon", to_us: "3,840 ml", notes: "4 quarts / 16 cups" },
];

const weightConversions = [
  { from: "1 ounce (oz)", grams: "28 g" },
  { from: "2 oz", grams: "57 g" },
  { from: "4 oz (1/4 lb)", grams: "113 g" },
  { from: "8 oz (1/2 lb)", grams: "227 g" },
  { from: "12 oz (3/4 lb)", grams: "340 g" },
  { from: "16 oz (1 lb)", grams: "454 g" },
  { from: "2 lbs", grams: "907 g" },
  { from: "1 kg", grams: "2.2 lbs / 35 oz" },
];

const ingredientWeights = [
  { ingredient: "All-purpose flour", cup: "120 g", notes: "4.2 oz" },
  { ingredient: "Bread flour", cup: "130 g", notes: "4.6 oz" },
  { ingredient: "Cake flour", cup: "115 g", notes: "4 oz" },
  { ingredient: "Granulated sugar", cup: "200 g", notes: "7 oz" },
  { ingredient: "Brown sugar (packed)", cup: "220 g", notes: "7.75 oz" },
  { ingredient: "Powdered sugar", cup: "120 g", notes: "4.2 oz" },
  { ingredient: "Butter", cup: "227 g", notes: "8 oz / 2 sticks" },
  { ingredient: "Honey / Maple syrup", cup: "340 g", notes: "12 oz" },
  { ingredient: "Milk", cup: "240 g", notes: "8.5 oz" },
  { ingredient: "Heavy cream", cup: "240 g", notes: "8.5 oz" },
  { ingredient: "Cocoa powder", cup: "85 g", notes: "3 oz" },
  { ingredient: "Rolled oats", cup: "90 g", notes: "3.2 oz" },
  { ingredient: "Rice (uncooked)", cup: "185 g", notes: "6.5 oz" },
  { ingredient: "Salt (table)", cup: "290 g", notes: "10.2 oz" },
];

const metricToUS = [
  { metric: "5 ml", us: "1 teaspoon" },
  { metric: "15 ml", us: "1 tablespoon" },
  { metric: "30 ml", us: "1 fluid ounce" },
  { metric: "120 ml", us: "1/2 cup" },
  { metric: "240 ml", us: "1 cup" },
  { metric: "500 ml", us: "~2 cups" },
  { metric: "1 liter", us: "~4.2 cups" },
];

export default function MeasurementConversionsClient() {
  const [emphasis, setEmphasis] = useState<"us" | "metric">("us");
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
      { "@type": "ListItem", position: 2, name: "Measurement Conversions", item: "https://printablepolly.com/measurement-conversions" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Kitchen Measurement Conversions</h1>
      <p className="text-gray-600 mb-6">A printable cheat sheet with all the kitchen measurement conversions you need. Volume, weight, and common ingredient weights in one reference.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Emphasis</label>
            <select value={emphasis} onChange={(e) => setEmphasis(e.target.value as "us" | "metric")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="us">US Customary</option>
              <option value="metric">Metric</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="measurement-conversions" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "28px" }}>
            <h2 className="text-lg font-bold text-center text-emerald-800 mb-1">Kitchen Measurement Conversions</h2>
            <p className="text-center text-xs text-gray-500 mb-4">{emphasis === "us" ? "US Customary with Metric Equivalents" : "Metric with US Equivalents"}</p>

            <div className="grid grid-cols-2 gap-4">
              {/* Volume Conversions */}
              <div>
                <h3 className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-200 pb-1 mb-2">Volume Conversions</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1.5 py-1 text-left">Measure</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">{emphasis === "us" ? "Metric" : "US"}</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {volumeConversions.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-1.5 py-0.5">{row.from}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 font-medium">{row.to_us}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 text-gray-600">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Weight Conversions */}
              <div>
                <h3 className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-200 pb-1 mb-2">Weight Conversions</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1.5 py-1 text-left">{emphasis === "us" ? "US" : "Metric"}</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">{emphasis === "us" ? "Grams" : "US"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weightConversions.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-1.5 py-0.5">{row.from}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 font-medium">{row.grams}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {emphasis === "metric" && (
                  <>
                    <h3 className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-200 pb-1 mb-2 mt-3">Metric to US</h3>
                    <table className="w-full text-xs border-collapse">
                      <thead>
                        <tr className="bg-emerald-50">
                          <th className="border border-gray-300 px-1.5 py-1 text-left">Metric</th>
                          <th className="border border-gray-300 px-1.5 py-1 text-left">US</th>
                        </tr>
                      </thead>
                      <tbody>
                        {metricToUS.map((row, i) => (
                          <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="border border-gray-300 px-1.5 py-0.5">{row.metric}</td>
                            <td className="border border-gray-300 px-1.5 py-0.5 font-medium">{row.us}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>

            {/* Ingredient Weights */}
            <div className="mt-4">
              <h3 className="text-sm font-bold text-emerald-700 border-b-2 border-emerald-200 pb-1 mb-2">Common Ingredient Weights (per 1 cup)</h3>
              <div className="grid grid-cols-2 gap-x-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1.5 py-1 text-left">Ingredient</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">1 Cup</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">oz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientWeights.slice(0, 7).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-1.5 py-0.5">{row.ingredient}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 font-medium">{row.cup}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 text-gray-600">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1.5 py-1 text-left">Ingredient</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">1 Cup</th>
                      <th className="border border-gray-300 px-1.5 py-1 text-left">oz</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientWeights.slice(7).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-300 px-1.5 py-0.5">{row.ingredient}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 font-medium">{row.cup}</td>
                        <td className="border border-gray-300 px-1.5 py-0.5 text-gray-600">{row.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Reference */}
            <div className="mt-4 bg-emerald-50 border border-emerald-200 rounded p-3">
              <h3 className="text-xs font-bold text-emerald-800 mb-1">Quick Reference</h3>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div><span className="font-medium">3 tsp</span> = 1 tbsp</div>
                <div><span className="font-medium">4 tbsp</span> = 1/4 cup</div>
                <div><span className="font-medium">16 tbsp</span> = 1 cup</div>
                <div><span className="font-medium">2 cups</span> = 1 pint</div>
                <div><span className="font-medium">4 cups</span> = 1 quart</div>
                <div><span className="font-medium">4 quarts</span> = 1 gallon</div>
                <div><span className="font-medium">1 stick butter</span> = 1/2 cup</div>
                <div><span className="font-medium">1 cup</span> = 8 fl oz</div>
                <div><span className="font-medium">1 lb</span> = 16 oz</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/cooking-temperatures" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🌡️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Cooking Temperatures</h3>
          </Link>
          <Link href="/spice-guide" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🧂</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Spice Guide</h3>
          </Link>
          <Link href="/substitution-chart" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔄</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Substitution Chart</h3>
          </Link>
          <Link href="/grocery-list" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🛒</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Grocery List</h3>
          </Link>
          <Link href="/meal-planner" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🍽️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Meal Planner</h3>
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
