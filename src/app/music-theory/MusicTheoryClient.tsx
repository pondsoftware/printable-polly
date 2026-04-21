"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation } from "@/components/PrintControls";

const noteValues = [
  { name: "Whole Note", beats: "4 beats", symbol: "𝅝", rest: "𝄻" },
  { name: "Half Note", beats: "2 beats", symbol: "𝅗𝅥", rest: "𝄼" },
  { name: "Quarter Note", beats: "1 beat", symbol: "♩", rest: "𝄽" },
  { name: "Eighth Note", beats: "1/2 beat", symbol: "♪", rest: "𝄾" },
  { name: "Sixteenth Note", beats: "1/4 beat", symbol: "𝅘𝅥𝅯", rest: "𝄿" },
];

const timeSignatures = [
  { sig: "4/4", name: "Common Time", desc: "4 quarter-note beats per measure. Most popular time signature in Western music." },
  { sig: "3/4", name: "Waltz Time", desc: "3 quarter-note beats per measure. Used in waltzes, minuets, and many ballads." },
  { sig: "2/4", name: "March Time", desc: "2 quarter-note beats per measure. Common in marches and polkas." },
  { sig: "6/8", name: "Compound Duple", desc: "6 eighth-note beats grouped in 2 sets of 3. Gives a lilting, rolling feel." },
  { sig: "2/2", name: "Cut Time", desc: "2 half-note beats per measure. Feels faster; common in marches and fast pieces." },
];

const keySignatures = [
  { key: "C / Am", sharps: 0, flats: 0, accidentals: "None" },
  { key: "G / Em", sharps: 1, flats: 0, accidentals: "F#" },
  { key: "D / Bm", sharps: 2, flats: 0, accidentals: "F#, C#" },
  { key: "A / F#m", sharps: 3, flats: 0, accidentals: "F#, C#, G#" },
  { key: "E / C#m", sharps: 4, flats: 0, accidentals: "F#, C#, G#, D#" },
  { key: "B / G#m", sharps: 5, flats: 0, accidentals: "F#, C#, G#, D#, A#" },
  { key: "F# / D#m", sharps: 6, flats: 0, accidentals: "F#, C#, G#, D#, A#, E#" },
  { key: "F / Dm", sharps: 0, flats: 1, accidentals: "Bb" },
  { key: "Bb / Gm", sharps: 0, flats: 2, accidentals: "Bb, Eb" },
  { key: "Eb / Cm", sharps: 0, flats: 3, accidentals: "Bb, Eb, Ab" },
  { key: "Ab / Fm", sharps: 0, flats: 4, accidentals: "Bb, Eb, Ab, Db" },
  { key: "Db / Bbm", sharps: 0, flats: 5, accidentals: "Bb, Eb, Ab, Db, Gb" },
  { key: "Gb / Ebm", sharps: 0, flats: 6, accidentals: "Bb, Eb, Ab, Db, Gb, Cb" },
];

const intervals = [
  { name: "Unison", halfSteps: 0, example: "C to C" },
  { name: "Minor 2nd", halfSteps: 1, example: "C to Db" },
  { name: "Major 2nd", halfSteps: 2, example: "C to D" },
  { name: "Minor 3rd", halfSteps: 3, example: "C to Eb" },
  { name: "Major 3rd", halfSteps: 4, example: "C to E" },
  { name: "Perfect 4th", halfSteps: 5, example: "C to F" },
  { name: "Tritone", halfSteps: 6, example: "C to F#" },
  { name: "Perfect 5th", halfSteps: 7, example: "C to G" },
  { name: "Minor 6th", halfSteps: 8, example: "C to Ab" },
  { name: "Major 6th", halfSteps: 9, example: "C to A" },
  { name: "Minor 7th", halfSteps: 10, example: "C to Bb" },
  { name: "Major 7th", halfSteps: 11, example: "C to B" },
  { name: "Octave", halfSteps: 12, example: "C to C" },
];

