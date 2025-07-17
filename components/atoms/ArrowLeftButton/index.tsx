import { TouchableOpacity } from 'react-native';
import { ArrowLeftButtonProps } from './types';
import { testIDs } from 'utils/testIDs';
import { Ionicons } from '@expo/vector-icons';

const ArrowLeftButton = ({ onPress }: ArrowLeftButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    hitSlop={15}
    testID={testIDs.arrowLeftButton}
  >
    <Ionicons name='arrow-back' size={30} color='#000' />
  </TouchableOpacity>
);

export default ArrowLeftButton;
