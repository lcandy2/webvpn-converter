// pages/_app.js
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navigation from '../components/Navigation';
import { Theme } from '../components/Theme';
import { useMediaQuery } from '@mui/material';

function MyApp({ Component, pageProps }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = Theme(prefersDarkMode)

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
