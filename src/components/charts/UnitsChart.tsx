"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MonthlySale, ChartType } from "@/types";
import { formatNumber } from "@/lib/utils";

interface UnitsChartProps {
  data: MonthlySale[];
  chartType: ChartType;
}

export default function UnitsChart({ data, chartType }: UnitsChartProps) {
  return (
    <div className="card animate-fade-up animate-fade-up-delay-3">
      <div className="card-header">
        <h2 className="text-sm font-semibold text-slate-200">Units Sold</h2>
        <p className="text-xs text-slate-500 mt-0.5">Monthly unit volume</p>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={200}>
          {chartType === "bar" ? (
            <BarChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tickFormatter={(v) => formatNumber(v)} tick={{ fill: "#94a3b8", fontSize: 10 }} width={52} />
              <Tooltip
                formatter={(v: number) => [formatNumber(v), "Units"]}
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12 }}
              />
              <Bar dataKey="units" fill="#6366f1" radius={[4, 4, 0, 0]} maxBarSize={36} />
            </BarChart>
          ) : (
            <AreaChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <defs>
                <linearGradient id="unitsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis tickFormatter={(v) => formatNumber(v)} tick={{ fill: "#94a3b8", fontSize: 10 }} width={52} />
              <Tooltip
                formatter={(v: number) => [formatNumber(v), "Units"]}
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12 }}
              />
              <Area type="monotone" dataKey="units" stroke="#6366f1" strokeWidth={2} fill="url(#unitsGrad)" />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
