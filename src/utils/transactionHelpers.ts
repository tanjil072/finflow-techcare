import { MOCK_TRANSACTIONS } from "../mockData";
import type { Transaction } from "../types";

export const cloneTransactions = (transactions: Transaction[]): Transaction[] =>
  transactions.map((transaction) => ({ ...transaction }));

export const getInitialTransactions = (): Transaction[] =>
  cloneTransactions(MOCK_TRANSACTIONS);
