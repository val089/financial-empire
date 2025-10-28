import { View, Image } from 'react-native';
import { FormProvider, Controller, useForm } from 'react-hook-form';
import { supabase } from 'lib/supabase/supabase';
import {
  Input,
  PasswordInput,
  Button,
  LinkButton,
  SafeAreaWrapper,
  ScreenContentWrapper,
} from 'components/atoms';
import { ImageLogo } from 'assets/images';
import { SignUpScreenProps } from './types';
import { Screens } from 'utils/Screens';
import { SignUpFormData } from './types';
import useDefaultToast from 'hooks/useDefaultToast';
import { loginValidationSchema } from '../LoginScreen/loginValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Typography from 'components/atoms/Typography';

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  const formMethods = useForm<SignUpFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    resolver: yupResolver(loginValidationSchema),
  });

  const { showErrorToast, showInfoToast } = useDefaultToast();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = formMethods;

  const onSubmit = async (data: SignUpFormData) => {
    const {
      error,
      data: { session },
    } = await supabase.auth.signUp(data);
    if (error) showErrorToast(error.message);
    if (!session)
      showInfoToast('Please check your inbox for email verification!');
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
            Sign Up
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

          <Button
            label='Create account'
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            className='mt-8'
            isLoading={isSubmitting}
          />

          <View className='flex-row justify-center items-center py-10'>
            <Typography className='text-gray-400' variant='h4Regular'>
              Already have an account?{' '}
            </Typography>

            <LinkButton
              label='Sign in'
              onPress={() => navigation?.navigate(Screens.Login)}
            />
          </View>
        </FormProvider>
      </ScreenContentWrapper>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;
