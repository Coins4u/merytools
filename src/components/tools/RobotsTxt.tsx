"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput } from "./shared";

export function RobotsTxt() {
  const [sitemap, setSitemap] = useState("https://example.com/sitemap.xml");
  const [disallow, setDisallow] = useState("/admin/\n/wp-admin/");

  const output = useMemo(() => {
    const lines = ["User-agent: *"];
    disallow.split("\n").filter((l) => l.trim()).forEach((path) => lines.push(`Disallow: ${path.trim()}`));
    lines.push("", `Sitemap: ${sitemap.trim()}`);
    return lines.join("\n");
  }, [sitemap, disallow]);

  const score = sitemap.startsWith("http") ? 88 : 55;

  return (
    <ToolShell title="Robot.txt Generator" description="Generate crawl directives for search bots." healthScore={score}
      getReportData={() => ({ toolName: "Robot.txt Generator", healthScore: score, results: { sitemapDeclared: sitemap ? "Yes" : "No", disallowRules: disallow.split("\n").filter(Boolean).length }, nextSteps: ["Upload robots.txt to site root.", "Verify in Search Console robots tester.", "Never block CSS/JS needed for rendering."] })}>
      <ToolInput label="Sitemap URL" id="rt-sitemap" value={sitemap} onChange={(e) => setSitemap(e.target.value)} />
      <div><label className="mb-1 block text-sm font-medium text-slate-700">Disallow paths (one per line)</label>
        <textarea className="w-full rounded-lg border border-slate-300 px-3 py-2 font-mono text-sm" rows={4} value={disallow} onChange={(e) => setDisallow(e.target.value)} /></div>
      <ResultBox><pre className="whitespace-pre-wrap text-xs">{output}</pre></ResultBox>
    </ToolShell>
  );
}
