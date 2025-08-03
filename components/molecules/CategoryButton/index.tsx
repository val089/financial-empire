import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CategoryButtonProps } from './types';
import CategoryIcon from 'components/atoms/CategoryIcon';

const CategoryButton = ({
  label,
  categoryName,
  ...rest
}: CategoryButtonProps) => (
  <TouchableOpacity
    className='flex-row justify-between items-center p-4 border-b border-gray-200'
    {...rest}
  >
    <View className='flex-row items-center'>
      <CategoryIcon {...{ categoryName }} />
      <Text className='text-h4 font-interRegular ml-4'>{label}</Text>
    </View>
    <Ionicons name='chevron-forward' size={24} color='black' />
  </TouchableOpacity>
);

export default CategoryButton;
