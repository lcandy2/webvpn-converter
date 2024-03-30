import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        lustiana: ['var(--font-lustiana)'],
        'noto-serif-sc': ['var(--font-noto-serif-sc)'],
        // 'lxgw-neo-zhi-song': ['var(--font-lxgw-neo-zhi-song)'],
      },
      height: {
        header: '72px',
        'content-sm': 'calc(100dvh - theme("height.header"))',
        content: 'calc(100dvh - theme("height.header") -  theme("spacing.l"))',
      },
      transitionDuration: {
        md: '0.5s',
      },
      transitionTimingFunction: {
        md: 'cubic-bezier(0.3, 0, 0, 1)',
      },
      borderRadius: {
        'shape-xl': '28px',
      },
      spacing: {
        xl: '28px',
        l: '16px',
      },
      fontSize: {
        'title-l': [
          '22px',
          {
            lineHeight: 'normal',
            fontWeight: '400',
            letterSpacing: '-0.04em',
          },
        ],
        'title-m': [
          '16px',
          {
            lineHeight: 'normal',
            fontWeight: '400',
            letterSpacing: '-0.04em',
          },
        ],
        'title-s': [
          '14px',
          {
            lineHeight: 'normal',
            fontWeight: '400',
            letterSpacing: '-0.04em',
          },
        ],
        'display-xl': [
          '88px',
          {
            lineHeight: 'normal',
            fontWeight: '400',
            letterSpacing: '-0.04em',
          },
        ],
        'display-xl-sm': [
          '55px',
          {
            lineHeight: 'normal',
            fontWeight: '400',
            letterSpacing: '-0.04em',
          },
        ],
      },
    },
    colors: {
      background: 'var(--md-sys-color-background)',
      'on-background': 'var(--md-sys-color-on-background)',
      surface: 'var(--md-sys-color-surface)',
      'surface-dim': 'var(--md-sys-color-surface-dim)',
      'surface-bright': 'var(--md-sys-color-surface-bright)',
      'surface-container-lowest':
        'var(--md-sys-color-surface-container-lowest)',
      'surface-container-low': 'var(--md-sys-color-surface-container-low)',
      'surface-container': 'var(--md-sys-color-surface-container)',
      'surface-container-high': 'var(--md-sys-color-surface-container-high)',
      'surface-container-highest':
        'var(--md-sys-color-surface-container-highest)',
      'on-surface': 'var(--md-sys-color-on-surface)',
      'surface-variant': 'var(--md-sys-color-surface-variant)',
      'on-surface-variant': 'var(--md-sys-color-on-surface-variant)',
      'inverse-surface': 'var(--md-sys-color-inverse-surface)',
      'inverse-on-surface': 'var(--md-sys-color-inverse-on-surface)',
      outline: 'var(--md-sys-color-outline)',
      'outline-variant': 'var(--md-sys-color-outline-variant)',
      shadow: 'var(--md-sys-color-shadow)',
      scrim: 'var(--md-sys-color-scrim)',
      'surface-tint': 'var(--md-sys-color-surface-tint)',
      primary: 'var(--md-sys-color-primary)',
      'on-primary': 'var(--md-sys-color-on-primary)',
      'primary-container': 'var(--md-sys-color-primary-container)',
      'on-primary-container': 'var(--md-sys-color-on-primary-container)',
      'inverse-primary': 'var(--md-sys-color-inverse-primary)',
      secondary: 'var(--md-sys-color-secondary)',
      'on-secondary': 'var(--md-sys-color-on-secondary)',
      'secondary-container': 'var(--md-sys-color-secondary-container)',
      'on-secondary-container': 'var(--md-sys-color-on-secondary-container)',
      tertiary: 'var(--md-sys-color-tertiary)',
      'on-tertiary': 'var(--md-sys-color-on-tertiary)',
      'tertiary-container': 'var(--md-sys-color-tertiary-container)',
      'on-tertiary-container': 'var(--md-sys-color-on-tertiary-container)',
      error: 'var(--md-sys-color-error)',
      'on-error': 'var(--md-sys-color-on-error)',
      'error-container': 'var(--md-sys-color-error-container)',
      'on-error-container': 'var(--md-sys-color-on-error-container)',
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwind-scrollbar')],
};
export default config;
