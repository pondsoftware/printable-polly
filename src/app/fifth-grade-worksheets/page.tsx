import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Printable 5th Grade Worksheets — Math, Reading & More | Printable Polly",
  description:
    "Free printable 5th grade worksheets — fractions, decimals, algebra intro, geometry, grammar, and more. Printable PDFs for 10–11 year olds, no signup required.",
  alternates: { canonical: "https://printablepolly.com/fifth-grade-worksheets" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What math do 5th graders learn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Fifth grade math focuses on fractions and decimals — adding, subtracting, multiplying, and dividing them — along with percents, the order of operations, and introductory concepts in algebra such as variables and simple expressions. Students also extend their geometry skills to include area, volume, and coordinate planes.",
      },
    },
    {
      "@type": "Question",
      name: "Is algebra taught in 5th grade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, in a foundational way. Fifth graders are introduced to algebraic thinking through variables, expressions, and simple one-step equations. They learn to write and evaluate expressions, identify patterns, and understand the relationship between quantities — setting the stage for a full pre-algebra course in 6th grade.",
      },
    },
    {
      "@type": "Question",
      name: "Are these 5th grade worksheets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every worksheet on Printable Polly is completely free. There is no account to create, no email required, and no paywall. Open the worksheet page and print it directly from your browser.",
      },
    },
    {
      "@type": "Question",
      name: "What should 5th graders be able to write?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By the end of 5th grade, students should write multi-paragraph essays in opinion, informational, and narrative forms. They should use transition words, support claims with evidence from texts, vary sentence structure, and revise their own work for clarity and organization. Research writing with citations is also introduced at this level.",
      },
    },
  ],
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://printablepolly.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "5th Grade Worksheets",
      item: "https://printablepolly.com/fifth-grade-worksheets",
    },
  ],
};

const worksheets = [
  {
    href: "/algebra-worksheets",
    emoji: "🔣",
    title: "Algebra Worksheets",
    description: "Variables, expressions, and intro to equations",
  },
  {
    href: "/fractions-worksheets",
    emoji: "🍕",
    title: "Fractions Worksheets",
    description: "Adding, subtracting, multiplying, and dividing fractions",
  },
  {
    href: "/geometry-worksheets",
    emoji: "📐",
    title: "Geometry Worksheets",
    description: "Area, perimeter, volume, and coordinate planes",
  },
  {
    href: "/math-worksheets",
    emoji: "➕",
    title: "Math Worksheets",
    description: "Decimals, percents, and order of operations",
  },
  {
    href: "/multiplication-table",
    emoji: "✖️",
    title: "Multiplication Table",
    description: "Times tables — master facts for faster math",
  },
  {
    href: "/spelling-worksheets",
    emoji: "🔤",
    title: "Spelling Worksheets",
    description: "5th grade vocabulary, roots, and academic words",
  },
  {
    href: "/grammar-rules",
    emoji: "📖",
    title: "Grammar Rules",
    description: "Complex sentences, verb tenses, and writing conventions",
  },
  {
    href: "/us-states",
    emoji: "🗺️",
    title: "US States",
    description: "All 50 states, capitals, regions, and geography",
  },
  {
    href: "/word-search",
    emoji: "🔍",
    title: "Word Search Puzzles",
    description: "Content-area vocabulary word searches",
  },
  {
    href: "/flash-cards",
    emoji: "🃏",
    title: "Flash Cards",
    description: "Math formulas and vocabulary flash cards",
  },
  {
    href: "/reading-log",
    emoji: "📚",
    title: "Reading Log",
    description: "Reading log for independent reading and book reports",
  },
  {
    href: "/number-line",
    emoji: "📏",
    title: "Number Line",
    description: "Number lines for negative numbers and fractions",
  },
];

const gradeLevels = [
  { label: "Kindergarten", href: "/kindergarten-worksheets" },
  { label: "1st Grade", href: "/first-grade-worksheets" },
  { label: "2nd Grade", href: "/second-grade-worksheets" },
  { label: "3rd Grade", href: "/third-grade-worksheets" },
  { label: "4th Grade", href: "/fourth-grade-worksheets" },
];

