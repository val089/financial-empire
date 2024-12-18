import clsx from 'clsx';
import { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { InputProps } from './types';
import { testIDs } from 'utils/testIDs';

const Input = ({
  label,
  errorMessage,
  leftIcon,
  rightIcon,
  ...rest
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const {
    icon: LeftIcon,
    color: leftIconColor,
    onPress: onPressLeftIcon,
  } = leftIcon || {};

  const {
    icon: RightIcon,
    color: rightIconColor,
    onPress: onPressRightIcon,
  } = rightIcon || {};

  const toggleFocus = () => {
    setIsFocused((prev) => !prev);
  };

  return (
    <>
      {label && (
        <Text className='pb-1 text-primary-black text-h4'>{label}</Text>
      )}
      <View className='justify-center'>
        {LeftIcon && (
          <TouchableOpacity
            className='absolute left-3 z-10'
            onPress={onPressLeftIcon}
            testID={testIDs.inputLeftIcon}
          >
            <LeftIcon
              className={`${leftIconColor ?? 'fill-primary-black'} w-6 h-6`}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={{
            includeFontPadding: false,
          }}
          className={clsx('border p-3 rounded-md text-h3', {
            'border-gray-300': !isFocused && !errorMessage,
            'border-primary-red': errorMessage,
            'border-primary-blue-400': isFocused && !errorMessage,
            'pl-12': LeftIcon,
          })}
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          {...rest}
        />
        {RightIcon && (
          <TouchableOpacity
            className='absolute right-3'
            onPress={onPressRightIcon}
            testID={testIDs.inputRightIcon}
          >
            <RightIcon
              className={`${rightIconColor ?? 'fill-primary-black'} w-6 h-6`}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className='pt-1 text-h4 text-primary-red'>{errorMessage}</Text>
      )}
    </>
  );
};

export default Input;
