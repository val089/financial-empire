import useAuthentication from 'hooks/useAuthentication';
import { ScrollView, Text, View } from 'react-native';
import { HomeScreenProps } from './types';
import { Screens } from 'utils/Screens';
import {
  MonthlyFinancialSummaryChart,
  ScreenHeader,
} from 'components/organisms';
import { useUserContext } from 'contexts/UserContext';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';
import { Button } from 'components/atoms';
import TotalFinancialEntriesAmount from './partials/TotalFinancialEntriesAmount';
import useBatteryLevel from 'hooks/useBatteryLevel';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { logOut } = useAuthentication();
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
            Battery Level: {batteryLevel ?? 'Battery level is not available'}%
          </Text>

          <Text className='text-h1 text-center mt-20'>
            Welcome to the home screen
          </Text>

          <Button label='Logout' onPress={logOut} className='mb-4' />

          <Button
            onPress={() => navigation?.navigate(Screens.FinancialEntries)}
            label='Financial Entries'
          />
        </View>
      </ScrollView>
    </>
  );
};
export default HomeScreen;
