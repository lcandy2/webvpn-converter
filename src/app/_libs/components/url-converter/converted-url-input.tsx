'use client';

import { useAtomValue } from 'jotai';
import { encryptedUrlAtom, originalUrlAtom } from '@/app/_libs/atoms';
import {
  InputAdornment,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MdIconButton } from '@/app/_libs/ui/icon-button';
import { useCallback, useMemo, useRef, useState } from 'react';
import useCopy from '@/app/_libs/hooks/use-copy';
import { enqueueSnackbar } from 'notistack';
import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ErrorIcon from '@mui/icons-material/Error';
import DoneIcon from '@mui/icons-material/Done';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function ConvertedUrlInput() {
  const originalUrl = useAtomValue(originalUrlAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [convertType, setConvertType] = useState<'encrypt' | 'decrypt'>(
    'encrypt',
  ); // ['encrypt', 'decrypt'
  const encryptedUrl = useAtomValue(encryptedUrlAtom);
  const inputValue = useMemo(() => {
    if (originalUrl) {
      return convertType === 'encrypt' ? encryptedUrl : originalUrl;
    } else {
      return '';
    }
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
      <div className="flex flex-col sm:flex-row gap-0">
        <MdIconButton onClick={handleCopyButtonClick}>
          {error ? <ErrorIcon /> : copied ? <DoneIcon /> : <ContentCopyIcon />}
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
          label={'Web VPN 链接' + (!inputValue ? '将会显示在这里' : '')}
          value={inputValue}
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          InputProps={{
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
