"use client";

import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "How often should I deep clean each room?", answer: "Most rooms benefit from a weekly light clean and a monthly deep clean. Kitchens and bathrooms see the most use and should be wiped down daily with a thorough scrub weekly. Bedrooms and living areas can be vacuumed weekly with a deep clean every 2-4 weeks." },
  { question: "What is the best way to use a cleaning schedule?", answer: "Print the schedule and post it where everyone can see it — on the fridge or a bulletin board. Check off tasks as you complete them each day. Spreading tasks across the week prevents marathon cleaning sessions and keeps your home consistently tidy." },
  { question: "How do I get my family to follow the cleaning schedule?", answer: "Assign specific tasks to family members and rotate weekly so no one gets stuck with the same chore. Make it visible, keep it simple, and celebrate consistency. Kids can handle age-appropriate tasks like making beds, wiping counters, or sorting laundry." },
];

const defaultRooms = [
  "Kitchen",
  "Bathrooms",
  "Bedrooms",
  "Living Room",
  "Laundry",
  "Floors",
  "Outdoor",
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CleaningScheduleClient() {
  const [rooms, setRooms] = useState(defaultRooms);
  const [tasksPerRoom, setTasksPerRoom] = useState(4);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const updateRoom = (index: number, value: string) => {
    const newRooms = [...rooms];
    newRooms[index] = value;
    setRooms(newRooms);
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
      { "@type": "ListItem", position: 2, name: "Cleaning Schedule", item: "https://printablepolly.com/cleaning-schedule" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Cleaning Schedule Generator</h1>
      <p className="text-gray-600 mb-6">Create a printable weekly cleaning checklist organized by room. Customize room names and tasks per room, then print or download.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tasks Per Room</label>
            <select value={tasksPerRoom} onChange={(e) => setTasksPerRoom(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="3">3 tasks</option>
              <option value="4">4 tasks</option>
              <option value="5">5 tasks</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Room Names</label>
            <div className="space-y-1">
              {rooms.map((room, i) => (
                <input
                  key={i}
                  type="text"
                  value={room}
                  onChange={(e) => updateRoom(i, e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                />
              ))}
            </div>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="cleaning-schedule" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "24px" }}>
            <h2 className="text-xl font-bold text-center mb-1">Weekly Cleaning Schedule</h2>
            <p className="text-center text-sm text-gray-500 mb-4">Week of: ___________</p>

            <div className="space-y-3">
              {rooms.map((room, i) => (
                <div key={i} className="border border-gray-300 rounded">
                  <div className="bg-gray-100 px-3 py-1.5 border-b border-gray-300">
                    <h3 className="font-bold text-sm">{room}</h3>
                  </div>
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left px-3 py-1 font-medium text-gray-600 w-[40%]">Task</th>
                        {days.map((day) => (
                          <th key={day} className="px-1 py-1 font-medium text-gray-600 text-center w-[8.5%]">{day}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: tasksPerRoom }).map((_, j) => (
                        <tr key={j} className="border-b border-gray-100">
                          <td className="px-3 py-1.5">
                            <div className="border-b border-gray-200 h-4" />
                          </td>
                          {days.map((day) => (
                            <td key={day} className="px-1 py-1.5 text-center">
                              <div className="w-3.5 h-3.5 border border-gray-400 rounded-sm mx-auto" />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
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
