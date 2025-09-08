import { FinancialEntry } from 'lib/types';
import { TouchableOpacityProps } from 'react-native';

export interface FinancialEntryItemProps {
  item: FinancialEntry;
  showMainDate: boolean;
  onDelete: () => void;
  onPress?: TouchableOpacityProps['onPress'];
}
