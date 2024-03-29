'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { originalUrlAtom } from '@/app/_libs/atoms';
import { InputAdornment, TextField, useMediaQuery } from '@mui/material';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { usePaste } from '@/app/_libs/hooks/use-paste';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import MdIcon from '../../ui/icon';
import muiTheme from '@/app/_libs/mui-theme';

export default function OriginalUrlInput() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [originalUrl, setOriginalUrl] = useAtom(originalUrlAtom);
  const lgMediaQuery = useMediaQuery(muiTheme.breakpoints.up('lg'));

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
        label="原始链接"
        value={originalUrl}
        onChange={handleInputChange}
        variant="outlined"
        fullWidth
        multiline
        maxRows={lgMediaQuery ? '' : 4}
        minRows={lgMediaQuery ? 4 : ''}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MdIconButton onClick={handlePasteButtonClick}>
                <ContentPasteIcon />
              </MdIconButton>
            </InputAdornment>
          ),
        }}
      />
      <SnackbarProvider />
    </>
  );
}
