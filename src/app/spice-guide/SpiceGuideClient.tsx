"use client";

import Link from "next/link";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What is the difference between herbs and spices?", answer: "Herbs are the leafy green parts of plants (basil, parsley, cilantro), while spices come from other parts like seeds, bark, roots, or berries (cumin, cinnamon, ginger, peppercorns). Some plants provide both — like cilantro leaves and coriander seeds." },
  { question: "How long do dried spices stay fresh?", answer: "Ground spices last 2-3 years, whole spices 3-4 years, and dried herbs 1-3 years. They don't spoil but lose potency. To test freshness, rub a small amount between your fingers — if the aroma is faint, it's time to replace." },
  { question: "Should I toast spices before using them?", answer: "Toasting whole spices in a dry pan for 1-2 minutes (until fragrant) releases essential oils and deepens flavor. This is especially important for Indian and Mexican cooking. Don't toast ground spices — they burn quickly." },
];

const spices = [
  { name: "Basil", flavor: "Sweet, peppery, slightly anise", cuisines: "Italian, Thai, Vietnamese", pairsWith: "Tomatoes, mozzarella, garlic, pasta" },
  { name: "Bay Leaves", flavor: "Earthy, slightly floral, bitter", cuisines: "Mediterranean, French, Indian", pairsWith: "Soups, stews, braises, rice" },
  { name: "Cayenne", flavor: "Hot, pungent, slightly fruity", cuisines: "Mexican, Cajun, Asian, Indian", pairsWith: "Chili, sauces, eggs, chocolate" },
  { name: "Chili Powder", flavor: "Warm, earthy, mildly spicy", cuisines: "Mexican, American, Tex-Mex", pairsWith: "Tacos, chili, beans, cornbread" },
  { name: "Cilantro", flavor: "Bright, citrusy, fresh", cuisines: "Mexican, Thai, Indian, Vietnamese", pairsWith: "Salsa, curries, rice, tacos" },
  { name: "Cinnamon", flavor: "Warm, sweet, woody", cuisines: "Indian, Mexican, Middle Eastern, American", pairsWith: "Baking, oatmeal, curries, coffee" },
  { name: "Coriander", flavor: "Citrusy, nutty, warm", cuisines: "Indian, Mexican, Middle Eastern", pairsWith: "Curries, meats, pickling, bread" },
  { name: "Cumin", flavor: "Earthy, warm, slightly bitter", cuisines: "Indian, Mexican, Middle Eastern", pairsWith: "Tacos, curries, beans, hummus" },
  { name: "Dill", flavor: "Fresh, grassy, slightly sweet", cuisines: "Scandinavian, Eastern European, Mediterranean", pairsWith: "Fish, potatoes, yogurt, pickles" },
  { name: "Garlic Powder", flavor: "Savory, pungent, slightly sweet", cuisines: "Universal", pairsWith: "Rubs, sauces, dressings, bread" },
  { name: "Ginger", flavor: "Spicy, warm, slightly sweet", cuisines: "Asian, Indian, Caribbean", pairsWith: "Stir-fry, curries, baking, tea" },
  { name: "Italian Seasoning", flavor: "Herbal, savory, slightly sweet", cuisines: "Italian, Mediterranean", pairsWith: "Pasta, pizza, bread, roasted veg" },
  { name: "Nutmeg", flavor: "Warm, sweet, slightly nutty", cuisines: "French, Italian, Caribbean, Indian", pairsWith: "Bechamel, spinach, eggnog, baking" },
  { name: "Oregano", flavor: "Robust, earthy, slightly bitter", cuisines: "Italian, Greek, Mexican", pairsWith: "Pizza, tomato sauce, grilled meats" },
  { name: "Paprika", flavor: "Sweet, mild, slightly earthy", cuisines: "Hungarian, Spanish, American", pairsWith: "Deviled eggs, goulash, rubs, rice" },
  { name: "Parsley", flavor: "Fresh, mild, slightly peppery", cuisines: "Mediterranean, French, Middle Eastern", pairsWith: "Garnish, tabbouleh, sauces, salads" },
  { name: "Red Pepper Flakes", flavor: "Hot, sharp, slightly fruity", cuisines: "Italian, Asian, American", pairsWith: "Pizza, pasta, stir-fry, pickles" },
  { name: "Rosemary", flavor: "Pine-like, earthy, slightly minty", cuisines: "Mediterranean, French, Italian", pairsWith: "Lamb, potatoes, bread, roast chicken" },
  { name: "Smoked Paprika", flavor: "Smoky, sweet, warm", cuisines: "Spanish, BBQ, American", pairsWith: "Grilled meats, beans, eggs, rice" },
  { name: "Thyme", flavor: "Earthy, floral, slightly minty", cuisines: "French, Mediterranean, Cajun", pairsWith: "Roasts, soups, stews, mushrooms" },
  { name: "Turmeric", flavor: "Earthy, warm, slightly bitter", cuisines: "Indian, Middle Eastern, Southeast Asian", pairsWith: "Curries, rice, smoothies, eggs" },
];

