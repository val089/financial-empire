import { ExpoConfig, ConfigContext } from 'expo/config';

const IS_DEV = process.env.APP_ENV === 'development';

// FPS Monitor settings
const getFPSMonitorEnabled = () => {
  if (process.env.EXPO_PUBLIC_ENABLE_FPS_MONITOR) {
    return process.env.EXPO_PUBLIC_ENABLE_FPS_MONITOR;
  }

  // Enabled by default in dev mode, disabled in production
  return IS_DEV ? 'true' : 'false';
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  owner: 'kamildev',
  name: 'financial-empire',
  slug: 'financial-empire',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.kamildev.financialempire.dev',
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
    },
    icon: {
      dark: './assets/icons/ios-dark.png',
      light: './assets/icons/ios-light.png',
      tinted: './assets/icons/ios-tinted.png',
    },
  },

  android: {
    adaptiveIcon: {
      foregroundImage: './assets/icons/adaptive-icon.png',
      backgroundImage: './assets/icons/adaptive-icon.png',
      monochromeImage: './assets/icons/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.kamildev.financialempire.dev',
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
        backgroundColor: '#ffffff',
        image: './assets/icons/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
        dark: {
          image: './assets/icons/splash-icon-dark.png',
          backgroundColor: '#ffffff',
        },
      },
    ],
  ],
  scheme: 'financialempire',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    enableFPSMonitor: getFPSMonitorEnabled(),
    eas: {
      projectId: '9d7cbfae-9a8f-4eb5-a304-b1267625910b',
    },
  },
  // New architecture is enabled by default from Expo SDK 53.
});
