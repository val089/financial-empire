import { RefObject } from 'react';

export interface InputButtonHandle {
  blur: () => void;
}

export interface InputButtonProps {
  onPress: () => void;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  label?: string;
  className?: string;
  ref?: RefObject<InputButtonHandle | null>;
  errorMessage?: string;
}
