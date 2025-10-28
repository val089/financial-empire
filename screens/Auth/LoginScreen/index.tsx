import { FormProvider, Controller, useForm } from 'react-hook-form';
import { View, Image } from 'react-native';
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
import useLoginMutation from 'api/mutations/useLoginMutation';
import Typography from 'components/atoms/Typography';

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { mutate: login, isPending } = useLoginMutation();

  const formMethods = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const { showErrorToast } = useDefaultToast();

  const { control, handleSubmit } = formMethods;

  const onSubmit = async (data: LoginFormData) => {
    login(data, {
      onError: (error) => {
        showErrorToast(error.message);
      },
    });
  };

  return (
    <SafeAreaWrapper>
      <ScreenContentWrapper isScrollable>
        <FormProvider {...formMethods}>
          <View className='justify-center items-center mt-10'>
            <Image
              className='mr-2 h-36 w-36'
              resizeMode='cover'
              source={ImageLogo}
            />
          </View>
          <Typography variant='h1Bold' className='text-center my-6'>
            Sign In
          </Typography>
          <Typography
            variant='h4Regular'
            className='text-gray-400 text-center mb-6'
          >
            Enter valid email and password to continue.
          </Typography>

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

          {/* TODO: add forgot password link */}
          {/* <LinkButton label='Forgot Password?' className='mt-4 items-end' /> */}

          <Button
            testID='login-button'
            label='Login'
            onPress={handleSubmit(onSubmit)}
            className='mt-8'
            isLoading={isPending}
            disabled={isPending}
          />

          {/* TODO: add social login buttons */}
          {/* <View className='flex-row items-center mb-4 justify-center'>
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
          /> */}

          <View className='flex-row justify-center items-center py-10'>
            <Typography className='text-gray-400' variant='h4Regular'>
              Haven't any account?{' '}
            </Typography>
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
