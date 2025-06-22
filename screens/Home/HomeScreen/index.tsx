import useAuthentication from 'hooks/useAuthentication';
import { Text, View } from 'react-native';
import { HomeScreenProps } from './types';
import { Screens } from 'utils/Screens';
import { ScreenHeader } from 'components/organisms';
import { useUserContext } from 'contexts/UserContext';
import useUpdateUserProfileMutation from 'api/mutations/useUpdateUserProfileMutation';
import { useState } from 'react';
import { RadioGroup } from 'components/molecules';
import { Button } from 'components/atoms';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const { logOut } = useAuthentication();
  const { user } = useUserContext();
  // TODO: Move to Profile Screen
  const { mutate } = useUpdateUserProfileMutation();

  const [value, setValue] = useState('a');

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
        <RadioGroup
          options={[
            { label: 'label 1', value: 'a' },
            { label: 'label 2', value: 'b' },
          ]}
          onSelect={setValue}
          selectedValue={value}
        />
        <Button label='Logout' onPress={logOut} className='mb-4' />

        <Button
          onPress={() => navigation?.navigate(Screens.FinancialEntries)}
          label='Financial Entries'
        />
      </View>
    </>
  );
};
export default HomeScreen;
