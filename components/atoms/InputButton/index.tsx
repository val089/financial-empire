import { Ionicons } from '@expo/vector-icons';
import { InputButtonProps } from './types';
import { View, Text, Pressable, Keyboard } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { useImperativeHandle, useState } from 'react';
import { testIDs } from 'utils/testIDs';

const InputButton = ({
  value,
  placeholder,
  onPress,
  label,
  ref,
  className,
  errorMessage,
}: InputButtonProps) => {
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    blur: () => setIsFocused(false),
  }));

  return (
    <>
      {label && <Text className='pb-1 text-h4 text-black'>{label}</Text>}
      <Pressable
        testID={testIDs.inputButton}
        accessible
        accessibilityRole='button'
        accessibilityLabel={label ?? value ?? placeholder}
        accessibilityState={{ disabled: !!errorMessage, selected: isFocused }}
        className={mergeClasses(
          'rounded-xl border p-3 text-h3 bg-white flex-row items-center justify-between',
          {
            'border-gray-300': !isFocused,
            'border-primary-blue-400': isFocused,
            'border-primary-red': errorMessage,
          },
          className
        )}
        onPress={() => {
          setIsFocused(true);
          Keyboard.dismiss();
          onPress();
        }}
      >
        <Text className={mergeClasses('text-h2', { 'text-gray-400': !value })}>
          {value || placeholder}
        </Text>
        <View className='absolute z-10 right-2'>
          <Ionicons name='chevron-forward' size={20} color='#6B7280' />
        </View>
      </Pressable>
      {errorMessage && (
        <Text className='pt-1 text-h4 text-primary-red'>{errorMessage}</Text>
      )}
    </>
  );
};

export default InputButton;
