import { View, Text } from 'react-native';
import { useCallback, useState } from 'react';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { numberPadLayout } from './consts';
import { NumberPadButton } from './NumberPadButton';
import { Keys, KeysType } from './types';
import { testIDs } from 'utils/testIDs';

const NumberPad = ({
  onChange,
  className,
  display = false,
}: {
  onChange?: (value: string) => void;
  className?: string;
  display?: boolean;
}) => {
  const [value, setValue] = useState('');

  const updateValue = useCallback(
    (value: string) => {
      setValue(value);
      onChange?.(value);
    },
    [onChange]
  );

  const handlePress = useCallback(
    (key: KeysType) => {
      if (key === Keys['<']) {
        const newValue = value.slice(0, -1);
        updateValue(newValue);
        return;
      }

      // Handle digits
      if (/[0-9]/.test(key)) {
        // Prevent leading zeros (don't allow 0 as first digit unless followed by decimal point)
        if (value === '' && key === '0') {
          return;
        }

        // Check if we're after decimal point and already have 2 decimal places
        const dotIndex = value.indexOf('.');
        if (dotIndex !== -1 && value.length - dotIndex > 2) {
          return; // Don't allow more than 2 decimal places
        }

        const newValue = value + key;
        updateValue(newValue);
        return;
      }

      if (key === Keys['.']) {
        if (value === '' || value.includes('.')) {
          return;
        }

        const newValue = value + key;
        updateValue(newValue);
        return;
      }
    },
    [value, updateValue]
  );

  return (
    <View testID={testIDs.numberPad} className='flex-1'>
      {display && (
        <View className='justify-center items-center'>
          <Text
            className='text-4xl font-bold mb-2'
            numberOfLines={1}
            adjustsFontSizeToFit
            testID={testIDs.numberPadDisplay}
          >
            {value || 0}
          </Text>
        </View>
      )}

      <View className={mergeClasses('flex-1 flex-row', className)}>
        <View className='flex-1'>
          {numberPadLayout.map((row, rowIndex) => (
            <View
              key={`row-${rowIndex}`}
              className='flex-row flex-1 gap-1 mb-1'
            >
              {row.map((label) => (
                <NumberPadButton
                  key={label}
                  onPress={() => handlePress(label)}
                  label={label}
                />
              ))}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default NumberPad;
