import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Screens } from 'utils/Screens';
import FinancialEntriesScreen from 'screens/FinancialEntries/FinancialEntriesScreen';
import AddEntryScreen from 'screens/FinancialEntries/AddFinancialEntryScreen';
import CategoryFinancialEntriesScreen from 'screens/FinancialEntries/CategoryFinancialEntriesScreen';
import SubcategoryFinancialEntriesScreen from 'screens/FinancialEntries/SubcategoryFinancialEntriesScreen';
import colors from 'theme/colors';
import { FinancialEntriesStackParamList } from './types';

const { Screen, Navigator } =
  createNativeStackNavigator<FinancialEntriesStackParamList>();

const FinancialEntriesNavigation = () => (
  <Navigator
    initialRouteName={Screens.FinancialEntries}
    screenOptions={{
      contentStyle: { backgroundColor: colors.primary.white },
    }}
  >
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

export default FinancialEntriesNavigation;
