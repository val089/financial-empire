import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home';
import { ScreenHeader } from 'components/organisms';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';
import { useUserContext } from 'contexts/UserContext';
const { Screen, Navigator } = createStackNavigator();

const HomeNavigation = () => {
  const { mutate } = useUpdateUserProfileMutation();
  const { user } = useUserContext();

  return (
    <Navigator
      screenOptions={{
        header: ({ options }) => (
          <ScreenHeader
            title={`Hi, ${user?.username}`}
            onUpload={(newAvatarData) => {
              mutate(
                {
                  username: user?.username || '',
                  website: user?.website || '',
                  avatar_url: newAvatarData?.path || '',
                }
                // TODO: check if we need to invalidate the cache after added Profile Screen
                // {
                //   onSuccess: () => {
                //     if (userId) {
                //       invalidateQueries({
                //         queryKey: [Queries.UserProfile, userId],
                //       });
                //     }
                //   },
                // }
              );
            }}
            avatarUrl={user?.avatar_url}
            {...options}
          />
        ),
      }}
    >
      <Screen name='HomeScreen' component={HomeScreen} />
    </Navigator>
  );
};

export default HomeNavigation;
