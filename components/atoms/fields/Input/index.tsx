import { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import { InputProps } from './types';
import { testIDs } from 'utils/testIDs';
import { mergeClasses } from 'utils/functions/mergeClasses';

const Input = ({
  label,
  errorMessage,
  leftIcon,
  rightIcon,
  className,
  containerClassName,
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
    <View className={mergeClasses('', containerClassName)}>
      {label && <Text className='pb-1 text-h4 text-gray-400'>{label}</Text>}
      <View className='justify-center'>
        {LeftIcon && (
          <TouchableOpacity
            className='absolute left-3 z-10'
            onPress={onPressLeftIcon}
            testID={testIDs.inputLeftIcon}
          >
            <LeftIcon
              className={`${leftIconColor ?? 'fill-primary-black'} h-6 w-6`}
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={{
            includeFontPadding: false,
          }}
          className={mergeClasses(
            'rounded-xl border p-3 text-h3 bg-white',
            {
              'border-gray-300': !isFocused && !errorMessage,
              'border-primary-red': errorMessage,
              'border-primary-blue-400': isFocused && !errorMessage,
              'pl-12': LeftIcon,
            },
            className
          )}
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
              className={`${rightIconColor ?? 'fill-primary-black'} h-6 w-6`}
            />
          </TouchableOpacity>
        )}
      </View>

      {errorMessage && (
        <Text className='pt-1 text-h4 text-primary-red'>{errorMessage}</Text>
      )}
    </View>
  );
};

export default Input;
