'use client';

import { useState, useCallback } from 'react';

interface UsePasteOption {
  onPasteError?: (message: string) => void;
}

interface PasteOption {
  handleSetInputValue: (value: string) => void;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
}

export function usePaste({ onPasteError }: UsePasteOption) {
  const [pasted, setPasted] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handlePasteError = useCallback(
    (error: Error) => {
      console.error('[WebVPN Converter] Paste failed: ', error);
      setError(error);
      let message = '粘贴失败：可能未授予剪贴板权限或浏览器不支持！';
      if (error) {
        const errorString = error.toString();
        if (errorString.includes('permission')) {
          message = '粘贴失败：未授予剪贴板权限';
        }
        if (errorString.includes('wpn_err@paste_2')) {
          message = '粘贴失败：浏览器不支持';
        }
        if (errorString.includes('wpn_err@paste_3')) {
          message = '粘贴失败：未知错误';
        }
      }
      onPasteError?.(message);
    },
    [onPasteError],
  );

  const paste = useCallback(
    async ({ handleSetInputValue, inputRef }: PasteOption) => {
      try {
        if ('clipboard' in navigator) {
          const text = await navigator.clipboard.readText();
          inputRef && inputRef.current?.focus();
          handleSetInputValue(text);
        } else if (inputRef && inputRef.current) {
          // Fallback for browsers that do not support Clipboard API
          inputRef.current.select();
          const pasteCommand = document.execCommand('paste');
          if (!pasteCommand)
            throw new Error(
              'The browser does not support both navigator.clipboard and execCommand. (wpn_err@paste_2)',
            );
        } else {
          handlePasteError(
            new Error(
              'Neither navigator.clipboard supported nor input element found! (wpn_err@paste_3)',
            ),
          );
        }
      } catch (error) {
        handlePasteError(error as Error);
      }
    },
    [onPasteError, handlePasteError],
  );

  const reset = useCallback(() => {
    setError(null);
    setPasted(false);
  }, []);

  return { paste, reset, error, pasted };
}
