import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type UseDownloadImageQueryResponse = {
  avatar_url: string;
};

export type useDownloadImageQueryReturnType =
  UseQueryResult<UseDownloadImageQueryResponse | null>;

export type UseUserProfileQueryOptions =
  UseQueryOptions<UseDownloadImageQueryResponse | null>;
