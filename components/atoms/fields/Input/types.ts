import { TextInputProps, TouchableOpacityProps } from 'react-native';

export type InputIconProps = Pick<TouchableOpacityProps, 'onPress'> & {
  icon: SvgComponentType | undefined;
  color?: 'fill-primary-black';
};

export type InputProps = TextInputProps & {
  label?: string;
  errorMessage?: string;
  leftIcon?: InputIconProps;
  rightIcon?: InputIconProps;
  containerClassName?: string;
};
