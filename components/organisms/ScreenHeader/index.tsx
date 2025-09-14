import clsx from 'clsx';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeaderProps } from './types';
import { ArrowLeftButton } from 'components/atoms';
import { testIDs } from 'utils/testIDs';
import AvatarPicker from 'components/molecules/AvatarPicker';
import { Ionicons } from '@expo/vector-icons';
import { DEFAULT_HEADER_ICONS_PROPS, ICONS_HIT_SLOPE } from './consts';
import useAuthentication from 'hooks/useAuthentication';
import { mergeClasses } from 'utils/functions/mergeClasses';

const ScreenHeader = ({
  avatarUrl,
  title,
  onUpload,
  onBackPress,
  showMainSideMenu,
}: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets();
  const { logOut } = useAuthentication();

  // TODO: Move change avatar to Profile Screen
  const renderLeftHeaderElement = () => {
    if (avatarUrl && onUpload)
      return <AvatarPicker {...{ avatarUrl, onUpload }} />;

    if (onBackPress) return <ArrowLeftButton onPress={onBackPress} />;

    return null;
  };

  return (
    <View
      className={clsx(
        'h-28 max-w-full flex-row items-center justify-between px-4 bg-white'
      )}
      style={{ paddingTop: top }}
      testID={testIDs.screenHeader}
    >
      <View className='flex-1 flex-row items-center'>
        {renderLeftHeaderElement()}

        {title && (
          <Text
            className={mergeClasses('font-interRegular text-h3', {
              'ml-2': onBackPress,
            })}
          >
            {title}
          </Text>
        )}
      </View>

      {/* TODO: add logout icon */}
      {showMainSideMenu && (
        <View className='flex-row items-center justify-end'>
          {/* <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            hitSlop={ICONS_HIT_SLOPE}
            testID={testIDs.settingsButton}
          >
            <Ionicons
              name='settings'
              size={DEFAULT_HEADER_ICONS_PROPS.size}
              color={DEFAULT_HEADER_ICONS_PROPS.color}
            />
          </TouchableOpacity> */}

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
