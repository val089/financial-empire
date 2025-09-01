import { TouchableOpacityProps } from 'react-native';
import { iconPosition } from './consts';
import { Ionicons } from '@expo/vector-icons';

type IconPosition = keyof typeof iconPosition;

export interface ButtonProps extends TouchableOpacityProps {
  label: number | string;
  textClassName?: string;
  iconPosition?: IconPosition;
  isLoading?: boolean;
  iconProps?: React.ComponentProps<typeof Ionicons>;
}
