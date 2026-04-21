"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation } from "@/components/PrintControls";

type ScaleInfo = {
  name: string;
  notes: string[];
  fingers?: string;
  highlighted: number[]; // indices of keys to highlight (0-based, white keys 0-6 mapped to octave)
};

// Note positions on a piano octave (0-11 semitones from C)
const NOTE_POSITIONS: Record<string, number> = {
  "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3,
  "E": 4, "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8,
  "Ab": 8, "A": 9, "A#": 10, "Bb": 10, "B": 11,
};

const majorScales: ScaleInfo[] = [
  { name: "C Major", notes: ["C", "D", "E", "F", "G", "A", "B"], fingers: "1-2-3-1-2-3-4-5", highlighted: [0, 2, 4, 5, 7, 9, 11] },
  { name: "D Major", notes: ["D", "E", "F#", "G", "A", "B", "C#"], fingers: "1-2-3-1-2-3-4-5", highlighted: [2, 4, 6, 7, 9, 11, 1] },
  { name: "E Major", notes: ["E", "F#", "G#", "A", "B", "C#", "D#"], fingers: "1-2-3-1-2-3-4-5", highlighted: [4, 6, 8, 9, 11, 1, 3] },
  { name: "F Major", notes: ["F", "G", "A", "Bb", "C", "D", "E"], fingers: "1-2-3-4-1-2-3-4", highlighted: [5, 7, 9, 10, 0, 2, 4] },
  { name: "G Major", notes: ["G", "A", "B", "C", "D", "E", "F#"], fingers: "1-2-3-1-2-3-4-5", highlighted: [7, 9, 11, 0, 2, 4, 6] },
  { name: "A Major", notes: ["A", "B", "C#", "D", "E", "F#", "G#"], fingers: "1-2-3-1-2-3-4-5", highlighted: [9, 11, 1, 2, 4, 6, 8] },
  { name: "B Major", notes: ["B", "C#", "D#", "E", "F#", "G#", "A#"], fingers: "1-2-3-1-2-3-4-5", highlighted: [11, 1, 3, 4, 6, 8, 10] },
];

const minorScales: ScaleInfo[] = [
  { name: "A Minor", notes: ["A", "B", "C", "D", "E", "F", "G"], fingers: "1-2-3-1-2-3-4-5", highlighted: [9, 11, 0, 2, 4, 5, 7] },
  { name: "B Minor", notes: ["B", "C#", "D", "E", "F#", "G", "A"], fingers: "1-2-3-1-2-3-4-5", highlighted: [11, 1, 2, 4, 6, 7, 9] },
  { name: "C# Minor", notes: ["C#", "D#", "E", "F#", "G#", "A", "B"], fingers: "2-3-1-2-3-1-2-3", highlighted: [1, 3, 4, 6, 8, 9, 11] },
  { name: "D Minor", notes: ["D", "E", "F", "G", "A", "Bb", "C"], fingers: "1-2-3-1-2-3-4-5", highlighted: [2, 4, 5, 7, 9, 10, 0] },
  { name: "E Minor", notes: ["E", "F#", "G", "A", "B", "C", "D"], fingers: "1-2-3-1-2-3-4-5", highlighted: [4, 6, 7, 9, 11, 0, 2] },
  { name: "F# Minor", notes: ["F#", "G#", "A", "B", "C#", "D", "E"], fingers: "2-3-1-2-3-1-2-3", highlighted: [6, 8, 9, 11, 1, 2, 4] },
  { name: "G Minor", notes: ["G", "A", "Bb", "C", "D", "Eb", "F"], fingers: "1-2-3-1-2-3-4-5", highlighted: [7, 9, 10, 0, 2, 3, 5] },
];

