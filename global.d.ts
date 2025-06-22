import React from 'react';
import { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { SvgProps as ReactNativeSvgProps } from 'react-native-svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

interface SvgStyle extends ViewStyle {
  color: ColorValue;
}

declare global {
  interface SvgProps extends ReactNativeSvgProps {
    style?: StyleProp<SvgStyle>;
  }
  type SvgComponentType = React.FC<SvgProps>;

  interface ScreenProps<R, S> {
    navigation?: NativeStackNavigationProp<R, S>;
    route?: RouteProp<R, S>;
  }
}

export {};
