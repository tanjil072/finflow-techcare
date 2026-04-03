import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../../shared/utils/formatters";
import { useTransactionSummary } from "../../transactions/hooks/useTransactionSummary";
import { DashboardChartSection } from "./DashboardChartSection";
import { SummaryStatCard } from "./SummaryStatCard";

export const DashboardSummary = () => {
  const {
    totalBalance,
    totalIncome,
    totalExpenses,
    categoryBreakdown,
    spendingTrend,
  } = useTransactionSummary();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">FinFlow Dashboard</h1>
        <p className="text-slate-500">Your transaction summary at a glance</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryStatCard
          label="Total Balance"
          value={formatCurrency(totalBalance)}
        />

        <SummaryStatCard
          label="Total Income"
          value={formatCurrency(totalIncome)}
          valueClassName="text-emerald-600"
        />

        <SummaryStatCard
          label="Total Expenses"
          value={formatCurrency(totalExpenses)}
          valueClassName="text-rose-600"
        />

        <SummaryStatCard
          label="Net Balance"
          value={formatCurrency(totalExpenses)}
          valueClassName="text-rose-600"
        />
      </div>

      <DashboardChartSection title="Spending by Category">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryBreakdown}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value ?? 0))}
            />
            <Bar dataKey="total" fill="var(--accent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </DashboardChartSection>

      <DashboardChartSection
        title="Spending Trend (Last 6 Months)"
        description="Monthly expense totals from your transaction dataset"
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={spendingTrend}>
            <defs>
              <linearGradient id="spendingArea" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--accent)"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="var(--accent)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              formatter={(value) => formatCurrency(Number(value ?? 0))}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="var(--accent)"
              strokeWidth={2.5}
              fill="url(#spendingArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </DashboardChartSection>
    </section>
  );
};
