import { ReactNode } from 'react';
import { ViewProps } from 'react-native';

export type RadioProps = ViewProps & {
  onPress: () => void;
  isSelected: boolean;
  label?: string | ReactNode;
  size?: number;
};
