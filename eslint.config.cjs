const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const nextPlugin = require('@next/eslint-plugin-next');

module.exports = [
  // Global ignores and file globs
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    ignores: ['**/node_modules/**', '**/.next/**', '**/dist/**'],
  },

  // JavaScript base config
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ...js.configs.recommended,
  },

  // TypeScript config with type-aware rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommendedTypeChecked[0].rules,

      // Custom TypeScript rule overrides
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },

  // Next.js Core Web Vitals config
  {
    files: ['**/*.{js,ts,jsx,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },

  // Optional: Global JS/TS custom rules (not plugin-based)
  {
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'warn',
    },
  },
];
