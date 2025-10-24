import { CategoryFinancialEntryName } from 'lib/supabase/types';
import { TouchableOpacityProps } from 'react-native';

export interface CategoryButtonProps extends TouchableOpacityProps {
  label: string;
  categoryName: CategoryFinancialEntryName;
}
