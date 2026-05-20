# 📊 Sales Dashboard — Next.js 15

An interactive sales analytics dashboard built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Recharts**. Displays retail sales data for 2022, 2023, and 2024, inspired by the [Kaggle Superstore Sales Dataset](https://www.kaggle.com/datasets/vivek468/superstore-dataset-final).

---

## ✨ Features

| Feature | Description |
|---|---|
| **Year Selector** | Switch between 2022, 2023, and 2024 data instantly |
| **Multiple Chart Types** | Toggle between Bar, Line, and Pie charts across all visualisations |
| **Custom Threshold Filter** | Set a minimum monthly revenue filter to focus on high-traffic months |
| **API Integration** | Data fetched from a local Next.js API route (`/api/sales`) with query params |
| **KPI Cards** | Revenue, Profit, Units Sold, and Average Monthly Revenue with YoY growth |
| **Year-over-Year Chart** | Side-by-side comparison of all three years on one chart |
| **Category Breakdown** | Revenue split by Technology, Furniture, Office Supplies, and Clothing |
| **Units Sold Chart** | Monthly unit volume with area or bar view |
| **Loading Skeletons** | Smooth skeleton placeholders while data loads |
| **Dark Theme** | Polished dark UI with custom Tailwind design tokens |

---

## 🏗️ Project Structure (Atomic Design)

```
src/
├── app/
│   ├── api/
│   │   └── sales/
│   │       └── route.ts          ← GET /api/sales?year=2024&threshold=0
│   ├── dashboard/
│   │   ├── page.tsx              ← Server component shell
│   │   └── DashboardClient.tsx   ← Interactive client component
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  ← Redirects to /dashboard
│
├── components/
│   ├── charts/                   ← Chart atoms/molecules
│   │   ├── MonthlyRevenueChart.tsx
│   │   ├── CategoryChart.tsx
│   │   ├── YoYComparisonChart.tsx
│   │   └── UnitsChart.tsx
│   └── ui/                       ← Reusable UI atoms
│       ├── StatCard.tsx
│       ├── YearSelector.tsx
│       ├── ChartTypeSelector.tsx
│       ├── ThresholdFilter.tsx
│       └── Skeleton.tsx
│
├── lib/
│   ├── salesData.ts              ← Mock data (Kaggle-inspired)
│   └── utils.ts                  ← formatCurrency, formatNumber, etc.
│
└── types/
    └── index.ts                  ← TypeScript interfaces
```

### Atomic Design Principles Applied

- **Atoms** — `StatCard`, `YearSelector`, `ChartTypeSelector`, `ThresholdFilter`, `Skeleton`
- **Molecules** — Individual chart components (`MonthlyRevenueChart`, `CategoryChart`, etc.)
- **Organisms** — `DashboardClient` — composes all atoms/molecules into the dashboard
- **Templates/Pages** — `dashboard/page.tsx` (server) → `DashboardClient` (client)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** (or pnpm / yarn)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/sales-dashboard.git
cd sales-dashboard

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/dashboard`.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🔌 API

### `GET /api/sales`

Returns all years' data.

```json
{ "success": true, "data": { "2022": {...}, "2023": {...}, "2024": {...} } }
```

### `GET /api/sales?year=2024&threshold=250000`

Returns data for the specified year, with monthly rows filtered to revenue ≥ `threshold`.

**Query Parameters**

| Param | Type | Description |
|---|---|---|
| `year` | `"2022" \| "2023" \| "2024"` | Year to fetch |
| `threshold` | `number` | Minimum monthly revenue (default: 0) |

---

## 📊 Data Source

The mock data is inspired by the **Sample Superstore** dataset widely available on Kaggle. Four product categories are modelled:

- 🖥 **Technology** — Phones, computers, accessories
- 🪑 **Furniture** — Chairs, tables, bookcases
- 📎 **Office Supplies** — Paper, binders, labels
- 👕 **Clothing** — Apparel category added for breadth

Year-over-year growth rates: **+13.0%** (2023) and **+16.2%** (2024).

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 15.1 | App Router, API routes, SSR |
| React | 19 | UI components |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 3.4 | Utility-first styling |
| Recharts | 2.13 | Chart library |
| Lucide React | 0.469 | Icon set |
| Geist | — | Typography (via next/font) |

---

## 🎨 Enhancements Implemented

1. **Custom Filter Input** — `ThresholdFilter` component lets users enter a minimum revenue value; the API route filters monthly data server-side.
2. **API Integration** — `DashboardClient` fetches from `/api/sales` using `fetch`, with loading states and error handling.
3. **Multiple Chart Types** — `ChartTypeSelector` toggles between Bar, Line, and Pie. Each chart component adapts its Recharts component accordingly (e.g., `CategoryChart` switches between `BarChart`, `PieChart`, and `RadialBarChart`).

---

## 📝 License

MIT — feel free to adapt for your own projects.
