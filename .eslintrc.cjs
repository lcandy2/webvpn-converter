module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'next',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/stylistic',
    'prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-unused-modules': [1, { unusedExports: true }],
  },
  ignorePatterns: ['public', '.eslintrc.cjs'],
};
