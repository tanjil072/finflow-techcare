export const TransactionTypeEnum = {
  Income: "income",
  Expense: "expense",
} as const;

export const TransactionStatusEnum = {
  Completed: "completed",
  Pending: "pending",
  Failed: "failed",
} as const;

export const TransactionSortFieldEnum = {
  Date: "date",
  Amount: "amount",
} as const;

export const TransactionSortDirectionEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;

export const FILTER_ALL_VALUE = "all" as const;

export const TRANSACTION_CATEGORIES = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Income",
  "Other",
] as const;

export const DEFAULT_NEW_TRANSACTION_VALUES = {
  type: TransactionTypeEnum.Expense,
  category: "Food",
  status: TransactionStatusEnum.Completed,
} as const;

export const TRANSACTION_STATUS_BADGE_VARIANTS = {
  [TransactionStatusEnum.Completed]: "success",
  [TransactionStatusEnum.Pending]: "warning",
  [TransactionStatusEnum.Failed]: "danger",
} as const;

export const TRANSACTION_TYPE_STYLES = {
  [TransactionTypeEnum.Income]: {
    sign: "+",
    amountClassName: "text-emerald-600",
  },
  [TransactionTypeEnum.Expense]: {
    sign: "-",
    amountClassName: "text-rose-600",
  },
} as const;

export const TRANSACTION_STATUSES = Object.values(TransactionStatusEnum);
