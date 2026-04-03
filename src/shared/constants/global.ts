export const transactionTypeEnum = {
  Income: "income",
  Expense: "expense",
} as const;

export const transactionStatusEnum = {
  Completed: "completed",
  Pending: "pending",
  Failed: "failed",
} as const;

export const transactionSortFieldEnum = {
  Date: "date",
  Amount: "amount",
} as const;

export const transactionSortDirectionEnum = {
  Asc: "asc",
  Desc: "desc",
} as const;

export const filterAllValue = "all" as const;

export const transactionCategories = [
  "Food",
  "Transport",
  "Utilities",
  "Entertainment",
  "Health",
  "Shopping",
  "Income",
  "Other",
  "Uncategorized",
] as const;

export const defaultNewTransactionValues = {
  type: transactionTypeEnum.Expense,
  category: "Food",
  status: transactionStatusEnum.Completed,
} as const;

export const transactionStatusBadgeVariants = {
  [transactionStatusEnum.Completed]: "success",
  [transactionStatusEnum.Pending]: "warning",
  [transactionStatusEnum.Failed]: "danger",
} as const;

export const transactionTypeStyles = {
  [transactionTypeEnum.Income]: {
    sign: "+",
    amountClassName: "text-emerald-600",
  },
  [transactionTypeEnum.Expense]: {
    sign: "-",
    amountClassName: "text-rose-600",
  },
} as const;

export const transactionStatuses = Object.values(transactionStatusEnum);
