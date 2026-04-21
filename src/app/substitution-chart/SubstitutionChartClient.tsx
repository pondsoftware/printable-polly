"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "Can I substitute ingredients in baking without affecting the result?", answer: "Some substitutions work well (buttermilk for milk with acid, applesauce for oil) while others significantly change texture or rise. Leaveners (baking soda/powder) and structural ingredients (eggs, flour) are the hardest to substitute without noticeable changes." },
  { question: "What is the best egg substitute for baking?", answer: "It depends on the recipe's purpose for eggs. For binding: 1 flax egg (1 tbsp ground flax + 3 tbsp water) or 1/4 cup applesauce. For leavening: 1 tsp baking soda + 1 tbsp vinegar. For moisture: 1/4 cup yogurt or mashed banana." },
  { question: "How do I make buttermilk if I don't have any?", answer: "Add 1 tablespoon of lemon juice or white vinegar to 1 cup of milk. Stir and let sit for 5 minutes until it curdles slightly. This works with any milk including plant-based. It's the most reliable baking substitution." },
];

const substitutions = [
  { category: "Dairy", items: [
    { original: "1 cup Butter", substitute: "1 cup coconut oil (solid)", notes: "Same ratio; slightly different flavor" },
    { original: "1 cup Butter", substitute: "3/4 cup vegetable oil", notes: "For baking; reduces flakiness" },
    { original: "1 cup Whole Milk", substitute: "1 cup oat/almond/soy milk", notes: "Works 1:1 in most recipes" },
    { original: "1 cup Buttermilk", substitute: "1 cup milk + 1 tbsp lemon juice", notes: "Let sit 5 min to curdle" },
    { original: "1 cup Heavy Cream", substitute: "3/4 cup milk + 1/3 cup melted butter", notes: "For cooking, not whipping" },
    { original: "1 cup Heavy Cream (whipped)", substitute: "1 can chilled coconut cream", notes: "Whip when cold; add sugar" },
    { original: "1 cup Sour Cream", substitute: "1 cup plain Greek yogurt", notes: "Same tanginess; 1:1 ratio" },
    { original: "1 cup Cream Cheese", substitute: "1 cup strained Greek yogurt", notes: "Strain overnight in cheesecloth" },
    { original: "1 cup Evaporated Milk", substitute: "1 cup half-and-half", notes: "Slightly thinner" },
    { original: "1 cup Half-and-Half", substitute: "3/4 cup milk + 1/4 cup cream", notes: "Or 1 cup milk + 1 tbsp butter" },
  ]},
  { category: "Eggs & Leaveners", items: [
    { original: "1 Egg (binding)", substitute: "1 tbsp ground flax + 3 tbsp water", notes: "Mix; rest 5 min until gel forms" },
    { original: "1 Egg (moisture)", substitute: "1/4 cup unsweetened applesauce", notes: "Adds slight sweetness" },
    { original: "1 Egg (leavening)", substitute: "1 tsp baking soda + 1 tbsp vinegar", notes: "For cakes and muffins" },
    { original: "1 Egg (richness)", substitute: "1/4 cup mashed banana", notes: "Adds banana flavor" },
    { original: "1 Egg (general)", substitute: "3 tbsp aquafaba (chickpea water)", notes: "Can also whip like whites" },
    { original: "1 tsp Baking Powder", substitute: "1/4 tsp baking soda + 1/2 tsp cream of tartar", notes: "Same leavening effect" },
    { original: "1 tsp Baking Soda", substitute: "3 tsp baking powder", notes: "Omit salt; different rise" },
  ]},
  { category: "Sweeteners", items: [
    { original: "1 cup White Sugar", substitute: "3/4 cup honey", notes: "Reduce liquid by 1/4 cup; lower oven 25°F" },
    { original: "1 cup White Sugar", substitute: "3/4 cup maple syrup", notes: "Reduce liquid by 3 tbsp" },
    { original: "1 cup White Sugar", substitute: "1 cup coconut sugar", notes: "1:1 ratio; darker color" },
    { original: "1 cup Brown Sugar", substitute: "1 cup white sugar + 1 tbsp molasses", notes: "Mix well; exact match" },
    { original: "1 cup Powdered Sugar", substitute: "1 cup white sugar blended fine", notes: "Blend 1 min; add 1 tsp cornstarch" },
    { original: "1 cup Corn Syrup", substitute: "1 cup honey or maple syrup", notes: "Flavor will differ" },
  ]},
  { category: "Flours & Thickeners", items: [
    { original: "1 cup All-Purpose Flour", substitute: "1/2 cup whole wheat + 1/2 cup AP", notes: "100% WW makes dense baked goods" },
    { original: "1 cup All-Purpose Flour", substitute: "1 cup + 2 tbsp cake flour", notes: "Lighter results" },
    { original: "1 cup Cake Flour", substitute: "1 cup AP flour - 2 tbsp + 2 tbsp cornstarch", notes: "Sift together twice" },
    { original: "1 cup Self-Rising Flour", substitute: "1 cup AP + 1.5 tsp baking powder + 1/4 tsp salt", notes: "Mix well before using" },
    { original: "1 cup Bread Flour", substitute: "1 cup AP flour + 1 tsp vital wheat gluten", notes: "More chewy texture" },
    { original: "1 tbsp Cornstarch (thickener)", substitute: "2 tbsp all-purpose flour", notes: "Cook longer; slightly cloudy" },
    { original: "1 tbsp Cornstarch (thickener)", substitute: "1 tbsp arrowroot powder", notes: "Clear results; 1:1 ratio" },
  ]},
  { category: "Oils & Fats", items: [
    { original: "1 cup Vegetable Oil (baking)", substitute: "1 cup unsweetened applesauce", notes: "Reduces fat; adds moisture" },
    { original: "1 cup Vegetable Oil (baking)", substitute: "3/4 cup melted butter", notes: "Richer flavor" },
    { original: "1 cup Shortening", substitute: "1 cup butter + reduce liquid by 2 tbsp", notes: "Less flaky; better flavor" },
    { original: "Cooking Spray", substitute: "Butter/oil on paper towel", notes: "Or parchment paper" },
  ]},
  { category: "Other Common", items: [
    { original: "1 cup Breadcrumbs", substitute: "1 cup rolled oats (pulsed)", notes: "Or crushed crackers" },
    { original: "1 oz Unsweetened Chocolate", substitute: "3 tbsp cocoa + 1 tbsp oil", notes: "Mix until smooth" },
    { original: "1 cup Wine (cooking)", substitute: "1 cup broth + 1 tbsp vinegar", notes: "Match color: chicken/beef" },
    { original: "1 tbsp Fresh Herbs", substitute: "1 tsp dried herbs", notes: "3:1 fresh to dried ratio" },
    { original: "1 clove Garlic", substitute: "1/8 tsp garlic powder", notes: "Or 1/2 tsp minced from jar" },
    { original: "1 tbsp Mustard (prepared)", substitute: "1 tsp dry mustard + 1 tsp water + 1 tsp vinegar", notes: "Mix together" },
  ]},
];

