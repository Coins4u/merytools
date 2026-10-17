"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput, ToolTextarea } from "./shared";

const SUGGESTIONS = ["long-tail technical seo", "core web vitals audit", "javascript seo rendering", "log file analysis seo", "international hreflang"];

export function CompetitorGap() {
  const [mine, setMine] = useState("technical seo, site audit");
  const [theirs, setTheirs] = useState("technical seo, backlinks, content marketing, ppc");

  const gaps = useMemo(() => {
    const mySet = new Set(mine.split(",").map((k) => k.trim().toLowerCase()).filter(Boolean));
    const theirList = theirs.split(",").map((k) => k.trim()).filter(Boolean);
    const missing = theirList.filter((k) => !mySet.has(k.toLowerCase()));
    const extra = SUGGESTIONS.filter((s) => !mySet.has(s) && !theirList.map((t) => t.toLowerCase()).includes(s)).slice(0, 3);
    const score = Math.min(100, 50 + missing.length * 8 + (mySet.size > 0 ? 20 : 0));
    return { missing, extra, score };
  }, [mine, theirs]);

  return (
    <ToolShell title="Competitor Keyword Gap Finder" description="Find keyword opportunities vs competitors." healthScore={gaps.score}
      getReportData={() => ({ toolName: "Competitor Keyword Gap Finder", healthScore: gaps.score, results: { yourKeywords: mine.split(",").filter(Boolean).length, gapsFound: gaps.missing.length, suggestedOpportunities: gaps.extra.join(", ") }, nextSteps: ["Target 3–5 gap keywords with dedicated landing pages.", "Map gaps to search intent (info vs commercial).", "Track rankings 30 days after publishing."] })}>
      <ToolTextarea label="Your Keywords (comma-separated)" id="cg-mine" value={mine} onChange={(e) => setMine(e.target.value)} />
      <ToolTextarea label="Competitor Keywords (comma-separated)" id="cg-theirs" value={theirs} onChange={(e) => setTheirs(e.target.value)} />
      <ResultBox>
        <p className="font-medium">Gaps (they rank, you don&apos;t):</p>
        <ul className="mt-2 list-disc pl-5">{gaps.missing.length ? gaps.missing.map((g) => <li key={g}>{g}</li>) : <li>None detected</li>}</ul>
        <p className="mt-3 font-medium">Suggested opportunities:</p>
        <ul className="list-disc pl-5">{gaps.extra.map((g) => <li key={g}>{g}</li>)}</ul>
      </ResultBox>
    </ToolShell>
  );
}
