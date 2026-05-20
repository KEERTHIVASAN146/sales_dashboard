"use client";

import { BarChart2, LineChart, PieChart } from "lucide-react";
import { ChartType } from "@/types";

const CHART_TYPES: { type: ChartType; label: string; Icon: React.ElementType }[] = [
  { type: "bar",  label: "Bar",  Icon: BarChart2  },
  { type: "line", label: "Line", Icon: LineChart  },
  { type: "pie",  label: "Pie",  Icon: PieChart   },
];

interface ChartTypeSelectorProps {
  selected: ChartType;
  onChange: (type: ChartType) => void;
}

export default function ChartTypeSelector({
  selected,
  onChange,
}: ChartTypeSelectorProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-surface-900 border border-slate-800 rounded-xl p-1">
      {CHART_TYPES.map(({ type, label, Icon }) => (
        <button
          key={type}
          onClick={() => onChange(type)}
          title={`${label} chart`}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            selected === type
              ? "bg-slate-700 text-slate-100"
              : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/50"
          }`}
        >
          <Icon size={15} />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
