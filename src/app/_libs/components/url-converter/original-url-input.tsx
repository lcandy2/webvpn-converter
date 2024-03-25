'use client';

import { useRef } from 'react';
import { useAtom } from 'jotai';
import { originalUrlAtom } from '@/app/_libs/atoms';
import { InputAdornment } from '@mui/material-next';
import { IconButton, TextField } from '@mui/material';
import MdIcon from '@/app/_libs/ui/icon';
import MdIconButton from '@/app/_libs/ui/icon-button';

export default function OriginalUrlInput() {
  const inputRef = useRef();
  const [originalUrl, setOriginalUrl] = useAtom(originalUrlAtom);

  const handleInputChange = (event) => {
    const updatedText = event.target.value.replace(/(\r\n|\n|\r)/gm, '');
    setOriginalUrl(updatedText);
  };

  return (
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
            <MdIconButton icon="content_paste" />
          </InputAdornment>
        ),
      }}
    />
  );
}
