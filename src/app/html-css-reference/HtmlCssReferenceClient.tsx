"use client";

import Link from "next/link";
import { useState } from "react";
import PrintControls, { Orientation, getDimensions } from "@/components/PrintControls";

interface TagEntry {
  tag: string;
  description: string;
}

interface CssEntry {
  property: string;
  values: string;
}

const htmlSections: { title: string; tags: TagEntry[] }[] = [
  {
    title: "Text & Headings",
    tags: [
      { tag: "<h1>-<h6>", description: "Headings (largest to smallest)" },
      { tag: "<p>", description: "Paragraph" },
      { tag: "<strong>", description: "Bold / important text" },
      { tag: "<em>", description: "Italic / emphasized text" },
      { tag: "<br>", description: "Line break" },
      { tag: "<hr>", description: "Horizontal rule" },
      { tag: "<blockquote>", description: "Block quotation" },
      { tag: "<code>", description: "Inline code" },
      { tag: "<pre>", description: "Preformatted text" },
    ],
  },
  {
    title: "Lists & Links",
    tags: [
      { tag: "<ul>", description: "Unordered list" },
      { tag: "<ol>", description: "Ordered list" },
      { tag: "<li>", description: "List item" },
      { tag: "<a href=\"\">", description: "Hyperlink" },
      { tag: "<img src=\"\" alt=\"\">", description: "Image" },
    ],
  },
  {
    title: "Tables",
    tags: [
      { tag: "<table>", description: "Table container" },
      { tag: "<thead> / <tbody>", description: "Header / body groups" },
      { tag: "<tr>", description: "Table row" },
      { tag: "<th> / <td>", description: "Header cell / data cell" },
    ],
  },
  {
    title: "Forms",
    tags: [
      { tag: "<form>", description: "Form container" },
      { tag: "<input type=\"\">", description: "Input (text, email, password, ...)" },
      { tag: "<textarea>", description: "Multi-line text input" },
      { tag: "<select> / <option>", description: "Dropdown select" },
      { tag: "<button>", description: "Clickable button" },
      { tag: "<label>", description: "Label for input" },
    ],
  },
  {
    title: "Semantic Elements",
    tags: [
      { tag: "<header>", description: "Page/section header" },
      { tag: "<nav>", description: "Navigation links" },
      { tag: "<main>", description: "Main content" },
      { tag: "<section>", description: "Thematic section" },
      { tag: "<article>", description: "Self-contained content" },
      { tag: "<aside>", description: "Sidebar content" },
      { tag: "<footer>", description: "Page/section footer" },
    ],
  },
];

const cssSections: { title: string; entries: CssEntry[] }[] = [
  {
    title: "Selectors",
    entries: [
      { property: "element", values: "div, p, h1" },
      { property: ".class", values: ".card, .btn" },
      { property: "#id", values: "#header, #main" },
      { property: "parent child", values: "div p (descendant)" },
      { property: "parent > child", values: "ul > li (direct)" },
      { property: ":hover, :focus", values: "Pseudo-classes" },
      { property: "::before, ::after", values: "Pseudo-elements" },
    ],
  },
  {
    title: "Box Model",
    entries: [
      { property: "margin", values: "Outside spacing" },
      { property: "padding", values: "Inside spacing" },
      { property: "border", values: "1px solid #ccc" },
      { property: "width / height", values: "px, %, rem, vh/vw" },
      { property: "box-sizing", values: "border-box | content-box" },
    ],
  },
  {
    title: "Flexbox",
    entries: [
      { property: "display: flex", values: "Enable flex container" },
      { property: "flex-direction", values: "row | column" },
      { property: "justify-content", values: "center | space-between | flex-start" },
      { property: "align-items", values: "center | stretch | flex-start" },
      { property: "gap", values: "Spacing between items" },
      { property: "flex-wrap", values: "nowrap | wrap" },
      { property: "flex: 1", values: "Grow to fill space" },
    ],
  },
  {
    title: "Grid",
    entries: [
      { property: "display: grid", values: "Enable grid container" },
      { property: "grid-template-columns", values: "repeat(3, 1fr)" },
      { property: "grid-template-rows", values: "auto | fr | px" },
      { property: "grid-gap / gap", values: "Row and column gap" },
      { property: "grid-column", values: "span 2 | 1 / 3" },
      { property: "place-items", values: "center (align both axes)" },
    ],
  },
  {
    title: "Common Properties",
    entries: [
      { property: "color", values: "Text color" },
      { property: "background", values: "color | image | gradient" },
      { property: "font-size", values: "px | rem | em | %" },
      { property: "font-weight", values: "400 (normal) | 700 (bold)" },
      { property: "text-align", values: "left | center | right" },
      { property: "border-radius", values: "Rounded corners" },
      { property: "position", values: "relative | absolute | fixed | sticky" },
      { property: "z-index", values: "Stack order (higher = on top)" },
      { property: "overflow", values: "hidden | scroll | auto" },
      { property: "transition", values: "property duration easing" },
    ],
  },
];

