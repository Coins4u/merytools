"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput, ToolTextarea } from "./shared";

export function KeywordDensity() {
  const [keyword, setKeyword] = useState("");
  const [content, setContent] = useState("");

  const analysis = useMemo(() => {
    const words = content.trim().split(/\s+/).filter(Boolean);
    const total = words.length || 1;
    const kw = keyword.trim().toLowerCase();
    const count = words.filter((w) => w.toLowerCase().replace(/[^a-z0-9]/g, "") === kw.replace(/[^a-z0-9]/g, "")).length;
    const density = (count / total) * 100;
    const optimal = density >= 0.5 && density <= 2.5;
    let score = 50;
    if (optimal) score += 40;
    else if (density > 0 && density < 4) score += 20;
    return { count, total, density: density.toFixed(2), optimal, score: Math.min(100, score) };
  }, [keyword, content]);

  return (
    <ToolShell title="Keyword Density Analyzer" description="Measure keyword frequency in body copy." healthScore={analysis.score}
      getReportData={() => ({ toolName: "Keyword Density Analyzer", healthScore: analysis.score, results: { wordCount: analysis.total, keywordOccurrences: analysis.count, densityPercent: `${analysis.density}%`, optimalRange: analysis.optimal ? "Yes" : "No" }, nextSteps: ["Aim for 0.5–2.5% density for primary terms.", "Use synonyms and LSI terms to avoid stuffing.", "Place keyword in first 100 words naturally."] })}>
      <div className="space-y-4">
        <ToolInput label="Primary Keyword" id="kd-kw" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
        <ToolTextarea label="Page Content" id="kd-content" value={content} onChange={(e) => setContent(e.target.value)} rows={6} />
        <ResultBox><p>Density: {analysis.density}% ({analysis.count}/{analysis.total} words)</p><p>Optimal range: {analysis.optimal ? "Yes" : "Adjust density"}</p></ResultBox>
      </div>
    </ToolShell>
  );
}
