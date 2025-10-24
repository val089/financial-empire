import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { Profile } from 'lib/supabase/types';

export type UseUserProfileQueryResponse = Pick<
  Profile,
  'username' | 'website' | 'avatar_url' | 'full_name'
> | null;

export type UseUserProfileQueryReturnType =
  UseQueryResult<UseUserProfileQueryResponse | null>;

export type UseUserProfileQueryOptions =
  UseQueryOptions<UseUserProfileQueryResponse | null>;
