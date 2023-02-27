module.exports = {
  root: true,
  // This tells ESLint to load the config from the package `eslint-config-custom`
  extends: ["custom"],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'unused-imports',
  ],
  rules: {
    'unused-imports/no-unused-imports-ts': 2,
  },
  settings: {
    next: {
      rootDir: ["apps/*/"],
    },
  },
};
