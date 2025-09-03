import { UseMutationResult } from '@tanstack/react-query';
import { AuthTokenResponsePassword, AuthError } from '@supabase/supabase-js';

export type LoginMutationResponse = Pick<AuthTokenResponsePassword, 'data'>;

export interface LoginMutationParameters {
  email: string;
  password: string;
}

export type UseLoginMutationReturnType = UseMutationResult<
  LoginMutationResponse['data'] | undefined,
  AuthError,
  LoginMutationParameters
>;
