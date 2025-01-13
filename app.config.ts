import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'financial-empire',
  slug: 'financial-empire',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
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
  },
  plugins: [['expo-font']],
  scheme: 'com.supabase',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
  newArchEnabled: true,
});
