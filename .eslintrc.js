module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json']
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'prettier',
    'prettier/@typescript-eslint'
  ],
  rules: {
    "react/require-default-props": 0
  }
};
