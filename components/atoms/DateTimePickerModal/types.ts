export type DateTimePickerModalProps = {
  visible: boolean;
  value: Date;
  onClose: () => void;
  onChange: (date: Date) => void;
};
