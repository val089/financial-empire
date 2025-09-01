import { TouchableOpacityProps } from 'react-native';

export interface LinkButtonProps extends TouchableOpacityProps {
  label: string;
  textClassName?: string;
}
