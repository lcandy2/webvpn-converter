'use client';

import { useAtom, useAtomValue } from 'jotai';
import { encryptedUrlAtom, originalUrlAtom } from '@/app/_libs/atoms';
import { TextField } from '@mui/material';
import { InputAdornment } from '@mui/material-next';
import MdIconButton from '@/app/_libs/ui/icon-button';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useCopy from '@/app/_libs/hooks/use-copy';

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
  const { copy, reset, error, copied } = useCopy({});
  const handleCopyButtonClick = useCallback(() => {
    copy({ valueToCopy: inputValue, inputRef });
  }, [copy, inputValue, inputRef]);

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
            endAdornment: (
              <InputAdornment position="end">
                {/*<Grid container direction={matches ? "column" : "row"} justify="center">*/}
                {/*  <Grid item xs={6}>*/}
                {/*    <IconButton onClick={handleCopy}>*/}
                {/*      <ContentCopyIcon />*/}
                {/*    </IconButton>*/}
                <MdIconButton
                  icon="content_copy"
                  onClick={handleCopyButtonClick}
                />
                {/*</Grid>*/}
                {/*<Grid item xs={6}>*/}
                {/*<IconButton onClick={handleOpen}>*/}
                {/*  <OpenInNewIcon />*/}
                {/*</IconButton>*/}
                {/*  </Grid>*/}
                {/*</Grid>*/}
              </InputAdornment>
            ),
          }}
        />
      </>
    )
  );
}
