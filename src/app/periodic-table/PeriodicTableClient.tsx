"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Element = {
  number: number;
  symbol: string;
  name: string;
  mass: string;
  category: string;
  row: number;
  col: number;
};

const categoryColors: Record<string, string> = {
  "alkali-metal": "bg-red-100 border-red-300",
  "alkaline-earth": "bg-orange-100 border-orange-300",
  "transition-metal": "bg-yellow-100 border-yellow-300",
  "post-transition": "bg-green-100 border-green-300",
  metalloid: "bg-teal-100 border-teal-300",
  nonmetal: "bg-blue-100 border-blue-300",
  halogen: "bg-indigo-100 border-indigo-300",
  "noble-gas": "bg-purple-100 border-purple-300",
  lanthanide: "bg-pink-100 border-pink-300",
  actinide: "bg-rose-100 border-rose-300",
};

const categoryLabels: Record<string, string> = {
  "alkali-metal": "Alkali Metals",
  "alkaline-earth": "Alkaline Earth Metals",
  "transition-metal": "Transition Metals",
  "post-transition": "Post-Transition Metals",
  metalloid: "Metalloids",
  nonmetal: "Nonmetals",
  halogen: "Halogens",
  "noble-gas": "Noble Gases",
  lanthanide: "Lanthanides",
  actinide: "Actinides",
};

