module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ['custom', 'plugin:prettier/recommended'],
  settings: {
    next: {
      rootDir: ['apps/*/'],
    },
    },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
}
