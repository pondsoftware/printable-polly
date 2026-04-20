import { writeFileSync } from "fs";

const DOMAIN = "https://printablepolly.com";

const urls = [
  "/",
  "/graph-paper",
  "/lined-paper",
  "/dot-grid",
  "/isometric-paper",
  "/cornell-notes",
  "/staff-paper",
  "/hex-paper",
  "/weekly-planner",
  "/monthly-calendar",
  "/daily-schedule",
  "/habit-tracker",
  "/goal-setting",
  "/meal-planner",
  "/checklist",
  "/todo-list",
  "/grocery-list",
  "/budget-tracker",
  "/chore-chart",
  "/cleaning-schedule",
  "/word-search",
  "/bingo-cards",
  "/comic-strip",
  "/storyboard",
  "/coloring-pages",
  "/handwriting-practice",
  "/multiplication-table",
  "/number-line",
  "/reading-log",
  "/math-worksheets",
  "/fractions-worksheets",
  "/algebra-worksheets",
  "/geometry-worksheets",
  "/sight-words",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${DOMAIN}${url}</loc>
    <changefreq>monthly</changefreq>
    <priority>${url === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

writeFileSync("public/sitemap.xml", sitemap);
console.log(`Sitemap generated: ${urls.length} URLs`);

const robots = `User-agent: *
Allow: /

Sitemap: ${DOMAIN}/sitemap.xml
`;

writeFileSync("public/robots.txt", robots);
console.log("robots.txt generated");
