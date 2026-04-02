import { useState } from "react";
import type { Transaction } from "../types";

const virtualListConfig = {
  rowHeightPx: 56,
  visibleRows: 8,
  overscanRows: 5,
} as const;

const viewportHeightPx =
  virtualListConfig.rowHeightPx * virtualListConfig.visibleRows;

export const useTransactionList = (transactions: Transaction[]) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalRows = transactions.length;
  const firstVisibleRowIndex = Math.floor(
    scrollTop / virtualListConfig.rowHeightPx,
  );

  const startIndex = Math.max(
    0,
    firstVisibleRowIndex - virtualListConfig.overscanRows,
  );

  const endIndex = Math.min(
    totalRows,
    firstVisibleRowIndex +
      virtualListConfig.visibleRows +
      virtualListConfig.overscanRows,
  );

  const visibleTransactions = transactions.slice(startIndex, endIndex);
  const topSpacerHeight = startIndex * virtualListConfig.rowHeightPx;
  const bottomSpacerHeight =
    (totalRows - endIndex) * virtualListConfig.rowHeightPx;

  return {
    visibleTransactions,
    topSpacerHeight,
    bottomSpacerHeight,
    setScrollTop,
    viewportHeightPx,
    rowHeightPx: virtualListConfig.rowHeightPx,
  };
};
