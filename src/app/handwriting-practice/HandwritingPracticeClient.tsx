"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

const faqs = [
  { question: "What line style is best for handwriting practice?", answer: "Dashed midlines help beginners learn letter proportions. Solid lines are better for intermediate writers who already know letter sizing." },
  { question: "What letter size should I use for children?", answer: "Start with large (1 inch) lines for kindergarteners learning to write. As fine motor skills develop, move to medium (3/4 inch) and then standard (1/2 inch) lines." },
  { question: "Should I include guide lines?", answer: "Yes! Guide lines (dashed midlines and descender lines) help children and adults form letters with consistent sizing and spacing." },
  { question: "How do traceable letters help with handwriting?", answer: "Traceable letters give learners a guide to follow, building muscle memory for proper letter formation. Start with tracing, then progress to copying, and finally writing from memory." },
  { question: "What's the difference between print and cursive practice?", answer: "Print (manuscript) uses separate, disconnected letters and is typically taught first. Cursive uses flowing, connected letters and is usually introduced in 2nd-3rd grade." },
];

type FontStyle = "print" | "cursive";
type TextSource = "custom" | "alphabet" | "sentences" | "pangrams" | "quotes" | "aesop" | "nursery";

const TEXT_PRESETS: Record<TextSource, { label: string; text: string }> = {
  custom: { label: "Custom Text", text: "" },
  alphabet: {
    label: "Alphabet (A-Z)",
    text: "Aa Bb Cc Dd Ee Ff Gg Hh Ii Jj Kk Ll Mm Nn Oo Pp Qq Rr Ss Tt Uu Vv Ww Xx Yy Zz",
  },
  sentences: {
    label: "Simple Sentences",
    text: "The cat sat on the mat. A dog ran in the park. I like to read books. She has a red hat. We went to the store. He can ride a bike. The sun is very hot. My fish swims in a bowl. Birds fly in the sky. I love my family.",
  },
  pangrams: {
    label: "Pangrams (Every Letter)",
    text: "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump. The five boxing wizards jump quickly. Jackdaws love my big sphinx of quartz.",
  },
  quotes: {
    label: "Famous Quotes",
    text: "Be the change you wish to see in the world. The only thing we have to fear is fear itself. In the middle of difficulty lies opportunity. A journey of a thousand miles begins with a single step. To be or not to be, that is the question. I think, therefore I am. The pen is mightier than the sword. Knowledge is power.",
  },
  aesop: {
    label: "Aesop's Fables",
    text: "A thirsty crow found a pitcher with water at the bottom. He could not reach it. He picked up small stones and dropped them in one by one. The water rose higher and higher. At last he could drink. Necessity is the mother of invention. A tortoise and a hare had a race. The hare ran fast then took a nap. The tortoise kept going slow and steady. The tortoise won the race. Slow and steady wins the race.",
  },
  nursery: {
    label: "Nursery Rhymes",
    text: "Twinkle twinkle little star, how I wonder what you are. Up above the world so high, like a diamond in the sky. Mary had a little lamb, its fleece was white as snow. And everywhere that Mary went, the lamb was sure to go. Jack and Jill went up the hill to fetch a pail of water. Jack fell down and broke his crown and Jill came tumbling after.",
  },
};

// Google Fonts URLs for print and cursive handwriting styles
const PRINT_FONT_URL = "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap";
const CURSIVE_FONT_URL = "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap";

const PRINT_FONT_FAMILY = "Patrick Hand";
const CURSIVE_FONT_FAMILY = "Dancing Script";

