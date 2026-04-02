import {
  filterAllValue,
  transactionCategories,
  transactionSortDirectionEnum,
  transactionSortFieldEnum,
  transactionStatusEnum,
  transactionTypeEnum,
} from "../../shared/constants/global";

export type TransactionType =
  (typeof transactionTypeEnum)[keyof typeof transactionTypeEnum];

export type TransactionStatus =
  (typeof transactionStatusEnum)[keyof typeof transactionStatusEnum];

export type SortField =
  (typeof transactionSortFieldEnum)[keyof typeof transactionSortFieldEnum];

export type SortDirection =
  (typeof transactionSortDirectionEnum)[keyof typeof transactionSortDirectionEnum];

export type TransactionCategory = (typeof transactionCategories)[number];

export type CategoryFilter = typeof filterAllValue | TransactionCategory;

export type StatusFilter = typeof filterAllValue | TransactionStatus;

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}
