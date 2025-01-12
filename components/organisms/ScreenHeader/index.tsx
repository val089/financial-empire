import clsx from 'clsx';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenHeaderProps } from './types';
import { ArrowLeftButton } from 'components/atoms';
import { testIDs } from 'utils/testIDs';
import AvatarPicker from 'components/molecules/AvatarPicker';

const ScreenHeader = ({
  avatarUrl,
  title,
  onUpload,
  onBackPress,
}: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets();

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
        'h-[100px] max-w-full px-4 flex-row items-center justify-between'
      )}
      style={{ paddingTop: top }}
      testID={testIDs.screenHeader}
    >
      <View className='flex-1 flex-row items-center'>
        {renderLeftHeaderElement()}

        {title && (
          <Text className='ml-2 font-interRegular text-h3'>{title}</Text>
        )}
      </View>

      {/* TODO: Add settings, notifications in the future */}
      {/* <View className='flex-row'> */}
      {/* Settings ? */}
      {/* <View className='w-10 h-10 bg-blue-400 rounded-full mr-2' /> */}
      {/* Notifications ? */}
      {/* <View className='w-10 h-10 bg-blue-700 rounded-full mr-2' /> */}
      {/* </View> */}
    </View>
  );
};

export default ScreenHeader;
