import { Ionicons } from '@expo/vector-icons';
import { InputButtonProps } from './types';
import { View, Text, Pressable, Keyboard } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { useImperativeHandle, useState } from 'react';

const InputButton = ({
  value,
  placeholder,
  isError,
  onPress,
  label,
  ref,
  className,
}: InputButtonProps) => {
  const [isFocused, setIsFocused] = useState(false);

  useImperativeHandle(ref, () => ({
    blur: () => setIsFocused(false),
  }));

  return (
    <>
      {label && <Text className='mb-2 text-h3'>{label}</Text>}
      <Pressable
        accessible
        accessibilityRole='button'
        accessibilityLabel={label ?? value ?? placeholder}
        accessibilityState={{ disabled: !!isError, selected: isFocused }}
        className={mergeClasses(
          'rounded-xl border p-3 text-h3 bg-white flex-row items-center justify-between',
          {
            'border-gray-300': !isFocused,
            'border-primary-blue-400': isFocused,
          },
          className
        )}
        onPress={() => {
          setIsFocused(true);
          Keyboard.dismiss();
          onPress();
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      >
        <Text className='text-h2'>{value || placeholder}</Text>
        <View className='absolute z-10 right-2'>
          <Ionicons name='chevron-forward' size={20} color='#6B7280' />
        </View>
      </Pressable>
    </>
  );
};

export default InputButton;
