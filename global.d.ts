import React from 'react';
import { StyleProp } from 'react-native';
import { SvgProps as ReactNativeSvgProps } from 'react-native-svg';

declare global {
  interface SvgProps extends ReactNativeSvgProps {
    style?: StyleProp<SvgStyle>;
  }
  type SvgComponentType = React.FC<SvgProps>;
}

export {};