const spiceBlends = [
  { name: "Garam Masala", ingredients: "Cumin, coriander, cardamom, cinnamon, cloves, black pepper, nutmeg", cuisine: "Indian" },
  { name: "Herbes de Provence", ingredients: "Thyme, rosemary, oregano, marjoram, savory, lavender", cuisine: "French" },
  { name: "Chinese Five Spice", ingredients: "Star anise, cloves, cinnamon, Sichuan pepper, fennel", cuisine: "Chinese" },
  { name: "Taco Seasoning", ingredients: "Chili powder, cumin, paprika, garlic powder, onion powder, oregano, cayenne", cuisine: "Mexican" },
  { name: "Za'atar", ingredients: "Thyme, sesame seeds, sumac, oregano, marjoram", cuisine: "Middle Eastern" },
  { name: "Ras el Hanout", ingredients: "Cumin, coriander, cinnamon, ginger, turmeric, paprika, cardamom, cloves", cuisine: "Moroccan" },
  { name: "Cajun Seasoning", ingredients: "Paprika, cayenne, garlic, onion, oregano, thyme, black pepper", cuisine: "Cajun/Creole" },
  { name: "BBQ Rub", ingredients: "Brown sugar, paprika, garlic, onion, chili powder, cumin, black pepper", cuisine: "American BBQ" },
  { name: "Curry Powder", ingredients: "Turmeric, cumin, coriander, ginger, mustard, fenugreek, chili", cuisine: "Indian/British" },
  { name: "Jerk Seasoning", ingredients: "Allspice, thyme, scotch bonnet, garlic, ginger, cinnamon, nutmeg", cuisine: "Caribbean" },
];

export default function SpiceGuideClient() {
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
      { "@type": "ListItem", position: 2, name: "Spice Guide", item: "https://printablepolly.com/spice-guide" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Spice &amp; Herb Pairing Guide</h1>
      <p className="text-gray-600 mb-6">A printable reference showing spices, their flavor profiles, which cuisines they belong to, and what foods they pair with. Includes common spice blends.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="spice-guide" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "24px" }}>
            <h2 className="text-lg font-bold text-center text-emerald-800 mb-3">Spice &amp; Herb Pairing Guide</h2>

            {/* Main Spice Table */}
            <table className="w-full text-xs border-collapse mb-4">
              <thead>
                <tr className="bg-emerald-700 text-white">
                  <th className="border border-emerald-800 px-1.5 py-1 text-left">Spice / Herb</th>
                  <th className="border border-emerald-800 px-1.5 py-1 text-left">Flavor Profile</th>
                  <th className="border border-emerald-800 px-1.5 py-1 text-left">Cuisines</th>
                  <th className="border border-emerald-800 px-1.5 py-1 text-left">Pairs With</th>
                </tr>
              </thead>
              <tbody>
                {spices.map((spice, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-emerald-50"}>
                    <td className="border border-gray-200 px-1.5 py-0.5 font-bold text-emerald-800 whitespace-nowrap">{spice.name}</td>
                    <td className="border border-gray-200 px-1.5 py-0.5">{spice.flavor}</td>
                    <td className="border border-gray-200 px-1.5 py-0.5">{spice.cuisines}</td>
                    <td className="border border-gray-200 px-1.5 py-0.5">{spice.pairsWith}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Spice Blends */}
            <h3 className="text-sm font-bold text-white bg-emerald-700 px-2 py-1 rounded-t mb-0">Common Spice Blends</h3>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-50">
                  <th className="border border-gray-300 px-1.5 py-1 text-left">Blend</th>
                  <th className="border border-gray-300 px-1.5 py-1 text-left">Cuisine</th>
                  <th className="border border-gray-300 px-1.5 py-1 text-left">Key Ingredients</th>
                </tr>
              </thead>
              <tbody>
                {spiceBlends.map((blend, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="border border-gray-200 px-1.5 py-0.5 font-bold whitespace-nowrap">{blend.name}</td>
                    <td className="border border-gray-200 px-1.5 py-0.5 text-emerald-700">{blend.cuisine}</td>
                    <td className="border border-gray-200 px-1.5 py-0.5">{blend.ingredients}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
