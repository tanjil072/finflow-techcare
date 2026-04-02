import type { Transaction } from "../../features/transactions/types";
import { mockTransactions } from "../../mockData";

export const cloneTransactions = (transactions: Transaction[]): Transaction[] =>
  transactions.map((transaction) => ({ ...transaction }));

export const getInitialTransactions = (): Transaction[] =>
  cloneTransactions(mockTransactions);
