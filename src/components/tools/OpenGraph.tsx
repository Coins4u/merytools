"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput, ToolTextarea } from "./shared";

export function OpenGraph() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const score = useMemo(() => {
    let s = 30;
    if (title.length >= 10) s += 25;
    if (description.length >= 50) s += 25;
    if (image.startsWith("http")) s += 20;
    return Math.min(100, s);
  }, [title, description, image]);

  return (
    <ToolShell title="OpenGraph Social Previewer" description="Preview social sharing metadata." healthScore={score}
      getReportData={() => ({ toolName: "OpenGraph Social Previewer", healthScore: score, results: { ogTitle: title || "(empty)", ogDescriptionLength: description.length, ogImage: image ? "Set" : "Missing" }, nextSteps: ["Use 1200×630px images for og:image.", "Keep og:title under 60 characters.", "Match og:description to meta description intent."] })}>
      <div className="space-y-4">
        <ToolInput label="og:title" id="og-title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <ToolTextarea label="og:description" id="og-desc" value={description} onChange={(e) => setDescription(e.target.value)} />
        <ToolInput label="og:image URL" id="og-img" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://..." />
        <div className="rounded-lg border border-slate-200 overflow-hidden max-w-md">
          {image && <div className="h-32 bg-slate-200 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />}
          <div className="p-3 bg-white">
            <p className="text-xs text-slate-500 uppercase">example.com</p>
            <p className="font-semibold text-slate-900 truncate">{title || "Page Title"}</p>
            <p className="text-sm text-slate-600 line-clamp-2">{description || "Description preview..."}</p>
          </div>
        </div>
        <ResultBox><p>Readiness score based on completeness of OG tags.</p></ResultBox>
      </div>
    </ToolShell>
  );
}
