import { ReactElement } from 'react';

export interface RadioGroupOption<T> {
  label: string | ReactElement;
  value: T;
}

export type RadioGroupProps<T> = {
  options: RadioGroupOption<T>[];
  selectedValue: string | null;
  onSelect: (value: T) => void;
  label?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  fontBold?: boolean;
};
