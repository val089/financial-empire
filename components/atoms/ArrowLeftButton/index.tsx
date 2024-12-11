import { TouchableOpacity } from 'react-native';
import { IconArrowLeft } from 'assets/svg';
import { ArrowLeftButtonProps } from './types';
import { testIDs } from 'utils/testIDs';

const ArrowLeftButton = ({ onPress }: ArrowLeftButtonProps) => (
  <TouchableOpacity
    activeOpacity={0.5}
    onPress={onPress}
    hitSlop={15}
    testID={testIDs.arrowLeftButton}
  >
    <IconArrowLeft height={24} width={24} fill='black' />
  </TouchableOpacity>
);

export default ArrowLeftButton;
