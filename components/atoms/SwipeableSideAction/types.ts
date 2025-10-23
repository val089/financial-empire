import { SharedValue } from 'react-native-reanimated';
import { TouchableOpacityProps } from 'react-native';

export interface RightActionProps {
  dragAnimatedValue: SharedValue<number>;
  className?: string;
  onPress: TouchableOpacityProps['onPress'];
}