const dynamics = [
  { symbol: "ppp", name: "Pianississimo", desc: "As soft as possible" },
  { symbol: "pp", name: "Pianissimo", desc: "Very soft" },
  { symbol: "p", name: "Piano", desc: "Soft" },
  { symbol: "mp", name: "Mezzo Piano", desc: "Moderately soft" },
  { symbol: "mf", name: "Mezzo Forte", desc: "Moderately loud" },
  { symbol: "f", name: "Forte", desc: "Loud" },
  { symbol: "ff", name: "Fortissimo", desc: "Very loud" },
  { symbol: "fff", name: "Fortississimo", desc: "As loud as possible" },
];

const tempoMarkings = [
  { name: "Grave", bpm: "20-40", desc: "Very slow, solemn" },
  { name: "Largo", bpm: "40-60", desc: "Slow and broad" },
  { name: "Adagio", bpm: "60-76", desc: "Slow, at ease" },
  { name: "Andante", bpm: "76-108", desc: "Walking pace" },
  { name: "Moderato", bpm: "108-120", desc: "Moderate speed" },
  { name: "Allegro", bpm: "120-156", desc: "Fast, lively" },
  { name: "Vivace", bpm: "156-176", desc: "Very fast, vivacious" },
  { name: "Presto", bpm: "176-200", desc: "Very fast" },
  { name: "Prestissimo", bpm: "200+", desc: "As fast as possible" },
];

// Circle of Fifths SVG component
function CircleOfFifths() {
  const keys = [
    { major: "C", minor: "Am", pos: 0 },
    { major: "G", minor: "Em", pos: 1 },
    { major: "D", minor: "Bm", pos: 2 },
    { major: "A", minor: "F#m", pos: 3 },
    { major: "E", minor: "C#m", pos: 4 },
    { major: "B", minor: "G#m", pos: 5 },
    { major: "F#/Gb", minor: "D#m/Ebm", pos: 6 },
    { major: "Db", minor: "Bbm", pos: 7 },
    { major: "Ab", minor: "Fm", pos: 8 },
    { major: "Eb", minor: "Cm", pos: 9 },
    { major: "Bb", minor: "Gm", pos: 10 },
    { major: "F", minor: "Dm", pos: 11 },
  ];

  const cx = 140;
  const cy = 140;
  const outerR = 120;
  const innerR = 85;

  return (
    <svg width={280} height={280} viewBox="0 0 280 280" className="block mx-auto">
      {/* Outer circle */}
      <circle cx={cx} cy={cy} r={outerR} fill="none" stroke="#d1d5db" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={innerR} fill="none" stroke="#d1d5db" strokeWidth={1} />

      {/* Key labels */}
      {keys.map((k) => {
        const angle = (k.pos * 30 - 90) * (Math.PI / 180);
        const majorX = cx + Math.cos(angle) * (outerR - 16);
        const majorY = cy + Math.sin(angle) * (outerR - 16);
        const minorX = cx + Math.cos(angle) * (innerR - 16);
        const minorY = cy + Math.sin(angle) * (innerR - 16);

        return (
          <g key={k.major}>
            <text x={majorX} y={majorY} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="bold" fill="#065f46">
              {k.major}
            </text>
            <text x={minorX} y={minorY} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="#6b7280">
              {k.minor}
            </text>
          </g>
        );
      })}

      {/* Center labels */}
      <text x={cx} y={cy - 8} textAnchor="middle" fontSize="8" fill="#065f46" fontWeight="bold">Major</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontSize="8" fill="#6b7280">(minor)</text>
    </svg>
  );
}

const faqs = [
  { question: "What is the circle of fifths and why is it important?", answer: "The circle of fifths is a visual tool showing the relationship between all 12 major and minor keys. Moving clockwise adds one sharp; counterclockwise adds one flat. It helps with understanding key signatures, chord progressions, and modulation between keys." },
  { question: "What are the most common time signatures in music?", answer: "4/4 (common time) is by far the most used, appearing in pop, rock, jazz, and classical music. 3/4 (waltz time) is second most common. 6/8 is popular in folk, ballads, and compound-meter pieces. 2/4 appears in marches and some Latin styles." },
  { question: "How do I memorize key signatures?", answer: "Use mnemonics: for sharps order (F-C-G-D-A-E-B) try 'Father Charles Goes Down And Ends Battle.' For flats (B-E-A-D-G-C-F) reverse it: 'Battle Ends And Down Goes Charles Father.' The circle of fifths also shows keys visually in order." },
];

