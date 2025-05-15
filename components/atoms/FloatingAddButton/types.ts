import { TouchableOpacityProps } from 'react-native';

export interface FloatingAddButtonProps extends TouchableOpacityProps {
  onPress: () => void;
}
