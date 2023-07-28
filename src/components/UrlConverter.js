import { useState, useEffect, useRef } from 'react';
import { IconButton, TextField, InputAdornment, Snackbar, Alert } from '@mui/material';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import { encryptUrl } from '../lib/urlConverter';

const UrlConverter = ({ host, key, iv }) => {
  const [originalURL, setOriginalURL] = useState('');
  const [convertedURL, setConvertedURL] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const textFieldRef = useRef();

  useEffect(() => {
    if (originalURL) exportConvertUrl(convertUrl(originalURL, setOriginalURL, key, iv), setConvertedURL, host);
  }, [host]);

  const handleOriginalURLChange = (event) => {
    exportConvertUrl(convertUrl(event.target.value, setOriginalURL, key, iv), setConvertedURL, host);
  };

  const handlePaste = async () => {
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        handleOriginalURLChange({ target: { value: text } });
      } catch (error) {
        setSnackbarOpen(true);
      }
    } else {
      // Fallback for browsers that do not support Clipboard API
      textFieldRef.current.select();
      document.execCommand('paste');
    }
  };

  return (
    <>
      <TextField
        inputRef={textFieldRef}
        label="原始链接"
        value={originalURL}
        onChange={handleOriginalURLChange}
        variant="outlined"
        fullWidth
        multiline
        margin="normal"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handlePaste}>
                <ContentPasteIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {convertedURL && originalURL && (<TextField
        label="Web VPN 链接"
        value={convertedURL}
        variant="outlined"
        fullWidth
        multiline
        margin="normal"
      />)}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="warning" sx={{ width: '100%' }}>
          粘贴失败，权限不足或浏览器不支持。
        </Alert>
      </Snackbar>
    </>
  );
};

export default UrlConverter;

const exportConvertUrl = (url, setUrl, host) => {
  setUrl(host + url);
}

const convertUrl = (url, setUrl, key, iv) => {
  setUrl(url);
  const encryptedUrl = encryptUrl(url, key, iv);
  return encryptedUrl;
}