import { useMemo } from "react";
import { TransactionTypeEnum } from "../constants/global";
import { useTransactionStore } from "../store/transactionStore";

interface CategoryBreakdownItem {
  category: string;
  total: number;
}

interface TransactionSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
  categoryBreakdown: CategoryBreakdownItem[];
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

    const categoryBreakdown = Object.entries(categoryObject)
      .map(([category, total]) => {
        return { category, total };
      })
      .sort((item1, item2) => item2.total - item1.total);

    return {
      totalBalance: totalIncome - totalExpenses,
      totalIncome,
      totalExpenses,
      categoryBreakdown,
    };
  }, [transactions]);
};
