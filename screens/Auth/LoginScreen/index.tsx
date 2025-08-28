import { useState } from 'react';
import { Alert, View, Text, Image, ScrollView } from 'react-native';
import { supabase } from 'lib/supabase';
import { Input, PasswordInput } from 'components/atoms';
import { Button } from 'components/atoms';
import { ImageLogo } from 'assets/images';
import LinkButton from 'components/atoms/LinkButton';
import { LoginScreenProps } from './types';
import { Screens } from 'utils/Screens';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signInWithEmail = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  };

  return (
    <ScrollView className='px-4 bg-white flex-1'>
      <View className='justify-center items-center mt-10'>
        <Image
          className='mr-2 h-36 w-36'
          resizeMode='cover'
          source={ImageLogo}
        />
      </View>

      <Text className='text-center text-h1 font-interBold my-6'>Sign In</Text>
      <Text className='font-interRegular text-h4 text-gray-400 text-center mb-6'>
        Enter valid email and password to continue.
      </Text>

      <Input
        label='Email'
        onChangeText={(text) => setEmail(text)}
        value={email}
        placeholder='email@address.com'
        autoCapitalize={'none'}
        className='mb-4'
      />

      <PasswordInput
        label='Password'
        onChangeText={(text) => setPassword(text)}
        value={password}
        placeholder='Password'
        autoCapitalize={'none'}
      />

      <LinkButton label='Forgot Password?' className='mt-4 items-end' />

      <View>
        <Button
          label='Login'
          disabled={loading}
          onPress={signInWithEmail}
          className='my-4'
        />
      </View>

      <View className='flex-row items-center mb-4 justify-center'>
        <View className='w-10 border border-gray-300' />
        <Text className='mx-4 font-interRegular text-gray-400 text-h4'>
          Or continue with
        </Text>
        <View className='w-10 border border-gray-300' />
      </View>

      <Button
        label='Google'
        onPress={() => {}}
        iconPosition='left'
        iconProps={{ name: 'logo-google', size: 24, color: 'white' }}
        className='mb-4'
      />
      <Button
        label='Facebook'
        onPress={() => {}}
        iconPosition='left'
        iconProps={{ name: 'logo-facebook', size: 24, color: 'white' }}
      />

      <View className='flex-row justify-center items-center py-10'>
        <Text className='text-gray-400 text-h4'>Haven't any account? </Text>
        <LinkButton
          label='Sign Up'
          onPress={() => navigation?.navigate(Screens.SignUp)}
        />
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
