import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type UseUserProfileQueryResponse = {
  username: string;
  website: string;
  avatar_url: string;
};

export type UseUserProfileQueryReturnType =
  UseQueryResult<UseUserProfileQueryResponse | null>;

export type UseUserProfileQueryOptions =
  UseQueryOptions<UseUserProfileQueryResponse | null>;
