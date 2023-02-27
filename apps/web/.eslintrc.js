module.exports = {
  extends: ['custom'],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'unused-imports',
  ],
  rules: {
    'unused-imports/no-unused-imports-ts': 2,
  },
}
