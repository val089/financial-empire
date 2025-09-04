import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/Home/HomeScreen';
import { HomeStackParamList } from './types';
import { Screens } from 'utils/Screens';
import FinancialEntriesScreen from 'screens/Home/FinancialEntriesScreen';
import AddEntryScreen from 'screens/Home/AddFinancialEntryScreen';
import CategoryFinancialEntriesScreen from 'screens/Home/CategoryFinancialEntriesScreen';
import SubcategoryFinancialEntriesScreen from 'screens/Home/SubcategoryFinancialEntriesScreen';
import colors from 'theme/colors';

const { Screen, Navigator } = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigation = () => (
  <Navigator
    screenOptions={{
      contentStyle: { backgroundColor: colors.primary.white },
    }}
  >
    <Screen
      name={Screens.Home}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name={Screens.FinancialEntries}
      component={FinancialEntriesScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name={Screens.AddFinancialEntry}
      component={AddEntryScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name={Screens.CategoryFinancialEntries}
      component={CategoryFinancialEntriesScreen}
      options={{
        headerShown: false,
      }}
    />
    <Screen
      name={Screens.SubcategoryFinancialEntries}
      component={SubcategoryFinancialEntriesScreen}
      options={{
        headerShown: false,
      }}
    />
  </Navigator>
);

export default HomeNavigation;
