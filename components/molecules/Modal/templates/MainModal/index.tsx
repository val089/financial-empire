import { Pressable, View } from 'react-native';

import { mergeClasses } from 'utils/functions/mergeClasses';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';

import Modal from '../..';

import { MainModalProps } from './types';

const MainModal = ({
  children,
  onClose,
  className,
  ...rest
}: MainModalProps) => (
  <Modal {...{ onClose, ...rest }}>
    <View className={mergeClasses('rounded-md bg-white p-4 pt-8', className)}>
      {onClose && (
        <Pressable
          className='absolute right-4 top-4 z-50 p-2'
          onPress={onClose}
        >
          <Ionicons name='close' size={24} color={colors.primary.black} />
        </Pressable>
      )}
      {children}
    </View>
  </Modal>
);

export default MainModal;
