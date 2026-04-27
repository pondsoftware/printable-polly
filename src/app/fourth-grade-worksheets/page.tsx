import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free Printable 4th Grade Worksheets — Math, Reading & More | Printable Polly",
  description:
    "Free printable 4th grade worksheets — fractions, geometry, long division, grammar, US states, and more. Printable PDFs for 9–10 year olds, no signup required.",
  alternates: { canonical: "https://printablepolly.com/fourth-grade-worksheets" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What math do 4th graders learn?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "4th grade math covers multi-digit multiplication and long division, equivalent fractions, comparing and ordering fractions, adding and subtracting fractions with like denominators, place value through millions, decimals to the hundredths, and an introduction to lines, angles, and 2D geometry. Students also interpret data in graphs and tables and begin exploring factors and multiples.",
      },
    },
    {
      "@type": "Question",
      name: "What writing skills should a 4th grader have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "By 4th grade, students should write multi-paragraph essays with a clear introduction, body paragraphs, and conclusion. They practice opinion writing with supporting evidence, informational writing with facts and definitions, and narrative writing with descriptive detail. They also learn to use relative pronouns and clauses, compound and complex sentences, and improve their editing and revision skills.",
      },
    },
    {
      "@type": "Question",
      name: "Are these 4th grade worksheets free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes — every worksheet on Printable Polly is completely free to print. There is no signup, no account, and no paywall. Simply open the worksheet you need and print it directly from your browser. All worksheets are designed for home or classroom use.",
      },
    },
    {
      "@type": "Question",
      name: "What should 4th graders be reading?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most 4th graders read at a Guided Reading level O–S (roughly Lexile 600–900L). They are ready for chapter book series like Magic Tree House, Percy Jackson, and Diary of a Wimpy Kid, as well as age-appropriate nonfiction. At this stage, reading comprehension shifts toward analyzing characters, identifying themes, and making inferences — skills reinforced through reading logs and comprehension worksheets.",
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
      name: "4th Grade Worksheets",
      item: "https://printablepolly.com/fourth-grade-worksheets",
    },
  ],
};

const worksheets = [
  {
    href: "/multiplication-table",
    emoji: "✖️",
    title: "Multiplication Table",
    description: "Multi-digit multiplication practice and times tables",
  },
  {
    href: "/math-worksheets",
    emoji: "➕",
    title: "Math Worksheets",
    description: "Multi-digit operations, factors, and long division",
  },
  {
    href: "/fractions-worksheets",
    emoji: "🍕",
    title: "Fractions Worksheets",
    description: "Equivalent fractions, comparing, and adding fractions",
  },
  {
    href: "/geometry-worksheets",
    emoji: "📐",
    title: "Geometry Worksheets",
    description: "Lines, angles, and 2D shape properties",
  },
  {
    href: "/place-value",
    emoji: "🔢",
    title: "Place Value",
    description: "Place value through millions and decimals intro",
  },
  {
    href: "/spelling-worksheets",
    emoji: "🔤",
    title: "Spelling Worksheets",
    description: "4th grade vocabulary, prefixes, and suffixes",
  },
  {
    href: "/grammar-rules",
    emoji: "📖",
    title: "Grammar Rules",
    description: "Advanced grammar: relative pronouns, compound sentences",
  },
  {
    href: "/us-states",
    emoji: "🗺️",
    title: "US States",
    description: "All 50 states, capitals, and US geography",
  },
  {
    href: "/word-search",
    emoji: "🔍",
    title: "Word Search Puzzles",
    description: "Vocabulary-building word searches for 4th graders",
  },
  {
    href: "/flash-cards",
    emoji: "🃏",
    title: "Flash Cards",
    description: "Vocabulary and math concept flash cards",
  },
  {
    href: "/reading-log",
    emoji: "📚",
    title: "Reading Log",
    description: "Chapter book reading log with comprehension prompts",
  },
  {
    href: "/number-line",
    emoji: "📏",
    title: "Number Line",
    description: "Number lines for fractions, decimals, and negative numbers",
  },
];

