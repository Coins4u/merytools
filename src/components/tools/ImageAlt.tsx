"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolTextarea } from "./shared";

export function ImageAlt() {
  const [alts, setAlts] = useState("team photo\nchart showing traffic growth\nclick here");

  const analysis = useMemo(() => {
    const lines = alts.split("\n").filter((l) => l.trim());
    const scored = lines.map((alt) => {
      const len = alt.length;
      const generic = /^(image|photo|img|pic|click here|\d+)$/i.test(alt.trim());
      let s = 50;
      if (len >= 5 && len <= 125) s += 30;
      if (!generic) s += 20;
      return { alt, score: s, ok: s >= 80 };
    });
    const avg = scored.length ? Math.round(scored.reduce((a, b) => a + b.score, 0) / scored.length) : 0;
    return { scored, avg, missing: lines.length };
  }, [alts]);

  return (
    <ToolShell title="Image Alt-Text Auditor" description="Score image alt attributes (one per line)." healthScore={analysis.avg}
      getReportData={() => ({ toolName: "Image Alt-Text Auditor", healthScore: analysis.avg, results: { imagesAudited: analysis.missing, averageScore: analysis.avg }, nextSteps: ["Describe image content and context.", "Avoid keyword stuffing in alt text.", "Leave decorative images with empty alt=\"\"." ] })}>
      <ToolTextarea label="Alt texts (one per line)" id="ia-alts" value={alts} onChange={(e) => setAlts(e.target.value)} rows={5} />
      <ResultBox>
        {analysis.scored.map((item, i) => (
          <p key={i} className={item.ok ? "text-green-700" : "text-amber-700"}>{item.ok ? "✓" : "△"} {item.alt} — {item.score}/100</p>
        ))}
      </ResultBox>
    </ToolShell>
  );
}
