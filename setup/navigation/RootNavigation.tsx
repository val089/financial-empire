import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { useUserContext } from '../../contexts/UserContext';

const { Screen, Navigator } = createStackNavigator();

const RootNavigation = () => {
  const { isLoggedIn } = useUserContext();

  const renderNavigator = () => {
    if (!isLoggedIn) {
      return <Screen name='AuthNav' component={AuthNavigation} />;
    }

    return <Screen name='HomeNav' component={HomeNavigation} />;
  };

  return (
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
