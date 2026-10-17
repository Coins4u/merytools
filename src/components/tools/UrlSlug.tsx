"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput } from "./shared";

export function UrlSlug() {
  const [input, setInput] = useState("Technical SEO Audit Services 2026!");

  const slug = useMemo(() => input.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 60), [input]);
  const score = slug.length >= 3 && slug.length <= 50 && !slug.includes("--") ? 90 : 65;

  return (
    <ToolShell title="URL Slug Optimizer" description="Create clean, keyword-rich URL slugs." healthScore={score}
      getReportData={() => ({ toolName: "URL Slug Optimizer", healthScore: score, results: { original: input, optimizedSlug: slug, length: slug.length }, nextSteps: ["Use lowercase hyphenated slugs only.", "Keep slugs under 50 characters when possible.", "Avoid dates unless content is time-sensitive."] })}>
      <ToolInput label="Page Title or Phrase" id="us-input" value={input} onChange={(e) => setInput(e.target.value)} />
      <ResultBox><p className="font-mono text-accent">/{slug}</p><p className="mt-2 text-slate-500">{slug.length} characters</p></ResultBox>
    </ToolShell>
  );
}
