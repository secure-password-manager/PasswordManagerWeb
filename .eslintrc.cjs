module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  globals: {
    "global": true
  },
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: "@typescript-eslint/parser",
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
      'react-refresh',
      '@typescript-eslint'
  ],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    '@typescript-eslint/type-annotation-spacing': [
        'error',
      {
        'before': true,
        'after': true,
      },
    ],
    "react/prop-types": "off",
  },
}
