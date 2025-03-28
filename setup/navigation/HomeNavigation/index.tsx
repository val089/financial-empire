import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home/HomeScreen';
import { HomeStackParamList } from './types';
import { Screens } from 'utils/Screens';
import FinancialEntriesScreen from 'screens/Home/FinancialEntriesScreen';
// import { ScreenHeader } from 'components/organisms';

const { Screen, Navigator } = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => (
  <Navigator
  // TODO: fix back button
  // screenOptions={{
  //   header: ({ options }) => <ScreenHeader {...options} />,
  // }}
  >
    <Screen
      name={Screens.Home}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name={Screens.FinancialEntries}
      component={FinancialEntriesScreen}
      options={{ title: Screens.FinancialEntries }}
    />
  </Navigator>
);

export default HomeNavigation;
