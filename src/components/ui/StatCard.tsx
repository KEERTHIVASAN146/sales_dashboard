"use client";

import { ReactNode } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change?: number; // percentage change
  icon: ReactNode;
  accentColor?: string;
  delay?: number;
}

export default function StatCard({
  title,
  value,
  change,
  icon,
  accentColor = "#0ea5e9",
  delay = 0,
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;
  const isNeutral = change === undefined || change === 0;

  return (
    <div
      className="card animate-fade-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="card-body flex items-start justify-between gap-4">
        {/* Icon */}
        <div
          className="p-3 rounded-xl shrink-0"
          style={{ background: `${accentColor}18` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-slate-100 leading-tight truncate">
            {value}
          </p>

          {/* Change badge */}
          {change !== undefined && (
            <div className="mt-2 inline-flex items-center gap-1 text-xs font-medium">
              {isPositive && (
                <>
                  <TrendingUp size={12} className="text-emerald-400" />
                  <span className="text-emerald-400">+{change.toFixed(1)}% YoY</span>
                </>
              )}
              {isNegative && (
                <>
                  <TrendingDown size={12} className="text-red-400" />
                  <span className="text-red-400">{change.toFixed(1)}% YoY</span>
                </>
              )}
              {isNeutral && (
                <>
                  <Minus size={12} className="text-slate-500" />
                  <span className="text-slate-500">Baseline year</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
