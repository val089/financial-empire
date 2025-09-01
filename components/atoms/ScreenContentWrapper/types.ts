import { StyleProp, ViewStyle, ScrollView } from 'react-native';

export type ScreenContentWrapperProps = {
  children: React.ReactNode;
  isScrollable?: boolean;
  style?: StyleProp<ViewStyle>;
  className?: string;
  withoutPadding?: boolean;
  ref?: React.Ref<ScrollView>;
};
