'use client';

import { createTheme } from '@mui/material';

const MuiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
});

export default MuiTheme;
