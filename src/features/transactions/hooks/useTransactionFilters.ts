import { useMemo, useState } from "react";
import {
  FILTER_ALL_VALUE,
  TRANSACTION_CATEGORIES,
  TransactionSortDirectionEnum,
  TransactionSortFieldEnum,
} from "../../../shared/constants/global";
import {
  TRANSACTION_STATUSES,
  type CategoryFilter,
  type SortDirection,
  type SortField,
  type StatusFilter,
  type Transaction,
} from "../types";

const sortTransactions = (
  transactions: Transaction[],
  sortField: SortField,
  sortDirection: SortDirection,
) => {
  return [...transactions].sort((firstTransaction, secondTransaction) => {
    const directionMultiplier =
      sortDirection === TransactionSortDirectionEnum.Asc ? 1 : -1;

    if (sortField === TransactionSortFieldEnum.Amount) {
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
  const [categoryFilter, setCategoryFilter] =
    useState<CategoryFilter>(FILTER_ALL_VALUE);
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>(FILTER_ALL_VALUE);
  const [sortField, setSortField] = useState<SortField>(
    TransactionSortFieldEnum.Date,
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    TransactionSortDirectionEnum.Desc,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const processedTransactions = useMemo(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      const matchesCategory =
        categoryFilter === FILTER_ALL_VALUE ||
        transaction.category === categoryFilter;
      const matchesStatus =
        statusFilter === FILTER_ALL_VALUE ||
        transaction.status === statusFilter;
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

export type {
  CategoryFilter,
  SortDirection,
  SortField,
  StatusFilter,
} from "../types";
