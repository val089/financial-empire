import { ScrollView, Text, View } from 'react-native';
import { HomeScreenProps } from './types';
import {
  MonthlyFinancialSummaryChart,
  ScreenHeader,
} from 'components/organisms';
import { useUserContext } from 'contexts/UserContext';
import TotalFinancialEntriesAmount from './partials/TotalFinancialEntriesAmount';
import useBatteryLevel from 'hooks/useBatteryLevel';
import { Screens } from 'utils/Screens';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { user } = useUserContext();

  const batteryLevel = useBatteryLevel();

  return (
    <>
      <ScreenHeader
        title={`Hi, ${user?.username || 'user'}`}
        avatarUrl={user?.avatar_url}
        onAvatarPress={() => navigation?.navigate(Screens.Profile)}
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
