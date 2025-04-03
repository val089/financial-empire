import { IconPlus } from 'assets/svg';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';

const FloatingAddButton = ({ className, ...rest }: TouchableOpacityProps) => (
  <TouchableOpacity
    {...rest}
    className={mergeClasses(
      'z-10 absolute w-[60px] h-[60px] bg-primary-blue-400 right-5 bottom-8 rounded-full items-center justify-center shadow-lg',
      className
    )}
  >
    <IconPlus width={24} height={24} />
  </TouchableOpacity>
);

export default FloatingAddButton;
