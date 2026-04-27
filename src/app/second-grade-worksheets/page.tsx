import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Printable 2nd Grade Worksheets — Math, Reading & More | Printable Polly",
  description:
    "Free printable worksheets for 2nd graders — math, sight words, spelling, telling time, place value, and more. Printable PDFs for 7–8 year olds, no signup required.",
  alternates: { canonical: "https://printablepolly.com/second-grade-worksheets" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What worksheets are best for 2nd graders?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The best worksheets for 2nd graders cover the core skills being taught at that grade level: sight words, phonics and spelling, addition and subtraction with regrouping, place value, telling time, and basic fractions. Hands-on practice with handwriting and reading logs also builds foundational habits.",
      },
    },
    {
      "@type": "Question",
      name: "What math should a 2nd grader know?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By the end of 2nd grade, students should be able to add and subtract within 100, understand place value up to 1,000, count money, tell time to the nearest five minutes, and recognize basic fractions like 1/2, 1/3, and 1/4. They also begin working with basic multiplication concepts.",
      },
    },
    {
      "@type": "Question",
      name: "Are these worksheets free to print?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every worksheet on Printable Polly is completely free. There is no signup, no account, and no paywall. Just open the worksheet you need and print it directly from your browser.",
      },
    },
    {
      "@type": "Question",
      name: "What reading level is typical for 2nd grade?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most 2nd graders read at a Guided Reading level J–M (roughly Lexile 400–600L). They are moving from learning to read to reading to learn — decoding multi-syllable words, building fluency, and beginning to answer comprehension questions about short passages.",
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
      name: "2nd Grade Worksheets",
      item: "https://printablepolly.com/second-grade-worksheets",
    },
  ],
};

const worksheets = [
  {
    href: "/sight-words",
    emoji: "👁️",
    title: "Sight Words",
    description: "Dolch sight word practice sheets for 2nd grade readers",
  },
  {
    href: "/spelling-worksheets",
    emoji: "🔤",
    title: "Spelling Worksheets",
    description: "Printable spelling practice for second grade word lists",
  },
  {
    href: "/math-worksheets",
    emoji: "➕",
    title: "Math Worksheets",
    description: "Addition, subtraction, and arithmetic practice with answer keys",
  },
  {
    href: "/multiplication-table",
    emoji: "✖️",
    title: "Multiplication Table",
    description: "Printable times tables to introduce early multiplication",
  },
  {
    href: "/number-line",
    emoji: "📏",
    title: "Number Line",
    description: "Customizable number lines for counting and arithmetic",
  },
  {
    href: "/place-value",
    emoji: "🔢",
    title: "Place Value",
    description: "Hundreds, tens, and ones place value practice sheets",
  },
  {
    href: "/telling-time",
    emoji: "🕐",
    title: "Telling Time",
    description: "Clock worksheets for reading time to the nearest 5 minutes",
  },
  {
    href: "/fractions-worksheets",
    emoji: "🍕",
    title: "Fractions Worksheets",
    description: "Intro to halves, thirds, and fourths with visual models",
  },
  {
    href: "/handwriting-practice",
    emoji: "✏️",
    title: "Handwriting Practice",
    description: "Printable lined sheets for cursive and print handwriting",
  },
  {
    href: "/tracing-letters",
    emoji: "🔡",
    title: "Tracing Letters",
    description: "Letter formation practice for building writing confidence",
  },
  {
    href: "/word-search",
    emoji: "🔍",
    title: "Word Search Puzzles",
    description: "Printable word searches great for early readers",
  },
  {
    href: "/coloring-pages",
    emoji: "🎨",
    title: "Coloring Pages",
    description: "Free printable coloring sheets for a creative break",
  },
  {
    href: "/flash-cards",
    emoji: "🃏",
    title: "Flash Cards",
    description: "Printable flash cards for sight words, math facts, and more",
  },
  {
    href: "/reading-log",
    emoji: "📚",
    title: "Reading Log",
    description: "Track daily reading to build a consistent reading habit",
  },
];

const gradeLevels = [
  { label: "Kindergarten", href: "/kindergarten-worksheets" },
  { label: "1st Grade", href: "/first-grade-worksheets" },
  { label: "3rd Grade", href: "/third-grade-worksheets" },
  { label: "4th Grade", href: "/fourth-grade-worksheets" },
  { label: "5th Grade", href: "/fifth-grade-worksheets" },
];

export default function SecondGradeWorksheetsPage() {
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
          <span className="text-gray-700">2nd Grade Worksheets</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Free Printable 2nd Grade Worksheets
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          Everything you need for second grade, all in one place. These free printable worksheets
          are designed for 7–8 year olds and cover math, reading, spelling, writing, and more.
          Print directly from your browser — no account, no signup, and no cost. Perfect for
          classroom use, homework practice, or at-home learning throughout the school year.
        </p>

        {/* Worksheet Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse 2nd Grade Worksheets</h2>
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

        {/* What 2nd Graders Are Learning */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What 2nd Graders Are Learning
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Reading &amp; Phonics</h3>
              <p className="text-gray-600">
                Second graders move beyond basic decoding into fluent, expressive reading. They
                master long vowel patterns, consonant blends, and digraphs, and begin tackling
                multi-syllable words with confidence. By the end of the year, most 2nd graders can
                read short chapter books and answer basic comprehension questions about what they
                read.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Math</h3>
              <p className="text-gray-600">
                The 2nd grade math curriculum centers on addition and subtraction within 100,
                including regrouping (carrying and borrowing). Students also develop a strong
                understanding of place value up to 1,000, learn to count and compare coins and
                dollar bills, and are introduced to basic fractions like one-half and one-fourth.
                Telling time to the nearest five minutes and reading simple graphs round out the
                year.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing</h3>
              <p className="text-gray-600">
                Second grade is a big year for writing development. Students practice forming
                letters neatly in both print and, in many schools, introductory cursive. They write
                complete sentences with correct capitalization and punctuation, and begin composing
                short opinion, informational, and narrative paragraphs. Spelling patterns and
                high-frequency word lists play a key role at this stage.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Science</h3>
              <p className="text-gray-600">
                Second grade science typically covers life cycles (plants, butterflies, frogs),
                properties of materials, weather patterns, and basic ecosystems. Students learn to
                make observations, record data, and ask simple questions — building the foundation
                for scientific thinking. Many curricula also introduce basic earth science concepts
                like landforms and bodies of water.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Social Studies</h3>
              <p className="text-gray-600">
                In social studies, 2nd graders explore communities — local, national, and global.
                They learn about maps, landforms, and geography basics, and study important
                holidays and historical figures. Many standards also introduce concepts of
                citizenship, rules, and responsibilities in a community setting, laying groundwork
                for later civics education.
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
