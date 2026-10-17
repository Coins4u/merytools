"use client";

import { createAnalyzerTool } from "./createAnalyzer";

const steps = (a: string, b: string, c: string) => [a, b, c];

export const CoreWebVitals = createAnalyzerTool({
  title: "Core Web Vitals Analyzer",
  description: "Estimate performance impact on organic visibility.",
  fields: [
    { key: "lcp", label: "LCP (seconds)", placeholder: "2.4" },
    { key: "inp", label: "INP (ms)", placeholder: "180" },
    { key: "cls", label: "CLS score", placeholder: "0.08" },
  ],
  analyze: (v) => {
    const lcp = parseFloat(v.lcp) || 0;
    const inp = parseFloat(v.inp) || 0;
    const cls = parseFloat(v.cls) || 0;
    let score = 100;
    if (lcp > 2.5) score -= 25;
    if (inp > 200) score -= 25;
    if (cls > 0.1) score -= 25;
    return {
      score: Math.max(20, score),
      results: { lcpRating: lcp <= 2.5 ? "Good" : "Needs work", inpRating: inp <= 200 ? "Good" : "Slow", clsRating: cls <= 0.1 ? "Good" : "Unstable" },
      steps: steps("Defer non-critical JS on LCP templates.", "Reduce main-thread work for INP.", "Reserve space for ads/embeds to fix CLS."),
    };
  },
});

export const HreflangValidator = createAnalyzerTool({
  title: "Hreflang Tag Validator",
  description: "Validate international hreflang implementation.",
  fields: [
    { key: "tags", label: "Hreflang tags (one per line)", type: "textarea", placeholder: '<link rel="alternate" hreflang="en" href="..." />' },
    { key: "xDefault", label: "x-default present?", defaultValue: "yes" },
  ],
  analyze: (v) => {
    const count = (v.tags.match(/hreflang/gi) || []).length;
    const hasDefault = v.xDefault.toLowerCase().includes("yes");
    let score = 40 + count * 10;
    if (hasDefault) score += 20;
    return {
      score: Math.min(100, score),
      results: { tagsFound: count, xDefault: hasDefault ? "Yes" : "No" },
      steps: steps("Add return links between all language versions.", "Include x-default for global fallback.", "Match canonicals per locale."),
    };
  },
});

export const InternalLinks = createAnalyzerTool({
  title: "Internal Link Equity Mapper",
  description: "Analyze internal link distribution.",
  fields: [
    { key: "links", label: "Internal links (url|anchor per line)", type: "textarea", placeholder: "/blog/seo|technical audit" },
  ],
  analyze: (v) => {
    const lines = v.links.split("\n").filter(Boolean);
    const anchors = lines.map((l) => l.split("|")[1]?.trim() || "").filter(Boolean);
    const unique = new Set(anchors).size;
    let score = Math.min(95, 50 + lines.length * 3 + unique * 2);
    return {
      score,
      results: { totalLinks: lines.length, uniqueAnchors: unique, depthHint: lines.length >= 5 ? "Healthy hub" : "Add more links" },
      steps: steps("Link money pages from high-traffic hubs.", "Vary anchor text naturally.", "Limit click depth to key URLs to ≤3."),
    };
  },
});

export const PageSpeedBudget = createAnalyzerTool({
  title: "Page Speed Budget Planner",
  description: "Set and track page weight budgets.",
  fields: [
    { key: "html", label: "HTML (KB)", placeholder: "45" },
    { key: "js", label: "JavaScript (KB)", placeholder: "320" },
    { key: "images", label: "Images (KB)", placeholder: "580" },
  ],
  analyze: (v) => {
    const total = (parseFloat(v.html) || 0) + (parseFloat(v.js) || 0) + (parseFloat(v.images) || 0);
    const score = total < 800 ? 90 : total < 1200 ? 70 : 45;
    return {
      score,
      results: { totalWeightKb: total, budgetStatus: total < 1000 ? "Within budget" : "Over budget" },
      steps: steps("Compress hero images to WebP/AVIF.", "Code-split JS per route.", "Inline critical CSS only."),
    };
  },
});

export const DuplicateContent = createAnalyzerTool({
  title: "Duplicate Content Detector",
  description: "Detect duplicate titles and descriptions.",
  fields: [
    { key: "pages", label: "Page titles (one per line)", type: "textarea", placeholder: "Technical SEO Audit\nSEO Audit Services\nTechnical SEO Audit" },
  ],
  analyze: (v) => {
    const titles = v.pages.split("\n").map((t) => t.trim().toLowerCase()).filter(Boolean);
    const dupes = titles.length - new Set(titles).size;
    const score = Math.max(25, 100 - dupes * 20);
    return {
      score,
      results: { pagesChecked: titles.length, duplicatesFound: dupes },
      steps: steps("Canonicalize or noindex thin duplicates.", "Rewrite duplicate titles with unique intent.", "Consolidate paginated series."),
    };
  },
});

