import { create } from "zustand";
import { persist } from "zustand/middleware";
import { MOCK_TRANSACTIONS } from "../mockData";
import type { Transaction } from "../types";

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, "id">) => void;
  setTransactions: (transactions: Transaction[]) => void;
  resetTransactions: () => void;
}

const generateTransactionId = (): string =>
  `txn_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

export const useTransactionStore = create<TransactionStore>()(
  persist(
    (set) => ({
      transactions: MOCK_TRANSACTIONS,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              id: generateTransactionId(),
              ...transaction,
            },
            ...state.transactions,
          ],
        })),
      setTransactions: (transactions) => set({ transactions }),
      resetTransactions: () => set({ transactions: MOCK_TRANSACTIONS }),
    }),
    {
      name: "finflow-transactions-storage",
      partialize: (state) => ({ transactions: state.transactions }),
    },
  ),
);
