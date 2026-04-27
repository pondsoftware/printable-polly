import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Paper Templates",
    templates: [
      { href: "/graph-paper", icon: "📐", title: "Graph Paper", desc: "Customizable grid paper with adjustable size and colors" },
      { href: "/lined-paper", icon: "📝", title: "Lined Paper", desc: "Ruled paper with college, wide, or narrow spacing" },
      { href: "/dot-grid", icon: "⊡", title: "Dot Grid Paper", desc: "Dot grid for bullet journals and sketching" },
      { href: "/isometric-paper", icon: "🔺", title: "Isometric Paper", desc: "Triangle grid for 3D drawing and design" },
      { href: "/cornell-notes", icon: "🎓", title: "Cornell Notes", desc: "Cornell note-taking template with cue column" },
      { href: "/staff-paper", icon: "🎵", title: "Staff Paper", desc: "Blank music manuscript paper with staves" },
      { href: "/hex-paper", icon: "⬡", title: "Hex Paper", desc: "Hexagonal grid for chemistry, RPGs, and design" },
    ],
  },
  {
    name: "Planning Templates",
    templates: [
      { href: "/weekly-planner", icon: "📅", title: "Weekly Planner", desc: "Plan your week with customizable layouts" },
      { href: "/monthly-calendar", icon: "🗓️", title: "Monthly Calendar", desc: "Printable calendar for any month and year" },
      { href: "/daily-schedule", icon: "⏰", title: "Daily Schedule", desc: "Time-blocked daily planner with intervals" },
      { href: "/habit-tracker", icon: "✅", title: "Habit Tracker", desc: "Track daily habits with a monthly grid" },
      { href: "/goal-setting", icon: "🎯", title: "Goal Setting", desc: "SMART goal worksheet for planning success" },
      { href: "/meal-planner", icon: "🍽️", title: "Meal Planner", desc: "Plan weekly meals for the whole family" },
    ],
  },
  {
    name: "Lists & Organization",
    templates: [
      { href: "/checklist", icon: "☑️", title: "Checklist", desc: "Blank checklist with customizable columns" },
      { href: "/todo-list", icon: "📋", title: "To-Do List", desc: "Priority-based to-do list template" },
      { href: "/grocery-list", icon: "🛒", title: "Grocery List", desc: "Shopping list organized by store section" },
      { href: "/budget-tracker", icon: "💰", title: "Budget Tracker", desc: "Track monthly income and expenses" },
      { href: "/chore-chart", icon: "⭐", title: "Chore Chart", desc: "Weekly chore chart with customizable tasks" },
      { href: "/cleaning-schedule", icon: "🧹", title: "Cleaning Schedule", desc: "Weekly cleaning checklist by room" },
    ],
  },
  {
    name: "Games & Activities",
    templates: [
      { href: "/word-search", icon: "🔍", title: "Word Search", desc: "Generate custom word search puzzles" },
      { href: "/bingo-cards", icon: "🎱", title: "Bingo Cards", desc: "Generate randomized bingo cards" },
    ],
  },
  {
    name: "Creative",
    templates: [
      { href: "/comic-strip", icon: "💬", title: "Comic Strip", desc: "Blank comic panels for drawing stories" },
      { href: "/storyboard", icon: "🎬", title: "Storyboard", desc: "Scene planning with drawing and notes areas" },
      { href: "/coloring-pages", icon: "🎨", title: "Coloring Pages", desc: "Geometric mandalas and patterns to color" },
      { href: "/lined-journal", icon: "📓", title: "Lined Journal", desc: "Journal pages with lines and drawing area" },
    ],
  },
  {
    name: "Educational",
    templates: [
      { href: "/handwriting-practice", icon: "✏️", title: "Handwriting Practice", desc: "Practice sheets with guide lines" },
      { href: "/multiplication-table", icon: "✖️", title: "Multiplication Table", desc: "Times tables — filled or blank for practice" },
      { href: "/number-line", icon: "📏", title: "Number Line", desc: "Customizable number lines for math" },
      { href: "/reading-log", icon: "📚", title: "Reading Log", desc: "Track books read with ratings and notes" },
      { href: "/math-worksheets", icon: "➕", title: "Math Worksheets", desc: "Random math problems — add, subtract, multiply, divide" },
      { href: "/fractions-worksheets", icon: "½", title: "Fractions Worksheets", desc: "Add, subtract, and simplify fractions" },
      { href: "/algebra-worksheets", icon: "𝑥", title: "Algebra Worksheets", desc: "Solve for x — one-step to multi-step equations" },
      { href: "/geometry-worksheets", icon: "△", title: "Geometry Worksheets", desc: "Perimeter, area, volume, and surface area" },
      { href: "/sight-words", icon: "👁️", title: "Sight Words", desc: "Practice high-frequency words by grade level" },
      { href: "/spelling-worksheets", icon: "📝", title: "Spelling Worksheets", desc: "Write-3-times, fill-in-the-blank, and word scramble" },
      { href: "/flash-cards", icon: "🃏", title: "Flash Cards", desc: "Printable flash cards for math, vocabulary, or custom" },
      { href: "/telling-time", icon: "🕐", title: "Telling Time", desc: "Clock face worksheets for learning to tell time" },
      { href: "/tracing-letters", icon: "🔤", title: "Tracing Letters", desc: "Dotted letter tracing for pre-K and kindergarten" },
      { href: "/place-value", icon: "🔢", title: "Place Value", desc: "Identify digit values, expanded form, compare numbers" },
    ],
  },
  {
    name: "Cheat Sheets — Education",
    templates: [
      { href: "/periodic-table", icon: "⚛", title: "Periodic Table", desc: "Complete periodic table of elements" },
      { href: "/math-formulas", icon: "∑", title: "Math Formulas", desc: "Algebra, geometry, trig & statistics formulas" },
      { href: "/grammar-rules", icon: "✏", title: "Grammar Rules", desc: "Parts of speech, punctuation & common mistakes" },
      { href: "/us-states", icon: "🗺", title: "US States & Capitals", desc: "All 50 states, capitals & abbreviations" },
      { href: "/unit-conversions", icon: "⇄", title: "Unit Conversions", desc: "Length, weight, volume & temperature conversions" },
    ],
  },
  {
    name: "Cheat Sheets — Cooking",
    templates: [
      { href: "/measurement-conversions", icon: "🥄", title: "Measurement Conversions", desc: "Kitchen measurements, cups, tbsp & metric" },
      { href: "/cooking-temperatures", icon: "🌡", title: "Cooking Temperatures", desc: "Safe meat temps, oven conversions & baking temps" },
      { href: "/spice-guide", icon: "🌿", title: "Spice & Herb Guide", desc: "Flavor profiles, pairings & spice blends" },
      { href: "/substitution-chart", icon: "🔄", title: "Substitution Chart", desc: "Common ingredient substitutions for cooking & baking" },
    ],
  },
  {
    name: "Cheat Sheets — Tech",
    templates: [
      { href: "/keyboard-shortcuts", icon: "⌨", title: "Keyboard Shortcuts", desc: "Essential shortcuts for Mac & Windows" },
      { href: "/git-cheat-sheet", icon: ">_", title: "Git Cheat Sheet", desc: "Common git commands & workflows" },
      { href: "/regex-cheat-sheet", icon: ".*", title: "Regex Cheat Sheet", desc: "Regular expression patterns & syntax" },
      { href: "/html-css-reference", icon: "</>", title: "HTML & CSS Reference", desc: "Tags, selectors, flexbox & grid" },
    ],
  },
  {
    name: "Cheat Sheets — Music",
    templates: [
      { href: "/guitar-chords", icon: "🎸", title: "Guitar Chord Chart", desc: "Essential open chords & barre chords" },
      { href: "/piano-scales", icon: "🎹", title: "Piano Scales", desc: "Major, minor, pentatonic & blues scales" },
      { href: "/music-theory", icon: "🎵", title: "Music Theory Basics", desc: "Notes, keys, intervals & dynamics" },
    ],
  },
];

