"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput } from "./shared";

const LSI_MAP: Record<string, string[]> = {
  seo: ["search engine optimization", "organic traffic", "serp", "rankings", "crawl budget"],
  audit: ["site audit", "technical issues", "indexation", "core web vitals", "log analysis"],
  content: ["readability", "topic cluster", "eeat", "content gap", "search intent"],
};

export function LsiKeywords() {
  const [seed, setSeed] = useState("technical seo");

  const suggestions = useMemo(() => {
    const key = Object.keys(LSI_MAP).find((k) => seed.toLowerCase().includes(k)) ?? "seo";
    const base = LSI_MAP[key] ?? LSI_MAP.seo;
    const words = seed.toLowerCase().split(/\s+/);
    const extra = words.flatMap((w) => LSI_MAP[w] ?? []).filter(Boolean);
    return Array.from(new Set([...base, ...extra])).slice(0, 10);
  }, [seed]);

  const score = suggestions.length >= 5 ? 85 : 60;

  return (
    <ToolShell title="Semantic LSI Keyword Suggester" description="Discover semantically related terms." healthScore={score}
      getReportData={() => ({ toolName: "Semantic LSI Keyword Suggester", healthScore: score, results: { seedKeyword: seed, suggestionsCount: suggestions.length, topSuggestions: suggestions.slice(0, 5).join(", ") }, nextSteps: ["Weave LSI terms into H2s and body copy naturally.", "Build FAQ sections around related queries.", "Avoid forcing terms that hurt readability."] })}>
      <ToolInput label="Seed Keyword" id="lsi-seed" value={seed} onChange={(e) => setSeed(e.target.value)} />
      <ResultBox>
        <p className="font-medium mb-2">Related terms:</p>
        <div className="flex flex-wrap gap-2">{suggestions.map((s) => (
          <span key={s} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-dark">{s}</span>
        ))}</div>
      </ResultBox>
    </ToolShell>
  );
}
