import { FormProvider, Controller, useForm } from 'react-hook-form';
import { View, Text, Image } from 'react-native';
import { supabase } from 'lib/supabase';
import {
  Input,
  PasswordInput,
  LinkButton,
  Button,
  ScreenContentWrapper,
  SafeAreaWrapper,
} from 'components/atoms';
import { ImageLogo } from 'assets/images';
import { LoginFormData, LoginScreenProps } from './types';
import { Screens } from 'utils/Screens';
import { loginValidationSchema } from './loginValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import useDefaultToast from 'hooks/useDefaultToast';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const formMethods = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const { showErrorToast } = useDefaultToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) showErrorToast(error.message);
  };

  return (
    <SafeAreaWrapper>
      <ScreenContentWrapper isScrollable>
        <FormProvider {...formMethods}>
          <View className='justify-center items-center'>
            <Image
              className='mr-2 h-36 w-36'
              resizeMode='cover'
              source={ImageLogo}
            />
          </View>
          <Text className='text-center text-h1 font-interBold my-6'>
            Sign In
          </Text>
          <Text className='font-interRegular text-h4 text-gray-400 text-center mb-6'>
            Enter valid email and password to continue.
          </Text>

          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label='Email'
                onChangeText={onChange}
                value={value}
                placeholder='email@address.com'
                autoCapitalize={'none'}
                className='mb-4'
                errorMessage={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <PasswordInput
                label='Password'
                onChangeText={onChange}
                value={value}
                placeholder='*******'
                autoCapitalize={'none'}
                errorMessage={error?.message}
              />
            )}
          />

          <LinkButton label='Forgot Password?' className='mt-4 items-end' />
          <Button
            label='Login'
            onPress={handleSubmit(onSubmit)}
            className='my-4'
            isLoading={isSubmitting}
            disabled={isSubmitting}
          />

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
              label='Sign up'
              onPress={() => navigation?.navigate(Screens.SignUp)}
            />
          </View>
        </FormProvider>
      </ScreenContentWrapper>
    </SafeAreaWrapper>
  );
};

export default LoginScreen;
