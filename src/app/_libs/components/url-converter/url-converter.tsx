'use client';

import { InputAdornment, TextField, useMediaQuery } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { decryptUrl, encryptUrl } from '@/app/_libs/url-convert';
import type { ConverterConfig } from '@/app/_libs/types';
import ConvertedUrlActions from '@/app/_libs/components/url-converter/converted-url-actions';
import ConversionHistoryChips from '@/app/_libs/components/url-converter/conversion-history-chips';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import { usePaste } from '@/app/_libs/hooks/use-paste';
import muiTheme from '@/app/_libs/mui-theme';

export default function UrlConverter({
  mode = 'encrypt',
  school,
}: ConverterConfig) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlParam = searchParams.get('url') || '';
  const [inputUrl, setInputUrl] = useState(urlParam);
  const isDecryptMode = mode === 'decrypt';
  const lgMediaQuery = useMediaQuery(muiTheme.breakpoints.up('lg'));
  const smMediaQuery = useMediaQuery(muiTheme.breakpoints.up('sm'));

  const { paste } = usePaste({
    onPasteError: (message) => {
      enqueueSnackbar(message, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
    },
  });

  useEffect(() => {
    setInputUrl(urlParam);
  }, [urlParam]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const normalizedInputUrl = inputUrl.trim();
    if (normalizedInputUrl === urlParam) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const nextSearchParams = new URLSearchParams(searchParams.toString());

      if (normalizedInputUrl) {
        nextSearchParams.set('url', normalizedInputUrl);
      } else {
        nextSearchParams.delete('url');
      }

      const query = nextSearchParams.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    }, 200);

    return () => window.clearTimeout(timeoutId);
  }, [inputUrl, pathname, router, searchParams, urlParam]);

  const handleSetInputUrl = useCallback((value: string) => {
    setInputUrl(value.replace(/(\r\n|\n|\r)/gm, '').trim());
  }, []);

  const handlePasteButtonClick = useCallback(() => {
    paste({ handleSetInputValue: handleSetInputUrl, inputRef });
  }, [handleSetInputUrl, inputRef, paste]);

  const convertedUrl = useMemo(
    () =>
      inputUrl && school
        ? isDecryptMode
          ? decryptUrl({
              url: inputUrl,
              key: school.crypto_key,
              iv: school.crypto_iv,
              type: school.crypto_type,
            })
          : encryptUrl({
              url: inputUrl,
              schoolHost: school.host,
              key: school.crypto_key,
              iv: school.crypto_iv,
              type: school.crypto_type,
            })
        : '',
    [inputUrl, isDecryptMode, school],
  );

  const hasConvertedUrl =
    convertedUrl &&
    !convertedUrl.startsWith('Decryption failed:') &&
    !convertedUrl.startsWith('转换失败:');

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-x-8">
        <section className="flex-1">
          <TextField
            inputRef={inputRef}
            name="url"
            label={isDecryptMode ? 'Web VPN 链接' : '原始链接'}
            value={inputUrl}
            onChange={(event) => handleSetInputUrl(event.target.value)}
            variant="outlined"
            fullWidth
            multiline
            maxRows={lgMediaQuery ? '' : 4}
            minRows={lgMediaQuery ? 4 : ''}
            margin="normal"
            type="url"
            slotProps={{
              htmlInput: {
                autoCapitalize: 'none',
                autoCorrect: 'off',
                spellCheck: false,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <MdIconButton title="粘贴" onClick={handlePasteButtonClick}>
                      <ContentPasteIcon titleAccess="粘贴" />
                    </MdIconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          {!inputUrl && <ConversionHistoryChips mode={mode} />}
        </section>
        {hasConvertedUrl && (
          <TextField
            label={
              isDecryptMode
                ? '原始链接'
                : 'Web VPN 链接' + (!hasConvertedUrl ? '将会显示在这里' : '')
            }
            value={convertedUrl}
            variant="filled"
            fullWidth
            multiline
            minRows={lgMediaQuery ? 4 : smMediaQuery ? '' : 3}
            margin="normal"
            type="url"
            className="flex-1"
            slotProps={{
              htmlInput: {
                autoCapitalize: 'none',
                autoCorrect: 'off',
                spellCheck: false,
              },
              input: {
                readOnly: true,
                endAdornment: hasConvertedUrl ? (
                  <ConvertedUrlActions
                    convertedUrl={convertedUrl}
                    originalUrl={inputUrl}
                    mode={mode}
                  />
                ) : undefined,
              },
            }}
          />
        )}
      </div>
      <SnackbarProvider />
    </>
  );
}
