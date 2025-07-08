import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'financial-empire',
  slug: 'financial-empire',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kamildev.financialempire',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.kamildev.financialempire',
  },
  web: {
    favicon: './assets/favicon.png',
    bundler: 'metro',
  },
  plugins: [
    'expo-font',
    [
      'expo-splash-screen',
      {
        // backgroundColor: '#ffffff',
        image: './assets/splash-light.png',
        dark: {
          image: './assets/splash-light.png',
          // backgroundColor: '#000000',
        },
        imageWidth: 50,
      },
    ],
  ],
  scheme: 'com.supabase',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },

  // New architecture is enabled by default from Expo SDK 53.
});