export const SerpFeatures = createAnalyzerTool({
  title: "SERP Feature Opportunity Finder",
  description: "Find snippet and PAA opportunities.",
  fields: [
    { key: "keyword", label: "Target keyword", placeholder: "technical seo checklist" },
    { key: "hasFaq", label: "Page has FAQ section?", defaultValue: "no" },
    { key: "hasTable", label: "Page has comparison table?", defaultValue: "yes" },
  ],
  analyze: (v) => {
    let score = 55;
    if (v.keyword.length > 5) score += 15;
    if (v.hasFaq.toLowerCase().includes("yes")) score += 15;
    if (v.hasTable.toLowerCase().includes("yes")) score += 15;
    return {
      score: Math.min(100, score),
      results: { keyword: v.keyword, faqReady: v.hasFaq, tableReady: v.hasTable, snippetPotential: score >= 75 ? "High" : "Medium" },
      steps: steps("Add concise 40–50 word answer under H2.", "Structure steps or tables for PAA.", "Use FAQ schema where appropriate."),
    };
  },
});

export const EeatScorer = createAnalyzerTool({
  title: "E-E-A-T Content Scorer",
  description: "Score experience, expertise, authority, trust.",
  fields: [
    { key: "author", label: "Named author with bio?", defaultValue: "yes" },
    { key: "citations", label: "Outbound citations to sources?", defaultValue: "yes" },
    { key: "updated", label: "Last updated date visible?", defaultValue: "yes" },
  ],
  analyze: (v) => {
    const checks = [v.author, v.citations, v.updated].filter((x) => x.toLowerCase().includes("yes")).length;
    const score = 40 + checks * 20;
    return {
      score,
      results: { trustSignals: `${checks}/3`, ymylReady: score >= 80 ? "Yes" : "Improve" },
      steps: steps("Add author schema and credentials.", "Link to primary research sources.", "Show revision history on YMYL pages."),
    };
  },
});

export const AnchorText = createAnalyzerTool({
  title: "Backlink Anchor Text Analyzer",
  description: "Review anchor diversity and risk.",
  fields: [
    { key: "anchors", label: "Anchors (one per line)", type: "textarea", placeholder: "seo tools\nclick here\nbrand name" },
  ],
  analyze: (v) => {
    const list = v.anchors.split("\n").filter(Boolean);
    const generic = list.filter((a) => /click here|read more|link/i.test(a)).length;
    const branded = list.filter((a) => /mery|brand/i.test(a)).length;
    const score = Math.max(30, 100 - generic * 15);
    return {
      score,
      results: { totalAnchors: list.length, genericAnchors: generic, brandedAnchors: branded },
      steps: steps("Reduce generic anchor ratio below 10%.", "Grow branded and partial-match mix.", "Disavow toxic anchors if needed."),
    };
  },
});

export const Indexability = createAnalyzerTool({
  title: "Indexability Status Checker",
  description: "Check indexation blockers.",
  fields: [
    { key: "status", label: "HTTP status", placeholder: "200" },
    { key: "robots", label: "Meta robots", placeholder: "index, follow" },
    { key: "canonical", label: "Self-referencing canonical?", defaultValue: "yes" },
  ],
  analyze: (v) => {
    const okStatus = v.status === "200";
    const indexable = !/noindex/i.test(v.robots);
    const canon = v.canonical.toLowerCase().includes("yes");
    let score = 30;
    if (okStatus) score += 30;
    if (indexable) score += 25;
    if (canon) score += 15;
    return {
      score,
      results: { httpStatus: v.status, indexable: indexable ? "Yes" : "Blocked", canonicalOk: canon ? "Yes" : "No" },
      steps: steps("Fix 4xx/5xx on indexable URLs.", "Remove accidental noindex on money pages.", "Add self-referencing canonicals."),
    };
  },
});

export const PaginationAudit = createAnalyzerTool({
  title: "Pagination SEO Auditor",
  description: "Audit paginated series SEO.",
  fields: [
    { key: "series", label: "Series base URL", placeholder: "https://example.com/blog" },
    { key: "relNext", label: "rel=next/prev implemented?", defaultValue: "no" },
    { key: "viewAll", label: "View-all page exists?", defaultValue: "no" },
  ],
  analyze: (v) => {
    let score = 50;
    if (v.relNext.toLowerCase().includes("yes")) score += 25;
    if (v.viewAll.toLowerCase().includes("yes")) score += 15;
    if (v.series.startsWith("http")) score += 10;
    return {
      score,
      results: { baseUrl: v.series || "Not set", relPagination: v.relNext, viewAll: v.viewAll },
      steps: steps("Canonical page 1 or view-all to consolidate signals.", "Use rel next/prev or single canonical strategy.", "Avoid indexing every filter permutation."),
    };
  },
});

