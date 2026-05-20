import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Sales Dashboard | Analytics 2022–2024",
  description: "Interactive sales analytics for 2022, 2023, and 2024.",
};

/**
 * Dashboard page — server component.
 * All interactivity is delegated to the DashboardClient component.
 */
export default function DashboardPage() {
  return <DashboardClient />;
}
