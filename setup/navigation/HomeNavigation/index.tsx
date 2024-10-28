import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../../screens/Home';
const { Screen, Navigator } = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Navigator>
      <Screen name='HomeScreen' component={HomeScreen} />
    </Navigator>
  );
};

export default HomeNavigation;
