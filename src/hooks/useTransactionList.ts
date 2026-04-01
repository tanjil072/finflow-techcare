import { useState } from "react";
import type { Transaction } from "../types";

const VIRTUAL_LIST_CONFIG = {
  rowHeightPx: 56,
  visibleRows: 8,
  overscanRows: 5,
} as const;

const VIEWPORT_HEIGHT_PX =
  VIRTUAL_LIST_CONFIG.rowHeightPx * VIRTUAL_LIST_CONFIG.visibleRows;

export const useTransactionList = (transactions: Transaction[]) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalRows = transactions.length;
  const firstVisibleRowIndex = Math.floor(
    scrollTop / VIRTUAL_LIST_CONFIG.rowHeightPx,
  );

  const startIndex = Math.max(
    0,
    firstVisibleRowIndex - VIRTUAL_LIST_CONFIG.overscanRows,
  );

  const endIndex = Math.min(
    totalRows,
    firstVisibleRowIndex +
      VIRTUAL_LIST_CONFIG.visibleRows +
      VIRTUAL_LIST_CONFIG.overscanRows,
  );

  const visibleTransactions = transactions.slice(startIndex, endIndex);
  const topSpacerHeight = startIndex * VIRTUAL_LIST_CONFIG.rowHeightPx;
  const bottomSpacerHeight =
    (totalRows - endIndex) * VIRTUAL_LIST_CONFIG.rowHeightPx;

  return {
    visibleTransactions,
    topSpacerHeight,
    bottomSpacerHeight,
    setScrollTop,
    viewPortHeightPx: VIEWPORT_HEIGHT_PX,
    rowHeightPx: VIRTUAL_LIST_CONFIG.rowHeightPx,
  };
};
