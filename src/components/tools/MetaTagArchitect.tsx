"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput, ToolTextarea } from "./shared";

export function MetaTagArchitect() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [keyword, setKeyword] = useState("");

  const analysis = useMemo(() => {
    const titleLen = title.length;
    const descLen = description.length;
    const hasKeyword =
      keyword.length > 0 &&
      (title.toLowerCase().includes(keyword.toLowerCase()) ||
        description.toLowerCase().includes(keyword.toLowerCase()));
    const titleOk = titleLen >= 30 && titleLen <= 60;
    const descOk = descLen >= 120 && descLen <= 160;
    let score = 40;
    if (titleOk) score += 25;
    if (descOk) score += 25;
    if (hasKeyword) score += 10;
    return { titleLen, descLen, titleOk, descOk, hasKeyword, score: Math.min(100, score) };
  }, [title, description, keyword]);

  return (
    <ToolShell
      title="Meta-Tag Architect"
      description="Optimize title and meta description for SERP performance."
      healthScore={analysis.score}
      getReportData={() => ({
        toolName: "Meta-Tag Architect",
        healthScore: analysis.score,
        results: {
          titleLength: analysis.titleLen,
          descriptionLength: analysis.descLen,
          titleInRange: analysis.titleOk ? "Yes" : "No",
          descriptionInRange: analysis.descOk ? "Yes" : "No",
          keywordPresent: analysis.hasKeyword ? "Yes" : "No",
        },
        nextSteps: [
          "Keep title between 30–60 characters with primary keyword near the front.",
          "Expand meta description to 120–160 characters with a clear CTA.",
          "Avoid duplicate meta tags across paginated or filtered URLs.",
        ],
      })}
    >
      <div className="space-y-4">
        <ToolInput label="Target Keyword" id="mt-keyword" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="technical seo audit" />
        <ToolInput label="Page Title" id="mt-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Technical SEO Audit | Mery SEO Tools" />
        <ToolTextarea label="Meta Description" id="mt-desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="I deliver data-driven technical SEO audits..." />
        <ResultBox>
          <p>Title: {analysis.titleLen} chars {analysis.titleOk ? "✓" : "— aim 30–60"}</p>
          <p>Description: {analysis.descLen} chars {analysis.descOk ? "✓" : "— aim 120–160"}</p>
          <p>Keyword in meta: {analysis.hasKeyword ? "Yes" : "No"}</p>
        </ResultBox>
      </div>
    </ToolShell>
  );
}
