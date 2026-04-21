"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type State = { name: string; capital: string; abbr: string; region: string };

const states: State[] = [
  { name: "Alabama", capital: "Montgomery", abbr: "AL", region: "Southeast" },
  { name: "Alaska", capital: "Juneau", abbr: "AK", region: "West" },
  { name: "Arizona", capital: "Phoenix", abbr: "AZ", region: "West" },
  { name: "Arkansas", capital: "Little Rock", abbr: "AR", region: "Southeast" },
  { name: "California", capital: "Sacramento", abbr: "CA", region: "West" },
  { name: "Colorado", capital: "Denver", abbr: "CO", region: "West" },
  { name: "Connecticut", capital: "Hartford", abbr: "CT", region: "Northeast" },
  { name: "Delaware", capital: "Dover", abbr: "DE", region: "Northeast" },
  { name: "Florida", capital: "Tallahassee", abbr: "FL", region: "Southeast" },
  { name: "Georgia", capital: "Atlanta", abbr: "GA", region: "Southeast" },
  { name: "Hawaii", capital: "Honolulu", abbr: "HI", region: "West" },
  { name: "Idaho", capital: "Boise", abbr: "ID", region: "West" },
  { name: "Illinois", capital: "Springfield", abbr: "IL", region: "Midwest" },
  { name: "Indiana", capital: "Indianapolis", abbr: "IN", region: "Midwest" },
  { name: "Iowa", capital: "Des Moines", abbr: "IA", region: "Midwest" },
  { name: "Kansas", capital: "Topeka", abbr: "KS", region: "Midwest" },
  { name: "Kentucky", capital: "Frankfort", abbr: "KY", region: "Southeast" },
  { name: "Louisiana", capital: "Baton Rouge", abbr: "LA", region: "Southeast" },
  { name: "Maine", capital: "Augusta", abbr: "ME", region: "Northeast" },
  { name: "Maryland", capital: "Annapolis", abbr: "MD", region: "Northeast" },
  { name: "Massachusetts", capital: "Boston", abbr: "MA", region: "Northeast" },
  { name: "Michigan", capital: "Lansing", abbr: "MI", region: "Midwest" },
  { name: "Minnesota", capital: "Saint Paul", abbr: "MN", region: "Midwest" },
  { name: "Mississippi", capital: "Jackson", abbr: "MS", region: "Southeast" },
  { name: "Missouri", capital: "Jefferson City", abbr: "MO", region: "Midwest" },
  { name: "Montana", capital: "Helena", abbr: "MT", region: "West" },
  { name: "Nebraska", capital: "Lincoln", abbr: "NE", region: "Midwest" },
  { name: "Nevada", capital: "Carson City", abbr: "NV", region: "West" },
  { name: "New Hampshire", capital: "Concord", abbr: "NH", region: "Northeast" },
  { name: "New Jersey", capital: "Trenton", abbr: "NJ", region: "Northeast" },
  { name: "New Mexico", capital: "Santa Fe", abbr: "NM", region: "West" },
  { name: "New York", capital: "Albany", abbr: "NY", region: "Northeast" },
  { name: "North Carolina", capital: "Raleigh", abbr: "NC", region: "Southeast" },
  { name: "North Dakota", capital: "Bismarck", abbr: "ND", region: "Midwest" },
  { name: "Ohio", capital: "Columbus", abbr: "OH", region: "Midwest" },
  { name: "Oklahoma", capital: "Oklahoma City", abbr: "OK", region: "Southeast" },
  { name: "Oregon", capital: "Salem", abbr: "OR", region: "West" },
  { name: "Pennsylvania", capital: "Harrisburg", abbr: "PA", region: "Northeast" },
  { name: "Rhode Island", capital: "Providence", abbr: "RI", region: "Northeast" },
  { name: "South Carolina", capital: "Columbia", abbr: "SC", region: "Southeast" },
  { name: "South Dakota", capital: "Pierre", abbr: "SD", region: "Midwest" },
  { name: "Tennessee", capital: "Nashville", abbr: "TN", region: "Southeast" },
  { name: "Texas", capital: "Austin", abbr: "TX", region: "Southeast" },
  { name: "Utah", capital: "Salt Lake City", abbr: "UT", region: "West" },
  { name: "Vermont", capital: "Montpelier", abbr: "VT", region: "Northeast" },
  { name: "Virginia", capital: "Richmond", abbr: "VA", region: "Southeast" },
  { name: "Washington", capital: "Olympia", abbr: "WA", region: "West" },
  { name: "West Virginia", capital: "Charleston", abbr: "WV", region: "Southeast" },
  { name: "Wisconsin", capital: "Madison", abbr: "WI", region: "Midwest" },
  { name: "Wyoming", capital: "Cheyenne", abbr: "WY", region: "West" },
];

