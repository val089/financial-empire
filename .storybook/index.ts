// https://github.com/storybookjs/react-native/tree/next/examples/expo-example
// https://github.com/chromaui/intro-storybook-react-native-template

import AsyncStorage from '@react-native-async-storage/async-storage';
import { view } from './storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

export default StorybookUIRoot;
