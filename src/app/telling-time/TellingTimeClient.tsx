"use client";

import Link from "next/link";

import { useState, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

type Difficulty = "easy" | "medium" | "hard";
type ClocksPerPage = 6 | 9;

interface ClockTime {
  hours: number;
  minutes: number;
}

function generateTime(difficulty: Difficulty): ClockTime {
  const hours = Math.floor(Math.random() * 12) + 1;
  let minutes: number;
  switch (difficulty) {
    case "easy":
      minutes = 0;
      break;
    case "medium": {
      const options = [0, 15, 30, 45];
      minutes = options[Math.floor(Math.random() * options.length)];
      break;
    }
    case "hard":
      minutes = Math.floor(Math.random() * 12) * 5;
      break;
  }
  return { hours, minutes };
}

function formatTime(time: ClockTime): string {
  return `${time.hours}:${time.minutes.toString().padStart(2, "0")}`;
}

function ClockFace({ time, size }: { time: ClockTime; size: number }) {
  const center = size / 2;
  const radius = size / 2 - 8;

  // Calculate hand angles
  const minuteAngle = (time.minutes / 60) * 360 - 90;
  const hourAngle = ((time.hours % 12) / 12) * 360 + (time.minutes / 60) * 30 - 90;

  // Hand endpoints
  const minuteLength = radius * 0.75;
  const hourLength = radius * 0.5;

  const minuteX = center + minuteLength * Math.cos((minuteAngle * Math.PI) / 180);
  const minuteY = center + minuteLength * Math.sin((minuteAngle * Math.PI) / 180);

  const hourX = center + hourLength * Math.cos((hourAngle * Math.PI) / 180);
  const hourY = center + hourLength * Math.sin((hourAngle * Math.PI) / 180);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Clock face */}
      <circle cx={center} cy={center} r={radius} fill="white" stroke="#374151" strokeWidth="2" />

      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = ((i + 1) / 12) * 360 - 90;
        const numRadius = radius - 18;
        const x = center + numRadius * Math.cos((angle * Math.PI) / 180);
        const y = center + numRadius * Math.sin((angle * Math.PI) / 180);
        return (
          <text key={i} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="bold" fill="#374151">
            {i + 1}
          </text>
        );
      })}

      {/* Minute tick marks */}
      {Array.from({ length: 60 }, (_, i) => {
        const angle = (i / 60) * 360 - 90;
        const outerR = radius - 4;
        const innerR = i % 5 === 0 ? radius - 10 : radius - 7;
        const x1 = center + innerR * Math.cos((angle * Math.PI) / 180);
        const y1 = center + innerR * Math.sin((angle * Math.PI) / 180);
        const x2 = center + outerR * Math.cos((angle * Math.PI) / 180);
        const y2 = center + outerR * Math.sin((angle * Math.PI) / 180);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#6b7280" strokeWidth={i % 5 === 0 ? 1.5 : 0.5} />;
      })}

      {/* Hour hand */}
      <line x1={center} y1={center} x2={hourX} y2={hourY} stroke="#1f2937" strokeWidth="3" strokeLinecap="round" />

      {/* Minute hand */}
      <line x1={center} y1={center} x2={minuteX} y2={minuteY} stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />

      {/* Center dot */}
      <circle cx={center} cy={center} r="3" fill="#1f2937" />
    </svg>
  );
}

const faqs = [
  { question: "At what age should children learn to tell time?", answer: "Children typically learn to read hours on an analog clock around ages 5-6 (kindergarten), half and quarter hours by age 7 (1st-2nd grade), and minutes by age 8 (2nd-3rd grade). Start with the Easy difficulty for hours only and progress as they master each level." },
  { question: "Why is it important to learn analog clocks when digital is everywhere?", answer: "Analog clocks help children understand the passage of time visually, build number sense, and develop spatial reasoning. Many schools, public buildings, and standardized tests still use analog clocks. It also helps with fractions concepts (half past, quarter to)." },
  { question: "How should I use these clock worksheets?", answer: "Print a worksheet and have the child write the time below each clock face. Start with Easy (hours only) and ensure they get all correct before moving to Medium (half/quarter hours). Use the 'Generate New' button for fresh practice sheets each session. Aim for 5-10 minutes of daily practice." },
];

