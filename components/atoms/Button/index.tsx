import { TouchableOpacity, Text } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { ButtonProps } from './types';
import Loader from '../Loader';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';

const Button = ({
  label,
  className,
  textClassName,
  disabled,
  iconPosition = 'right',
  isLoading,
  iconProps,
  ...rest
}: ButtonProps) => {
  const renderIcon = () => {
    if (isLoading) {
      return (
        <Loader
          color={colors.primary.white}
          className={mergeClasses('', {
            'mr-2': iconPosition === 'left',
            'ml-2': iconPosition === 'right',
          })}
        />
      );
    }

    if (iconProps) {
      return (
        <Ionicons
          {...iconProps}
          className={mergeClasses('', {
            'mr-2': iconPosition === 'left',
            'ml-2': iconPosition === 'right',
          })}
        />
      );
    }

    return null;
  };

  return (
    <TouchableOpacity
      className={mergeClasses(
        'bg-primary-blue-400 p-4 rounded-lg justify-center items-center flex-row',
        { 'opacity-50': disabled },
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {iconPosition === 'left' && renderIcon()}
      <Text
        className={mergeClasses(
          'text-h3 text-white font-interMedium',
          textClassName
        )}
      >
        {label}
      </Text>
      {iconPosition === 'right' && renderIcon()}
    </TouchableOpacity>
  );
};

export default Button;
