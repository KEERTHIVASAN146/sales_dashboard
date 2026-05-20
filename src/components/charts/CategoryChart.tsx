"use client";

import {
  RadialBarChart,
  RadialBar,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { CategorySale, ChartType } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface CategoryChartProps {
  data: CategorySale[];
  chartType: ChartType;
}

export default function CategoryChart({ data, chartType }: CategoryChartProps) {
  const total = data.reduce((s, d) => s + d.revenue, 0);

  const radialData = data.map((d) => ({
    ...d,
    fill: d.color,
    pct: ((d.revenue / total) * 100).toFixed(1),
  }));

  return (
    <div className="card animate-fade-up animate-fade-up-delay-3">
      <div className="card-header">
        <h2 className="text-sm font-semibold text-slate-200">Revenue by Category</h2>
        <p className="text-xs text-slate-500 mt-0.5">Product mix breakdown</p>
      </div>
      <div className="card-body">
        {chartType === "bar" ? (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 16, top: 4, bottom: 4 }}>
              <XAxis type="number" tickFormatter={(v) => formatCurrency(v)} tick={{ fill: "#94a3b8", fontSize: 11 }} />
              <YAxis type="category" dataKey="category" width={120} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12 }}
              />
              <Bar dataKey="revenue" radius={[0, 4, 4, 0]} maxBarSize={28}>
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : chartType === "pie" ? (
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                dataKey="revenue"
                nameKey="category"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12 }}
              />
              <Legend
                formatter={(value) => <span style={{ color: "#cbd5e1", fontSize: 12 }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          /* Line → Radial for category makes more visual sense */
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius={30}
              outerRadius={95}
              data={radialData}
              startAngle={90}
              endAngle={-270}
            >
              <RadialBar dataKey="revenue" cornerRadius={6} background={{ fill: "#1e293b" }} />
              <Legend
                iconSize={10}
                formatter={(value) => <span style={{ color: "#cbd5e1", fontSize: 12 }}>{value}</span>}
              />
              <Tooltip
                formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 12 }}
              />
            </RadialBarChart>
          </ResponsiveContainer>
        )}

        {/* Legend table */}
        <div className="mt-4 space-y-2">
          {data.map((cat) => (
            <div key={cat.category} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                <span className="text-slate-400">{cat.category}</span>
              </div>
              <div className="flex items-center gap-4 text-right">
                <span className="text-slate-500">{formatNumber(cat.units)} units</span>
                <span className="text-slate-200 font-semibold w-24">{formatCurrency(cat.revenue)}</span>
                <span className="text-slate-500 w-10">
                  {((cat.revenue / total) * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
