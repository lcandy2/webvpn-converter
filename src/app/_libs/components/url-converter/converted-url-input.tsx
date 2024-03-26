'use client';

import { useAtom, useAtomValue } from 'jotai';
import { encryptedUrlAtom, originalUrlAtom } from '@/app/_libs/atoms';
import { TextField, useMediaQuery, useTheme } from '@mui/material';
import { InputAdornment } from '@mui/material-next';
import MdIconButton from '@/app/_libs/ui/icon-button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useCopy from '@/app/_libs/hooks/use-copy';
import { enqueueSnackbar } from 'notistack';
import theme from 'tailwindcss/defaultTheme';
import MuiTheme from '@/app/_libs/mui-theme';

export default function ConvertedUrlInput() {
  const originalUrl = useAtomValue(originalUrlAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [convertType, setConvertType] = useState<'encrypt' | 'decrypt'>(
    'encrypt',
  ); // ['encrypt', 'decrypt'
  const encryptedUrl = useAtomValue(encryptedUrlAtom);
  const inputValue = useMemo(() => {
    return convertType === 'encrypt' ? encryptedUrl : originalUrl;
  }, [convertType, encryptedUrl, originalUrl]);
  const { copy, reset, error, copied } = useCopy({
    onCopyError: (message) => {
      enqueueSnackbar(message, {
        variant: 'error',
        preventDuplicate: true,
        autoHideDuration: 3000,
      });
    },
  });
  const handleCopyButtonClick = useCallback(() => {
    copy({ valueToCopy: inputValue, inputRef });
  }, [copy, inputValue, inputRef]);
  const muiTheme = useTheme();
  const lgMediaQuery = useMediaQuery(muiTheme.breakpoints.up('lg'));

  const InputAdornmentComponents = () => {
    return (
      <>
        {/*<Grid container direction={matches ? "column" : "row"} justify="center">*/}
        {/*  <Grid item xs={6}>*/}
        {/*    <IconButton onClick={handleCopy}>*/}
        {/*      <ContentCopyIcon />*/}
        {/*    </IconButton>*/}
        <MdIconButton
          icon={error ? 'error' : copied ? 'done' : 'content_copy'}
          onClick={handleCopyButtonClick}
        />
        {/*</Grid>*/}
        {/*<Grid item xs={6}>*/}
        {/*<IconButton onClick={handleOpen}>*/}
        {/*  <OpenInNewIcon />*/}
        {/*</IconButton>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
      </>
    );
  };

  return (
    inputValue &&
    originalUrl && (
      <>
        <TextField
          inputRef={inputRef}
          label="Web VPN 链接"
          value={inputValue}
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          InputProps={{
            readOnly: true,
            startAdornment: lgMediaQuery && (
              <InputAdornment position="start">
                <InputAdornmentComponents />
              </InputAdornment>
            ),
            endAdornment: !lgMediaQuery && (
              <InputAdornment position="end">
                <InputAdornmentComponents />
              </InputAdornment>
            ),
          }}
        />
      </>
    )
  );
}
