import { Text } from 'react-native';
import Reanimated, { useAnimatedStyle } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { RightActionProps } from './types';

const RightAction = ({ dragAnimatedValue, className }: RightActionProps) => {
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
      className={mergeClasses(
        'justify-center items-center border-b border-gray-200 border-l',
        className
      )}
    >
      <Ionicons name='trash-outline' size={24} color={colors.primary.red} />
      <Text className='text-h5 text-primary-red'>Delete</Text>
    </Reanimated.View>
  );
};

export default RightAction;