export default function FifthGradeWorksheetsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-700">5th Grade Worksheets</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Free Printable 5th Grade Worksheets
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          A complete printable collection for fifth graders, built for ages 10–11. These free
          worksheets cover fractions, decimals, intro algebra, geometry, grammar, spelling, and
          geography — everything your student is tackling this year. Print directly from your
          browser with no account, no signup, and no cost. Great for classroom review, homework
          practice, or extra work at home.
        </p>

        {/* Worksheet Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Browse 5th Grade Worksheets
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {worksheets.map((ws) => (
              <Link
                key={ws.href}
                href={ws.href}
                className="block rounded-lg border border-gray-200 bg-white p-5 hover:border-emerald-400 hover:shadow-sm transition group"
              >
                <div className="text-2xl mb-2">{ws.emoji}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 mb-1">
                  {ws.title}
                </h3>
                <p className="text-sm text-gray-600">{ws.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* What 5th Graders Are Learning */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What 5th Graders Are Learning
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reading &amp; Literary Analysis
              </h3>
              <p className="text-gray-600">
                Fifth graders move from casual reading into deeper literary analysis. They identify
                theme, point of view, and the author&apos;s purpose in both fiction and nonfiction
                texts. Students compare and contrast information across multiple sources, analyze how
                structure shapes meaning, and practice drawing inferences supported by textual
                evidence. Vocabulary instruction emphasizes academic and domain-specific words,
                including Latin and Greek roots that unlock meaning across subjects.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fractions &amp; Decimals
              </h3>
              <p className="text-gray-600">
                Fractions and decimals are the heart of 5th grade math. Students add and subtract
                fractions with unlike denominators, multiply and divide fractions and mixed numbers,
                and connect fraction operations to their decimal equivalents. They extend place value
                understanding to thousandths, perform operations on decimals, and convert between
                fractions, decimals, and percents. This fluency is the foundation for all
                middle-school math that follows.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Pre-Algebra &amp; Geometry
              </h3>
              <p className="text-gray-600">
                Fifth grade marks the formal introduction to algebraic thinking. Students write and
                evaluate numerical expressions using the order of operations, work with variables in
                simple equations, and analyze patterns in input-output tables. In geometry, they
                calculate the area of rectangles and irregular shapes, find the volume of
                rectangular prisms, and plot ordered pairs on a coordinate plane — skills that
                bridge arithmetic and formal algebra.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing &amp; Research</h3>
              <p className="text-gray-600">
                Writing in 5th grade becomes more structured and purposeful. Students craft
                multi-paragraph essays across three modes: opinion pieces that state a claim and
                support it with evidence, informational reports that synthesize research from
                multiple sources, and narratives with developed characters and plot. They practice
                revision strategies, learn to cite sources, and begin to apply conventions of
                formal academic writing — proper punctuation, varied sentence structure, and
                consistent tone.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Science &amp; Social Studies
              </h3>
              <p className="text-gray-600">
                In science, 5th graders typically explore Earth&apos;s systems — weather, climate,
                the water cycle — along with matter and its properties, ecosystems, and basic
                physical science concepts like forces and motion. Social studies broadens the focus
                to US history and geography, covering early exploration, colonization, the American
                Revolution, and the founding of the nation. Students learn to use primary sources,
                maps, and timelines to understand how events connect across time.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqJsonLd.mainEntity.map((faq, i) => (
              <div key={i} className="border-b border-gray-200 pb-6 last:border-0">
                <h3 className="text-base font-semibold text-gray-900 mb-2">{faq.name}</h3>
                <p className="text-gray-600 text-sm">{faq.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Other Grade Levels */}
        <section className="mb-6 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Other Grade Levels</h2>
          <p className="text-gray-600 mb-5 text-sm">
            Looking for worksheets for a different grade? We have printable hubs for every
            elementary grade level.
          </p>
          <div className="flex flex-wrap gap-3">
            {gradeLevels.map((grade) => (
              <Link
                key={grade.href}
                href={grade.href}
                className="inline-block rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:border-emerald-400 hover:text-emerald-700 transition"
              >
                {grade.label}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
