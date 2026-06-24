import type { UrlConvertMode } from '@/app/_libs/types';

export interface ConversionHistoryItem {
  mode: UrlConvertMode;
  originalUrl: string;
}

const HISTORY_KEY = 'conversionHistory';
const HISTORY_LIMIT = 8;

export const readConversionHistory = (): ConversionHistoryItem[] => {
  try {
    const rawHistory = window.localStorage.getItem(HISTORY_KEY);
    if (!rawHistory) {
      return [];
    }
    const parsed = JSON.parse(rawHistory) as ConversionHistoryItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const writeConversionHistory = (history: ConversionHistoryItem[]) => {
  window.localStorage.setItem(
    HISTORY_KEY,
    JSON.stringify(history.slice(0, HISTORY_LIMIT)),
  );
};

export const addConversionHistory = (item: ConversionHistoryItem) => {
  const normalizedUrl = item.originalUrl.trim();
  if (!normalizedUrl) {
    return;
  }

  const nextHistory = [
    { ...item, originalUrl: normalizedUrl },
    ...readConversionHistory().filter(
      (historyItem) =>
        historyItem.mode !== item.mode ||
        historyItem.originalUrl !== normalizedUrl,
    ),
  ];

  writeConversionHistory(nextHistory);
  window.dispatchEvent(new Event('conversion-history-change'));
};
