"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How do I convert Fahrenheit to Celsius?", answer: "Use the formula: C = (F - 32) x 5/9. For example, 72F = (72-32) x 5/9 = 22.2C. To convert Celsius to Fahrenheit: F = (C x 9/5) + 32." },
  { question: "What is the difference between US and metric units?", answer: "The US customary system uses inches, feet, pounds, and gallons, while the metric system uses meters, grams, and liters. The metric system is based on powers of 10, making conversions simpler within the system." },
  { question: "How many cups are in a gallon?", answer: "There are 16 cups in a gallon. The progression is: 2 cups = 1 pint, 2 pints = 1 quart, 4 quarts = 1 gallon. So 4 x 2 x 2 = 16 cups per gallon." },
];

export default function UnitConversionsClient() {
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
      { "@type": "ListItem", position: 2, name: "Unit Conversions", item: "https://printablepolly.com/unit-conversions" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Unit Conversion Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A printable reference for common unit conversions: length, weight, volume, temperature, area, and speed. All the conversion factors you need on one page.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="unit-conversions-cheat-sheet" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "28px" }}>
            <h2 className="text-lg font-bold text-center mb-1">Unit Conversion Cheat Sheet</h2>
            <p className="text-[9px] text-center text-gray-400 mb-4">printablepolly.com</p>

            <div className="grid grid-cols-2 gap-4 text-[10px] leading-relaxed">
              {/* Length */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-2 border-b border-emerald-100 pb-1">Length</h3>
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-700">US Customary</div>
                  <div>1 foot (ft) = 12 inches (in)</div>
                  <div>1 yard (yd) = 3 feet = 36 inches</div>
                  <div>1 mile (mi) = 5,280 feet = 1,760 yards</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Metric</div>
                  <div>1 centimeter (cm) = 10 millimeters (mm)</div>
                  <div>1 meter (m) = 100 cm = 1,000 mm</div>
                  <div>1 kilometer (km) = 1,000 meters</div>
                  <div className="font-semibold text-gray-700 mt-1.5">US to Metric</div>
                  <div>1 inch = 2.54 cm</div>
                  <div>1 foot = 30.48 cm = 0.3048 m</div>
                  <div>1 yard = 0.9144 m</div>
                  <div>1 mile = 1.609 km</div>
                  <div>1 km = 0.6214 miles</div>
                </div>
              </div>

              {/* Weight / Mass */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-2 border-b border-emerald-100 pb-1">Weight / Mass</h3>
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-700">US Customary</div>
                  <div>1 pound (lb) = 16 ounces (oz)</div>
                  <div>1 ton = 2,000 pounds</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Metric</div>
                  <div>1 gram (g) = 1,000 milligrams (mg)</div>
                  <div>1 kilogram (kg) = 1,000 grams</div>
                  <div>1 metric ton = 1,000 kg</div>
                  <div className="font-semibold text-gray-700 mt-1.5">US to Metric</div>
                  <div>1 ounce = 28.35 grams</div>
                  <div>1 pound = 453.6 grams = 0.4536 kg</div>
                  <div>1 kg = 2.205 pounds</div>
                  <div>1 stone = 14 pounds = 6.35 kg</div>
                </div>
              </div>

              {/* Volume */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-2 border-b border-emerald-100 pb-1">Volume</h3>
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-700">US Customary</div>
                  <div>1 tablespoon (tbsp) = 3 teaspoons (tsp)</div>
                  <div>1 fluid ounce (fl oz) = 2 tablespoons</div>
                  <div>1 cup = 8 fluid ounces</div>
                  <div>1 pint (pt) = 2 cups = 16 fl oz</div>
                  <div>1 quart (qt) = 2 pints = 4 cups</div>
                  <div>1 gallon (gal) = 4 quarts = 16 cups</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Metric</div>
                  <div>1 liter (L) = 1,000 milliliters (mL)</div>
                  <div className="font-semibold text-gray-700 mt-1.5">US to Metric</div>
                  <div>1 teaspoon = 4.929 mL</div>
                  <div>1 tablespoon = 14.79 mL</div>
                  <div>1 cup = 236.6 mL</div>
                  <div>1 gallon = 3.785 liters</div>
                  <div>1 liter = 0.2642 gallons</div>
                </div>
              </div>

              {/* Temperature */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-2 border-b border-emerald-100 pb-1">Temperature</h3>
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-700">Formulas</div>
                  <div>&#176;F to &#176;C: C = (F - 32) &#215; 5/9</div>
                  <div>&#176;C to &#176;F: F = (C &#215; 9/5) + 32</div>
                  <div>&#176;C to K: K = C + 273.15</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Key Reference Points</div>
                  <div>Water freezes: 32&#176;F = 0&#176;C</div>
                  <div>Water boils: 212&#176;F = 100&#176;C</div>
                  <div>Body temp: 98.6&#176;F = 37&#176;C</div>
                  <div>Room temp: 68&#176;F = 20&#176;C</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Quick Reference</div>
                  <div>0&#176;C = 32&#176;F</div>
                  <div>10&#176;C = 50&#176;F</div>
                  <div>20&#176;C = 68&#176;F</div>
                  <div>30&#176;C = 86&#176;F</div>
                  <div>40&#176;C = 104&#176;F</div>
                </div>
              </div>

              {/* Area */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-2 border-b border-emerald-100 pb-1">Area</h3>
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-700">US Customary</div>
                  <div>1 square foot (ft&#178;) = 144 square inches (in&#178;)</div>
                  <div>1 square yard (yd&#178;) = 9 square feet</div>
                  <div>1 acre = 43,560 square feet</div>
                  <div>1 square mile = 640 acres</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Metric</div>
                  <div>1 square meter (m&#178;) = 10,000 cm&#178;</div>
                  <div>1 hectare = 10,000 m&#178;</div>
                  <div>1 square km = 100 hectares</div>
                  <div className="font-semibold text-gray-700 mt-1.5">US to Metric</div>
                  <div>1 ft&#178; = 0.0929 m&#178;</div>
                  <div>1 acre = 4,047 m&#178; = 0.4047 hectares</div>
                  <div>1 sq mile = 2.59 km&#178;</div>
                </div>
              </div>

              {/* Speed */}
              <div className="border border-emerald-200 rounded p-2.5">
                <h3 className="font-bold text-emerald-700 text-[11px] mb-2 border-b border-emerald-100 pb-1">Speed</h3>
                <div className="space-y-0.5">
                  <div className="font-semibold text-gray-700">Conversions</div>
                  <div>1 mph = 1.609 km/h</div>
                  <div>1 km/h = 0.6214 mph</div>
                  <div>1 knot = 1.151 mph = 1.852 km/h</div>
                  <div>1 m/s = 3.6 km/h = 2.237 mph</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Quick Reference</div>
                  <div>30 mph = 48.3 km/h</div>
                  <div>60 mph = 96.6 km/h</div>
                  <div>100 km/h = 62.1 mph</div>
                  <div>120 km/h = 74.6 mph</div>
                  <div className="font-semibold text-gray-700 mt-1.5">Tip</div>
                  <div>mph &#215; 1.6 &#8776; km/h</div>
                  <div>km/h &#215; 0.6 &#8776; mph</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/math-formulas" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Math Formulas</h3>
          </Link>
          <Link href="/periodic-table" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">⚛️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Periodic Table</h3>
          </Link>
          <Link href="/us-states" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🇺🇸</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">US States & Capitals</h3>
          </Link>
          <Link href="/graph-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📐</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Graph Paper</h3>
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
