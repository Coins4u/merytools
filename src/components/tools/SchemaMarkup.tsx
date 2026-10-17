"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput } from "./shared";

export function SchemaMarkup() {
  const [name, setName] = useState("Mery SEO Tools");
  const [url, setUrl] = useState("https://example.com");
  const [type, setType] = useState("ProfessionalService");

  const jsonLd = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": type,
    name,
    url,
    description: "Independent Technical SEO consulting and strategy reports.",
    provider: { "@type": "Person", name: "Mery" },
  }, null, 2), [name, url, type]);

  return (
    <ToolShell title="Schema Markup Builder" description="Build JSON-LD structured data." healthScore={name && url ? 92 : 60}
      getReportData={() => ({ toolName: "Schema Markup Builder", healthScore: 92, results: { schemaType: type, name, url }, nextSteps: ["Embed JSON-LD in page head or body.", "Validate with Google Rich Results Test.", "Match schema to visible on-page content."] })}>
      <ToolInput label="Business Name" id="sm-name" value={name} onChange={(e) => setName(e.target.value)} />
      <ToolInput label="Website URL" id="sm-url" value={url} onChange={(e) => setUrl(e.target.value)} />
      <div><label className="mb-1 block text-sm font-medium text-slate-700">Schema Type</label>
        <select className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="ProfessionalService">ProfessionalService</option>
          <option value="LocalBusiness">LocalBusiness</option>
          <option value="WebSite">WebSite</option>
        </select></div>
      <ResultBox><pre className="max-h-48 overflow-auto text-xs">{jsonLd}</pre></ResultBox>
    </ToolShell>
  );
}
