// ─── Sales Data Types ────────────────────────────────────────────────
export type Year = "2022" | "2023" | "2024";

export type ChartType = "bar" | "line" | "pie";

export interface MonthlySale {
  month: string;
  revenue: number;
  units: number;
  profit: number;
}

export interface CategorySale {
  category: string;
  revenue: number;
  units: number;
  color: string;
}

export interface YearlySummary {
  year: Year;
  totalRevenue: number;
  totalUnits: number;
  totalProfit: number;
  growth: number; // % vs previous year
  monthly: MonthlySale[];
  byCategory: CategorySale[];
}

export interface SalesDataStore {
  "2022": YearlySummary;
  "2023": YearlySummary;
  "2024": YearlySummary;
}

// ─── API Response ─────────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

// ─── Filter State ─────────────────────────────────────────────────────
export interface FilterState {
  year: Year;
  chartType: ChartType;
  threshold: number; // user-defined min revenue threshold
}
