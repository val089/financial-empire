import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { AvatarProps } from './types';
import { testIDs } from 'utils/testIDs';

const Avatar = ({ url, isLoading }: AvatarProps) => {
  if (isLoading) {
    return (
      <View
        className='h-10 w-10 items-center justify-center rounded-full bg-gray-400'
        testID={testIDs.avatarLoader}
      >
        <ActivityIndicator size='small' color='white' />
      </View>
    );
  }

  return (
    <>
      {url ? (
        <Image
          className='mr-2 h-10 w-10 rounded-full'
          resizeMode='cover'
          source={{ uri: url }}
          testID={testIDs.avatar}
        />
      ) : (
        <View
          className='h-10 w-10 rounded-full bg-gray-400'
          testID={testIDs.avatarPlaceholder}
        />
      )}
    </>
  );
};

export default Avatar;
