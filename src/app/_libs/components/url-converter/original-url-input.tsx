'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useAtom } from 'jotai';
import { originalUrlAtom } from '@/app/_libs/atoms';
import { InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { usePaste } from '@/app/_libs/hooks/use-paste';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import muiTheme from '@/app/_libs/mui-theme';
import { ConverterConfig } from '@/app/_libs/types';

export default function OriginalUrlInput({
  mode = 'encrypt',
}: ConverterConfig) {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [originalUrl, setOriginalUrl] = useAtom(originalUrlAtom);
  const lgMediaQuery = useMediaQuery(muiTheme.breakpoints.up('lg'));

  const isDecryptMode = useMemo(() => mode === 'decrypt', [mode]);

  const { paste } = usePaste({
    onPasteError: (message) => {
      enqueueSnackbar(message, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
    },
  });

  const handleSetOriginalUrl = useCallback(
    (value: string) => {
      const formattedValue = value.replace(/(\r\n|\n|\r)/gm, '').trim();
      setOriginalUrl(formattedValue);
    },
    [setOriginalUrl],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      handleSetOriginalUrl(event.target.value);
    },
    [handleSetOriginalUrl],
  );

  const handlePasteButtonClick = useCallback(() => {
    paste({ handleSetInputValue: handleSetOriginalUrl, inputRef });
  }, [paste, inputRef, handleSetOriginalUrl]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <TextField
        inputRef={inputRef}
        label={isDecryptMode ? 'Web VPN 链接' : '原始链接'}
        value={originalUrl}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        multiline
        maxRows={lgMediaQuery ? '' : 4}
        minRows={lgMediaQuery ? 4 : ''}
        margin="normal"
        type="url"
        InputProps={{
          type: 'url',
          autoCapitalize: 'none',
          autoCorrect: 'off',
          spellCheck: false,
          endAdornment: (
            <InputAdornment position="end">
              <MdIconButton title="粘贴" onClick={handlePasteButtonClick}>
                <ContentPasteIcon titleAccess="粘贴" />
              </MdIconButton>
            </InputAdornment>
          ),
        }}
      />
      <SnackbarProvider />
    </>
  );
}
