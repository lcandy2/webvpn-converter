import { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { encryptUrl } from '../lib/urlConverter';

const UrlConverter = ({ host, key, iv }) => {
  const [originalURL, setOriginalURL] = useState('');
  const [convertedURL, setConvertedURL] = useState('');

  useEffect(() => {
    if (originalURL) exportConvertUrl(convertUrl(originalURL, setOriginalURL, key, iv), setConvertedURL, host);
  }, [host]);

  const handleOriginalURLChange = (event) => {
    exportConvertUrl(convertUrl(event.target.value, setOriginalURL, key, iv), setConvertedURL, host);
  };

  return (
    <div>
      <TextField
        label="Original URL"
        value={originalURL}
        onChange={handleOriginalURLChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      <TextField
        label="Converted URL"
        value={convertedURL}
        variant="outlined"
        fullWidth
        InputProps={{
          readOnly: true,
        }}
        multiline
        margin="normal"
      />
    </div>
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