export default function TellingTimeClient() {
  const [difficulty, setDifficulty] = useState<Difficulty>("easy");
  const [clocksPerPage, setClocksPerPage] = useState<ClocksPerPage>(6);
  const [showAnswers, setShowAnswers] = useState(false);
  const [times, setTimes] = useState<ClockTime[]>(() =>
    Array.from({ length: 6 }, () => generateTime("easy"))
  );
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const { width, height } = getDimensions(orientation);

  const generateNew = useCallback(() => {
    setTimes(Array.from({ length: clocksPerPage }, () => generateTime(difficulty)));
  }, [difficulty, clocksPerPage]);

  const handleDifficultyChange = (diff: Difficulty) => {
    setDifficulty(diff);
    setTimes(Array.from({ length: clocksPerPage }, () => generateTime(diff)));
  };

  const handleClocksChange = (num: ClocksPerPage) => {
    setClocksPerPage(num);
    setTimes(Array.from({ length: num }, () => generateTime(difficulty)));
  };

  const cols = clocksPerPage === 9 ? 3 : 3;
  const clockSize = clocksPerPage === 9 ? 140 : 170;

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
      { "@type": "ListItem", position: 2, name: "Telling Time", item: "https://printablepolly.com/telling-time" },
    ],
  };

  const diffLabel = difficulty === "easy" ? "Hours Only" : difficulty === "medium" ? "Half & Quarter Hours" : "5-Minute Increments";

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Telling Time Worksheets</h1>
      <p className="text-gray-600 mb-6">Generate printable clock worksheets for learning to tell time. Random clock faces with hands showing different times — students write the time below each clock.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
            <select value={difficulty} onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="easy">Easy (hours only)</option>
              <option value="medium">Medium (half & quarter hours)</option>
              <option value="hard">Hard (5-minute increments)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Clocks Per Page</label>
            <select value={clocksPerPage} onChange={(e) => handleClocksChange(parseInt(e.target.value) as ClocksPerPage)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="6">6 clocks</option>
              <option value="9">9 clocks</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showAnswers} onChange={(e) => setShowAnswers(e.target.checked)} className="rounded" />
              Show Answer Key
            </label>
          </div>
          <button
            onClick={generateNew}
            className="w-full bg-amber-500 text-white font-medium py-2 px-4 rounded hover:bg-amber-600 transition-colors"
          >
            Generate New
          </button>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="telling-time" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "32px" }}>
            <h2 className="text-xl font-bold text-center mb-1">What Time Is It?</h2>
            <p className="text-center text-sm text-gray-500 mb-1">{diffLabel}</p>
            <p className="text-center text-sm text-gray-400 mb-6">Name: ___________________________ Date: _______________</p>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "24px", justifyItems: "center" }}>
              {times.map((time, i) => (
                <div key={i} className="flex flex-col items-center">
                  <ClockFace time={time} size={clockSize} />
                  <div className="mt-2 text-center">
                    <span className="text-xs text-gray-400">{i + 1}.</span>
                    <div className="border-b border-gray-400 w-24 mt-1 h-5" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showAnswers && (
            <div className="printable-area bg-white border border-gray-200 shadow-sm mt-6" style={{ width: `${width}px`, minHeight: "200px", padding: "32px", breakBefore: "page" }}>
              <h2 className="text-xl font-bold text-center mb-4">Answer Key</h2>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: "8px 16px", fontSize: "14px" }}>
                {times.map((time, i) => (
                  <span key={i} className="text-gray-600 font-mono">
                    {i + 1}. {formatTime(time)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/math-worksheets" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">➕</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Math Worksheets</h3>
          </Link>
          <Link href="/number-line" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Number Line</h3>
          </Link>
          <Link href="/place-value" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔢</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Place Value</h3>
          </Link>
          <Link href="/daily-schedule" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">⏰</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Daily Schedule</h3>
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
