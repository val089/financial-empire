import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../../screens/Auth/LoginScreen';
import { SafeAreaView } from 'react-native-safe-area-context';

const { Screen, Navigator } = createStackNavigator();

const AuthNavigation = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name='LoginScreen' component={LoginScreen} />
      </Navigator>
    </SafeAreaView>
  );
};

export default AuthNavigation;
