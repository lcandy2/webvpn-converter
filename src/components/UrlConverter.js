import { useState, useEffect, useRef } from 'react';
import { IconButton, TextField, InputAdornment, Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ClipSnackbar from './ClipSnackbar';
import { encryptUrl } from '../lib/urlConverter';

const UrlConverter = ({ host, key, iv }) => {
  const [originalURL, setOriginalURL] = useState('');
  const [convertedURL, setConvertedURL] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const originalURLRef = useRef();
  const convertedURLRef = useRef();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (originalURL) exportConvertUrl(convertUrl(originalURL, setOriginalURL, key, iv), setConvertedURL, host);
  }, [host]);

  const handleOriginalURLChange = (event) => {
    const updatedText = event.target.value.replace(/(\r\n|\n|\r)/gm, "");
    setOriginalURL(updatedText);
    exportConvertUrl(convertUrl(updatedText, setOriginalURL, key, iv), setConvertedURL, host);
  };

  const handlePaste = async () => {
    const failed = (error) => {
      console.warn('Failed to paste text.', error);
      setSnackbarSeverity('warning');
      setSnackbarMessage('粘贴失败，可能未授予粘贴权限或浏览器不支持！');
      setSnackbarOpen(true);
    };
    if (navigator.clipboard) {
      try {
        const text = await navigator.clipboard.readText();
        handleOriginalURLChange({ target: { value: text } });
      } catch (error) {
        failed(error);
      }
    } else {
      // Fallback for browsers that do not support Clipboard API
      originalURLRef.current.select();
      const p = document.execCommand('paste');
      if (!p) failed();

    }
  };

  const handleCopy = async () => {
    const failed = (e) => {
      console.error('Failed to copy text.', e);
      setSnackbarSeverity('warning');
      setSnackbarMessage('复制失败，可能是浏览器不支持，请重试。');
      setSnackbarOpen(true);
    };
    const success = () => {
      setSnackbarSeverity('success');
      setSnackbarMessage('好耶！链接已成功复制到剪贴板。');
      setSnackbarOpen(true);
    };
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(convertedURL);
        success();
      } catch (err) {
        failed(err);
      }
    } else {
      // Fallback for browsers that do not support Clipboard API
      convertedURLRef.current.select();
      const c = document.execCommand('copy');
      if (!c) failed(); else success();
    }
  }

  const handleOpen = () => {
    window.open('//' + convertedURL, '_blank');
  }

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (typeof window !== 'undefined') {
    const storedSchool = window.localStorage.getItem('selectedSchool');
    if (storedSchool) {
      if (originalURLRef.current) originalURLRef.current.focus();
    }
  }

  return (
    <>
      <TextField
        inputRef={originalURLRef}
        label="原始链接"
        value={originalURL}
        onChange={handleOriginalURLChange}
        variant="outlined"
        fullWidth
        multiline
        maxRows={4}
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

      {convertedURL && originalURL && (
        <TextField
          inputRef={convertedURLRef}
          label="Web VPN 链接"
          value={convertedURL}
          variant="outlined"
          fullWidth
          multiline
          margin="normal"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <Grid container direction={matches ? "column" : "row"} justify="center">
                  <Grid item xs={6}>
                    <IconButton onClick={handleCopy}>
                      <ContentCopyIcon />
                    </IconButton>
                  </Grid>
                  <Grid item xs={6}>
                    <IconButton onClick={handleOpen}>
                      <OpenInNewIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </InputAdornment>
            )
          }}
        />
      )}
      <ClipSnackbar
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
        severity={snackbarSeverity}
        message={snackbarMessage}
        top={matches}
      />
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