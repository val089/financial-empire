import { UseInfiniteQueryOptions, InfiniteData } from '@tanstack/react-query';
import { InvestmentItem } from 'lib/types';

export type UseInvestmentsQueryResponse = InfiniteData<InvestmentItem[]>;

export type UseInvestmentsQueryOptions<T> = Partial<
  UseInfiniteQueryOptions<
    InvestmentItem[],
    Error,
    T,
    InvestmentItem[],
    [string],
    number
  >
>;
