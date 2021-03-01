module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json'
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier'
  ],
  rules: {
    "react/require-default-props": "off",
    "react/prop-types": "off",
    "import/named": "off",
    "import/namespace": "off",
    "import/default": "off",
    "import/no-named-as-default-member": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/unbound-method": "off",
    "@typescript-eslint/no-floating-promises": "off"
  }
};
