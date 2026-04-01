import { useMemo } from "react";
import { TransactionTypeEnum } from "../constants/global";
import { useTransactionStore } from "../store/transactionStore";
import { formatMonthShort } from "../utils/formatters";

interface CategoryBreakdownItem {
  category: string;
  total: number;
}

interface SpendingTrendItem {
  month: string;
  total: number;
}

interface TransactionSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  categoryBreakdown: CategoryBreakdownItem[];
  spendingTrend: SpendingTrendItem[];
}

export const useTransactionSummary = (): TransactionSummary => {
  const transactions = useTransactionStore((state) => state.transactions);

  return useMemo(() => {
    const totalIncome = transactions
      .filter((transaction) => transaction.type === TransactionTypeEnum.Income)
      .reduce((sum, transaction) => sum + transaction.amount, 0);
    const totalExpenses = transactions
      .filter((transaction) => transaction.type === TransactionTypeEnum.Expense)
      .reduce((sum, transaction) => sum + transaction.amount, 0);

    const categoryObject = transactions
      .filter(
        (transactions) => transactions.type === TransactionTypeEnum.Expense,
      )
      .reduce<Record<string, number>>((acc, transaction) => {
        acc[transaction.category] =
          (acc[transaction.category] || 0) + transaction.amount;

        return acc;
      }, {});

    // category breakdown
    const categoryBreakdown = Object.entries(categoryObject)
      .map(([category, total]) => {
        return { category, total };
      })
      .sort((item1, item2) => item2.total - item1.total);

    // finding spending trend
    const sortedTransactions = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const latestTransactionDate = sortedTransactions[0]
      ? new Date(sortedTransactions[0].date)
      : new Date();
    const spendingTrend = Array.from({ length: 6 }, (_, index) => {
      const monthOffset = index - 5;
      const monthDate = latestTransactionDate
        ? new Date(
            latestTransactionDate.getFullYear(),
            latestTransactionDate.getMonth() + monthOffset,
            1,
          )
        : new Date();

      const monthKey = `${monthDate.getFullYear()}-${String(
        monthDate.getMonth() + 1,
      ).padStart(2, "0")}`;

      const total = transactions
        .filter(
          (t) =>
            t.type === TransactionTypeEnum.Expense &&
            t.date.startsWith(monthKey),
        )
        .reduce((sum, t) => sum + t.amount, 0);

      return {
        month: formatMonthShort(monthDate),
        total,
      };
    });

    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      categoryBreakdown,
      spendingTrend,
    };
  }, [transactions]);
};
