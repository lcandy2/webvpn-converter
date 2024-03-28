'use client';

import { createTheme, experimental_extendTheme } from '@mui/material';

// const MuiTheme = createTheme({
//   breakpoints: {
//     values: {
//       xs: 0,
//       sm: 640,
//       md: 768,
//       lg: 1024,
//       xl: 1280,
//     },
//   },
//   palette: {
//     primary: {
//       main: '#615d5e',
//     }
//   }
// });
//

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
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#615d5e',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#ffe3e2',
        },
      },
    },
  },
  components: {
    MuiInput: {},
  },
});

export default MuiTheme;
