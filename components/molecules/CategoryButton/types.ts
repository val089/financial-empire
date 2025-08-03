import { CategoryFinancialEntryName } from 'lib/types';
import { TouchableOpacityProps } from 'react-native';

export interface CategoryButtonProps extends TouchableOpacityProps {
  label: string;
  categoryName: CategoryFinancialEntryName;
}