export default function SubstitutionChartClient() {
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
      { "@type": "ListItem", position: 2, name: "Substitution Chart", item: "https://printablepolly.com/substitution-chart" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Ingredient Substitution Chart</h1>
      <p className="text-gray-600 mb-6">A printable reference for common ingredient substitutions in baking and cooking. Find replacements for butter, eggs, milk, sugar, flour, and more with exact ratios.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="substitution-chart" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "24px" }}>
            <h2 className="text-lg font-bold text-center text-emerald-800 mb-1">Ingredient Substitution Chart</h2>
            <p className="text-center text-xs text-gray-500 mb-3">Common replacements with ratios and notes</p>

            {substitutions.map((category) => (
              <div key={category.category} className="mb-3">
                <h3 className="text-xs font-bold text-white bg-emerald-700 px-2 py-0.5 rounded-t">{category.category}</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1.5 py-0.5 text-left" style={{ width: "28%" }}>Original</th>
                      <th className="border border-gray-300 px-1.5 py-0.5 text-left" style={{ width: "35%" }}>Substitute</th>
                      <th className="border border-gray-300 px-1.5 py-0.5 text-left" style={{ width: "37%" }}>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.items.map((item, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-200 px-1.5 py-0.5 font-medium">{item.original}</td>
                        <td className="border border-gray-200 px-1.5 py-0.5">{item.substitute}</td>
                        <td className="border border-gray-200 px-1.5 py-0.5 text-gray-600 italic">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}

            <div className="bg-amber-50 border border-amber-200 rounded p-2 text-xs mt-2">
              <span className="font-bold text-amber-800">Note:</span> Substitutions may slightly alter flavor, texture, or appearance. Test with a small batch first when baking.
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/measurement-conversions" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Measurement Conversions</h3>
          </Link>
          <Link href="/cooking-temperatures" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🌡️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Cooking Temperatures</h3>
          </Link>
          <Link href="/spice-guide" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🧂</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Spice Guide</h3>
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
