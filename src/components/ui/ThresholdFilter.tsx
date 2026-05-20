"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

interface ThresholdFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export default function ThresholdFilter({ value, onChange }: ThresholdFilterProps) {
  const [raw, setRaw] = useState(String(value));

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRaw(e.target.value);
    const parsed = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (!isNaN(parsed)) onChange(parsed);
  }

  function handleBlur() {
    // Normalise display on blur
    setRaw(String(value));
  }

  return (
    <div className="flex items-center gap-2">
      <SlidersHorizontal size={15} className="text-slate-500 shrink-0" />
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm pointer-events-none">
          $
        </span>
        <input
          type="text"
          inputMode="numeric"
          value={raw}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0"
          title="Minimum monthly revenue threshold"
          className="input pl-6 w-36"
        />
      </div>
      <span className="text-xs text-slate-500 hidden sm:block">min revenue</span>
    </div>
  );
}
