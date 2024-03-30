'use client';

import { useAtomValue } from 'jotai';
import {
  decryptedUrlAtom,
  encryptedUrlAtom,
  originalUrlAtom,
} from '@/app/_libs/atoms';
import {
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import { useCallback, useMemo, useRef } from 'react';
import useCopy from '@/app/_libs/hooks/use-copy';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { ConverterConfig } from '@/app/_libs/types';

export default function ConvertedUrlInput({
  mode = 'encrypt',
}: ConverterConfig) {
  const originalUrl = useAtomValue(originalUrlAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const encryptedUrl = useAtomValue(encryptedUrlAtom);
  const decryptedUrl = useAtomValue(decryptedUrlAtom);

  const isDecryptMode = useMemo(() => mode === 'decrypt', [mode]);

  const inputValue = useMemo(() => {
    if (originalUrl) {
      return isDecryptMode ? decryptedUrl : encryptedUrl;
    } else {
      return '';
    }
  }, [isDecryptMode, encryptedUrl, decryptedUrl, originalUrl]);

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
  const smMediaQuery = useMediaQuery(muiTheme.breakpoints.up('sm'));

  const InputAdornmentComponents = () => {
    return (
      <div className="flex flex-col sm:flex-row lg:flex-col gap-0">
        <MdIconButton onClick={handleCopyButtonClick}>
          {error ? (
            <ErrorIcon color="error" />
          ) : copied ? (
            <DoneIcon color="success" />
          ) : (
            <ContentCopyIcon />
          )}
        </MdIconButton>
        <Link href={`//${inputValue}`} target="_blank">
          <MdIconButton>
            <OpenInNewIcon />
          </MdIconButton>
        </Link>
      </div>
    );
  };

  return (
    ((inputValue && originalUrl) || lgMediaQuery) && (
      <>
        <TextField
          inputRef={inputRef}
          label={
            isDecryptMode
              ? '原始链接'
              : 'Web VPN 链接' + (!inputValue ? '将会显示在这里' : '')
          }
          value={inputValue}
          variant="filled"
          fullWidth
          multiline
          minRows={lgMediaQuery ? 4 : smMediaQuery ? '' : 3}
          margin="normal"
          type="url"
          InputProps={{
            type: 'url',
            autoCapitalize: 'none',
            autoCorrect: 'off',
            spellCheck: false,
            readOnly: true,
            startAdornment: lgMediaQuery && inputValue && (
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
