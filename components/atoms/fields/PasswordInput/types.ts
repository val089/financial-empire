import { InputProps } from '../Input/types';

export type PasswordInputProps = Omit<
  InputProps,
  'leftIcon' | 'rightIcon' | 'secureTextEntry'
>;
