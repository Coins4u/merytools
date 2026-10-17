"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolInput, ToolTextarea } from "./shared";
import type { ToolReportData } from "@/lib/types";

type FieldType = "input" | "textarea";

export interface AnalyzerField {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  defaultValue?: string;
}

export interface AnalyzerConfig {
  title: string;
  description: string;
  fields: AnalyzerField[];
  analyze: (values: Record<string, string>) => {
    results: Record<string, string | number>;
    score: number;
    steps: string[];
  };
}

export function createAnalyzerTool(config: AnalyzerConfig) {
  return function AnalyzerTool() {
    const initial = Object.fromEntries(
      config.fields.map((f) => [f.key, f.defaultValue ?? ""])
    );
    const [values, setValues] = useState(initial);

    const analysis = useMemo(() => config.analyze(values), [values]);

    const getReportData = (): ToolReportData => ({
      toolName: config.title,
      healthScore: analysis.score,
      results: analysis.results,
      nextSteps: analysis.steps,
    });

    return (
      <ToolShell
        title={config.title}
        description={config.description}
        healthScore={analysis.score}
        getReportData={getReportData}
      >
        <div className="space-y-4">
          {config.fields.map((field) =>
            field.type === "textarea" ? (
              <ToolTextarea
                key={field.key}
                id={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
                rows={4}
              />
            ) : (
              <ToolInput
                key={field.key}
                id={field.key}
                label={field.label}
                placeholder={field.placeholder}
                value={values[field.key]}
                onChange={(e) => setValues((v) => ({ ...v, [field.key]: e.target.value }))}
              />
            )
          )}
          <ResultBox>
            {Object.entries(analysis.results).map(([k, v]) => (
              <p key={k}>
                <span className="font-medium capitalize">{k.replace(/([A-Z])/g, " $1")}: </span>
                {String(v)}
              </p>
            ))}
          </ResultBox>
        </div>
      </ToolShell>
    );
  };
}
