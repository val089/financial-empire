import { Text, TouchableOpacity } from 'react-native';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { RightActionProps } from './types';

const SwipeableSideAction = ({
  dragAnimatedValue,
  className,
  onPress,
}: RightActionProps) => {
  const styleAnimation = useAnimatedStyle(() => ({
    transform: [{ translateX: dragAnimatedValue.value + 80 }],
  }));

  return (
    <Reanimated.View
      style={[
        styleAnimation,
        {
          width: 80,
        },
      ]}
      className={mergeClasses('border-b  border-gray-200 border-l', className)}
    >
      <TouchableOpacity
        className='items-center justify-center flex-1 '
        onPress={onPress}
      >
        <Ionicons name='trash-outline' size={24} color={colors.primary.red} />
        <Text className='text-h5 text-primary-red'>Delete</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
};

export default SwipeableSideAction;
