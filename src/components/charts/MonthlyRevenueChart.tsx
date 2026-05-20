"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps,
} from "recharts";
import { MonthlySale, ChartType } from "@/types";
import { formatCurrency } from "@/lib/utils";

// ─── Custom Tooltip ────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-surface-800 border border-slate-700 rounded-xl p-3 shadow-xl text-sm">
      <p className="text-slate-400 mb-2 font-medium">{label}</p>
      {payload.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ background: entry.color }}
          />
          <span className="text-slate-300 capitalize">{entry.name}:</span>
          <span className="text-slate-100 font-semibold">
            {entry.name === "units"
              ? new Intl.NumberFormat("en-US").format(entry.value as number)
              : formatCurrency(entry.value as number)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Pie label ─────────────────────────────────────────────────────────
const RADIAN = Math.PI / 180;
function PieLabel({
  cx, cy, midAngle, innerRadius, outerRadius, percent, name,
}: {
  cx: number; cy: number; midAngle: number;
  innerRadius: number; outerRadius: number; percent: number; name: string;
}) {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  if (percent < 0.07) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
}

// ─── Props ─────────────────────────────────────────────────────────────
interface MonthlyRevenueChartProps {
  data: MonthlySale[];
  chartType: ChartType;
  year: string;
}

const PIE_COLORS = ["#0ea5e9","#6366f1","#10b981","#f59e0b","#ef4444","#8b5cf6","#f97316","#14b8a6","#84cc16","#e879f9","#fb923c","#a78bfa"];

export default function MonthlyRevenueChart({
  data,
  chartType,
  year,
}: MonthlyRevenueChartProps) {
  const pieData = data.map((d) => ({ name: d.month, value: d.revenue }));

  return (
    <div className="card animate-fade-up animate-fade-up-delay-2">
      <div className="card-header">
        <h2 className="text-sm font-semibold text-slate-200">
          Monthly Revenue — {year}
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          {data.length} months shown after threshold filter
        </p>
      </div>
      <div className="card-body">
        <ResponsiveContainer width="100%" height={280}>
          {chartType === "pie" ? (
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                labelLine={false}
                label={PieLabel as never}
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(val: number) => [formatCurrency(val), "Revenue"]}
                contentStyle={{
                  background: "#1e293b",
                  border: "1px solid #334155",
                  borderRadius: "12px",
                }}
                labelStyle={{ color: "#94a3b8" }}
              />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "#cbd5e1", fontSize: 12 }}>{value}</span>
                )}
              />
            </PieChart>
          ) : chartType === "line" ? (
            <LineChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: "#94a3b8", fontSize: 11 }} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ color: "#cbd5e1", fontSize: 12 }}>{v}</span>} />
              <Line type="monotone" dataKey="revenue" name="revenue" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4, fill: "#0ea5e9" }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="profit"  name="profit"  stroke="#10b981" strokeWidth={2}   dot={{ r: 3, fill: "#10b981" }} strokeDasharray="5 3" />
            </LineChart>
          ) : (
            <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis tickFormatter={(v) => formatCurrency(v)} tick={{ fill: "#94a3b8", fontSize: 11 }} width={70} />
              <Tooltip content={<CustomTooltip />} />
              <Legend formatter={(v) => <span style={{ color: "#cbd5e1", fontSize: 12 }}>{v}</span>} />
              <Bar dataKey="revenue" name="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} maxBarSize={40} />
              <Bar dataKey="profit"  name="profit"  fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
