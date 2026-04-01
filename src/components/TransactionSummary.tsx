import { toast } from "sonner";
import {
  FILTER_ALL_VALUE,
  TRANSACTION_STATUS_BADGE_VARIANTS,
  TRANSACTION_TYPE_STYLES,
  TransactionSortDirectionEnum,
  TransactionSortFieldEnum,
} from "../constants/global";
import {
  useTransactionFilters,
  type CategoryFilter,
  type SortDirection,
  type SortField,
  type StatusFilter,
} from "../hooks/useTransactionFilters";
import { useTransactionList } from "../hooks/useTransactionList";
import { useTransactionStore } from "../store/transactionStore";
import { formatCurrency, formatDate } from "../utils/formatters";
import AddTransactionDrawer from "./AddTransactionDrawer";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

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
    setCategoryFilter(FILTER_ALL_VALUE);
    setStatusFilter(FILTER_ALL_VALUE);
    setSortField(TransactionSortFieldEnum.Date);
    setSortDirection(TransactionSortDirectionEnum.Desc);
    setSearchQuery("");
    setScrollTop(0);
  };

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Transactions</h2>
        <div className="flex items-center gap-3">
          <AddTransactionDrawer
            onSuccess={(description) => {
              toast.success(`Transaction "${description}" added successfully.`);
              setScrollTop(0);
            }}
          />

          <p className="text-sm text-slate-500">
            {processedTransactions.length} of {transactions.length} records
          </p>
          <Button onClick={handleClearFilters} variant="outline" size="sm">
            Clear
          </Button>
        </div>
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-4 flex flex-col gap-1">
          <Label htmlFor="transaction-search">Search</Label>
          <Input
            id="transaction-search"
            type="text"
            placeholder="Search by description..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setScrollTop(0);
            }}
          />
        </div>

        <div className="flex flex-col gap-1">
          <Label>Category</Label>
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
              <SelectItem value={FILTER_ALL_VALUE}>All Categories</SelectItem>
              {transactionCategories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Status</Label>
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
              <SelectItem value={FILTER_ALL_VALUE}>All Status</SelectItem>
              {transactionStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Sort By</Label>
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
              <SelectItem value={TransactionSortFieldEnum.Date}>
                Date
              </SelectItem>
              <SelectItem value={TransactionSortFieldEnum.Amount}>
                Amount
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Sort Order</Label>
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
              <SelectItem value={TransactionSortDirectionEnum.Desc}>
                Descending
              </SelectItem>
              <SelectItem value={TransactionSortDirectionEnum.Asc}>
                Ascending
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
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

            {visibleTransactions.map((transaction) => {
              const transactionTypeStyle =
                TRANSACTION_TYPE_STYLES[transaction.type];

              return (
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
                      transactionTypeStyle.amountClassName
                    }`}
                  >
                    {transactionTypeStyle.sign}
                    {formatCurrency(transaction.amount)}
                  </span>
                  <span>
                    <Badge
                      variant={
                        TRANSACTION_STATUS_BADGE_VARIANTS[transaction.status]
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </span>
                </div>
              );
            })}

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