const elements: Element[] = [
  // Period 1
  { number: 1, symbol: "H", name: "Hydrogen", mass: "1.008", category: "nonmetal", row: 1, col: 1 },
  { number: 2, symbol: "He", name: "Helium", mass: "4.003", category: "noble-gas", row: 1, col: 18 },
  // Period 2
  { number: 3, symbol: "Li", name: "Lithium", mass: "6.941", category: "alkali-metal", row: 2, col: 1 },
  { number: 4, symbol: "Be", name: "Beryllium", mass: "9.012", category: "alkaline-earth", row: 2, col: 2 },
  { number: 5, symbol: "B", name: "Boron", mass: "10.81", category: "metalloid", row: 2, col: 13 },
  { number: 6, symbol: "C", name: "Carbon", mass: "12.01", category: "nonmetal", row: 2, col: 14 },
  { number: 7, symbol: "N", name: "Nitrogen", mass: "14.01", category: "nonmetal", row: 2, col: 15 },
  { number: 8, symbol: "O", name: "Oxygen", mass: "16.00", category: "nonmetal", row: 2, col: 16 },
  { number: 9, symbol: "F", name: "Fluorine", mass: "19.00", category: "halogen", row: 2, col: 17 },
  { number: 10, symbol: "Ne", name: "Neon", mass: "20.18", category: "noble-gas", row: 2, col: 18 },
  // Period 3
  { number: 11, symbol: "Na", name: "Sodium", mass: "22.99", category: "alkali-metal", row: 3, col: 1 },
  { number: 12, symbol: "Mg", name: "Magnesium", mass: "24.31", category: "alkaline-earth", row: 3, col: 2 },
  { number: 13, symbol: "Al", name: "Aluminum", mass: "26.98", category: "post-transition", row: 3, col: 13 },
  { number: 14, symbol: "Si", name: "Silicon", mass: "28.09", category: "metalloid", row: 3, col: 14 },
  { number: 15, symbol: "P", name: "Phosphorus", mass: "30.97", category: "nonmetal", row: 3, col: 15 },
  { number: 16, symbol: "S", name: "Sulfur", mass: "32.07", category: "nonmetal", row: 3, col: 16 },
  { number: 17, symbol: "Cl", name: "Chlorine", mass: "35.45", category: "halogen", row: 3, col: 17 },
  { number: 18, symbol: "Ar", name: "Argon", mass: "39.95", category: "noble-gas", row: 3, col: 18 },
  // Period 4
  { number: 19, symbol: "K", name: "Potassium", mass: "39.10", category: "alkali-metal", row: 4, col: 1 },
  { number: 20, symbol: "Ca", name: "Calcium", mass: "40.08", category: "alkaline-earth", row: 4, col: 2 },
  { number: 21, symbol: "Sc", name: "Scandium", mass: "44.96", category: "transition-metal", row: 4, col: 3 },
  { number: 22, symbol: "Ti", name: "Titanium", mass: "47.87", category: "transition-metal", row: 4, col: 4 },
  { number: 23, symbol: "V", name: "Vanadium", mass: "50.94", category: "transition-metal", row: 4, col: 5 },
  { number: 24, symbol: "Cr", name: "Chromium", mass: "52.00", category: "transition-metal", row: 4, col: 6 },
  { number: 25, symbol: "Mn", name: "Manganese", mass: "54.94", category: "transition-metal", row: 4, col: 7 },
  { number: 26, symbol: "Fe", name: "Iron", mass: "55.85", category: "transition-metal", row: 4, col: 8 },
  { number: 27, symbol: "Co", name: "Cobalt", mass: "58.93", category: "transition-metal", row: 4, col: 9 },
  { number: 28, symbol: "Ni", name: "Nickel", mass: "58.69", category: "transition-metal", row: 4, col: 10 },
  { number: 29, symbol: "Cu", name: "Copper", mass: "63.55", category: "transition-metal", row: 4, col: 11 },
  { number: 30, symbol: "Zn", name: "Zinc", mass: "65.38", category: "transition-metal", row: 4, col: 12 },
  { number: 31, symbol: "Ga", name: "Gallium", mass: "69.72", category: "post-transition", row: 4, col: 13 },
  { number: 32, symbol: "Ge", name: "Germanium", mass: "72.63", category: "metalloid", row: 4, col: 14 },
  { number: 33, symbol: "As", name: "Arsenic", mass: "74.92", category: "metalloid", row: 4, col: 15 },
  { number: 34, symbol: "Se", name: "Selenium", mass: "78.97", category: "nonmetal", row: 4, col: 16 },
  { number: 35, symbol: "Br", name: "Bromine", mass: "79.90", category: "halogen", row: 4, col: 17 },
  { number: 36, symbol: "Kr", name: "Krypton", mass: "83.80", category: "noble-gas", row: 4, col: 18 },
  // Period 5
  { number: 37, symbol: "Rb", name: "Rubidium", mass: "85.47", category: "alkali-metal", row: 5, col: 1 },
  { number: 38, symbol: "Sr", name: "Strontium", mass: "87.62", category: "alkaline-earth", row: 5, col: 2 },
  { number: 39, symbol: "Y", name: "Yttrium", mass: "88.91", category: "transition-metal", row: 5, col: 3 },
  { number: 40, symbol: "Zr", name: "Zirconium", mass: "91.22", category: "transition-metal", row: 5, col: 4 },
  { number: 41, symbol: "Nb", name: "Niobium", mass: "92.91", category: "transition-metal", row: 5, col: 5 },
  { number: 42, symbol: "Mo", name: "Molybdenum", mass: "95.95", category: "transition-metal", row: 5, col: 6 },
  { number: 43, symbol: "Tc", name: "Technetium", mass: "(98)", category: "transition-metal", row: 5, col: 7 },
  { number: 44, symbol: "Ru", name: "Ruthenium", mass: "101.1", category: "transition-metal", row: 5, col: 8 },
  { number: 45, symbol: "Rh", name: "Rhodium", mass: "102.9", category: "transition-metal", row: 5, col: 9 },
  { number: 46, symbol: "Pd", name: "Palladium", mass: "106.4", category: "transition-metal", row: 5, col: 10 },
  { number: 47, symbol: "Ag", name: "Silver", mass: "107.9", category: "transition-metal", row: 5, col: 11 },
  { number: 48, symbol: "Cd", name: "Cadmium", mass: "112.4", category: "transition-metal", row: 5, col: 12 },
  { number: 49, symbol: "In", name: "Indium", mass: "114.8", category: "post-transition", row: 5, col: 13 },
  { number: 50, symbol: "Sn", name: "Tin", mass: "118.7", category: "post-transition", row: 5, col: 14 },
  { number: 51, symbol: "Sb", name: "Antimony", mass: "121.8", category: "metalloid", row: 5, col: 15 },
  { number: 52, symbol: "Te", name: "Tellurium", mass: "127.6", category: "metalloid", row: 5, col: 16 },
  { number: 53, symbol: "I", name: "Iodine", mass: "126.9", category: "halogen", row: 5, col: 17 },
  { number: 54, symbol: "Xe", name: "Xenon", mass: "131.3", category: "noble-gas", row: 5, col: 18 },
  // Period 6
  { number: 55, symbol: "Cs", name: "Cesium", mass: "132.9", category: "alkali-metal", row: 6, col: 1 },
  { number: 56, symbol: "Ba", name: "Barium", mass: "137.3", category: "alkaline-earth", row: 6, col: 2 },
  { number: 72, symbol: "Hf", name: "Hafnium", mass: "178.5", category: "transition-metal", row: 6, col: 4 },
  { number: 73, symbol: "Ta", name: "Tantalum", mass: "180.9", category: "transition-metal", row: 6, col: 5 },
  { number: 74, symbol: "W", name: "Tungsten", mass: "183.8", category: "transition-metal", row: 6, col: 6 },
  { number: 75, symbol: "Re", name: "Rhenium", mass: "186.2", category: "transition-metal", row: 6, col: 7 },
  { number: 76, symbol: "Os", name: "Osmium", mass: "190.2", category: "transition-metal", row: 6, col: 8 },
  { number: 77, symbol: "Ir", name: "Iridium", mass: "192.2", category: "transition-metal", row: 6, col: 9 },
  { number: 78, symbol: "Pt", name: "Platinum", mass: "195.1", category: "transition-metal", row: 6, col: 10 },
  { number: 79, symbol: "Au", name: "Gold", mass: "197.0", category: "transition-metal", row: 6, col: 11 },
  { number: 80, symbol: "Hg", name: "Mercury", mass: "200.6", category: "transition-metal", row: 6, col: 12 },
  { number: 81, symbol: "Tl", name: "Thallium", mass: "204.4", category: "post-transition", row: 6, col: 13 },
  { number: 82, symbol: "Pb", name: "Lead", mass: "207.2", category: "post-transition", row: 6, col: 14 },
  { number: 83, symbol: "Bi", name: "Bismuth", mass: "209.0", category: "post-transition", row: 6, col: 15 },
  { number: 84, symbol: "Po", name: "Polonium", mass: "(209)", category: "post-transition", row: 6, col: 16 },
  { number: 85, symbol: "At", name: "Astatine", mass: "(210)", category: "halogen", row: 6, col: 17 },
  { number: 86, symbol: "Rn", name: "Radon", mass: "(222)", category: "noble-gas", row: 6, col: 18 },
  // Period 7
  { number: 87, symbol: "Fr", name: "Francium", mass: "(223)", category: "alkali-metal", row: 7, col: 1 },
  { number: 88, symbol: "Ra", name: "Radium", mass: "(226)", category: "alkaline-earth", row: 7, col: 2 },
  { number: 104, symbol: "Rf", name: "Rutherfordium", mass: "(267)", category: "transition-metal", row: 7, col: 4 },
  { number: 105, symbol: "Db", name: "Dubnium", mass: "(268)", category: "transition-metal", row: 7, col: 5 },
  { number: 106, symbol: "Sg", name: "Seaborgium", mass: "(269)", category: "transition-metal", row: 7, col: 6 },
  { number: 107, symbol: "Bh", name: "Bohrium", mass: "(270)", category: "transition-metal", row: 7, col: 7 },
  { number: 108, symbol: "Hs", name: "Hassium", mass: "(277)", category: "transition-metal", row: 7, col: 8 },
  { number: 109, symbol: "Mt", name: "Meitnerium", mass: "(278)", category: "transition-metal", row: 7, col: 9 },
  { number: 110, symbol: "Ds", name: "Darmstadtium", mass: "(281)", category: "transition-metal", row: 7, col: 10 },
  { number: 111, symbol: "Rg", name: "Roentgenium", mass: "(282)", category: "transition-metal", row: 7, col: 11 },
  { number: 112, symbol: "Cn", name: "Copernicium", mass: "(285)", category: "transition-metal", row: 7, col: 12 },
  { number: 113, symbol: "Nh", name: "Nihonium", mass: "(286)", category: "post-transition", row: 7, col: 13 },
  { number: 114, symbol: "Fl", name: "Flerovium", mass: "(289)", category: "post-transition", row: 7, col: 14 },
  { number: 115, symbol: "Mc", name: "Moscovium", mass: "(290)", category: "post-transition", row: 7, col: 15 },
  { number: 116, symbol: "Lv", name: "Livermorium", mass: "(293)", category: "post-transition", row: 7, col: 16 },
  { number: 117, symbol: "Ts", name: "Tennessine", mass: "(294)", category: "halogen", row: 7, col: 17 },
  { number: 118, symbol: "Og", name: "Oganesson", mass: "(294)", category: "noble-gas", row: 7, col: 18 },
  // Lanthanides (row 9 for display)
  { number: 57, symbol: "La", name: "Lanthanum", mass: "138.9", category: "lanthanide", row: 9, col: 3 },
  { number: 58, symbol: "Ce", name: "Cerium", mass: "140.1", category: "lanthanide", row: 9, col: 4 },
  { number: 59, symbol: "Pr", name: "Praseodymium", mass: "140.9", category: "lanthanide", row: 9, col: 5 },
  { number: 60, symbol: "Nd", name: "Neodymium", mass: "144.2", category: "lanthanide", row: 9, col: 6 },
  { number: 61, symbol: "Pm", name: "Promethium", mass: "(145)", category: "lanthanide", row: 9, col: 7 },
  { number: 62, symbol: "Sm", name: "Samarium", mass: "150.4", category: "lanthanide", row: 9, col: 8 },
  { number: 63, symbol: "Eu", name: "Europium", mass: "152.0", category: "lanthanide", row: 9, col: 9 },
  { number: 64, symbol: "Gd", name: "Gadolinium", mass: "157.3", category: "lanthanide", row: 9, col: 10 },
  { number: 65, symbol: "Tb", name: "Terbium", mass: "158.9", category: "lanthanide", row: 9, col: 11 },
  { number: 66, symbol: "Dy", name: "Dysprosium", mass: "162.5", category: "lanthanide", row: 9, col: 12 },
  { number: 67, symbol: "Ho", name: "Holmium", mass: "164.9", category: "lanthanide", row: 9, col: 13 },
  { number: 68, symbol: "Er", name: "Erbium", mass: "167.3", category: "lanthanide", row: 9, col: 14 },
  { number: 69, symbol: "Tm", name: "Thulium", mass: "168.9", category: "lanthanide", row: 9, col: 15 },
  { number: 70, symbol: "Yb", name: "Ytterbium", mass: "173.0", category: "lanthanide", row: 9, col: 16 },
  { number: 71, symbol: "Lu", name: "Lutetium", mass: "175.0", category: "lanthanide", row: 9, col: 17 },
  // Actinides (row 10 for display)
  { number: 89, symbol: "Ac", name: "Actinium", mass: "(227)", category: "actinide", row: 10, col: 3 },
  { number: 90, symbol: "Th", name: "Thorium", mass: "232.0", category: "actinide", row: 10, col: 4 },
  { number: 91, symbol: "Pa", name: "Protactinium", mass: "231.0", category: "actinide", row: 10, col: 5 },
  { number: 92, symbol: "U", name: "Uranium", mass: "238.0", category: "actinide", row: 10, col: 6 },
  { number: 93, symbol: "Np", name: "Neptunium", mass: "(237)", category: "actinide", row: 10, col: 7 },
  { number: 94, symbol: "Pu", name: "Plutonium", mass: "(244)", category: "actinide", row: 10, col: 8 },
  { number: 95, symbol: "Am", name: "Americium", mass: "(243)", category: "actinide", row: 10, col: 9 },
  { number: 96, symbol: "Cm", name: "Curium", mass: "(247)", category: "actinide", row: 10, col: 10 },
  { number: 97, symbol: "Bk", name: "Berkelium", mass: "(247)", category: "actinide", row: 10, col: 11 },
  { number: 98, symbol: "Cf", name: "Californium", mass: "(251)", category: "actinide", row: 10, col: 12 },
  { number: 99, symbol: "Es", name: "Einsteinium", mass: "(252)", category: "actinide", row: 10, col: 13 },
  { number: 100, symbol: "Fm", name: "Fermium", mass: "(257)", category: "actinide", row: 10, col: 14 },
  { number: 101, symbol: "Md", name: "Mendelevium", mass: "(258)", category: "actinide", row: 10, col: 15 },
  { number: 102, symbol: "No", name: "Nobelium", mass: "(259)", category: "actinide", row: 10, col: 16 },
  { number: 103, symbol: "Lr", name: "Lawrencium", mass: "(266)", category: "actinide", row: 10, col: 17 },
];

