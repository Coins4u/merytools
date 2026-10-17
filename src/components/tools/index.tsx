"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import type { ComponentType } from "react";

const loading = () => (
  <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-accent" />
  </div>
);

const dyn = (loader: () => Promise<{ default: ComponentType }>) =>
  dynamic(loader, { loading });

export const TOOL_COMPONENTS: Record<string, ComponentType> = {
  "meta-tag-architect": dyn(() => import("./MetaTagArchitect").then((m) => ({ default: m.MetaTagArchitect }))),
  "sitemap-validator": dyn(() => import("./SitemapValidator").then((m) => ({ default: m.SitemapValidator }))),
  "keyword-density": dyn(() => import("./KeywordDensity").then((m) => ({ default: m.KeywordDensity }))),
  "robots-txt": dyn(() => import("./RobotsTxt").then((m) => ({ default: m.RobotsTxt }))),
  "schema-markup": dyn(() => import("./SchemaMarkup").then((m) => ({ default: m.SchemaMarkup }))),
  "url-slug": dyn(() => import("./UrlSlug").then((m) => ({ default: m.UrlSlug }))),
  "heading-hierarchy": dyn(() => import("./HeadingHierarchy").then((m) => ({ default: m.HeadingHierarchy }))),
  "image-alt": dyn(() => import("./ImageAlt").then((m) => ({ default: m.ImageAlt }))),
  "canonical-link": dyn(() => import("./CanonicalLink").then((m) => ({ default: m.CanonicalLink }))),
  "opengraph": dyn(() => import("./OpenGraph").then((m) => ({ default: m.OpenGraph }))),
  "competitor-gap": dyn(() => import("./CompetitorGap").then((m) => ({ default: m.CompetitorGap }))),
  "lsi-keywords": dyn(() => import("./LsiKeywords").then((m) => ({ default: m.LsiKeywords }))),
  "readability": dyn(() => import("./Readability").then((m) => ({ default: m.Readability }))),
  "mobile-checklist": dyn(() => import("./MobileChecklist").then((m) => ({ default: m.MobileChecklist }))),
  "health-scorer": dyn(() => import("./HealthScorer").then((m) => ({ default: m.HealthScorer }))),
  "core-web-vitals": dyn(() => import("./extended-tools").then((m) => ({ default: m.CoreWebVitals }))),
  "hreflang-validator": dyn(() => import("./extended-tools").then((m) => ({ default: m.HreflangValidator }))),
  "internal-links": dyn(() => import("./extended-tools").then((m) => ({ default: m.InternalLinks }))),
  "page-speed-budget": dyn(() => import("./extended-tools").then((m) => ({ default: m.PageSpeedBudget }))),
  "duplicate-content": dyn(() => import("./extended-tools").then((m) => ({ default: m.DuplicateContent }))),
  "serp-features": dyn(() => import("./extended-tools").then((m) => ({ default: m.SerpFeatures }))),
  "eeat-scorer": dyn(() => import("./extended-tools").then((m) => ({ default: m.EeatScorer }))),
  "anchor-text": dyn(() => import("./extended-tools").then((m) => ({ default: m.AnchorText }))),
  "indexability": dyn(() => import("./extended-tools").then((m) => ({ default: m.Indexability }))),
  "pagination-audit": dyn(() => import("./extended-tools").then((m) => ({ default: m.PaginationAudit }))),
  "faq-schema": dyn(() => import("./extended-tools").then((m) => ({ default: m.FaqSchema }))),
  "local-citations": dyn(() => import("./extended-tools").then((m) => ({ default: m.LocalCitations }))),
  "log-file-crawl": dyn(() => import("./extended-tools").then((m) => ({ default: m.LogFileCrawl }))),
  "ai-search-prep": dyn(() => import("./extended-tools").then((m) => ({ default: m.AiSearchPrep }))),
  "site-architecture": dyn(() => import("./extended-tools").then((m) => ({ default: m.SiteArchitecture }))),
};
