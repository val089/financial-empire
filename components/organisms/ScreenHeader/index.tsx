import { View, TouchableOpacity } from 'react-native';
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
import Typography from 'components/atoms/Typography';

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
    if (onAvatarPress && avatarUrl) {
      return (
        <TouchableOpacity
          onPress={onAvatarPress}
          testID={testIDs.avatarButton}
          accessibilityLabel='Profile avatar'
          accessibilityRole='button'
          accessibilityHint='Opens profile settings'
        >
          <Avatar url={avatarUrl} />
        </TouchableOpacity>
      );
    }

    if (avatarUrl) {
      return <Avatar url={avatarUrl} />;
    }

    if (onBackPress || canGoBack)
      return (
        <ArrowLeftButton
          onPress={onBackPress || goBack}
          accessibilityLabel='Go back'
          accessibilityHint='Navigates to the previous screen'
        />
      );

    return null;
  };

  return (
    <View
      className='h-30 max-w-full flex-row items-center justify-between px-4 bg-white'
      style={{ paddingTop: top }}
      testID={testIDs.screenHeader}
    >
      <View className='flex-1 flex-row items-center'>
        {renderLeftHeaderElement()}

        {title && (
          <Typography
            className={mergeClasses('text-h2 font-interBold', {
              'ml-2': onBackPress || avatarUrl || canGoBack,
            })}
            accessibilityRole='header'
          >
            {title}
          </Typography>
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
            accessibilityLabel='Log out'
            accessibilityRole='button'
            accessibilityHint='Logs out from your account'
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
