import { TouchableOpacity } from 'react-native';
import { ArrowLeftButtonProps } from './types';
import { testIDs } from 'utils/testIDs';
import { Ionicons } from '@expo/vector-icons';

const ArrowLeftButton = (props: ArrowLeftButtonProps) => (
  <TouchableOpacity
    accessibilityRole='button'
    activeOpacity={0.5}
    hitSlop={15}
    {...props}
    testID={testIDs.arrowLeftButton}
  >
    <Ionicons name='arrow-back' size={30} color='#000' accessible={false} />
  </TouchableOpacity>
);

export default ArrowLeftButton;
