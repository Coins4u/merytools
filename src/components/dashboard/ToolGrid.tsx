"use client";

import {
  Activity,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  Copy,
  FileSearch,
  Files,
  Gauge,
  GitBranch,
  Globe,
  HelpCircle,
  Image,
  Link as LinkIcon,
  Link2,
  ListTree,
  Lock,
  Map,
  MapPin,
  Network,
  Search,
  Share2,
  Smartphone,
  Sparkles,
  Tags,
  Target,
  Timer,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useState } from "react";
import { usePlan } from "@/context/PlanContext";
import { isToolUnlocked } from "@/lib/membership";
import { CATEGORY_LABELS, SEO_TOOLS, TOTAL_SEO_TOOLS } from "@/lib/tools";
import { TOOL_COMPONENTS } from "@/components/tools";
import Link from "next/link";

const ICON_MAP: Record<string, LucideIcon> = {
  Tags, Map, BarChart3, Bot, Code2, Link: LinkIcon, ListTree, Image, CheckCircle2, Share2,
  Target, Sparkles, BookOpen, Smartphone, Activity, Gauge, Globe, Network, Timer, Copy, Search,
  Award, Link2, FileSearch, Files, HelpCircle, MapPin, FileText, Brain, GitBranch,
};

export function ToolGrid() {
  const { planLevel, unlockedCount, isActive, daysRemaining } = usePlan();
  const [activeId, setActiveId] = useState<string | null>(SEO_TOOLS[0]?.id ?? null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return SEO_TOOLS.filter((tool) => {
      const matchCat = category === "all" || tool.category === category;
      const q = search.toLowerCase();
      const matchSearch =
        !q || tool.name.toLowerCase().includes(q) || tool.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const activeTool = SEO_TOOLS.find((t) => t.id === activeId);
  const activeIndex = SEO_TOOLS.findIndex((t) => t.id === activeId);
  const ActiveComponent = activeId ? TOOL_COMPONENTS[activeId] : null;
  const unlocked = activeIndex >= 0 && isToolUnlocked(activeIndex, planLevel);

  const categories = ["all", ...Object.keys(CATEGORY_LABELS)];

  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Pro workspace</p>
            <h3 className="text-lg font-bold text-white">Strategy Report Generators</h3>
            <p className="mt-1 text-sm text-slate-400">
              {unlockedCount} of {TOTAL_SEO_TOOLS} tools active
              {isActive ? ` · ${daysRemaining} days remaining on pass` : ` · ${TOTAL_SEO_TOOLS - unlockedCount} locked`}
            </p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700 sm:max-w-xs">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-500"
              style={{ width: `${(unlockedCount / TOTAL_SEO_TOOLS) * 100}%` }}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search generators..."
            className="flex-1 rounded-xl border border-slate-700 bg-slate-800/80 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All categories" : CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,300px)_1fr]">
        <div className="max-h-[65vh] overflow-y-auto border-b border-slate-800 lg:border-b-0 lg:border-r">
          {filtered.map((tool) => {
            const index = SEO_TOOLS.findIndex((t) => t.id === tool.id);
            const toolUnlocked = isToolUnlocked(index, planLevel);
            const Icon = ICON_MAP[tool.icon] ?? Activity;
            const isActive = tool.id === activeId;

            return (
              <button
                key={tool.id}
                type="button"
                onClick={() => setActiveId(tool.id)}
                className={`relative flex w-full items-start gap-3 border-b border-slate-800/80 px-4 py-3.5 text-left transition ${
                  isActive ? "bg-emerald-950/50" : "hover:bg-slate-800/50"
                }`}
              >
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                    toolUnlocked ? "bg-emerald-500/20 text-emerald-400" : "bg-slate-800 text-slate-500"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </div>
                <div className="min-w-0 flex-1 pr-6">
                  <p className={`text-sm font-medium ${toolUnlocked ? "text-white" : "text-slate-500"}`}>
                    {tool.name}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">{tool.description}</p>
                  <span className="mt-1 inline-block text-[10px] uppercase tracking-wide text-slate-600">
                    {CATEGORY_LABELS[tool.category]}
                    {tool.premium && " · Tier 8"}
                  </span>
                </div>
                {!toolUnlocked && <Lock className="absolute right-3 top-4 h-3.5 w-3.5 text-slate-600" />}
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[380px] bg-slate-950 p-4 sm:p-8">
          {activeTool && !unlocked && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-950/95 p-6 text-center backdrop-blur-sm">
              <div className="rounded-full bg-slate-800 p-4">
                <Lock className="h-10 w-10 text-emerald-500/60" aria-hidden />
              </div>
              <p className="mt-4 text-xl font-semibold text-white">Generator locked</p>
              <p className="mt-2 max-w-sm text-sm text-slate-400">
                {activeTool.premium
                  ? "This enterprise tool requires the Ultimate Partner Pass (Tier 8)."
                  : "Upgrade your Consulting Pass or renew after expiry to unlock this generator."}
              </p>
              <Link
                href="/pricing"
                className="mt-6 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
              >
                View passes
              </Link>
            </div>
          )}

          {activeTool && ActiveComponent && unlocked ? (
            <div className="rounded-xl border border-slate-800 bg-white p-4 shadow-xl sm:p-6">
              <ActiveComponent />
            </div>
          ) : (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center text-center text-slate-500">
              <Sparkles className="h-10 w-10 text-emerald-600/40" aria-hidden />
              <p className="mt-4 text-sm">Select a generator from the library to run your audit.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
