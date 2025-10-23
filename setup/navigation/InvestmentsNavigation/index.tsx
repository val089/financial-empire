import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { InvestmentsStackParamList } from './types';
import { Screens } from 'utils/Screens';
import colors from 'theme/colors';
import ScreenHeader from 'components/organisms/ScreenHeader';
import InvestmentsScreen from 'screens/Investments/InvestmentsScreen';
import AddInvestmentScreen from 'screens/Investments/AddInvestmentScreen';

const { Screen, Navigator } =
  createNativeStackNavigator<InvestmentsStackParamList>();

const InvestmentsNavigation = () => (
  <Navigator
    screenOptions={{
      contentStyle: { backgroundColor: colors.primary.white },
      header: ({ options, navigation }) => (
        <ScreenHeader {...options} navigation={navigation} />
      ),
    }}
  >
    <Screen
      name={Screens.Investments}
      component={InvestmentsScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name={Screens.AddInvestment}
      component={AddInvestmentScreen}
      options={{ headerShown: false }}
    />
  </Navigator>
);

export default InvestmentsNavigation;
