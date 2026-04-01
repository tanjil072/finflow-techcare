import { useState } from "react";
import { useTransactionStore } from "../store/transactionStore";
import type { TransactionStatus } from "../types";
import { formatCurrency, formatDate } from "../utils/formatters";

const VIRTUAL_LIST_CONFIG = {
  rowHeightPx: 56,
  visibleRows: 8,
  overscanRows: 5,
} as const;

const VIEWPORT_HEIGHT_PX =
  VIRTUAL_LIST_CONFIG.rowHeightPx * VIRTUAL_LIST_CONFIG.visibleRows;

const statusBadgeClasses: Record<TransactionStatus, string> = {
  completed:
    "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  pending: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  failed: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
};

const TransactionSummary = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const [scrollTop, setScrollTop] = useState(0);

  const totalRows = transactions.length;
  const firstVisibleRowIndex = Math.floor(
    scrollTop / VIRTUAL_LIST_CONFIG.rowHeightPx,
  );

  const startIndex = Math.max(
    0,
    firstVisibleRowIndex - VIRTUAL_LIST_CONFIG.overscanRows,
  );

  const endIndex = Math.min(
    totalRows,
    firstVisibleRowIndex +
      VIRTUAL_LIST_CONFIG.visibleRows +
      VIRTUAL_LIST_CONFIG.overscanRows,
  );

  const visibleTransactions = transactions.slice(startIndex, endIndex);
  const topSpacerHeight = startIndex * VIRTUAL_LIST_CONFIG.rowHeightPx;
  const bottomSpacerHeight =
    (totalRows - endIndex) * VIRTUAL_LIST_CONFIG.rowHeightPx;

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
        <p className="text-sm text-slate-500">{transactions.length} records</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[880px] rounded-lg border border-slate-200">
          <div className="grid grid-cols-[140px_1.8fr_1fr_1fr_120px] bg-slate-50 px-4 py-3 text-left text-sm font-medium text-slate-600">
            <span>Date</span>
            <span>Description</span>
            <span>Category</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          <div
            className="overflow-y-auto"
            style={{ height: `${VIEWPORT_HEIGHT_PX}px` }}
            onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          >
            {topSpacerHeight > 0 && <div style={{ height: topSpacerHeight }} />}

            {visibleTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[140px_1.8fr_1fr_1fr_120px] items-center border-t border-slate-100 px-4 text-sm hover:bg-slate-50"
                style={{ height: `${VIRTUAL_LIST_CONFIG.rowHeightPx}px` }}
              >
                <span className="whitespace-nowrap text-slate-600">
                  {formatDate(transaction.date)}
                </span>
                <span className="pr-4 font-medium text-slate-900">
                  {transaction.description}
                </span>
                <span className="whitespace-nowrap text-slate-600">
                  {transaction.category}
                </span>
                <span
                  className={`whitespace-nowrap font-semibold ${
                    transaction.type === "income"
                      ? "text-emerald-600"
                      : "text-rose-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  {formatCurrency(transaction.amount)}
                </span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium capitalize ${statusBadgeClasses[transaction.status]}`}
                  >
                    {transaction.status}
                  </span>
                </span>
              </div>
            ))}

            {bottomSpacerHeight > 0 && (
              <div style={{ height: bottomSpacerHeight }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TransactionSummary;
