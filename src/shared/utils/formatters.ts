const locale = "en-US";

const currencyFormatter = new Intl.NumberFormat(locale, {
  style: "currency",
  currency: "BDT",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat(locale, {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const monthShortFormatter = new Intl.DateTimeFormat(locale, {
  month: "short",
});

export const formatCurrency = (amount: number): string =>
  currencyFormatter.format(amount);

export const formatDate = (date: string | Date): string =>
  dateFormatter.format(new Date(date));

export const formatMonthShort = (date: string | Date): string =>
  monthShortFormatter.format(new Date(date));

export const toDateInputString = (date: Date) =>
  date.toISOString().split("T")[0];
