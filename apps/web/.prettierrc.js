module.exports = {
  semi: false,
  trailingComma: 'es5',
  objectWrap: 'preserve',
  singleQuote: true,
  printWidth: 90,
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: [
    '^src/(.*)$',
    '^[./]',
  ],
  plugins: [require('@trivago/prettier-plugin-sort-imports')],
}
