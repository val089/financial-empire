import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { useUserContext } from 'contexts/UserContext';
import { ActivityIndicator, View } from 'react-native';

const { Screen, Navigator } = createStackNavigator();

const RootNavigation = () => {
  const { isLoggedIn, isAuthenticating } = useUserContext();

  const renderNavigator = () => {
    if (!isLoggedIn) {
      return <Screen name='AuthNav' component={AuthNavigation} />;
    }

    return <Screen name='HomeNav' component={HomeNavigation} />;
  };

  return isAuthenticating ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {renderNavigator()}
    </Navigator>
  );
};

export default RootNavigation;
