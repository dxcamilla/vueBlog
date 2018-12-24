module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: 'eslint:recommended',
  rules: {
    'no-console': 0,
    'no-debugger': 2,
    semi: 0,
    'handle-callback-err': 0,
    eqeqeq: ['error', 'smart'],
    'one-var': 'off',
    camelcase: 0,
    'no-var': 2,
    'prefer-destructuring': 0,
    'no-duplicate-imports': 2,
    'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
    'no-unused-vars': 0,
    'no-undef': 0
  }
}