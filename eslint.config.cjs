const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const nextPlugin = require('@next/eslint-plugin-next');

/** @type {import("eslint").Linter.FlatConfig[]} */
module.exports = [
  // Define base file patterns and parser options
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  // ESLint's base recommended rules for JavaScript
  js.configs.recommended,

  // TypeScript rules with type-checking
  ...tseslint.configs.recommendedTypeChecked,

  // Next.js plugin with Core Web Vitals
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Your custom rules
  // {
  //   rules: {
  //     'no-console': 'warn',
  //     'no-unused-vars': 'warn',
  //     '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  //   },
  // },
];
