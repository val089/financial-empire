module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      'nativewind/babel',
    ],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            api: './api',
            assets: './assets',
            components: './components',
            contexts: './contexts',
            hooks: './hooks',
            screens: './screens',
            setup: './setup',
            theme: './theme',
            utils: './utils',
            __mocks__: './__mocks__',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
