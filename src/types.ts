export type TransactionType = "income" | "expense";

export type TransactionStatus = "completed" | "pending" | "failed";

export type TransactionCategory =
  | "Food"
  | "Transport"
  | "Utilities"
  | "Entertainment"
  | "Health"
  | "Shopping"
  | "Income"
  | "Other";

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}
