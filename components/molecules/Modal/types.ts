import { ModalProps as RNModalProps } from 'react-native';

export type ModalProps = Omit<RNModalProps, 'visible'> & {
  isVisible: boolean;
  children: React.ReactNode;
  onClose?: () => void;
};
