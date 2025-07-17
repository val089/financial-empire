import { TouchableOpacity } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { testIDs } from 'utils/testIDs';
import { FloatingAddButtonProps } from './types';
import { Ionicons } from '@expo/vector-icons';

const FloatingAddButton = ({ className, ...rest }: FloatingAddButtonProps) => (
  <TouchableOpacity
    {...rest}
    testID={testIDs.floatingAddButton}
    className={mergeClasses(
      'z-10 absolute w-[60px] h-[60px] bg-primary-blue-400 right-5 bottom-8 rounded-full items-center justify-center shadow-lg',
      className
    )}
  >
    <Ionicons name='add' size={40} color='#fff' />
  </TouchableOpacity>
);

export default FloatingAddButton;
