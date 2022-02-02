module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-console': [
      'warn',
      {
        allow: ['info', 'error'],
      },
    ],
    'no-param-reassign': 'off',
  },
};
