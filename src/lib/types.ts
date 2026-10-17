export type PlanLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type ToolCategory = "technical" | "onpage" | "content" | "advanced";

export interface ToolDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  premium?: boolean;
}

export interface ConsultingPlan {
  id: string;
  tier: PlanLevel;
  name: string;
  tagline: string;
  price: number;
  toolsUnlocked: number;
  accessToken: string;
  features: string[];
  deliverables: string[];
  checkoutUrl: string;
  popular?: boolean;
  bestValue?: boolean;
}

export interface ToolReportData {
  toolName: string;
  results: Record<string, string | number | boolean>;
  healthScore: number;
  nextSteps: string[];
}

export interface InvoiceRequest {
  name: string;
  email: string;
  planId: string;
}
