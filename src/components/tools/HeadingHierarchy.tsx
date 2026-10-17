"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolTextarea } from "./shared";

export function HeadingHierarchy() {
  const [html, setHtml] = useState("<h1>Main Title</h1>\n<h2>Section</h2>\n<h3>Subsection</h3>");

  const analysis = useMemo(() => {
    const counts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
    (["h1", "h2", "h3", "h4", "h5", "h6"] as const).forEach((tag) => {
      counts[tag] = (html.match(new RegExp(`<${tag}[^>]*>`, "gi")) || []).length;
    });
    const singleH1 = counts.h1 === 1;
    let score = 40;
    if (singleH1) score += 35;
    if (counts.h2 >= 1) score += 15;
    if (counts.h1 === 0) score = 20;
    return { ...counts, singleH1, score: Math.min(100, score) };
  }, [html]);

  return (
    <ToolShell title="Heading Hierarchy Checker" description="Audit H1–H6 structure." healthScore={analysis.score}
      getReportData={() => ({ toolName: "Heading Hierarchy Checker", healthScore: analysis.score, results: { h1Count: analysis.h1, h2Count: analysis.h2, singleH1: analysis.singleH1 ? "Yes" : "No" }, nextSteps: ["Use exactly one H1 per page.", "Nest headings without skipping levels.", "Include keywords naturally in H2s."] })}>
      <ToolTextarea label="HTML Headings (paste snippet)" id="hh-html" value={html} onChange={(e) => setHtml(e.target.value)} rows={6} />
      <ResultBox>
        {(["h1", "h2", "h3", "h4", "h5", "h6"] as const).map((t) => (
          <p key={t}>{t.toUpperCase()}: {analysis[t]}</p>
        ))}
        <p className="mt-2 font-medium">Single H1: {analysis.singleH1 ? "Yes ✓" : "Fix required"}</p>
      </ResultBox>
    </ToolShell>
  );
}
