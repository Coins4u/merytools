"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolTextarea } from "./shared";

export function SitemapValidator() {
  const [xml, setXml] = useState("");

  const analysis = useMemo(() => {
    const hasUrlset = xml.includes("<urlset") || xml.includes(":urlset");
    const urlCount = (xml.match(/<loc>/gi) || []).length;
    const hasLastmod = xml.includes("<lastmod>");
    const hasPriority = xml.includes("<priority>");
    let score = 30;
    if (hasUrlset) score += 30;
    if (urlCount > 0) score += Math.min(30, urlCount * 2);
    if (hasLastmod) score += 10;
    if (hasPriority) score += 10;
    return { hasUrlset, urlCount, hasLastmod, hasPriority, score: Math.min(100, score) };
  }, [xml]);

  return (
    <ToolShell
      title="Sitemap Validator"
      description="Paste XML sitemap content to validate structure."
      healthScore={analysis.score}
      getReportData={() => ({
        toolName: "Sitemap Validator",
        healthScore: analysis.score,
        results: {
          validUrlset: analysis.hasUrlset ? "Yes" : "No",
          urlsFound: analysis.urlCount,
          hasLastmod: analysis.hasLastmod ? "Yes" : "No",
          hasPriority: analysis.hasPriority ? "Yes" : "No",
        },
        nextSteps: DEFAULT_NEXT_STEPS_SITEMAP,
      })}
    >
      <ToolTextarea label="XML Sitemap" id="sv-xml" value={xml} onChange={(e) => setXml(e.target.value)} placeholder='<?xml version="1.0"...' />
      <ResultBox>
        <p>Valid urlset: {analysis.hasUrlset ? "Yes" : "No"}</p>
        <p>URLs found: {analysis.urlCount}</p>
        <p>lastmod tags: {analysis.hasLastmod ? "Present" : "Missing"}</p>
      </ResultBox>
    </ToolShell>
  );
}

const DEFAULT_NEXT_STEPS_SITEMAP = [
  "Submit validated sitemap in Google Search Console.",
  "Remove blocked or noindex URLs from the sitemap.",
  "Update lastmod when content materially changes.",
];
