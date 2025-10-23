import {
  Modal as RNModal,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { IS_ANDROID } from 'consts/environment';

import { ModalProps } from './types';
import { testIDs } from 'utils/testIDs';

const Modal = ({ onClose, isVisible, children, ...rest }: ModalProps) => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <RNModal
      animationType='fade'
      {...rest}
      transparent
      onRequestClose={onClose}
      visible={isVisible}
    >
      <KeyboardAvoidingView
        className='flex-1'
        behavior='padding'
        keyboardVerticalOffset={IS_ANDROID ? 50 : 0}
      >
        <View className='flex-1 items-start bg-primary-blackTransparent'>
          <TouchableOpacity
            className='flex-1 justify-center'
            onPress={onClose}
            activeOpacity={1}
            style={{
              marginTop: 32 + top,
              marginHorizontal: 18,
              marginBottom: 18 + bottom,
            }}
            testID={testIDs.modalBackdrop}
          >
            {children}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  );
};

export default Modal;