export default function HandwritingPracticeClient() {
  const [lineHeight, setLineHeight] = useState(72);
  const [lineStyle, setLineStyle] = useState<"solid" | "dashed">("dashed");
  const [showGuideLines, setShowGuideLines] = useState(true);
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [fontStyle, setFontStyle] = useState<FontStyle>("print");
  const [textSource, setTextSource] = useState<TextSource>("alphabet");
  const [customText, setCustomText] = useState("The quick brown fox jumps over the lazy dog.");
  const [traceOpacity, setTraceOpacity] = useState(0.25);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width, height } = getDimensions(orientation);

  // Load Google Fonts
  useEffect(() => {
    const loadFont = (url: string, family: string) => {
      return new Promise<void>((resolve) => {
        // Check if already loaded
        if (document.querySelector(`link[href="${url}"]`)) {
          resolve();
          return;
        }
        const link = document.createElement("link");
        link.href = url;
        link.rel = "stylesheet";
        document.head.appendChild(link);

        // Wait for font to be available
        const checkFont = () => {
          if (document.fonts.check(`16px "${family}"`)) {
            resolve();
          } else {
            requestAnimationFrame(checkFont);
          }
        };
        link.onload = () => {
          // Give it a moment then start checking
          setTimeout(checkFont, 100);
        };
        // Fallback timeout
        setTimeout(resolve, 3000);
      });
    };

    Promise.all([
      loadFont(PRINT_FONT_URL, PRINT_FONT_FAMILY),
      loadFont(CURSIVE_FONT_URL, CURSIVE_FONT_FAMILY),
    ]).then(() => setFontsLoaded(true));
  }, []);

  const getText = useCallback(() => {
    if (textSource === "custom") return customText;
    return TEXT_PRESETS[textSource].text;
  }, [textSource, customText]);

  // Word-wrap text to fit within a given pixel width
  const wrapText = useCallback(
    (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
      const words = text.split(/\s+/);
      const lines: string[] = [];
      let currentLine = "";

      for (const word of words) {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && currentLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);
      return lines;
    },
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = 2;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(dpr, dpr);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);

    const marginLeft = 60;
    const marginRight = width - 40;
    const startY = 60;
    const textAreaWidth = marginRight - marginLeft - 10;

    // Get text and set font for measurement
    const text = getText();
    const fontFamily = fontStyle === "cursive" ? CURSIVE_FONT_FAMILY : PRINT_FONT_FAMILY;
    const fontSize = Math.round(lineHeight * 0.7);
    ctx.font = `${fontSize}px "${fontFamily}", sans-serif`;

    // Wrap text into lines
    const textLines = text ? wrapText(ctx, text, textAreaWidth) : [];
    let textLineIndex = 0;

    // Calculate total line block height (line + descender area)
    const lineBlockHeight = showGuideLines ? lineHeight + lineHeight * 0.4 : lineHeight;

    for (let y = startY; y + lineHeight < height - 20; y += lineBlockHeight) {
      // Top line (solid)
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, y);
      ctx.lineTo(marginRight, y);
      ctx.stroke();

      if (showGuideLines) {
        // Midline (dashed or solid)
        ctx.strokeStyle = "#aaaaaa";
        ctx.lineWidth = 0.5;
        if (lineStyle === "dashed") {
          ctx.setLineDash([4, 4]);
        } else {
          ctx.setLineDash([]);
        }
        ctx.beginPath();
        ctx.moveTo(marginLeft, y + lineHeight / 2);
        ctx.lineTo(marginRight, y + lineHeight / 2);
        ctx.stroke();
      }

      // Bottom line (solid)
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.setLineDash([]);
      ctx.beginPath();
      ctx.moveTo(marginLeft, y + lineHeight);
      ctx.lineTo(marginRight, y + lineHeight);
      ctx.stroke();

      // Descender line
      if (showGuideLines) {
        ctx.strokeStyle = "#cccccc";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(marginLeft, y + lineHeight + lineHeight * 0.4);
        ctx.lineTo(marginRight, y + lineHeight + lineHeight * 0.4);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw traceable text on this line
      if (textLineIndex < textLines.length && text) {
        ctx.save();
        ctx.font = `${fontSize}px "${fontFamily}", sans-serif`;
        const alpha = Math.round(traceOpacity * 255)
          .toString(16)
          .padStart(2, "0");

        // Draw text as both stroke and fill for traceable look
        ctx.strokeStyle = `#888888${alpha}`;
        ctx.fillStyle = `#bbbbbb${alpha}`;
        ctx.lineWidth = 0.8;

        // Position text on the baseline (bottom line)
        const textY = y + lineHeight - fontSize * 0.15;
        const textX = marginLeft + 5;

        ctx.strokeText(textLines[textLineIndex], textX, textY);
        ctx.fillText(textLines[textLineIndex], textX, textY);

        ctx.restore();
        textLineIndex++;
      }
    }

    // Left margin line
    ctx.strokeStyle = "#ff9999";
    ctx.lineWidth = 1;
    ctx.setLineDash([]);
    ctx.beginPath();
    ctx.moveTo(marginLeft, 0);
    ctx.lineTo(marginLeft, height);
    ctx.stroke();
  }, [lineHeight, lineStyle, showGuideLines, orientation, width, height, fontStyle, textSource, customText, traceOpacity, fontsLoaded, getText, wrapText]);

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
      { "@type": "ListItem", position: 2, name: "Handwriting Practice", item: "https://printablepolly.com/handwriting-practice" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">Handwriting Practice Sheets</h1>
      <p className="text-gray-600 mb-6">Generate printable handwriting practice sheets with traceable text in print or cursive. Choose from preset texts or type your own.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-72 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Font Style</label>
            <select value={fontStyle} onChange={(e) => setFontStyle(e.target.value as FontStyle)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="print">Print (Manuscript)</option>
              <option value="cursive">Cursive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <select value={textSource} onChange={(e) => setTextSource(e.target.value as TextSource)} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              {Object.entries(TEXT_PRESETS).map(([key, { label }]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
          {textSource === "custom" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Text</label>
              <textarea
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                rows={3}
                placeholder="Type your text here..."
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trace Opacity ({Math.round(traceOpacity * 100)}%)</label>
            <input type="range" min="0.1" max="0.5" step="0.05" value={traceOpacity} onChange={(e) => setTraceOpacity(parseFloat(e.target.value))} className="w-full" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>Lighter</span>
              <span>Darker</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Line Height</label>
            <select value={lineHeight} onChange={(e) => setLineHeight(parseInt(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="96">Large (1 inch)</option>
              <option value="72">Medium (3/4 inch)</option>
              <option value="48">Standard (1/2 inch)</option>
              <option value="36">Small (3/8 inch)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Midline Style</label>
            <select value={lineStyle} onChange={(e) => setLineStyle(e.target.value as "solid" | "dashed")} className="w-full border border-gray-300 rounded px-3 py-2 text-sm">
              <option value="dashed">Dashed</option>
              <option value="solid">Solid</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input type="checkbox" checked={showGuideLines} onChange={(e) => setShowGuideLines(e.target.checked)} className="rounded" />
              Show Guide Lines
            </label>
          </div>
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="handwriting-practice" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm inline-block">
            <canvas ref={canvasRef} />
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
