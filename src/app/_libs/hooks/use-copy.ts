/**
 * Thanks to Sukka
 * Based on foxact/use-clipboard
 * @see https://foxact.skk.moe/use-clipboard
 */

'use client';

import { useState, useRef, useCallback } from 'react';

export class UseClipboardError extends Error {}

interface UseClipboardOption {
  timeout?: number;
  onCopyError?: (message: string) => void;
}

interface CopyOption {
  valueToCopy: string;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export default function useCopy({
  timeout = 1000,
  onCopyError,
}: UseClipboardOption = {}) {
  const [error, setError] = useState<Error | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<number | null>(null);

  const handleCopyResult = useCallback(
    (isCopied: boolean) => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      if (isCopied) {
        copyTimeoutRef.current = window.setTimeout(
          () => setCopied(false),
          timeout,
        );
      }
      setCopied(isCopied);
    },
    [timeout],
  );

  const handleCopyError = useCallback(
    (error: Error) => {
      console.error(error);
      setError(error);
      let message = '复制失败！';
      onCopyError?.(message);
    },
    [onCopyError],
  );

  const copy = useCallback(
    async ({ valueToCopy, inputRef }: CopyOption) => {
      try {
        if ('clipboard' in navigator) {
          await navigator.clipboard.writeText(valueToCopy);
          handleCopyResult(true);
        } else if (inputRef && inputRef.current) {
          // Fallback for browsers that do not support Clipboard API
          inputRef.current.select();
          const copyCommand = document.execCommand('copy');
          if (!copyCommand) {
            throw new Error(
              'The browser does not support both navigator.clipboard and execCommand. (wpn_err@copy_2)',
            );
          }
          handleCopyResult(true);
        } else {
          throw new UseClipboardError(
            'Neither navigator.clipboard supported nor input element found! (wpn_err@copy_3)',
          );
        }
      } catch (error) {
        handleCopyError(error as Error);
      }
    },
    [handleCopyResult, handleCopyError],
  );

  const reset = useCallback(() => {
    setCopied(false);
    setError(null);
    if (copyTimeoutRef.current) {
      clearTimeout(copyTimeoutRef.current);
    }
  }, []);

  return { copy, reset, error, copied };
}
