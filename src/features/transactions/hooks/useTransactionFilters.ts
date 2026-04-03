import { useMemo, useState } from "react";
import {
  filterAllValue,
  transactionSortDirectionEnum,
  transactionSortFieldEnum,
} from "../../../shared/constants/global";
import {
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
      sortDirection === transactionSortDirectionEnum.Asc ? 1 : -1;

    if (sortField === transactionSortFieldEnum.Amount) {
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
    useState<CategoryFilter>(filterAllValue);
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>(filterAllValue);
  const [sortField, setSortField] = useState<SortField>(
    transactionSortFieldEnum.Date,
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>(
    transactionSortDirectionEnum.Desc,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");

  const processedTransactions = useMemo(() => {
    const filteredTransactions = transactions.filter((transaction) => {
      const matchesCategory =
        categoryFilter === filterAllValue ||
        transaction.category === categoryFilter;
      const matchesStatus =
        statusFilter === filterAllValue || transaction.status === statusFilter;
      const matchesSearch =
        // searchQuery.length >= 3 &&
        (searchQuery == "" || searchQuery.length > 3) &&
        transaction.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // searchQuery === "" ||
      // searchQuery.length >= 3 ||
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase());

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
  };
};
