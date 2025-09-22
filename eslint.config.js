export default [
  {
    ignores: ['*.min.js', '*.min.css', 'node_modules/**']
  },
  {
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        HTMLImageElement: 'readonly',
        IntersectionObserver: 'readonly',
        localStorage: 'readonly',
        fetch: 'readonly',
        CustomEvent: 'readonly',
        setTimeout: 'readonly',
        alert: 'readonly',
        module: 'readonly',
        self: 'readonly',
        caches: 'readonly'
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': 'off',
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'no-undef': 'warn',
      'curly': 'warn',
      'eqeqeq': 'error',
      'no-trailing-spaces': 'warn'
    }
  }
];