import { TouchableOpacityProps } from 'react-native';

export interface FinancialEntryItemProps {
  id: string | number;
  title: string;
  sectionTitle?: string;
  description?: string;
  rightText?: string;
  rightTextClassName?: string;
  onDelete: () => void;
  onPress?: TouchableOpacityProps['onPress'];
}
