const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export const formatCurrency = (amount: number): string =>
  currencyFormatter.format(amount);

export const formatDate = (date: string | Date): string =>
  dateFormatter.format(new Date(date));
