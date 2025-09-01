import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from 'screens/Auth/LoginScreen';
import SignUpScreen from 'screens/Auth/SignUpScreen';
import { Screens } from 'utils/Screens';
import colors from 'theme/colors';
import { AuthStackParamList } from './types';

const { Screen, Navigator } = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => (
  <Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: colors.primary.white },
      animation: 'slide_from_right',
    }}
  >
    <Screen name={Screens.Login} component={LoginScreen} />
    <Screen name={Screens.SignUp} component={SignUpScreen} />
  </Navigator>
);

export default AuthNavigation;
