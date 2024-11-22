import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home';
import { ScreenHeader } from 'components/organisms';
const { Screen, Navigator } = createStackNavigator();

const HomeNavigation = () => {
  const avatarUrl = 'https://avatars.githubusercontent.com/u/4726921?v=4';

  return (
    <Navigator
      screenOptions={{
        header: ({ options }) => (
          <ScreenHeader {...{ avatarUrl }} title='Kamil Szerląg' />
        ),
      }}
    >
      <Screen name='HomeScreen' component={HomeScreen} />
    </Navigator>
  );
};

export default HomeNavigation;
