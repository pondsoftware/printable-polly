"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What temperature kills bacteria in meat?", answer: "Most harmful bacteria are killed at 165°F (74°C). This is why poultry must reach this internal temperature. For beef and pork, 145°F (63°C) with a 3-minute rest is sufficient because bacteria are primarily on the surface." },
  { question: "Should I use an instant-read or oven-safe thermometer?", answer: "Use an instant-read thermometer to check doneness at the end of cooking. Use an oven-safe (leave-in) thermometer for roasts and large cuts where you want to monitor temperature throughout cooking without opening the oven." },
  { question: "What is carryover cooking and why does it matter?", answer: "Carryover cooking is the 5-10°F rise in internal temperature that occurs after removing meat from heat. The residual heat continues cooking the center. Remove meat 5°F below your target and let it rest to reach the final temperature." },
];

const meatTemps = [
  { category: "Beef & Lamb", items: [
    { name: "Rare", temp: "125°F / 52°C", notes: "Cool red center" },
    { name: "Medium-Rare", temp: "135°F / 57°C", notes: "Warm red center" },
    { name: "Medium", temp: "145°F / 63°C", notes: "Warm pink center" },
    { name: "Medium-Well", temp: "150°F / 66°C", notes: "Slightly pink" },
    { name: "Well Done", temp: "160°F / 71°C", notes: "No pink" },
    { name: "Ground Beef (USDA)", temp: "160°F / 71°C", notes: "Required minimum" },
  ]},
  { category: "Pork", items: [
    { name: "Chops & Roasts (USDA)", temp: "145°F / 63°C", notes: "3-min rest" },
    { name: "Ground Pork (USDA)", temp: "160°F / 71°C", notes: "Required minimum" },
    { name: "Ham (fresh)", temp: "145°F / 63°C", notes: "3-min rest" },
    { name: "Ham (reheating)", temp: "165°F / 74°C", notes: "Pre-cooked" },
  ]},
  { category: "Poultry", items: [
    { name: "Chicken Breast", temp: "165°F / 74°C", notes: "USDA minimum" },
    { name: "Chicken Thigh", temp: "175°F / 79°C", notes: "Best texture" },
    { name: "Whole Chicken", temp: "165°F / 74°C", notes: "Thickest part of thigh" },
    { name: "Turkey", temp: "165°F / 74°C", notes: "Breast; thigh to 175°F" },
    { name: "Ground Poultry", temp: "165°F / 74°C", notes: "Required minimum" },
  ]},
  { category: "Seafood", items: [
    { name: "Fish (USDA)", temp: "145°F / 63°C", notes: "Flakes with fork" },
    { name: "Salmon (preferred)", temp: "125°F / 52°C", notes: "Medium; translucent center" },
    { name: "Shrimp & Lobster", temp: "145°F / 63°C", notes: "Opaque & firm" },
    { name: "Scallops", temp: "130°F / 54°C", notes: "Medium-rare center" },
  ]},
];

const ovenTemps = [
  { description: "Very Low / Warming", f: "200°F", c: "95°C", gas: "1/4" },
  { description: "Low", f: "250°F", c: "120°C", gas: "1/2" },
  { description: "Low", f: "275°F", c: "135°C", gas: "1" },
  { description: "Moderate Low", f: "300°F", c: "150°C", gas: "2" },
  { description: "Moderate", f: "325°F", c: "165°C", gas: "3" },
  { description: "Moderate", f: "350°F", c: "175°C", gas: "4" },
  { description: "Moderate Hot", f: "375°F", c: "190°C", gas: "5" },
  { description: "Hot", f: "400°F", c: "200°C", gas: "6" },
  { description: "Hot", f: "425°F", c: "220°C", gas: "7" },
  { description: "Very Hot", f: "450°F", c: "230°C", gas: "8" },
  { description: "Very Hot", f: "475°F", c: "245°C", gas: "9" },
  { description: "Broil / Extremely Hot", f: "500°F", c: "260°C", gas: "10" },
];

const bakingTemps = [
  { item: "Cookies", temp: "350-375°F / 175-190°C" },
  { item: "Cakes", temp: "325-350°F / 165-175°C" },
  { item: "Quick Breads & Muffins", temp: "350-400°F / 175-200°C" },
  { item: "Yeast Breads", temp: "375-425°F / 190-220°C" },
  { item: "Pies", temp: "375-425°F / 190-220°C" },
  { item: "Pizza", temp: "450-500°F / 230-260°C" },
  { item: "Casseroles", temp: "350°F / 175°C" },
  { item: "Roasted Vegetables", temp: "400-425°F / 200-220°C" },
];