const gradeLevels = [
  { label: "Kindergarten", href: "/kindergarten-worksheets" },
  { label: "1st Grade", href: "/first-grade-worksheets" },
  { label: "2nd Grade", href: "/second-grade-worksheets" },
  { label: "3rd Grade", href: "/third-grade-worksheets" },
  { label: "5th Grade", href: "/fifth-grade-worksheets" },
];

export default function FourthGradeWorksheetsPage() {
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
          <span className="text-gray-700">4th Grade Worksheets</span>
        </nav>

        {/* H1 + Intro */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Free Printable 4th Grade Worksheets
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mb-10">
          A complete collection of free printable worksheets for 4th graders, designed for ages
          9–10. Covering everything from multi-digit multiplication and fractions to grammar, US
          states, and reading comprehension — all printable as PDFs directly from your browser.
          No account, no signup, and no cost. Perfect for classroom practice, homework support,
          or at-home enrichment.
        </p>

        {/* Worksheet Grid */}
        <section className="mb-14">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Browse 4th Grade Worksheets</h2>
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

        {/* What 4th Graders Are Learning */}
        <section className="mb-14 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            What 4th Graders Are Learning
          </h2>

          <div className="space-y-7">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Reading &amp; Literary Analysis
              </h3>
              <p className="text-gray-600">
                Fourth grade marks a major shift in reading instruction — from learning to read
                toward reading to learn. Students dive into longer chapter books and informational
                texts, and are expected to identify themes, analyze character motivation, and draw
                inferences from the text. They compare and contrast stories with similar themes,
                describe events in historical texts, and begin interpreting figurative language like
                metaphors and idioms. Independent reading logs and comprehension prompts help
                reinforce these analytical habits at home.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Math Operations &amp; Fractions
              </h3>
              <p className="text-gray-600">
                4th grade math is one of the most content-heavy years of elementary school. Students
                master multi-digit multiplication (up to 4-digit by 1-digit and 2-digit by
                2-digit), long division with remainders, and work extensively with fractions —
                identifying equivalents, comparing fractions with different denominators, and adding
                and subtracting fractions with like denominators. Place value extends through
                millions, and students are introduced to decimal notation to the hundredths place.
                Factors, multiples, and prime versus composite numbers are also introduced this year.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Writing &amp; Research</h3>
              <p className="text-gray-600">
                In 4th grade, students write with purpose and organization across three types:
                opinion, informational, and narrative. They learn to introduce a topic clearly,
                develop it with facts and details, and wrap it up with a strong conclusion. Research
                skills become more important — students learn to take notes from sources, avoid
                plagiarism, and cite where they found their information. Grammar lessons at this
                level include relative pronouns (who, whom, whose, which, that), progressive verb
                tenses, compound and complex sentences, and correct use of commas and quotation
                marks in dialogue.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Science</h3>
              <p className="text-gray-600">
                4th grade science curricula vary by state, but common topics include energy
                (electrical circuits, light, sound, and heat transfer), Earth&apos;s features
                (erosion, weathering, rock formation, and plate tectonics basics), and life science
                (ecosystems, food webs, and adaptations). Students design simple experiments,
                record observations, and analyze data — building scientific thinking skills they
                will use throughout middle and high school. Many states also cover waves and
                information technology as part of the NGSS framework.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Social Studies &amp; US Geography
              </h3>
              <p className="text-gray-600">
                US geography is a centerpiece of most 4th grade social studies programs. Students
                learn all 50 states and their capitals, identify major physical features like
                mountain ranges, rivers, and regions, and study how geography has shaped American
                history. Many states also focus on their own state history during 4th grade —
                covering Native American cultures, exploration, settlement, and the development of
                state government. Students build map-reading skills, interpret simple timelines, and
                develop an understanding of how communities and economies are interconnected across
                regions.
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
