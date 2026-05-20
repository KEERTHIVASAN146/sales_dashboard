"use client";

import { Year } from "@/types";

const YEARS: Year[] = ["2022", "2023", "2024"];

interface YearSelectorProps {
  selected: Year;
  onChange: (year: Year) => void;
}

export default function YearSelector({ selected, onChange }: YearSelectorProps) {
  return (
    <div className="inline-flex items-center gap-1 bg-surface-900 border border-slate-800 rounded-xl p-1">
      {YEARS.map((year) => (
        <button
          key={year}
          onClick={() => onChange(year)}
          className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            selected === year
              ? "bg-brand-600 text-white shadow-lg shadow-brand-600/20"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