export default function MusicTheoryClient() {
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
      { "@type": "ListItem", position: 2, name: "Music Theory", item: "https://printablepolly.com/music-theory" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Music Theory Cheat Sheet</h1>
      <p className="text-gray-600 mb-6">A comprehensive reference covering note values, time signatures, key signatures, intervals, dynamics, and tempo markings. Print for quick reference during study or practice.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="music-theory" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm p-6">
            {/* Note Values */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Note Values &amp; Rests</h2>
              <div className="grid grid-cols-5 gap-2">
                {noteValues.map((note) => (
                  <div key={note.name} className="text-center border border-gray-100 rounded p-2 bg-gray-50">
                    <div className="text-2xl mb-1">{note.symbol}</div>
                    <div className="text-xs font-bold text-gray-800">{note.name}</div>
                    <div className="text-xs text-gray-500">{note.beats}</div>
                    <div className="text-lg text-gray-400 mt-1">{note.rest}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Time Signatures */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Time Signatures</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {timeSignatures.map((ts) => (
                  <div key={ts.sig} className="flex items-start gap-3 border border-gray-100 rounded p-2 bg-gray-50">
                    <div className="text-2xl font-bold text-emerald-700 leading-none w-10 text-center">
                      <div className="text-base">{ts.sig.split("/")[0]}</div>
                      <div className="border-t border-emerald-700 text-base">{ts.sig.split("/")[1]}</div>
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-800">{ts.name}</div>
                      <div className="text-xs text-gray-500">{ts.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Key Signatures + Circle of Fifths */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Key Signatures</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-2">Circle of Fifths</h3>
                  <CircleOfFifths />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-700 mb-2">All Keys</h3>
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-emerald-50">
                        <th className="text-left p-1 border border-gray-200">Key (Maj/Min)</th>
                        <th className="text-center p-1 border border-gray-200">#/b</th>
                        <th className="text-left p-1 border border-gray-200">Accidentals</th>
                      </tr>
                    </thead>
                    <tbody>
                      {keySignatures.map((ks) => (
                        <tr key={ks.key} className="hover:bg-gray-50">
                          <td className="p-1 border border-gray-200 font-medium">{ks.key}</td>
                          <td className="p-1 border border-gray-200 text-center">
                            {ks.sharps > 0 ? `${ks.sharps}#` : ks.flats > 0 ? `${ks.flats}b` : "-"}
                          </td>
                          <td className="p-1 border border-gray-200 text-gray-600">{ks.accidentals}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Intervals */}
            <section className="mb-6">
              <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Intervals</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
                {intervals.map((int) => (
                  <div key={int.name} className="flex items-center justify-between border border-gray-100 rounded px-2 py-1 bg-gray-50 text-xs">
                    <span className="font-medium text-gray-800">{int.name}</span>
                    <span className="text-emerald-700 font-bold">{int.halfSteps}H</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-1">H = half steps (semitones) from root note</p>
            </section>

            {/* Dynamics & Tempo in two columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Dynamics */}
              <section>
                <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Dynamic Markings</h2>
                <div className="space-y-1">
                  {dynamics.map((d) => (
                    <div key={d.symbol} className="flex items-center gap-3 text-xs border border-gray-100 rounded px-2 py-1 bg-gray-50">
                      <span className="font-bold text-emerald-700 w-8 text-center italic text-sm">{d.symbol}</span>
                      <span className="font-medium text-gray-800 w-28">{d.name}</span>
                      <span className="text-gray-500">{d.desc}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Tempo */}
              <section>
                <h2 className="text-lg font-bold text-emerald-700 mb-3 border-b border-emerald-200 pb-1">Tempo Markings</h2>
                <div className="space-y-1">
                  {tempoMarkings.map((t) => (
                    <div key={t.name} className="flex items-center gap-3 text-xs border border-gray-100 rounded px-2 py-1 bg-gray-50">
                      <span className="font-bold text-emerald-700 w-24 italic">{t.name}</span>
                      <span className="font-medium text-gray-800 w-16">{t.bpm} BPM</span>
                      <span className="text-gray-500">{t.desc}</span>
                    </div>
                  ))}
                </div>
              </section>
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
          <Link href="/piano-scales" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🎹</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Piano Scales</h3>
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
