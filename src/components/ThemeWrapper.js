// components/ThemeWrapper.js
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useMediaQuery } from '@mui/material';
import { Theme } from './Theme';

export default function ThemeWrapper({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = Theme(prefersDarkMode)

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}