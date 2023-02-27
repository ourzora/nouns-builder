module.exports = {
  extends: ['next', 'turbo', 'prettier'],
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    require('@trivago/prettier-plugin-sort-imports'),
  ],
  parser: '@typescript-eslint/parser',
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'off',
    'react/display-name': 'off',
    '@next/next/no-img-element': 'off',
    'react/no-unescaped-entities': 0,
    'unused-imports/no-unused-imports-ts': 2,
  },
  parserOptions: {
    babelOptions: {
      presets: [require.resolve('next/babel')],
    },
  },
}
