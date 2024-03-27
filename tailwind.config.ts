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
      },
    },
  },
  plugins: [],
};
export default config;
