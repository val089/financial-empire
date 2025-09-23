import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from 'screens/Home/HomeScreen';
import { HomeStackParamList } from './types';
import { Screens } from 'utils/Screens';
import colors from 'theme/colors';
import ProfileScreen from 'screens/Home/ProfileScreen';
import ScreenHeader from 'components/organisms/ScreenHeader';

const { Screen, Navigator } = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigation = () => (
  <Navigator
    screenOptions={{
      contentStyle: { backgroundColor: colors.primary.white },
      header: ({ options, navigation }) => (
        <ScreenHeader {...options} navigation={navigation} />
      ),
    }}
  >
    <Screen
      name={Screens.Home}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name={Screens.Profile}
      component={ProfileScreen}
      options={{ title: 'My Profile' }}
    />
  </Navigator>
);

export default HomeNavigation;
