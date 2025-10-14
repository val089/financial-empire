import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomBarStackParamList } from './types';
import { Navigators } from 'utils/Navigators';
import HomeNavigation from '../HomeNavigation';
import colors from 'theme/colors';
import { Ionicons } from '@expo/vector-icons';
import FinancialEntriesNavigation from '../FinancialEntriesNavigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import InvestmentsNavigation from '../InvestmentsNavigation';

const { Navigator, Screen } =
  createBottomTabNavigator<BottomBarStackParamList>();

const BottomBarNavigation: React.FC = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <Navigator
      initialRouteName={Navigators.HomeNavigation}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.primary.white,
          paddingBottom: bottom || 16,
          height: 52 + (bottom || 8),
        },
      }}
    >
      <Screen
        component={HomeNavigation}
        name={Navigators.HomeNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='home' color={color} size={size} />
          ),
          title: 'Home',
        }}
      />
      <Screen
        component={FinancialEntriesNavigation}
        name={Navigators.FinancialEntriesNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          ),
          title: 'Financial entries',
        }}
      />
      <Screen
        component={InvestmentsNavigation}
        name={Navigators.InvestmentsNavigation}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name='cellular' color={color} size={size} />
          ),
          title: 'Investments',
        }}
      />
    </Navigator>
  );
};

export default BottomBarNavigation;
