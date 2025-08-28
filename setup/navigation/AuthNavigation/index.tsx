import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from 'screens/Auth/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import SignUpScreen from 'screens/Auth/SignUpScreen';
import { Screens } from 'utils/Screens';

const { Screen, Navigator } = createStackNavigator();

const AuthNavigation = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name={Screens.Login} component={LoginScreen} />
      <Screen name={Screens.SignUp} component={SignUpScreen} />
    </Navigator>
  </SafeAreaView>
);

export default AuthNavigation;
