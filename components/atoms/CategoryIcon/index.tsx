import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getFinancialCategoryIcon } from 'utils/functions/getFinancialCategoryIcon';
import { CategoryIconProps } from './types';
import { mergeClasses } from 'utils/functions/mergeClasses';

const CategoryIcon = ({ categoryName, size = 24 }: CategoryIconProps) => {
  const iconName = getFinancialCategoryIcon(categoryName);

  return (
    <View
      className={mergeClasses('rounded-full p-2', {
        'bg-green-400': categoryName === 'income',
        'bg-red-400': categoryName === 'food & drinks',
        'bg-blue-400': categoryName === 'housing',
        'bg-purple-400': categoryName === 'communication, pc',
        'bg-yellow-400': categoryName === 'transportation',
        'bg-orange-400': categoryName === 'vehicle',
        'bg-pink-400': categoryName === 'financial expenses',
        'bg-teal-400': categoryName === 'investments',
        'bg-lime-400': categoryName === 'life & entertainment',
        'bg-rose-400': categoryName === 'shopping',
        'bg-gray-400': categoryName === 'others' || !categoryName,
      })}
    >
      <Ionicons name={iconName} size={size} color='black' />
    </View>
  );
};

export default CategoryIcon;
