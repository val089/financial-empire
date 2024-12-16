import { useState } from 'react';
import { IconEyeClose, IconEyeOpen } from 'assets/svg';
import Input from '../Input';
import { PasswordInputProps } from './types';

const PasswordInput = ({ value, label, ...rest }: PasswordInputProps) => {
  const [isSecret, setIsSecret] = useState(true);
  const secretIcon = isSecret ? IconEyeOpen : IconEyeClose;

  return (
    <Input
      secureTextEntry={isSecret}
      rightIcon={{
        icon: value ? secretIcon : undefined,
        onPress: () => setIsSecret((prevState) => !prevState),
      }}
      {...{
        value,
        label,
        ...rest,
      }}
    />
  );
};

export default PasswordInput;
