import { ScrollView, Text, View } from 'react-native';
import { HomeScreenProps } from './types';
import {
  MonthlyFinancialSummaryChart,
  ScreenHeader,
} from 'components/organisms';
import { useUserContext } from 'contexts/UserContext';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';
import TotalFinancialEntriesAmount from './partials/TotalFinancialEntriesAmount';
import useBatteryLevel from 'hooks/useBatteryLevel';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useUserContext();
  // TODO: Move to Profile Screen
  const { mutate } = useUpdateUserProfileMutation();

  const batteryLevel = useBatteryLevel();

  return (
    <>
      <ScreenHeader
        title={`Hi, ${user?.username || 'user'}`}
        onUpload={(newAvatarData) => {
          mutate(
            {
              username: user?.username || '',
              website: user?.website || '',
              avatar_url: newAvatarData?.path || '',
            }
            // TODO: check if we need to invalidate the cache after added Profile Screen
            // {
            //   onSuccess: () => {
            //     if (userId) {
            //       invalidateQueries({
            //         queryKey: [Queries.UserProfile, userId],
            //       });
            //     }
            //   },
            // }
          );
        }}
        avatarUrl={user?.avatar_url || ''}
        showMainSideMenu
      />
      <ScrollView className='flex-1 bg-white'>
        <TotalFinancialEntriesAmount />

        <MonthlyFinancialSummaryChart />

        <View className='px-4'>
          <Text className='text-h2 text-center mt-2'>
            Battery Level:{' '}
            {batteryLevel != null
              ? `${batteryLevel}%`
              : 'Battery level is not available'}
          </Text>
        </View>
      </ScrollView>
    </>
  );
};
export default HomeScreen;
