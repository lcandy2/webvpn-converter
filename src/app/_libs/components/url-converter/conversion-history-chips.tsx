'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import type { UrlConvertMode } from '@/app/_libs/types';
import {
  readConversionHistory,
  type ConversionHistoryItem,
} from '@/app/_libs/components/url-converter/conversion-history';

export default function ConversionHistoryChips({
  mode,
}: {
  mode: UrlConvertMode;
}) {
  const pathname = usePathname();
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);

  useEffect(() => {
    const updateHistory = () => setHistory(readConversionHistory());
    updateHistory();
    window.addEventListener('storage', updateHistory);
    window.addEventListener('conversion-history-change', updateHistory);
    return () => {
      window.removeEventListener('storage', updateHistory);
      window.removeEventListener('conversion-history-change', updateHistory);
    };
  }, []);

  const visibleHistory = useMemo(
    () => history.filter((item) => item.mode === mode),
    [history, mode],
  );

  if (visibleHistory.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 pb-2">
      {visibleHistory.map((item) => (
        <Link
          key={`${item.mode}:${item.originalUrl}`}
          href={`${pathname}?url=${encodeURIComponent(item.originalUrl)}`}
          className="max-w-full truncate rounded-full bg-surface-container-high px-3 py-1 text-sm text-on-surface-variant hover:bg-primary-container hover:text-on-primary-container transition-colors"
          title={item.originalUrl}
        >
          {item.originalUrl}
        </Link>
      ))}
    </div>
  );
}
