import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { SvgProps as ReactNativeSvgProps } from 'react-native-svg';

interface SvgStyle extends ViewStyle {
  color: ColorValue;
}

declare global {
  interface SvgProps extends ReactNativeSvgProps {
    style?: StyleProp<SvgStyle>;
  }
  type SvgComponentType = React.FC<SvgProps>;
}

export {};
