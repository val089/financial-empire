import { TouchableOpacityProps } from 'react-native';

export type CheckableButtonProps = TouchableOpacityProps & {
  onPress: () => void;
  isSelected: boolean;
  label: string;
};
