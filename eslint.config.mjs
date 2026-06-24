import { fixupConfigRules } from '@eslint/compat';
import js from '@eslint/js';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

const nextConfig = fixupConfigRules(nextVitals).map((config) => {
  if (config.name !== 'next/typescript') {
    return config;
  }

  const { plugins, ...configWithoutTypescriptPlugin } = config;
  return configWithoutTypescriptPlugin;
});

export default tseslint.config(
  {
    ignores: [
      'eslint.config.mjs',
      '*.config.*',
      'public/**',
      'dist/**',
      'pnpm-lock.yaml',
      'packages/bookmarklet/dist/**',
      'packages/bookmarklet/webpack.config.cjs',
    ],
  },
  js.configs.recommended,
  ...nextConfig,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/static-components': 'off',
    },
  },
  prettier,
);
