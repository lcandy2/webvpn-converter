// pages/_app.js
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Box from '@mui/material/Box';
import ThemeWrapper from '../components/ThemeWrapper';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeWrapper>
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Navigation />
        <Box flexGrow={1}>
          <Component {...pageProps} />
        </Box>
        <Footer />
      </Box>
    </ThemeWrapper>
  );
}

export default MyApp;