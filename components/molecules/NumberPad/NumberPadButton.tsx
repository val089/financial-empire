import { TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { KeysType } from './types';
import { testIDs } from 'utils/testIDs';

export const NumberPadButton = ({
  label,
  className,
  textClassName,
  ...rest
}: {
  label: KeysType;
  textClassName?: string;
} & TouchableOpacityProps) => (
  <TouchableOpacity
    className={mergeClasses('flex-1 items-center justify-center', className)}
    testID={`${testIDs.numberPadButton}-${label}`}
    {...rest}
  >
    <Text className={mergeClasses('font-bold text-2xl ', textClassName)}>
      {label}
    </Text>
  </TouchableOpacity>
);