const faqs = [
  { question: "How many elements are on the periodic table?", answer: "The modern periodic table contains 118 confirmed elements, from hydrogen (1) to oganesson (118). Elements 1-94 occur naturally, while 95-118 are synthetic." },
  { question: "What do the colors on the periodic table mean?", answer: "Colors group elements by category: alkali metals, alkaline earth metals, transition metals, post-transition metals, metalloids, nonmetals, halogens, noble gases, lanthanides, and actinides. Each group shares similar chemical properties." },
  { question: "Why are lanthanides and actinides shown separately?", answer: "Lanthanides (57-71) and actinides (89-103) are placed below the main table to keep it compact. They belong in period 6 and 7 respectively, between groups 2 and 3." },
];

export default function PeriodicTableClient() {
  const [style, setStyle] = useState<"full" | "simplified">("full");
  const [orientation, setOrientation] = useState<Orientation>("landscape");
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
      { "@type": "ListItem", position: 2, name: "Periodic Table", item: "https://printablepolly.com/periodic-table" },
    ],
  };

  const renderCell = (el: Element) => {
    const colors = categoryColors[el.category] || "bg-gray-100 border-gray-300";
    if (style === "simplified") {
      return (
        <div key={el.number} className={`border ${colors} p-0.5 text-center`} style={{ gridRow: el.row, gridColumn: el.col }}>
          <div className="text-[7px] leading-none text-gray-500">{el.number}</div>
          <div className="text-[11px] font-bold leading-tight">{el.symbol}</div>
        </div>
      );
    }
    return (
      <div key={el.number} className={`border ${colors} p-0.5 text-center`} style={{ gridRow: el.row, gridColumn: el.col }}>
        <div className="text-[6px] leading-none text-gray-500">{el.number}</div>
        <div className="text-[10px] font-bold leading-tight">{el.symbol}</div>
        <div className="text-[5px] leading-none truncate">{el.name}</div>
        <div className="text-[5px] leading-none text-gray-500">{el.mass}</div>
      </div>
    );
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Printable Periodic Table of Elements</h1>
      <p className="text-gray-600 mb-6">A color-coded periodic table with element symbols, atomic numbers, names, and atomic masses. Print as a full reference or simplified version.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
            <select value={style} onChange={(e) => setStyle(e.target.value as "full" | "simplified")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="full">Full (Symbol + Number + Name + Mass)</option>
              <option value="simplified">Simplified (Symbol + Number only)</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="periodic-table" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "20px" }}>
            <h2 className="text-lg font-bold text-center mb-2">Periodic Table of Elements</h2>

            {/* Main grid */}
            <div className="grid gap-[1px]" style={{ gridTemplateColumns: "repeat(18, 1fr)", gridTemplateRows: "repeat(10, auto)" }}>
              {/* Lanthanide/Actinide placeholder markers */}
              <div className="text-[6px] text-center text-pink-600 font-bold" style={{ gridRow: 6, gridColumn: 3 }}>57-71</div>
              <div className="text-[6px] text-center text-rose-600 font-bold" style={{ gridRow: 7, gridColumn: 3 }}>89-103</div>

              {/* Spacer row 8 */}
              <div style={{ gridRow: 8, gridColumn: "1 / span 18", height: "8px" }} />

              {elements.map(renderCell)}
            </div>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap gap-2 justify-center text-[7px]">
              {Object.entries(categoryLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1">
                  <div className={`w-3 h-3 border ${categoryColors[key]}`} />
                  <span>{label}</span>
                </div>
              ))}
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
          <Link href="/unit-conversions" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Unit Conversions</h3>
          </Link>
          <Link href="/flash-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🃏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Flash Cards</h3>
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
