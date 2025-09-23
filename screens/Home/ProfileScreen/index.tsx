import { ScreenContentWrapper } from 'components/atoms';
import { useUserContext } from 'contexts/UserContext';
import { Text, View } from 'react-native';
import { EditableAvatar } from 'components/molecules';

const ProfileScreen = () => {
  const { user, session } = useUserContext();

  return (
    <>
      <ScreenContentWrapper isScrollable>
        <View className='flex-row items-center mt-8'>
          {/* TODO: add change avatar functionality on press */}
          <EditableAvatar url={user?.avatar_url} onPress={() => {}} />
          <View className='ml-3'>
            <Text className='text-h2 font-interBold mb-2'>
              {user?.full_name}
            </Text>
            <Text className='text-h4'>{session?.user.email}</Text>
          </View>
        </View>

        {/* TODO:  add some features about your profile, maybe settings or privacy options */}
      </ScreenContentWrapper>
    </>
  );
};

export default ProfileScreen;
