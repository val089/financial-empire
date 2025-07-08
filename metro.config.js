const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const withStorybook = require('@storybook/react-native/metro/withStorybook');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer/expo'),
};

defaultConfig.resolver = {
  ...defaultConfig.resolver,
  assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  // issue with supabase-js --> https://github.com/supabase/supabase-js/issues/1400, after fix it can be removed
  unstable_enablePackageExports: false,
};

const configWithNativeWind = withNativeWind(defaultConfig, {
  input: './theme/global.css',
});

module.exports = withStorybook(configWithNativeWind, {
  enabled: true,
  configPath: path.resolve(__dirname, './.storybook'),
});
