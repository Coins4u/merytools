"use client";

import { Download, Loader2 } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { downloadStrategyReport } from "@/lib/pdf-report";
import type { ToolReportData } from "@/lib/types";

interface ToolShellProps {
  title: string;
  description: string;
  children: ReactNode;
  getReportData: () => ToolReportData;
  healthScore: number;
}

export function ToolShell({
  title,
  description,
  children,
  getReportData,
  healthScore,
}: ToolShellProps) {
  const [downloading, setDownloading] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadStrategyReport(getReportData(), captureRef.current);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>

      <div ref={captureRef} className="space-y-4">
        {children}
      </div>

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Health Score</span>
          <span className="font-semibold text-accent">{healthScore}/100</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-accent transition-all duration-500"
            style={{ width: `${healthScore}%` }}
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleDownload}
        disabled={downloading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-dark disabled:opacity-60 sm:w-auto"
      >
        {downloading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Download className="h-4 w-4" aria-hidden />
        )}
        Download Professional Strategy Report
      </button>
    </div>
  );
}
