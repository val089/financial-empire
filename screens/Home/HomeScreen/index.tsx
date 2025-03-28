import useAuthentication from 'hooks/useAuthentication';
import { Text, TouchableOpacity, View } from 'react-native';
import { HomeScreenProps } from './types';
import { Screens } from 'utils/Screens';
import { ScreenHeader } from 'components/organisms';
import { useUserContext } from 'contexts/UserContext';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { logOut } = useAuthentication();
  const { user } = useUserContext();
  // TODO: Move to Profile Screen
  const { mutate } = useUpdateUserProfileMutation();

  return (
    <>
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
        avatarUrl={user?.avatar_url || ''}
      />
      <View className='flex-1'>
        {/* TOTAL MONEY */}
        <View className='h-[400px] bg-primary-blue-400 justify-center items-center'>
          <Text className='text-h1 text-white'>10 000,00</Text>
        </View>

        <Text className='text-h1 text-center mt-20'>
          Welcome to the home screen
        </Text>

        <TouchableOpacity
          className='bg-primary-blue-400 py-4 w-[200px] self-center rounded-md'
          onPress={logOut}
        >
          <Text className='text-white text-h3 text-center'>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='mt-10 bg-primary-blue-400 py-4 w-[200px] self-center rounded-md'
          onPress={() => navigation?.navigate(Screens.FinancialEntries)}
        >
          <Text className='text-white text-h3 text-center'>
            Financial Entries
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default HomeScreen;
