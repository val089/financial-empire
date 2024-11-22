import { Image, View } from 'react-native';
import { AvatarProps } from './types';

const Avatar = ({ url }: AvatarProps) => (
  <>
    {url ? (
      <Image
        className='w-10 h-10 rounded-full mr-2'
        resizeMode='cover'
        source={{ uri: url }}
      />
    ) : (
      <View className='w-10 h-10 bg-gray-400 rounded-full' />
    )}
  </>
);

export default Avatar;