const regions = ["Northeast", "Southeast", "Midwest", "West"];

const faqs = [
  { question: "How many US states are there?", answer: "There are 50 US states. The most recent states admitted were Alaska and Hawaii, both in 1959." },
  { question: "What is the difference between a state capital and largest city?", answer: "A state capital is the city where the state government is headquartered. This is often not the largest city — for example, California's capital is Sacramento, not Los Angeles." },
  { question: "How are US states grouped into regions?", answer: "The US Census Bureau divides states into 4 regions: Northeast (11 states), Southeast/South (16 states), Midwest (12 states), and West (13 states). Some classifications use slightly different groupings." },
];

export default function UsStatesClient() {
  const [groupBy, setGroupBy] = useState<"alphabetical" | "region">("alphabetical");
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
      { "@type": "ListItem", position: 2, name: "US States & Capitals", item: "https://printablepolly.com/us-states" },
    ],
  };

  const sortedStates = groupBy === "alphabetical"
    ? [...states].sort((a, b) => a.name.localeCompare(b.name))
    : states;

  const renderAlphabetical = () => {
    const half = Math.ceil(sortedStates.length / 2);
    const col1 = sortedStates.slice(0, half);
    const col2 = sortedStates.slice(half);

    return (
      <div className="grid grid-cols-2 gap-4">
        {[col1, col2].map((col, idx) => (
          <table key={idx} className="w-full border-collapse text-[10px]">
            <thead>
              <tr className="bg-emerald-50">
                <th className="border border-gray-300 px-2 py-1 text-left font-bold">State</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold">Capital</th>
                <th className="border border-gray-300 px-2 py-1 text-center font-bold">Abbr</th>
                <th className="border border-gray-300 px-2 py-1 text-left font-bold">Region</th>
              </tr>
            </thead>
            <tbody>
              {col.map((s) => (
                <tr key={s.abbr} className="even:bg-gray-50">
                  <td className="border border-gray-300 px-2 py-0.5 font-medium">{s.name}</td>
                  <td className="border border-gray-300 px-2 py-0.5">{s.capital}</td>
                  <td className="border border-gray-300 px-2 py-0.5 text-center">{s.abbr}</td>
                  <td className="border border-gray-300 px-2 py-0.5 text-gray-500">{s.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}
      </div>
    );
  };

  const renderByRegion = () => {
    return (
      <div className="grid grid-cols-2 gap-4">
        {regions.map((region) => {
          const regionStates = states.filter((s) => s.region === region).sort((a, b) => a.name.localeCompare(b.name));
          return (
            <div key={region}>
              <h3 className="font-bold text-emerald-700 text-[11px] mb-1 border-b border-emerald-200 pb-0.5">{region} ({regionStates.length} states)</h3>
              <table className="w-full border-collapse text-[10px] mb-3">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="border border-gray-300 px-2 py-0.5 text-left font-bold">State</th>
                    <th className="border border-gray-300 px-2 py-0.5 text-left font-bold">Capital</th>
                    <th className="border border-gray-300 px-2 py-0.5 text-center font-bold">Abbr</th>
                  </tr>
                </thead>
                <tbody>
                  {regionStates.map((s) => (
                    <tr key={s.abbr} className="even:bg-gray-50">
                      <td className="border border-gray-300 px-2 py-0.5 font-medium">{s.name}</td>
                      <td className="border border-gray-300 px-2 py-0.5">{s.capital}</td>
                      <td className="border border-gray-300 px-2 py-0.5 text-center">{s.abbr}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">US States & Capitals</h1>
      <p className="text-gray-600 mb-6">A printable reference of all 50 US states with their capitals, abbreviations, and regions. View alphabetically or grouped by region.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Group By</label>
            <select value={groupBy} onChange={(e) => setGroupBy(e.target.value as "alphabetical" | "region")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="alphabetical">Alphabetical</option>
              <option value="region">By Region</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="us-states-capitals" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "28px" }}>
            <h2 className="text-lg font-bold text-center mb-1">US States & Capitals</h2>
            <p className="text-[9px] text-center text-gray-400 mb-3">All 50 states — printablepolly.com</p>

            {groupBy === "alphabetical" ? renderAlphabetical() : renderByRegion()}
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/flash-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🃏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Flash Cards</h3>
          </Link>
          <Link href="/grammar-rules" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📖</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Grammar Rules</h3>
          </Link>
          <Link href="/unit-conversions" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Unit Conversions</h3>
          </Link>
          <Link href="/reading-log" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📚</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Reading Log</h3>
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
