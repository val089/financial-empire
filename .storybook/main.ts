import { StorybookConfig } from '@storybook/react-native';

/*
After adding addons remember to use yarn storybook-generate
to update the storybook.requires.ts file automatically
*/
const main: StorybookConfig = {
  stories: ['../components/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-ondevice-controls',
    // '@storybook/addon-ondevice-actions',
    '@storybook/addon-ondevice-backgrounds',
    '@storybook/addon-ondevice-notes',
    // '@storybook/addon-actions',
  ],
  reactNative: {
    playFn: false,
  },
};

export default main;
