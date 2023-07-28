// components/Theme.js
import { createTheme } from '@mui/material/styles';
import themeColors from '../styles/theme.json';
import { useMediaQuery } from '@mui/material';

export const Theme = () => {
  const dark = useMediaQuery('(prefers-color-scheme: dark)');
  return createTheme({
    palette: {
      mode: dark ? 'dark' : 'light',
      text: {
        primary: dark ? themeColors.schemes.dark.onBackground : themeColors.schemes.light.onBackground,
      },
      primary: {
        main: dark ? themeColors.schemes.dark.primary : themeColors.schemes.light.primary,
        light: themeColors.schemes.light.primary,
        dark: themeColors.schemes.dark.primary
      },
      onPrimary: {
        main: dark ? themeColors.schemes.dark.onPrimary : themeColors.schemes.light.onPrimary,
        light: themeColors.schemes.light.onPrimary,
        dark: themeColors.schemes.dark.onPrimary
      },
      secondary: {
        main: dark ? themeColors.schemes.dark.secondary : themeColors.schemes.light.secondary,
        light: themeColors.schemes.light.secondary,
        dark: themeColors.schemes.dark.secondary
      },
      onSecondary: {
        main: dark ? themeColors.schemes.dark.onSecondary : themeColors.schemes.light.onSecondary,
        light: themeColors.schemes.light.onSecondary,
        dark: themeColors.schemes.dark.onSecondary
      },
      error: {
        main: dark ? themeColors.schemes.dark.error : themeColors.schemes.light.error,
        light: themeColors.schemes.light.error,
        dark: themeColors.schemes.dark.error
      },
      surface: {
        main: dark ? themeColors.schemes.dark.surface : themeColors.schemes.light.surface
      },
      onSurface: {
        main: dark ? themeColors.schemes.dark.onSurface : themeColors.schemes.light.onSurface
      },
      surfaceVariant: {
        main: dark ? themeColors.schemes.dark.surfaceVariant : themeColors.schemes.light.surfaceVariant
      },
      onSurfaceVariant: {
        main: dark ? themeColors.schemes.dark.onSurfaceVariant : themeColors.schemes.light.onSurfaceVariant
      },
      surfaceContainer: {
        main: dark ? themeColors.schemes.dark.surfaceContainer : themeColors.schemes.light.surfaceContainer
      },
      primaryContainer: {
        main: dark ? themeColors.schemes.dark.primaryContainer : themeColors.schemes.light.primaryContainer
      },
      secondaryContainer: {
        main: dark ? themeColors.schemes.dark.secondaryContainer : themeColors.schemes.light.secondaryContainer
      },
      onSecondaryContainer: {
        main: dark ? themeColors.schemes.dark.onSecondaryContainer : themeColors.schemes.light.onSecondaryContainer
      },
      background: {
        default: dark ? themeColors.schemes.dark.background : themeColors.schemes.light.background
      },
      onBackground: {
        default: dark ? themeColors.schemes.dark.onBackground : themeColors.schemes.light.onBackground
      },
    },
  });
};
