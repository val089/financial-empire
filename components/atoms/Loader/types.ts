import {
  ActivityIndicatorIOSProps,
  ActivityIndicatorProps,
} from 'react-native';

export type LoaderProps = ActivityIndicatorProps &
  ActivityIndicatorIOSProps & {
    className?: string;
  };
