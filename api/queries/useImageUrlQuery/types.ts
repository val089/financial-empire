import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type UseImageUrlReturnType = UseQueryResult<string | null>;

export type UseImageUrlQueryOptions = Omit<
  UseQueryOptions<string | null>,
  'queryKey' | 'queryFn'
>;
