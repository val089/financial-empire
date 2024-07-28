// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_+',
        ignoreRestSiblings: true,
        varsIgnorePattern: '^_+',
        args: 'none',
      },
    ],
  },
};
