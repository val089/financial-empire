import clsx from 'clsx';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeaderProps } from './types';
import { ArrowLeftButton, Avatar } from 'components/atoms';
import { testIDs } from 'utils/testIDs';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_HEADER_ICONS_PROPS, ICONS_HIT_SLOPE } from './consts';
import useAuthentication from 'hooks/useAuthentication';
import { mergeClasses } from 'utils/functions/mergeClasses';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const ScreenHeader = ({
  avatarUrl,
  title,
  onBackPress,
  showMainSideMenu,
  onAvatarPress,
  navigation,
}: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { logOut } = useAuthentication();

  const [canGoBack, setCanGoBack] = useState(navigation?.canGoBack());

  useFocusEffect(() => {
    setCanGoBack(navigation?.canGoBack());
  });

  const goBack = () => navigation?.goBack();

  const renderLeftHeaderElement = () => {
    if (avatarUrl && onAvatarPress)
      return <Avatar url={avatarUrl} onAvatarPress={onAvatarPress} />;

    if (onBackPress || canGoBack)
      return <ArrowLeftButton onPress={onBackPress || goBack} />;

    return null;
  };

  return (
    <View
      className={clsx(
        'h-30 max-w-full flex-row items-center justify-between px-4 bg-white'
      )}
      style={{ paddingTop: top }}
      testID={testIDs.screenHeader}
    >
      <View className='flex-1 flex-row items-center'>
        {renderLeftHeaderElement()}

        {title && (
          <Text
            className={mergeClasses('font-interRegular text-h3', {
              'ml-2': onBackPress || avatarUrl || canGoBack,
            })}
          >
            {title}
          </Text>
        )}
      </View>

      {showMainSideMenu && (
        <View
          className='flex-row items-center justify-end'
          testID={testIDs.mainSideMenu}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={logOut}
            hitSlop={ICONS_HIT_SLOPE}
            testID={testIDs.logoutButton}
          >
            <Ionicons
              name='log-out-outline'
              size={DEFAULT_HEADER_ICONS_PROPS.size}
              color={DEFAULT_HEADER_ICONS_PROPS.color}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ScreenHeader;