const pentatonicAndBlues: ScaleInfo[] = [
  { name: "C Major Pentatonic", notes: ["C", "D", "E", "G", "A"], fingers: "1-2-3-1-2", highlighted: [0, 2, 4, 7, 9] },
  { name: "A Minor Pentatonic", notes: ["A", "C", "D", "E", "G"], fingers: "1-2-1-2-3", highlighted: [9, 0, 2, 4, 7] },
  { name: "C Blues Scale", notes: ["C", "Eb", "F", "Gb", "G", "Bb"], fingers: "1-2-3-1-2-3", highlighted: [0, 3, 5, 6, 7, 10] },
  { name: "A Blues Scale", notes: ["A", "C", "D", "Eb", "E", "G"], fingers: "1-2-3-1-2-3", highlighted: [9, 0, 2, 3, 4, 7] },
];

function PianoKeyboard({ highlighted, notes }: { highlighted: number[]; notes: string[] }) {
  const whiteKeyWidth = 22;
  const blackKeyWidth = 14;
  const whiteKeyHeight = 60;
  const blackKeyHeight = 38;
  const totalWidth = whiteKeyWidth * 14 + 2; // Two octaves

  // White key semitone positions in each octave
  const whiteKeySemitones = [0, 2, 4, 5, 7, 9, 11];
  // Black key positions relative to white keys
  const blackKeyPositions = [0, 1, 3, 4, 5]; // after C, D, F, G, A
  const blackKeySemitones = [1, 3, 6, 8, 10];

  const highlightSet = new Set(highlighted);

  // Map semitone to note name for labeling
  const semitoneToNote: Record<number, string> = {};
  notes.forEach((note) => {
    const pos = NOTE_POSITIONS[note];
    if (pos !== undefined) semitoneToNote[pos] = note;
  });

  return (
    <svg width={totalWidth} height={whiteKeyHeight + 16} viewBox={`0 0 ${totalWidth} ${whiteKeyHeight + 16}`} className="block">
      {/* White keys - two octaves */}
      {Array.from({ length: 14 }).map((_, i) => {
        const octave = Math.floor(i / 7);
        const noteInOctave = i % 7;
        const semitone = whiteKeySemitones[noteInOctave];
        const isHighlighted = highlightSet.has(semitone);
        const x = i * whiteKeyWidth + 1;
        return (
          <g key={`w${i}`}>
            <rect
              x={x}
              y={0}
              width={whiteKeyWidth - 1}
              height={whiteKeyHeight}
              fill={isHighlighted ? "#a7f3d0" : "#ffffff"}
              stroke="#374151"
              strokeWidth={0.75}
              rx={1}
            />
            {isHighlighted && semitoneToNote[semitone] && octave === 0 && (
              <text x={x + whiteKeyWidth / 2 - 0.5} y={whiteKeyHeight - 5} textAnchor="middle" fontSize="8" fontWeight="bold" fill="#065f46">
                {semitoneToNote[semitone]}
              </text>
            )}
          </g>
        );
      })}

      {/* Black keys - two octaves */}
      {Array.from({ length: 2 }).map((_, octave) =>
        blackKeyPositions.map((pos, j) => {
          const semitone = blackKeySemitones[j];
          const isHighlighted = highlightSet.has(semitone);
          const whiteKeyIndex = octave * 7 + pos;
          const x = (whiteKeyIndex + 1) * whiteKeyWidth - blackKeyWidth / 2 + 1;
          return (
            <g key={`b${octave}-${j}`}>
              <rect
                x={x}
                y={0}
                width={blackKeyWidth}
                height={blackKeyHeight}
                fill={isHighlighted ? "#059669" : "#1f2937"}
                stroke="#111827"
                strokeWidth={0.5}
                rx={1}
              />
              {isHighlighted && semitoneToNote[semitone] && octave === 0 && (
                <text x={x + blackKeyWidth / 2} y={blackKeyHeight - 4} textAnchor="middle" fontSize="7" fontWeight="bold" fill="#ffffff">
                  {semitoneToNote[semitone]}
                </text>
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}

function ScaleCard({ scale }: { scale: ScaleInfo }) {
  return (
    <div className="border border-gray-200 rounded-lg p-3 bg-white">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold text-emerald-700">{scale.name}</h3>
        {scale.fingers && <span className="text-xs text-gray-500">Fingers: {scale.fingers}</span>}
      </div>
      <p className="text-xs text-gray-600 mb-2">{scale.notes.join(" - ")}</p>
      <PianoKeyboard highlighted={scale.highlighted} notes={scale.notes} />
    </div>
  );
}

const faqs = [
  { question: "What is the best order to learn piano scales?", answer: "Start with C Major (all white keys), then G and F Major (one sharp/flat each). Progress to D, Bb, A, and Eb. Learn relative minors alongside each major scale. This builds technique gradually while introducing sharps and flats one at a time." },
  { question: "What are the correct finger numbers for piano scales?", answer: "Piano fingers are numbered 1 (thumb) through 5 (pinky). Most major scales use the pattern 1-2-3-1-2-3-4-5 for the right hand ascending. The thumb tucks under after finger 3 to continue the scale smoothly. Left hand patterns are mirrored." },
  { question: "What is the difference between pentatonic and blues scales?", answer: "The pentatonic scale has 5 notes (removing the 4th and 7th from a major scale). The blues scale adds one chromatic 'blue note' to the minor pentatonic (flat 5th). Blues scales are essential for improvisation in jazz, blues, and rock." },
];

export default function PianoScalesClient() {
  const [section, setSection] = useState<"all" | "major" | "minor" | "penta">("all");
  const [orientation, setOrientation] = useState<Orientation>("portrait");

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
      { "@type": "ListItem", position: 2, name: "Piano Scales", item: "https://printablepolly.com/piano-scales" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Piano Scales Reference</h1>
      <p className="text-gray-600 mb-6">Visual keyboard diagrams for all major and minor scales, plus pentatonic and blues scales. Highlighted keys show which notes to play, with finger numbers for proper technique.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Show Scales</label>
            <select value={section} onChange={(e) => setSection(e.target.value as typeof section)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="all">All Scales</option>
              <option value="major">Major Scales Only</option>
              <option value="minor">Minor Scales Only</option>
              <option value="penta">Pentatonic &amp; Blues</option>
            </select>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="piano-scales" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm p-6">
            {/* Major Scales */}
            {(section === "all" || section === "major") && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Major Scales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {majorScales.map((scale) => (
                    <ScaleCard key={scale.name} scale={scale} />
                  ))}
                </div>
              </div>
            )}

            {/* Minor Scales */}
            {(section === "all" || section === "minor") && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Natural Minor Scales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {minorScales.map((scale) => (
                    <ScaleCard key={scale.name} scale={scale} />
                  ))}
                </div>
              </div>
            )}

            {/* Pentatonic & Blues */}
            {(section === "all" || section === "penta") && (
              <div className="mb-6">
                <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Pentatonic &amp; Blues Scales</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {pentatonicAndBlues.map((scale) => (
                    <ScaleCard key={scale.name} scale={scale} />
                  ))}
                </div>
              </div>
            )}

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <span className="inline-block w-4 h-4 bg-emerald-200 border border-gray-300 rounded-sm"></span>
                  <span>Highlighted white key (in scale)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="inline-block w-4 h-4 bg-emerald-600 border border-gray-700 rounded-sm"></span>
                  <span>Highlighted black key (in scale)</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-700 font-medium">1-5:</span>
                  <span>Thumb(1), Index(2), Middle(3), Ring(4), Pinky(5)</span>
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
          <Link href="/staff-paper" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎼</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Staff Paper</h3>
          </Link>
          <Link href="/guitar-chords" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎸</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Guitar Chords</h3>
          </Link>
          <Link href="/music-theory" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎵</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Music Theory</h3>
          </Link>
          <Link href="/flash-cards" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🃏</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Flash Cards</h3>
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
