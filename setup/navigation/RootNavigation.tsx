import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import { useUserContext } from 'contexts/UserContext';
import { ActivityIndicator, View } from 'react-native';
import BottomBarNavigation from './BottomBarNavigation';

const { Screen, Navigator } = createNativeStackNavigator();

const RootNavigation = () => {
  const { isLoggedIn, isAuthenticating } = useUserContext();

  const renderNavigator = () => {
    if (!isLoggedIn) {
      return <Screen name='AuthNav' component={AuthNavigation} />;
    }

    return (
      <Screen name='BottomBarNavigation' component={BottomBarNavigation} />
    );
  };

  return isAuthenticating ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator />
    </View>
  ) : (
    <Navigator
      initialRouteName={isLoggedIn ? 'BottomBarNavigation' : 'AuthNav'}
      screenOptions={{
        headerShown: false,
      }}
    >
      {renderNavigator()}
    </Navigator>
  );
};

export default RootNavigation;
