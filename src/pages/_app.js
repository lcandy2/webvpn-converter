// pages/_app.js
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import ThemeWrapper from '../components/ThemeWrapper';
import { useEffect } from 'react';
import serviceWorker from '../lib/serviceWorker';
import Gtag from '../lib/gtag'
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    serviceWorker();
  }, []);
  return (
    <ThemeWrapper>
      <Gtag />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navigation />
        <Box flexGrow={1} display="flex" flexDirection="column">
          <Component {...pageProps} />
          <Analytics />
        </Box>
        <Footer />
      </Box>
    </ThemeWrapper>
  );
}

export default MyApp;