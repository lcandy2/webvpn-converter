'use client';

import { useCallback, useState } from 'react';
import { InputAdornment } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import type { UrlConvertMode } from '@/app/_libs/types';
import { addConversionHistory } from '@/app/_libs/components/url-converter/conversion-history';

const getExternalConvertedHref = (value: string, mode: UrlConvertMode) =>
  mode === 'decrypt' ? value : `//${value}`;

export default function ConvertedUrlActions({
  convertedUrl,
  originalUrl,
  mode,
}: {
  convertedUrl: string;
  originalUrl: string;
  mode: UrlConvertMode;
}) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>(
    'idle',
  );

  const recordHistory = useCallback(() => {
    addConversionHistory({ mode, originalUrl });
  }, [mode, originalUrl]);

  const handleCopy = useCallback(async () => {
    recordHistory();
    try {
      await navigator.clipboard.writeText(convertedUrl);
      setCopyState('copied');
      window.setTimeout(() => setCopyState('idle'), 1000);
    } catch {
      setCopyState('error');
    }
  }, [convertedUrl, recordHistory]);

  return (
    <InputAdornment position="end">
      <div className="flex flex-col sm:flex-row lg:flex-col gap-0">
        <MdIconButton
          title={
            copyState === 'error'
              ? '复制失败'
              : copyState === 'copied'
                ? '复制成功'
                : '复制'
          }
          onClick={handleCopy}
        >
          {copyState === 'error' ? (
            <ErrorIcon color="error" titleAccess="复制失败" />
          ) : copyState === 'copied' ? (
            <DoneIcon color="success" titleAccess="复制成功" />
          ) : (
            <ContentCopyIcon titleAccess="复制" />
          )}
        </MdIconButton>
        <a
          href={getExternalConvertedHref(convertedUrl, mode)}
          target="_blank"
          rel="noreferrer"
          onClick={recordHistory}
        >
          <MdIconButton title="打开">
            <OpenInNewIcon titleAccess="打开" />
          </MdIconButton>
        </a>
      </div>
    </InputAdornment>
  );
}
