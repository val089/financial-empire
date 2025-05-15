import { View, Text } from 'react-native';
import { Radio } from 'components/atoms';
import { RadioGroupProps } from './types';
import { mergeClasses } from 'utils/functions/mergeClasses';

const RadioGroup = <T,>({
  options,
  className,
  label,
  onSelect,
  selectedValue,
  orientation = 'vertical',
}: RadioGroupProps<T>) => {
  const isHorizontal = orientation === 'horizontal';

  return (
    <View {...{ className }}>
      {label && <Text className='mb-3'>{label}</Text>}
      <View
        className={mergeClasses('flex-row justify-between gap-2', {
          'flex-row': isHorizontal,
          'flex-col': !isHorizontal,
        })}
      >
        {options.map((option, index) => {
          const isSelected = option.value === selectedValue;

          return (
            <Radio
              key={index}
              label={option.label}
              onPress={() => onSelect(option.value)}
              {...{ isSelected }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default RadioGroup;
