import {
  FILTER_ALL_VALUE,
  TRANSACTION_CATEGORIES,
  TransactionSortDirectionEnum,
  TransactionSortFieldEnum,
  TransactionStatusEnum,
  type TransactionTypeEnum,
} from "../../shared/constants/global";

export type TransactionType =
  (typeof TransactionTypeEnum)[keyof typeof TransactionTypeEnum];

export const TRANSACTION_STATUSES = Object.values(TransactionStatusEnum);

export type TransactionStatus =
  (typeof TransactionStatusEnum)[keyof typeof TransactionStatusEnum];

export type SortField =
  (typeof TransactionSortFieldEnum)[keyof typeof TransactionSortFieldEnum];

export type SortDirection =
  (typeof TransactionSortDirectionEnum)[keyof typeof TransactionSortDirectionEnum];

export type TransactionCategory = (typeof TRANSACTION_CATEGORIES)[number];

export type CategoryFilter = typeof FILTER_ALL_VALUE | TransactionCategory;

export type StatusFilter = typeof FILTER_ALL_VALUE | TransactionStatus;

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string;
  status: TransactionStatus;
}
