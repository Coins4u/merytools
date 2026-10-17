"use client";

import { useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox } from "./shared";

const CHECKS = [
  { id: "viewport", label: "Viewport meta tag configured" },
  { id: "tap", label: "Tap targets at least 48px" },
  { id: "font", label: "Base font size 16px+ on mobile" },
  { id: "cls", label: "No layout shift from ads/embeds" },
  { id: "speed", label: "LCP under 2.5s on mobile" },
  { id: "popups", label: "No intrusive interstitials" },
];

export function MobileChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const done = CHECKS.filter((c) => checked[c.id]).length;
  const score = Math.round((done / CHECKS.length) * 100);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <ToolShell title="Mobile-Friendly Checklist" description="Run mobile UX and performance checks." healthScore={score}
      getReportData={() => ({ toolName: "Mobile-Friendly Checklist", healthScore: score, results: { itemsPassed: done, totalItems: CHECKS.length, completionPercent: `${score}%` }, nextSteps: ["Fix failed items before next Core Web Vitals check.", "Test on real devices, not emulators only.", "Use Search Console Mobile Usability report."] })}>
      <ul className="space-y-3">
        {CHECKS.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-200 p-3 hover:bg-slate-50">
              <input type="checkbox" checked={!!checked[item.id]} onChange={() => toggle(item.id)} className="mt-1 h-4 w-4 rounded border-slate-300 text-accent focus:ring-accent" />
              <span className="text-sm text-slate-700">{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
      <ResultBox><p>{done} of {CHECKS.length} checks passed ({score}%)</p></ResultBox>
    </ToolShell>
  );
}