const candyStages = [
  { stage: "Thread", temp: "230-235°F / 110-113°C", use: "Syrup, glazes" },
  { stage: "Soft Ball", temp: "235-240°F / 113-116°C", use: "Fudge, fondant" },
  { stage: "Firm Ball", temp: "245-250°F / 118-121°C", use: "Caramels" },
  { stage: "Hard Ball", temp: "250-265°F / 121-130°C", use: "Nougat, marshmallow" },
  { stage: "Soft Crack", temp: "270-290°F / 132-143°C", use: "Taffy, butterscotch" },
  { stage: "Hard Crack", temp: "300-310°F / 149-154°C", use: "Toffee, brittles, lollipops" },
  { stage: "Caramel", temp: "320-350°F / 160-177°C", use: "Caramel sauce, spun sugar" },
];

export default function CookingTemperaturesClient() {
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
      { "@type": "ListItem", position: 2, name: "Cooking Temperatures", item: "https://printablepolly.com/cooking-temperatures" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Cooking Temperatures Chart</h1>
      <p className="text-gray-600 mb-6">A printable reference chart with safe meat temperatures (USDA), oven conversions, common baking temps, and candy stages. Keep it on your fridge or inside a cabinet door.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="cooking-temperatures" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "24px" }}>
            <h2 className="text-lg font-bold text-center text-emerald-800 mb-3">Cooking Temperature Reference</h2>

            {/* Meat Safe Temperatures */}
            <h3 className="text-sm font-bold text-white bg-emerald-700 px-2 py-1 rounded-t mb-0">Safe Internal Meat Temperatures</h3>
            <div className="grid grid-cols-2 gap-x-3 mb-3">
              {meatTemps.map((category) => (
                <div key={category.category} className="mb-2">
                  <h4 className="text-xs font-bold text-emerald-700 border-b border-emerald-200 pb-0.5 mt-1 mb-1">{category.category}</h4>
                  <table className="w-full text-xs border-collapse">
                    <tbody>
                      {category.items.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                          <td className="border border-gray-200 px-1 py-0.5">{item.name}</td>
                          <td className="border border-gray-200 px-1 py-0.5 font-bold text-red-700">{item.temp}</td>
                          <td className="border border-gray-200 px-1 py-0.5 text-gray-500">{item.notes}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>

            {/* Oven Temperature Conversions + Baking */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <h3 className="text-xs font-bold text-white bg-emerald-700 px-2 py-0.5 rounded-t mb-0">Oven Temperature Conversions</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1 py-0.5 text-left">Description</th>
                      <th className="border border-gray-300 px-1 py-0.5">°F</th>
                      <th className="border border-gray-300 px-1 py-0.5">°C</th>
                      <th className="border border-gray-300 px-1 py-0.5">Gas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ovenTemps.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-200 px-1 py-0.5">{row.description}</td>
                        <td className="border border-gray-200 px-1 py-0.5 text-center font-medium">{row.f}</td>
                        <td className="border border-gray-200 px-1 py-0.5 text-center">{row.c}</td>
                        <td className="border border-gray-200 px-1 py-0.5 text-center">{row.gas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-xs font-bold text-white bg-emerald-700 px-2 py-0.5 rounded-t mb-0">Common Baking Temperatures</h3>
                <table className="w-full text-xs border-collapse mb-3">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1 py-0.5 text-left">Item</th>
                      <th className="border border-gray-300 px-1 py-0.5 text-left">Temperature</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bakingTemps.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-200 px-1 py-0.5">{row.item}</td>
                        <td className="border border-gray-200 px-1 py-0.5 font-medium">{row.temp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <h3 className="text-xs font-bold text-white bg-emerald-700 px-2 py-0.5 rounded-t mb-0">Candy / Sugar Stages</h3>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="border border-gray-300 px-1 py-0.5 text-left">Stage</th>
                      <th className="border border-gray-300 px-1 py-0.5 text-left">Temp</th>
                      <th className="border border-gray-300 px-1 py-0.5 text-left">Use</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candyStages.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-200 px-1 py-0.5 font-medium">{row.stage}</td>
                        <td className="border border-gray-200 px-1 py-0.5">{row.temp}</td>
                        <td className="border border-gray-200 px-1 py-0.5 text-gray-600">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Quick Tip */}
            <div className="bg-amber-50 border border-amber-200 rounded p-2 text-xs">
              <span className="font-bold text-amber-800">Tip:</span> Remove meat 5°F below target temp — it continues cooking while resting. Always rest meat 3-10 minutes before cutting.
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
