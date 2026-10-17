"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput } from "./shared";

export function HealthScorer() {
  const [https, setHttps] = useState(true);
  const [mobile, setMobile] = useState(true);
  const [sitemap, setSitemap] = useState(true);
  const [schema, setSchema] = useState(false);
  const [speed, setSpeed] = useState(72);
  const [domain, setDomain] = useState("example.com");

  const score = useMemo(() => {
    let s = 0;
    if (https) s += 20;
    if (mobile) s += 20;
    if (sitemap) s += 15;
    if (schema) s += 15;
    s += Math.min(30, Math.round(speed * 0.3));
    return Math.min(100, s);
  }, [https, mobile, sitemap, schema, speed]);

  return (
    <ToolShell title="Full Technical SEO Health Scorer" description="Comprehensive technical SEO audit score." healthScore={score}
      getReportData={() => ({ toolName: "Full Technical SEO Health Scorer", healthScore: score, results: { domain, httpsEnabled: https ? "Yes" : "No", mobileFriendly: mobile ? "Yes" : "No", sitemapPresent: sitemap ? "Yes" : "No", structuredData: schema ? "Yes" : "No", performanceScore: speed }, nextSteps: ["Address failed fundamentals before advanced tactics.", "Prioritize indexation and crawlability fixes.", "Book a full consulting audit for custom roadmap."] })}>
      <ToolInput label="Domain" id="hs-domain" value={domain} onChange={(e) => setDomain(e.target.value)} />
      <div className="grid gap-3 sm:grid-cols-2">
        {[
          { label: "HTTPS enabled", checked: https, set: setHttps },
          { label: "Mobile-friendly", checked: mobile, set: setMobile },
          { label: "XML sitemap submitted", checked: sitemap, set: setSitemap },
          { label: "Structured data live", checked: schema, set: setSchema },
        ].map((item) => (
          <label key={item.label} className="flex items-center gap-2 text-sm text-slate-700">
            <input type="checkbox" checked={item.checked} onChange={(e) => item.set(e.target.checked)} className="h-4 w-4 rounded text-accent" />
            {item.label}
          </label>
        ))}
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">Performance score (0–100): {speed}</label>
        <input type="range" min={0} max={100} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full accent-accent" />
      </div>
      <ResultBox><p className="text-lg font-semibold text-accent">Overall Technical Health: {score}/100</p></ResultBox>
    </ToolShell>
  );
}
