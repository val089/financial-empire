import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type UseDownloadImageQueryResponse = {
  avatar_url: string;
};

export type useDownloadImageQueryReturnType =
  UseQueryResult<UseDownloadImageQueryResponse | null>;

export type UseUserProfileQueryOptions = Omit<
  UseQueryOptions<UseDownloadImageQueryResponse | null>,
  'queryKey' | 'queryFn'
>;
