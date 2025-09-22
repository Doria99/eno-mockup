export default [
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        HTMLImageElement: 'readonly',
        IntersectionObserver: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 4],
      'linebreak-style': ['error', 'windows'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'error',
      'curly': 'error',
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error'
    }
  }
];