import { Image, View } from 'react-native';
import { AvatarProps } from './types';
import { testIDs } from 'utils/testIDs';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import Loader from '../Loader';
import colors from 'theme/colors';

const Avatar = ({ url, isLoading, size = 40 }: AvatarProps) => {
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Reset image loading state when URL changes
  // This ensures smooth transitions when avatar URL updates during upload process
  useEffect(() => {
    if (url) {
      setIsImageLoading(true);
    }
  }, [url]);

  if (isLoading) {
    return (
      <Loader
        style={{ height: size, width: size }}
        className='rounded-full bg-gray-400'
        color={colors.primary.white}
        size='small'
      />
    );
  }

  return (
    <>
      {url ? (
        <View>
          <Image
            className={'mr-2 rounded-full'}
            style={{ height: size, width: size }}
            resizeMode='cover'
            source={{ uri: url }}
            testID={testIDs.avatar}
            onLoad={() => setIsImageLoading(false)}
            onError={() => setIsImageLoading(false)}
          />
          {(isImageLoading || isLoading) && (
            <Loader
              className='absolute inset-0 rounded-full bg-gray-400'
              style={{ height: size, width: size }}
              size='small'
              color={colors.primary.white}
            />
          )}
        </View>
      ) : (
        <View
          className='rounded-full bg-gray-400 mr-2 items-center justify-center'
          style={{ height: size, width: size }}
          testID={testIDs.avatarPlaceholder}
        >
          <Ionicons name='person' size={size * 0.6} color='white' />
        </View>
      )}
    </>
  );
};

export default Avatar;
