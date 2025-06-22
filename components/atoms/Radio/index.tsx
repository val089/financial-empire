import { View, Text, TouchableOpacity } from 'react-native';
import { RadioProps } from './types';
import { mergeClasses } from 'utils/functions/mergeClasses';

const Radio = ({
  label,
  onPress,
  size = 30,
  isSelected,
  ...rest
}: RadioProps) => {
  const radioContainerSize = {
    width: size,
    height: size,
  };

  const radioSize = {
    width: size * 0.7,
    height: size * 0.7,
  };

  return (
    <TouchableOpacity
      className={mergeClasses('flex-row items-center h-[52px]', {
        'border-primary-blue-400': isSelected,
      })}
      {...{ onPress }}
      {...rest}
      accessibilityState={isSelected ? { selected: true } : {}}
    >
      <View
        style={radioContainerSize}
        className={mergeClasses(
          'justify-center items-center rounded-full border mr-2',
          {
            'border-gray-400': !isSelected,
            'border-primary-blue-400': isSelected,
          }
        )}
      >
        <View
          style={radioSize}
          className={mergeClasses('', {
            'bg-primary-blue-400 rounded-full': isSelected,
          })}
        />
      </View>
      {/* TODO: replace by Typography component */}
      {typeof label === 'string' ? <Text>{label}</Text> : label}
    </TouchableOpacity>
  );
};

export default Radio;
