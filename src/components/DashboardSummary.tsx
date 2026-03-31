import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTransactionSummary } from "../hooks/useTransactionSummary";
import { formatCurrency } from "../utils/formatters";

export const DashboardSummary = () => {
  const { totalBalance, totalIncome, totalExpenses, categoryBreakdown } =
    useTransactionSummary();

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-slate-900">FinFlow Dashboard</h1>
        <p className="text-slate-500">Your transaction summary at a glance</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Balance</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">
            {formatCurrency(totalBalance)}
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Income</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-600">
            {formatCurrency(totalIncome)}
          </p>
        </article>

        <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <p className="text-sm text-slate-500">Total Expenses</p>
          <p className="mt-1 text-2xl font-semibold text-rose-600">
            {formatCurrency(totalExpenses)}
          </p>
        </article>
      </div>

      <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-lg font-semibold text-slate-900">
          Spending by Category
        </h2>

        <div className="h-72">
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
        </div>
      </article>
    </section>
  );
};
