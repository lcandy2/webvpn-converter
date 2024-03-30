'use client';

import { experimental_extendTheme } from '@mui/material';

const MuiTheme = experimental_extendTheme({
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