const faqs = [
  {
    question: "Are Printable Polly templates really free?",
    answer: "Yes! All templates on Printable Polly are 100% free. There is no signup, no watermark, and no limit on how many templates you can print.",
  },
  {
    question: "How do I print a template?",
    answer: "Customize your template using the options provided, then click the Print button. Your browser's print dialog will open with the template ready to print. For best results, set margins to 'None' or 'Minimum' in your print settings.",
  },
  {
    question: "Can I save templates as PDF?",
    answer: "Yes! When the print dialog opens, select 'Save as PDF' as your printer/destination. This works in Chrome, Firefox, Safari, and Edge.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account needed. All templates are generated right in your browser. No data is uploaded or stored on any server.",
  },
  {
    question: "What paper size do templates use?",
    answer: "Templates are designed for US Letter (8.5 x 11 inches) by default. They also work well on A4 paper — your browser will scale the content to fit automatically.",
  },
];

export default function Home() {
  const allTemplates = categories.flatMap((c) => c.templates);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Free Printable Templates — Printable Polly",
    description: "Customize and print graph paper, planners, checklists, worksheets, cheat sheets, and more — all free, no signup required.",
    url: "https://printablepolly.com",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allTemplates.length,
      itemListElement: allTemplates.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.title,
        url: `https://printablepolly.com${t.href}`,
      })),
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      {/* Hero */}
      <section className="text-center mb-12">
        <Image
          src="/polly.png"
          alt="Polly the Parrot — Printable Polly mascot"
          width={120}
          height={120}
          className="mx-auto mb-4 rounded-lg"
          priority
        />
        <h1 className="text-4xl font-bold text-emerald-700 mb-3">
          Free Printable Templates
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Print Anything You Need! Graph paper, planners, checklists, worksheets — customize and print instantly from your browser.
        </p>
      </section>

      {/* Browse by Grade Level */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-1 border-b border-emerald-200 pb-2">
          Browse Worksheets by Grade Level
        </h2>
        <p className="text-sm text-gray-500 mb-4">Free printable worksheets organized by grade — math, reading, writing, and more.</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { href: "/kindergarten-worksheets", grade: "Kindergarten", ages: "Ages 5–6", icon: "🌱" },
            { href: "/first-grade-worksheets",  grade: "1st Grade",    ages: "Ages 6–7", icon: "⭐" },
            { href: "/second-grade-worksheets", grade: "2nd Grade",    ages: "Ages 7–8", icon: "📖" },
            { href: "/third-grade-worksheets",  grade: "3rd Grade",    ages: "Ages 8–9", icon: "✖️" },
            { href: "/fourth-grade-worksheets", grade: "4th Grade",    ages: "Ages 9–10", icon: "📐" },
            { href: "/fifth-grade-worksheets",  grade: "5th Grade",    ages: "Ages 10–11", icon: "🔣" },
          ].map((g) => (
            <Link
              key={g.href}
              href={g.href}
              className="block text-center p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all group"
            >
              <div className="text-2xl mb-1">{g.icon}</div>
              <div className="font-semibold text-gray-900 group-hover:text-emerald-700 text-sm leading-tight">{g.grade}</div>
              <div className="text-xs text-gray-500 mt-0.5">{g.ages}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Template Categories */}
      {categories.map((category) => (
        <section key={category.name} className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b border-emerald-200 pb-2">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.templates.map((t) => (
              <Link
                key={t.href}
                href={t.href}
                className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-emerald-400 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{t.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{t.title}</h3>
                    <p className="text-sm text-gray-600">{t.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}

      {/* SEO Content */}
      <section className="mb-10 prose prose-gray max-w-none">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">About Printable Polly</h2>
        <p className="text-gray-700">
          Printable Polly is a free online tool for generating printable templates. Unlike other printable sites that offer static PDFs, Printable Polly lets you customize every aspect of your template before printing — grid size, colors, spacing, layouts, and more. Everything runs in your browser with no downloads or installations required.
        </p>
        <p className="text-gray-700">
          Whether you need graph paper for math class, a weekly planner for staying organized, handwriting practice sheets for your kids, or a habit tracker for building better routines, Printable Polly has you covered. Every template is designed to look clean and professional when printed.
        </p>
      </section>

      {/* FAQ */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
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
