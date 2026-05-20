import { NextRequest, NextResponse } from "next/server";
import { salesData } from "@/lib/salesData";
import { Year, ApiResponse, YearlySummary } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year") as Year | null;
  const threshold = Number(searchParams.get("threshold") ?? 0);

  // Simulate a slight network delay to make API integration feel real
  await new Promise((r) => setTimeout(r, 80));

  if (year) {
    if (!["2022", "2023", "2024"].includes(year)) {
      return NextResponse.json<ApiResponse<null>>(
        { data: null, success: false, error: "Invalid year. Use 2022, 2023, or 2024." },
        { status: 400 }
      );
    }

    const yearData: YearlySummary = {
      ...salesData[year],
      // Apply the user-defined threshold filter on monthly data
      monthly: salesData[year].monthly.filter((m) => m.revenue >= threshold),
    };

    return NextResponse.json<ApiResponse<YearlySummary>>({
      data: yearData,
      success: true,
    });
  }

  // Return all years
  return NextResponse.json<ApiResponse<typeof salesData>>({
    data: salesData,
    success: true,
  });
}
