import {
  useTransactionFilters,
  type CategoryFilter,
  type SortDirection,
  type SortField,
  type StatusFilter,
} from "../hooks/useTransactionFilters";
import { useTransactionList } from "../hooks/useTransactionList";
import { useTransactionStore } from "../store/transactionStore";
import type { TransactionStatus } from "../types";
import { formatCurrency, formatDate } from "../utils/formatters";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const statusBadgeVariants: Record<
  TransactionStatus,
  "success" | "warning" | "danger"
> = {
  completed: "success",
  pending: "warning",
  failed: "danger",
};

const TransactionSummary = () => {
  const transactions = useTransactionStore((state) => state.transactions);

  const {
    processedTransactions,
    categoryFilter,
    statusFilter,
    sortField,
    sortDirection,
    searchQuery,
    setCategoryFilter,
    setStatusFilter,
    setSortField,
    setSortDirection,
    setSearchQuery,
    transactionCategories,
    transactionStatuses,
  } = useTransactionFilters(transactions);

  const {
    visibleTransactions,
    topSpacerHeight,
    bottomSpacerHeight,
    setScrollTop,
    viewPortHeightPx,
    rowHeightPx,
  } = useTransactionList(processedTransactions);

  const handleClearFilters = () => {
    setCategoryFilter("all");
    setStatusFilter("all");
    setSortField("date");
    setSortDirection("desc");
    setSearchQuery("");
    setScrollTop(0);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
        <div className="flex items-center gap-3">
          <p className="text-sm text-slate-500">
            {processedTransactions.length} of {transactions.length} records
          </p>
          <button
            onClick={handleClearFilters}
            className="rounded px-3 py-1.5 text-sm font-medium border border-slate-500 text-slate-600 hover:bg-slate-100 active:bg-slate-200"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <label className="lg:col-span-4 flex flex-col gap-1 text-sm text-slate-600">
          Search
          <input
            type="text"
            placeholder="Search by description..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setScrollTop(0);
            }}
            className="rounded border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Category
          <Select
            value={categoryFilter}
            onValueChange={(value) => {
              setCategoryFilter(value as CategoryFilter);
              setScrollTop(0);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {transactionCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Status
          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value as StatusFilter);
              setScrollTop(0);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {transactionStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Sort By
          <Select
            value={sortField}
            onValueChange={(value) => {
              setSortField(value as SortField);
              setScrollTop(0);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="amount">Amount</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="flex flex-col gap-1 text-sm text-slate-600">
          Sort Order
          <Select
            value={sortDirection}
            onValueChange={(value) => {
              setSortDirection(value as SortDirection);
              setScrollTop(0);
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Descending</SelectItem>
              <SelectItem value="asc">Ascending</SelectItem>
            </SelectContent>
          </Select>
        </label>
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
            style={{ height: `${viewPortHeightPx}px` }}
            onScroll={(event) => setScrollTop(event.currentTarget.scrollTop)}
          >
            {topSpacerHeight > 0 && <div style={{ height: topSpacerHeight }} />}

            {visibleTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="grid grid-cols-[140px_1.8fr_1fr_1fr_120px] items-center border-t border-slate-100 px-4 text-sm hover:bg-slate-50"
                style={{ height: `${rowHeightPx}px` }}
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
                  <Badge variant={statusBadgeVariants[transaction.status]}>
                    {transaction.status}
                  </Badge>
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
