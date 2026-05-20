import { SalesDataStore } from "@/types";

/**
 * Mock sales data inspired by the "Superstore Sales Dataset" from Kaggle.
 * Categories: Technology, Furniture, Office Supplies, Clothing.
 * Monthly figures are randomised-but-realistic for a mid-size US retailer.
 *
 * Source inspiration:
 *   https://www.kaggle.com/datasets/vivek468/superstore-dataset-final
 */
export const salesData: SalesDataStore = {
  "2022": {
    year: "2022",
    totalRevenue: 2_847_320,
    totalUnits: 38_412,
    totalProfit: 712_450,
    growth: 0, // baseline year
    monthly: [
      { month: "Jan", revenue: 198_400, units: 2_780, profit: 49_600 },
      { month: "Feb", revenue: 175_200, units: 2_430, profit: 43_800 },
      { month: "Mar", revenue: 231_500, units: 3_210, profit: 57_875 },
      { month: "Apr", revenue: 219_800, units: 3_050, profit: 54_950 },
      { month: "May", revenue: 243_600, units: 3_380, profit: 60_900 },
      { month: "Jun", revenue: 256_100, units: 3_560, profit: 64_025 },
      { month: "Jul", revenue: 228_900, units: 3_180, profit: 57_225 },
      { month: "Aug", revenue: 241_300, units: 3_350, profit: 60_325 },
      { month: "Sep", revenue: 267_400, units: 3_710, profit: 66_850 },
      { month: "Oct", revenue: 284_500, units: 3_950, profit: 71_125 },
      { month: "Nov", revenue: 312_600, units: 4_340, profit: 78_150 },
      { month: "Dec", revenue: 388_020, units: 5_472, profit: 47_625 },
    ],
    byCategory: [
      { category: "Technology",      revenue: 1_024_435, units: 8_210, color: "#0ea5e9" },
      { category: "Furniture",       revenue:   712_480, units: 9_860, color: "#6366f1" },
      { category: "Office Supplies", revenue:   683_155, units: 14_320, color: "#10b981" },
      { category: "Clothing",        revenue:   427_250, units: 6_022, color: "#f59e0b" },
    ],
  },

  "2023": {
    year: "2023",
    totalRevenue: 3_218_940,
    totalUnits: 43_250,
    totalProfit: 867_114,
    growth: 13.0,
    monthly: [
      { month: "Jan", revenue: 224_326, units: 3_120, profit: 60_568 },
      { month: "Feb", revenue: 198_560, units: 2_760, profit: 53_611 },
      { month: "Mar", revenue: 261_500, units: 3_630, profit: 70_605 },
      { month: "Apr", revenue: 248_400, units: 3_450, profit: 67_068 },
      { month: "May", revenue: 275_200, units: 3_820, profit: 74_304 },
      { month: "Jun", revenue: 289_900, units: 4_025, profit: 78_273 },
      { month: "Jul", revenue: 258_700, units: 3_592, profit: 69_849 },
      { month: "Aug", revenue: 272_400, units: 3_783, profit: 73_548 },
      { month: "Sep", revenue: 302_100, units: 4_195, profit: 81_567 },
      { month: "Oct", revenue: 321_700, units: 4_468, profit: 86_859 },
      { month: "Nov", revenue: 354_134, units: 4_915, profit: 95_616 },
      { month: "Dec", revenue: 412_020, units: 5_492, profit: 55_246 },
    ],
    byCategory: [
      { category: "Technology",      revenue: 1_158_518, units: 9_275, color: "#0ea5e9" },
      { category: "Furniture",       revenue:   804_735, units: 11_145, color: "#6366f1" },
      { category: "Office Supplies", revenue:   772_544, units: 16_175, color: "#10b981" },
      { category: "Clothing",        revenue:   483_143, units: 6_655, color: "#f59e0b" },
    ],
  },

  "2024": {
    year: "2024",
    totalRevenue: 3_741_580,
    totalUnits: 49_830,
    totalProfit: 1_048_642,
    growth: 16.2,
    monthly: [
      { month: "Jan", revenue: 260_750, units: 3_590, profit: 73_010 },
      { month: "Feb", revenue: 231_400, units: 3_185, profit: 64_792 },
      { month: "Mar", revenue: 304_920, units: 4_195, profit: 85_378 },
      { month: "Apr", revenue: 289_340, units: 3_982, profit: 81_015 },
      { month: "May", revenue: 320_480, units: 4_410, profit: 89_734 },
      { month: "Jun", revenue: 337_260, units: 4_640, profit: 94_433 },
      { month: "Jul", revenue: 301_100, units: 4_144, profit: 84_308 },
      { month: "Aug", revenue: 317_800, units: 4_374, profit: 89_484 },
      { month: "Sep", revenue: 351_540, units: 4_839, profit: 98_431 },
      { month: "Oct", revenue: 374_200, units: 5_149, profit: 104_776 },
      { month: "Nov", revenue: 412_470, units: 5_678, profit: 115_492 },
      { month: "Dec", revenue: 440_320, units: 5_644, profit: 67_789 },
    ],
    byCategory: [
      { category: "Technology",      revenue: 1_346_969, units: 10_670, color: "#0ea5e9" },
      { category: "Furniture",       revenue:   935_395, units: 12_832, color: "#6366f1" },
      { category: "Office Supplies", revenue:   897_979, units: 18_637, color: "#10b981" },
      { category: "Clothing",        revenue:   561_237, units: 7_691, color: "#f59e0b" },
    ],
  },
};
