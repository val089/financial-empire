import React from 'react';
import { ActivityIndicator, Image, View } from 'react-native';
import { AvatarProps } from './types';
import { testIDs } from 'utils/testIDs';

const Avatar = ({ url, isLoading }: AvatarProps) => {
  if (isLoading) {
    return (
      <View
        className='w-10 h-10 bg-gray-400 rounded-full items-center justify-center'
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
          className='w-10 h-10 rounded-full mr-2'
          resizeMode='cover'
          source={{ uri: url }}
          testID={testIDs.avatar}
        />
      ) : (
        <View
          className='w-10 h-10 bg-gray-400 rounded-full'
          testID={testIDs.avatarPlaceholder}
        />
      )}
    </>
  );
};

export default Avatar;
