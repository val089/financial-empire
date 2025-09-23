import { Avatar } from 'components/atoms';
import { TouchableOpacity, View } from 'react-native';
import { EditableAvatarProps } from './types';
import { Ionicons } from '@expo/vector-icons';
import colors from 'theme/colors';

const EditableAvatar = ({ url, onPress, size = 80 }: EditableAvatarProps) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className='relative'
    style={{ width: size, height: size }}
  >
    <Avatar {...{ url, size }} />
    <View
      className='absolute bottom-[0px] right-[5px] items-center justify-center rounded-full'
      style={{
        backgroundColor: colors.primary.white,
        width: size / 3,
        height: size / 3,
      }}
    >
      <Ionicons
        name='camera'
        size={18 * (size / 80)}
        style={{ color: colors.primary.blue['400'] }}
      />
    </View>
  </TouchableOpacity>
);

export default EditableAvatar;
