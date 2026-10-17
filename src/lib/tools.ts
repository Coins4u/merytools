import type { ToolDefinition } from "./types";

export const TOTAL_SEO_TOOLS = 30;

export const CATEGORY_LABELS: Record<string, string> = {
  technical: "Technical SEO",
  onpage: "On-Page & Indexation",
  content: "Content & SERP",
  advanced: "Advanced & Enterprise",
};

export const SEO_TOOLS: ToolDefinition[] = [
  { id: "meta-tag-architect", name: "Meta-Tag Architect", description: "Craft optimized title and meta description tags.", icon: "Tags", category: "onpage" },
  { id: "sitemap-validator", name: "Sitemap Validator", description: "Validate XML sitemap structure and coverage.", icon: "Map", category: "technical" },
  { id: "keyword-density", name: "Keyword Density Analyzer", description: "Measure primary keyword frequency in content.", icon: "BarChart3", category: "content" },
  { id: "robots-txt", name: "Robot.txt Generator", description: "Generate crawl directives for search bots.", icon: "Bot", category: "technical" },
  { id: "schema-markup", name: "Schema Markup Builder", description: "Build JSON-LD structured data snippets.", icon: "Code2", category: "onpage" },
  { id: "url-slug", name: "URL Slug Optimizer", description: "Optimize URL slugs for readability and SEO.", icon: "Link", category: "onpage" },
  { id: "heading-hierarchy", name: "Heading Hierarchy Checker", description: "Audit H1–H6 structure for semantic clarity.", icon: "ListTree", category: "onpage" },
  { id: "image-alt", name: "Image Alt-Text Auditor", description: "Score and improve image alt attributes.", icon: "Image", category: "onpage" },
  { id: "canonical-link", name: "Canonical Link Verifier", description: "Verify canonical URL implementation.", icon: "CheckCircle2", category: "technical" },
  { id: "opengraph", name: "OpenGraph Social Previewer", description: "Preview social sharing metadata.", icon: "Share2", category: "content" },
  { id: "competitor-gap", name: "Competitor Keyword Gap Finder", description: "Identify keyword opportunities vs competitors.", icon: "Target", category: "content" },
  { id: "lsi-keywords", name: "Semantic LSI Keyword Suggester", description: "Discover semantically related terms.", icon: "Sparkles", category: "content" },
  { id: "readability", name: "Content Readability Scorer", description: "Score content clarity and reading level.", icon: "BookOpen", category: "content" },
  { id: "mobile-checklist", name: "Mobile-Friendly Checklist", description: "Run mobile UX and performance checks.", icon: "Smartphone", category: "technical" },
  { id: "core-web-vitals", name: "Core Web Vitals Analyzer", description: "Estimate LCP, INP & CLS impact on rankings.", icon: "Gauge", category: "technical" },
  { id: "hreflang-validator", name: "Hreflang Tag Validator", description: "Audit international targeting tags.", icon: "Globe", category: "technical" },
  { id: "internal-links", name: "Internal Link Equity Mapper", description: "Map anchor text and link depth distribution.", icon: "Network", category: "onpage" },
  { id: "page-speed-budget", name: "Page Speed Budget Planner", description: "Set weight budgets per template type.", icon: "Timer", category: "technical" },
  { id: "duplicate-content", name: "Duplicate Content Detector", description: "Find near-duplicate title and body patterns.", icon: "Copy", category: "content" },
  { id: "serp-features", name: "SERP Feature Opportunity Finder", description: "Spot featured snippet & PAA chances.", icon: "Search", category: "content" },
  { id: "eeat-scorer", name: "E-E-A-T Content Scorer", description: "Score trust signals for YMYL pages.", icon: "Award", category: "content" },
  { id: "anchor-text", name: "Backlink Anchor Text Analyzer", description: "Classify anchor risk and diversity.", icon: "Link2", category: "advanced" },
  { id: "indexability", name: "Indexability Status Checker", description: "Simulate noindex, robots & HTTP status rules.", icon: "FileSearch", category: "technical" },
  { id: "pagination-audit", name: "Pagination SEO Auditor", description: "Validate rel=next/prev and canonical chains.", icon: "Files", category: "technical" },
  { id: "faq-schema", name: "FAQ Schema Generator", description: "Build FAQPage JSON-LD from Q&A pairs.", icon: "HelpCircle", category: "onpage" },
  { id: "local-citations", name: "Local SEO Citation Checker", description: "Normalize NAP consistency across listings.", icon: "MapPin", category: "advanced" },
  { id: "log-file-crawl", name: "Log File Crawl Analyzer", description: "Parse bot hits and crawl waste ratios.", icon: "FileText", category: "advanced" },
  { id: "ai-search-prep", name: "AI Search Visibility Prep", description: "Optimize for AI overviews & answer engines.", icon: "Brain", category: "advanced" },
  { id: "site-architecture", name: "Site Architecture Auditor", description: "Evaluate click depth and hub page structure.", icon: "GitBranch", category: "advanced", premium: true },
  { id: "health-scorer", name: "Full Technical SEO Health Scorer", description: "Comprehensive technical SEO audit score.", icon: "Activity", category: "advanced", premium: true },
];