export const FaqSchema = createAnalyzerTool({
  title: "FAQ Schema Generator",
  description: "Generate FAQPage JSON-LD.",
  fields: [
    { key: "pairs", label: "Q&A pairs (Question|Answer per line)", type: "textarea", placeholder: "What is technical SEO?|Optimizing crawl and indexation." },
  ],
  analyze: (v) => {
    const pairs = v.pairs.split("\n").filter((l) => l.includes("|"));
    const entities = pairs.map((line) => {
      const [q, a] = line.split("|");
      return { "@type": "Question", name: q?.trim() ?? "", acceptedAnswer: { "@type": "Answer", text: a?.trim() ?? "" } };
    });
    const json = JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: entities }, null, 2);
    const score = Math.min(100, 50 + pairs.length * 12);
    return {
      score,
      results: { questions: pairs.length, schemaPreview: json.slice(0, 200) + "..." },
      steps: steps("Match FAQ content visible on page.", "Validate in Rich Results Test.", "Avoid FAQ spam on non-FAQ pages."),
    };
  },
});

export const LocalCitations = createAnalyzerTool({
  title: "Local SEO Citation Checker",
  description: "Normalize NAP across directories.",
  fields: [
    { key: "name", label: "Business name", placeholder: "Mery SEO Tools" },
    { key: "phone", label: "Phone", placeholder: "+1 555 0100" },
    { key: "address", label: "Address", placeholder: "123 Main St, City" },
  ],
  analyze: (v) => {
    const complete = [v.name, v.phone, v.address].filter((x) => x.trim().length > 2).length;
    const score = 35 + complete * 22;
    return {
      score,
      results: { napComplete: `${complete}/3`, listingReady: complete === 3 ? "Yes" : "Incomplete" },
      steps: steps("Sync NAP on Google Business Profile.", "Audit top 20 citation sources.", "Use LocalBusiness schema on contact page."),
    };
  },
});

export const LogFileCrawl = createAnalyzerTool({
  title: "Log File Crawl Analyzer",
  description: "Estimate crawl efficiency from log samples.",
  fields: [
    { key: "googlebot", label: "Googlebot hits (sample)", placeholder: "1240" },
    { key: "waste", label: "Wasted crawl % (facets/params)", placeholder: "18" },
  ],
  analyze: (v) => {
    const waste = parseFloat(v.waste) || 0;
    const score = Math.max(25, 100 - waste * 2);
    return {
      score,
      results: { botHits: v.googlebot || "0", crawlWastePercent: waste, efficiency: waste < 15 ? "Good" : "Optimize" },
      steps: steps("Block low-value parameters in robots.txt.", "Noindex internal search results.", "Improve orphan page internal links."),
    };
  },
});

export const AiSearchPrep = createAnalyzerTool({
  title: "AI Search Visibility Prep",
  description: "Prepare content for AI answers and overviews.",
  fields: [
    { key: "summary", label: "Clear summary paragraph (50+ words)", type: "textarea" },
    { key: "entities", label: "Named entities / facts listed?", defaultValue: "yes" },
  ],
  analyze: (v) => {
    const words = v.summary.trim().split(/\s+/).filter(Boolean).length;
    let score = Math.min(70, words * 2);
    if (v.entities.toLowerCase().includes("yes")) score += 25;
    return {
      score: Math.min(100, score),
      results: { summaryWords: words, entityClarity: v.entities, aiReady: score >= 75 ? "Yes" : "Needs work" },
      steps: steps("Lead with direct answer paragraphs.", "Use structured lists and tables.", "Cite authoritative sources inline."),
    };
  },
});

export const SiteArchitecture = createAnalyzerTool({
  title: "Site Architecture Auditor",
  description: "Evaluate site structure and click depth.",
  fields: [
    { key: "depth", label: "Max click depth to key pages", placeholder: "3" },
    { key: "hubs", label: "Category hub pages", placeholder: "8" },
    { key: "orphans", label: "Orphan URLs (estimate)", placeholder: "12" },
  ],
  analyze: (v) => {
    const depth = parseFloat(v.depth) || 5;
    const orphans = parseFloat(v.orphans) || 0;
    let score = 80;
    if (depth > 4) score -= 20;
    if (orphans > 20) score -= 25;
    return {
      score: Math.max(20, score),
      results: { clickDepth: depth, hubPages: v.hubs, orphanEstimate: orphans },
      steps: steps("Flatten depth for revenue URLs.", "Build topical hub and spoke clusters.", "Internal link orphan remediation sprint."),
    };
  },
});
