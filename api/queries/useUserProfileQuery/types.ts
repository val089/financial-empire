import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { Profile } from 'lib/types';

export type UseUserProfileQueryResponse = Pick<
  Profile,
  'username' | 'website' | 'avatar_url'
> | null;

export type UseUserProfileQueryReturnType =
  UseQueryResult<UseUserProfileQueryResponse | null>;

export type UseUserProfileQueryOptions =
  UseQueryOptions<UseUserProfileQueryResponse | null>;
