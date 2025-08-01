import { Text, TouchableOpacity } from 'react-native';
import { CheckableButtonProps } from './types';
import { mergeClasses } from 'utils/functions/mergeClasses';

const CheckableButton = ({
  label,
  onPress,
  isSelected,
  ...rest
}: CheckableButtonProps) => (
  <TouchableOpacity
    className={mergeClasses(
      'border border-gray-200 rounded-xl flex-1 items-center p-4',
      {
        'bg-primary-blue-400 border-primary-blue-400': isSelected,
      }
    )}
    {...{ onPress }}
    {...rest}
  >
    <Text
      className={mergeClasses('', {
        'text-white': isSelected,
        'text-black': !isSelected,
      })}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default CheckableButton;