const faqs = [
  { question: "What is the difference between div and semantic HTML elements?", answer: "A <div> is a generic container with no inherent meaning. Semantic elements like <header>, <nav>, <main>, and <article> describe their content's purpose. Using semantic HTML improves accessibility, SEO, and code readability." },
  { question: "When should I use Flexbox vs Grid in CSS?", answer: "Use Flexbox for one-dimensional layouts (row OR column) like navigation bars or card rows. Use Grid for two-dimensional layouts where you need control over both rows and columns simultaneously, like page layouts or complex card grids." },
  { question: "What units should I use for font sizes and spacing?", answer: "Use rem for font sizes (scales with user preferences), px for borders and small fixed elements, and em or rem for padding/margin. Use vh/vw for viewport-relative sizing. Avoid px for font sizes as it ignores user accessibility settings." },
];

export default function HtmlCssReferenceClient() {
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
      { "@type": "ListItem", position: 2, name: "HTML & CSS Reference", item: "https://printablepolly.com/html-css-reference" },
    ],
  };

  return (
    <div className={`max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8 ${orientation === "landscape" ? "print-landscape" : "print-portrait"}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <h1 className="text-3xl font-bold text-emerald-700 mb-2">HTML & CSS Quick Reference</h1>
      <p className="text-gray-600 mb-6">A printable HTML and CSS reference covering common tags, selectors, box model, flexbox, grid, and essential properties. Compact and desk-friendly.</p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="controls-panel lg:w-64 shrink-0 space-y-4 bg-white p-4 rounded-lg border border-gray-200">
          <PrintControls orientation={orientation} onOrientationChange={setOrientation} filename="html-css-reference" />
        </div>

        <div className="flex-1 overflow-auto">
          <div className="printable-area bg-white border border-gray-200 shadow-sm" style={{ width: `${width}px`, minHeight: `${height}px`, padding: "24px" }}>
            <div className="text-center mb-4">
              <h2 className="text-lg font-bold text-gray-900">HTML & CSS Quick Reference</h2>
              <p className="text-xs text-gray-500 mt-0.5">printablepolly.com</p>
            </div>

            {/* HTML Section */}
            <div className="mb-4">
              <h3 className="text-xs font-bold text-white bg-emerald-600 px-2 py-1 rounded-sm mb-2 inline-block">HTML</h3>
              <div className="grid grid-cols-3 gap-3">
                {htmlSections.map((section) => (
                  <div key={section.title}>
                    <h4 className="text-[10px] font-bold text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1">{section.title}</h4>
                    <div className="space-y-0.5">
                      {section.tags.map((entry) => (
                        <div key={entry.tag} className="flex items-start gap-1">
                          <code className="text-[9px] font-mono text-emerald-800 whitespace-nowrap">{entry.tag}</code>
                          <span className="text-[9px] text-gray-500 leading-tight">{entry.description}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CSS Section */}
            <div>
              <h3 className="text-xs font-bold text-white bg-emerald-600 px-2 py-1 rounded-sm mb-2 inline-block">CSS</h3>
              <div className="grid grid-cols-3 gap-3">
                {cssSections.map((section) => (
                  <div key={section.title} className={section.title === "Common Properties" ? "col-span-2" : ""}>
                    <h4 className="text-[10px] font-bold text-emerald-700 border-b border-emerald-100 pb-0.5 mb-1">{section.title}</h4>
                    <div className={`space-y-0.5 ${section.title === "Common Properties" ? "grid grid-cols-2 gap-x-3 gap-y-0.5 space-y-0" : ""}`}>
                      {section.entries.map((entry) => (
                        <div key={entry.property} className="flex items-start gap-1">
                          <code className="text-[9px] font-mono text-emerald-800 whitespace-nowrap">{entry.property}</code>
                          <span className="text-[9px] text-gray-500 leading-tight">{entry.values}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Related Templates</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/git-cheat-sheet" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔀</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Git Cheat Sheet</h3>
          </Link>
          <Link href="/regex-cheat-sheet" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">🔍</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Regex Cheat Sheet</h3>
          </Link>
          <Link href="/keyboard-shortcuts" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">⌨️</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Keyboard Shortcuts</h3>
          </Link>
          <Link href="/math-formulas" className="block p-3 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all">
            <span className="text-2xl">📊</span>
            <h3 className="font-medium text-gray-900 text-sm mt-1">Math Formulas</h3>
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
