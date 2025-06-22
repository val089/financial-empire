import { TouchableOpacity, Text } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { ButtonProps } from './types';

const Button = ({
  label,
  className,
  textClassName,
  disabled,
  ...rest
}: ButtonProps) => (
  <TouchableOpacity
    className={mergeClasses(
      'bg-primary-blue-400 p-4 rounded-lg justify-center items-center',
      { 'opacity-50': disabled },
      className
    )}
    {...rest}
  >
    <Text
      className={mergeClasses(
        'text-h3 text-white font-interMedium',
        textClassName
      )}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default Button;
