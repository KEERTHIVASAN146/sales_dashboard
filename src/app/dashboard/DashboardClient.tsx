"use client";

import { useState, useEffect, useCallback } from "react";
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Package,
  RefreshCw,
  LayoutDashboard,
} from "lucide-react";

import { Year, ChartType, YearlySummary, SalesDataStore } from "@/types";
import { formatCurrency, formatNumber } from "@/lib/utils";

import StatCard from "@/components/ui/StatCard";
import YearSelector from "@/components/ui/YearSelector";
import ChartTypeSelector from "@/components/ui/ChartTypeSelector";
import ThresholdFilter from "@/components/ui/ThresholdFilter";
import { StatsSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";

import MonthlyRevenueChart from "@/components/charts/MonthlyRevenueChart";
import CategoryChart from "@/components/charts/CategoryChart";
import YoYComparisonChart from "@/components/charts/YoYComparisonChart";
import UnitsChart from "@/components/charts/UnitsChart";

export default function DashboardClient() {
  const [year, setYear] = useState<Year>("2024");
  const [chartType, setChartType] = useState<ChartType>("bar");
  const [threshold, setThreshold] = useState<number>(0);

  const [yearData, setYearData] = useState<YearlySummary | null>(null);
  const [allData, setAllData] = useState<SalesDataStore | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch selected year data from the API route
  const fetchYearData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [yearRes, allRes] = await Promise.all([
        fetch(`/api/sales?year=${year}&threshold=${threshold}`),
        allData ? Promise.resolve(null) : fetch("/api/sales"),
      ]);

      const yearJson = await yearRes.json();
      if (!yearJson.success) throw new Error(yearJson.error);
      setYearData(yearJson.data);

      if (allRes) {
        const allJson = await allRes.json();
        if (allJson.success) setAllData(allJson.data);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, threshold]);

  useEffect(() => {
    fetchYearData();
  }, [fetchYearData]);

  return (
    <div className="min-h-screen bg-surface-950">
      {/* ── Top Nav ───────────────────────────────────────────────── */}
      <header className="sticky top-0 z-30 bg-surface-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-1.5 bg-brand-600/20 rounded-lg">
              <LayoutDashboard size={18} className="text-brand-400" />
            </div>
            <span className="font-bold text-slate-100 text-sm tracking-tight">
              SalesDash
            </span>
            <span className="hidden sm:block text-slate-600 text-xs">
              / Superstore Analytics
            </span>
          </div>

          <div className="flex items-center gap-2">
            {loading && (
              <RefreshCw size={14} className="text-slate-500 animate-spin" />
            )}
            <span className="text-xs text-slate-600 hidden md:block">
              Powered by Kaggle Superstore Dataset
            </span>
          </div>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────────── */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-8 space-y-8">

        {/* Page heading */}
        <div className="animate-fade-up">
          <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
            Sales Dashboard
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Retail analytics for 2022 – 2024 · All figures in USD
          </p>
        </div>

        {/* ── Controls row ──────────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 animate-fade-up animate-fade-up-delay-1">
          <YearSelector selected={year} onChange={setYear} />
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <ChartTypeSelector selected={chartType} onChange={setChartType} />
          <div className="w-px h-8 bg-slate-800 hidden sm:block" />
          <ThresholdFilter value={threshold} onChange={setThreshold} />
        </div>

        {/* ── Error ─────────────────────────────────────────────── */}
        {error && (
          <div className="card border-red-800 bg-red-950/40 p-4 text-red-400 text-sm">
            ⚠ {error}
          </div>
        )}

        {/* ── KPI Cards ─────────────────────────────────────────── */}
        {loading || !yearData ? (
          <StatsSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value={formatCurrency(yearData.totalRevenue)}
              change={yearData.growth || undefined}
              icon={<DollarSign size={20} />}
              accentColor="#0ea5e9"
              delay={0}
            />
            <StatCard
              title="Total Profit"
              value={formatCurrency(yearData.totalProfit)}
              change={yearData.growth ? yearData.growth * 0.9 : undefined}
              icon={<TrendingUp size={20} />}
              accentColor="#10b981"
              delay={50}
            />
            <StatCard
              title="Units Sold"
              value={formatNumber(yearData.totalUnits)}
              change={yearData.growth ? yearData.growth * 0.7 : undefined}
              icon={<ShoppingCart size={20} />}
              accentColor="#6366f1"
              delay={100}
            />
            <StatCard
              title="Avg Monthly Revenue"
              value={formatCurrency(Math.round(yearData.totalRevenue / 12))}
              icon={<Package size={20} />}
              accentColor="#f59e0b"
              delay={150}
            />
          </div>
        )}

        {/* ── Charts – row 1 ────────────────────────────────────── */}
        {loading || !yearData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2"><ChartSkeleton /></div>
            <ChartSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <MonthlyRevenueChart
                data={yearData.monthly}
                chartType={chartType}
                year={year}
              />
            </div>
            <CategoryChart data={yearData.byCategory} chartType={chartType} />
          </div>
        )}

        {/* ── Charts – row 2 ────────────────────────────────────── */}
        {loading || !yearData ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <UnitsChart data={yearData.monthly} chartType={chartType} />
            {allData && (
              <YoYComparisonChart allData={allData} chartType={chartType} />
            )}
          </div>
        )}

        {/* ── Footer ────────────────────────────────────────────── */}
        <footer className="text-center text-xs text-slate-700 pt-4 pb-8">
          Data sourced from{" "}
          <a
            href="https://www.kaggle.com/datasets/vivek468/superstore-dataset-final"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-300 underline underline-offset-2"
          >
            Kaggle Superstore Dataset
          </a>{" "}
          · Visualised with Next.js 15 + Recharts
        </footer>
      </main>
    </div>
  );
}
