export interface RadioGroupOption<T> {
  label: string | JSX.Element;
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
