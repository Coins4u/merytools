"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput } from "./shared";

export function CanonicalLink() {
  const [pageUrl, setPageUrl] = useState("https://example.com/blog/post?utm=1");
  const [canonical, setCanonical] = useState("https://example.com/blog/post");

  const analysis = useMemo(() => {
    try {
      const page = new URL(pageUrl);
      const can = new URL(canonical);
      const sameHost = page.hostname === can.hostname;
      const pageClean = page.origin + page.pathname;
      const canClean = can.origin + can.pathname;
      const match = pageClean === canClean;
      let score = 40;
      if (sameHost) score += 30;
      if (match) score += 30;
      return { sameHost, match, score: Math.min(100, score), tag: `<link rel="canonical" href="${canonical}" />` };
    } catch {
      return { sameHost: false, match: false, score: 25, tag: "" };
    }
  }, [pageUrl, canonical]);

  return (
    <ToolShell title="Canonical Link Verifier" description="Verify canonical URL implementation." healthScore={analysis.score}
      getReportData={() => ({ toolName: "Canonical Link Verifier", healthScore: analysis.score, results: { sameHost: analysis.sameHost ? "Yes" : "No", pathMatch: analysis.match ? "Yes" : "No" }, nextSteps: ["Point canonicals to the preferred HTTPS URL.", "Self-reference canonical on indexable pages.", "Consolidate parameterized duplicates to one URL."] })}>
      <ToolInput label="Current Page URL" id="cl-page" value={pageUrl} onChange={(e) => setPageUrl(e.target.value)} />
      <ToolInput label="Canonical URL" id="cl-can" value={canonical} onChange={(e) => setCanonical(e.target.value)} />
      <ResultBox><p>Host match: {analysis.sameHost ? "Yes" : "No"}</p><p>Path match: {analysis.match ? "Yes" : "No"}</p>{analysis.tag && <pre className="mt-2 text-xs">{analysis.tag}</pre>}</ResultBox>
    </ToolShell>
  );
}
