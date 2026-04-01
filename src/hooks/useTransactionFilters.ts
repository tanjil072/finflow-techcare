import { useMemo, useState } from "react";
import { TRANSACTION_CATEGORIES } from "../mockData";
import type {
  Transaction,
  TransactionCategory,
  TransactionStatus,
} from "../types";

const TRANSACTION_STATUSES: readonly TransactionStatus[] = [
  "completed",
  "pending",
  "failed",
];

type SortField = "date" | "amount";
type SortDirection = "asc" | "desc";
type CategoryFilter = "all" | TransactionCategory;
type StatusFilter = "all" | TransactionStatus;

const sortTransactions = (
  transactions: Transaction[],
  sortField: SortField,
  sortDirection: SortDirection,
) => {
  return [...transactions].sort((firstTransaction, secondTransaction) => {
    const directionMultiplier = sortDirection === "asc" ? 1 : -1;

    if (sortField === "amount") {
      return (
        (firstTransaction.amount - secondTransaction.amount) *
        directionMultiplier
      );
    }

    return (
      (new Date(firstTransaction.date).getTime() -
        new Date(secondTransaction.date).getTime()) *
      directionMultiplier
    );
  });
};

export const useTransactionFilters = (transactions: Transaction[]) => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const processedTransactions = useMemo(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      const matchesCategory =
        categoryFilter === "all" || transaction.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;
      const matchesSearch =
        searchQuery === "" ||
        transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });

    return sortTransactions(filteredTransactions, sortField, sortDirection);
  }, [
    transactions,
    categoryFilter,
    statusFilter,
    sortField,
    sortDirection,
    searchQuery,
  ]);

  return {
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
    transactionCategories: TRANSACTION_CATEGORIES,
    transactionStatuses: TRANSACTION_STATUSES,
  };
};

export type { CategoryFilter, SortDirection, SortField, StatusFilter };
