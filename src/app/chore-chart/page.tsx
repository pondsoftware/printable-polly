"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What age should kids start using a chore chart?", answer: "Kids as young as 2-3 can start with simple tasks like picking up toys. By age 5-6, they can handle a structured chore chart with daily tasks. Adjust the chores to be age-appropriate and increase responsibility as they grow." },
  { question: "How do I motivate my child to complete their chores?", answer: "Consistency is key. Use the chart visually — let kids check off or place stickers for completed tasks. Consider a small weekly reward (extra screen time, a treat, or a fun outing) when all chores are done. Praise effort, not just completion." },
  { question: "How many chores should a child have per day?", answer: "For younger kids (3-5), 1-2 simple chores per day is plenty. Kids aged 6-9 can handle 2-4 daily tasks. Older kids (10+) can manage 3-5 chores. The goal is to build responsibility without overwhelming them." },
];

const defaultChores = [
  "Make Bed",
  "Brush Teeth",
  "Clean Room",
  "Do Homework",
  "Set Table",
  "Feed Pet",
  "Pick Up Toys",
  "Read 20 Min",
  "",
  "",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function ChoreChart() {
  const [numChores, setNumChores] = useState(8);
  const [chores, setChores] = useState<string[]>(defaultChores);
  const [childName, setChildName] = useState("");
  const [includeReward, setIncludeReward] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const updateChore = (index: number, value: string) => {
    const newChores = [...chores];
    newChores[index] = value;
    setChores(newChores);
  };

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
      { "@type": "ListItem", position: 2, name: "Chore Chart", item: "https://printablepolly.com/chore-chart" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Chore Chart Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable weekly chore chart for kids. Customize chore names and number of tasks, then print or download as PDF.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Child&apos;s Name</label>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              placeholder="Enter name"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Chores</label>
            <select value={numChores} onChange={(e) => setNumChores(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="4">4 chores</option>
              <option value="6">6 chores</option>
              <option value="8">8 chores</option>
              <option value="10">10 chores</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={includeReward} onChange={(e) => setIncludeReward(e.target.checked)} className="rounded border-gray-300" />
              Include Reward Row
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chore Names</label>
            <div className="space-y-1">
              {Array.from({ length: numChores }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Chore ${i + 1}`}
                  value={chores[i] || ""}
                  onChange={(e) => updateChore(i, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              ))}
            </div>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="chore-chart" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">
              {childName ? `${childName}'s Chore Chart` : "Weekly Chore Chart"}
            </h2>
            <p className="text-center text-sm text-gray-500 mb-4">Week of: _______________</p>

            <table className="w-full border-collapse border border-gray-300 text-sm">
              <thead>
                <tr>
                  <th className="border border-gray-300 p-2 bg-gray-50 text-left" style={{ width: "22%" }}>Chore</th>
                  {days.map((day) => (
                    <th key={day} className="border border-gray-300 p-2 bg-gray-50 text-center" style={{ width: `${78 / 7}%` }}>
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: numChores }).map((_, i) => (
                  <tr key={i}>
                    <td className="border border-gray-300 p-2 font-medium">
                      {chores[i] || `Chore ${i + 1}`}
                    </td>
                    {days.map((day) => (
                      <td key={day} className="border border-gray-300 p-2 text-center" style={{ height: "36px" }}>
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-sm mx-auto" />
                      </td>
                    ))}
                  </tr>
                ))}
                {includeReward && (
                  <tr>
                    <td className="border border-gray-300 p-2 font-bold bg-emerald-50 text-emerald-700" colSpan={8}>
                      <div className="flex items-center justify-between">
                        <span>Weekly Reward:</span>
                        <span className="font-normal text-gray-400 flex-1 border-b border-gray-300 ml-3 mr-2" style={{ height: "1em" }} />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
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
