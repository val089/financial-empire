import { UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { FinancialEntry } from 'lib/types';

export type UseFinancialEntriesQueryResponse = InfiniteData<FinancialEntry[]>;

export type UseFinancialEntriesQueryOptions<T> = Partial<
  UseInfiniteQueryOptions<
    FinancialEntry[],
    Error,
    T,
    FinancialEntry[],
    [string],
    number
  >
>;
