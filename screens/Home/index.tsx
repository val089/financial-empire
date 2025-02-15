import useAuthentication from 'hooks/useAuthentication';
import { Button, Text, View } from 'react-native';

const HomeScreen = () => {
  const { logOut } = useAuthentication();

  return (
    <View className='flex-1 items-center justify-center'>
      <Text className='text-h1'>Welcome to the home screen</Text>

      <Button title='Log out' onPress={logOut} />
    </View>
  );
};
export default HomeScreen;
