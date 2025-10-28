import {
  AccessibilityProps,
  StyleProp,
  TextProps,
  TextStyle,
} from 'react-native';

export type TypographyType =
  | 'h1'
  | 'h1Bold'
  | 'h1Regular'
  | 'h2'
  | 'h2Regular'
  | 'h2Bold'
  | 'h3'
  | 'h4Regular';

export interface TypographyProps extends AccessibilityProps, TextProps {
  variant?: TypographyType;
  style?: StyleProp<TextStyle>;
}
