import {
  ActivityIndicator,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { AvatarProps } from './types';
import { testIDs } from 'utils/testIDs';

const Avatar = ({ url, isLoading, onAvatarPress, size = 40 }: AvatarProps) => {
  if (isLoading) {
    return (
      <View
        className='items-center justify-center rounded-full bg-gray-400'
        style={{ height: size, width: size }}
        testID={testIDs.avatarLoader}
      >
        <ActivityIndicator size='small' color='white' />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onAvatarPress} testID={testIDs.avatarButton}>
      {url ? (
        <Image
          className={'mr-2 rounded-full'}
          style={{ height: size, width: size }}
          resizeMode='cover'
          source={{ uri: url }}
          testID={testIDs.avatar}
        />
      ) : (
        <View
          className='rounded-full bg-gray-400 mr-2 items-center justify-center'
          style={{ height: size, width: size }}
          testID={testIDs.avatarPlaceholder}
        >
          <Text className='text-white text-h1'>{'?'}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
