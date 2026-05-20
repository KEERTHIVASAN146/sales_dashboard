"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ChartType, SalesDataStore } from "@/types";
import { formatCurrency } from "@/lib/utils";

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

interface YoYChartProps {
  allData: SalesDataStore;
  chartType: ChartType;
}

export default function YoYComparisonChart({ allData, chartType }: YoYChartProps) {
  // Build month-indexed dataset for all 3 years
  const combined = MONTHS.map((month, idx) => ({
    month,
    "2022": allData["2022"].monthly[idx]?.revenue ?? 0,
    "2023": allData["2023"].monthly[idx]?.revenue ?? 0,
    "2024": allData["2024"].monthly[idx]?.revenue ?? 0,
  }));

  const sharedProps = {
    data: combined,
    margin: { top: 5, right: 10, left: 0, bottom: 5 },
  };

  const axes = (
    <>
      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
      <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
      <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: "#94a3b8", fontSize: 11 }} width={70} />
      <Tooltip
        formatter={(v: number, name: string) => [formatCurrency(v), name]}
        contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12 }}
        labelStyle={{ color: "#94a3b8", fontWeight: 600 }}
      />
      <Legend formatter={(v) => <span style={{ color: "#cbd5e1", fontSize: 12 }}>{v}</span>} />
    </>
  );

  return (
    <div className="card animate-fade-up animate-fade-up-delay-4">
      <div className="card-header">
        <h2 className="text-sm font-semibold text-slate-200">Year-over-Year Comparison</h2>
        <p className="text-xs text-slate-500 mt-0.5">Monthly revenue across all three years</p>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={260}>
          {chartType === "line" ? (
            <LineChart {...sharedProps}>
              {axes}
              <Line type="monotone" dataKey="2022" stroke="#6366f1" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="2023" stroke="#0ea5e9" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="2024" stroke="#10b981" strokeWidth={2.5} dot={false} />
            </LineChart>
          ) : (
            <BarChart {...sharedProps}>
              {axes}
              <Bar dataKey="2022" fill="#6366f1" radius={[3, 3, 0, 0]} maxBarSize={18} />
              <Bar dataKey="2023" fill="#0ea5e9" radius={[3, 3, 0, 0]} maxBarSize={18} />
              <Bar dataKey="2024" fill="#10b981" radius={[3, 3, 0, 0]} maxBarSize={18} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
