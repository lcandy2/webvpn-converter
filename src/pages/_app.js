// pages/_app.js
import { ThemeProvider } from '@mui/material/styles';
import Navigation from '../components/Navigation';
import theme from '../components/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Navigation />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
