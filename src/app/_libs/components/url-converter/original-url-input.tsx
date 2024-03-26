'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useAtom } from 'jotai';
import { originalUrlAtom } from '@/app/_libs/atoms';
import { InputAdornment } from '@mui/material-next';
import { IconButton, TextField } from '@mui/material';
import MdIcon from '@/app/_libs/ui/icon';
import MdIconButton from '@/app/_libs/ui/icon-button';
import { enqueueSnackbar, SnackbarProvider } from 'notistack';
import { usePaste } from '@/app/_libs/hooks/use-paste';

export default function OriginalUrlInput() {
  const inputRef = useRef<HTMLInputElement>(null!);
  const [originalUrl, setOriginalUrl] = useAtom(originalUrlAtom);

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
  }, [paste, setOriginalUrl, inputRef]);

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
        maxRows={4}
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <MdIconButton
                icon="content_paste"
                onClick={handlePasteButtonClick}
              />
            </InputAdornment>
          ),
        }}
      />
      <SnackbarProvider />
    </>
  );
}
