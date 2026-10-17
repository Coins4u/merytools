"use client";

import { useMemo, useState } from "react";
import { ToolShell } from "./ToolShell";
import { ResultBox, ToolTextarea } from "./shared";

function countSyllables(word: string): number {
  word = word.toLowerCase().replace(/[^a-z]/g, "");
  if (word.length <= 3) return 1;
  return Math.max(1, (word.match(/[aeiouy]+/g) || []).length);
}

export function Readability() {
  const [text, setText] = useState("");

  const analysis = useMemo(() => {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim()).length || 1;
    const words = text.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length || 1;
    const syllables = words.reduce((a, w) => a + countSyllables(w), 0);
    const flesch = 206.835 - 1.015 * (wordCount / sentences) - 84.6 * (syllables / wordCount);
    const score = Math.round(Math.min(100, Math.max(0, flesch)));
    const grade = score >= 70 ? "Easy" : score >= 50 ? "Standard" : "Difficult";
    return { wordCount, sentences, score, grade };
  }, [text]);

  return (
    <ToolShell title="Content Readability Scorer" description="Flesch Reading Ease approximation." healthScore={analysis.score}
      getReportData={() => ({ toolName: "Content Readability Scorer", healthScore: analysis.score, results: { wordCount: analysis.wordCount, sentences: analysis.sentences, readingEase: analysis.score, grade: analysis.grade }, nextSteps: ["Target 60–70 reading ease for general audiences.", "Shorten sentences over 25 words.", "Use bullet lists for scanability."] })}>
      <ToolTextarea label="Content" id="read-text" value={text} onChange={(e) => setText(e.target.value)} rows={8} placeholder="Paste article copy..." />
      <ResultBox>
        <p>Reading Ease: {analysis.score}/100 ({analysis.grade})</p>
        <p>Words: {analysis.wordCount} · Sentences: {analysis.sentences}</p>
      </ResultBox>
    </ToolShell>
  );
}
