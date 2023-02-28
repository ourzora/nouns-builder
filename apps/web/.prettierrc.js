module.exports = {
  semi: false,
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
