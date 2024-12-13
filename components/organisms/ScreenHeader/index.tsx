import clsx from 'clsx';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar } from 'components/atoms';
import { ScreenHeaderProps } from './types';
import { ArrowLeftButton } from 'components/atoms';
import { testIDs } from 'utils/testIDs';

const ScreenHeader = ({ avatarUrl, title, onBackPress }: ScreenHeaderProps) => {
  const { top } = useSafeAreaInsets();

  const renderLeftHeaderElement = () => {
    if (avatarUrl) return <Avatar url={avatarUrl} />;

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
