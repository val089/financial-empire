import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';

export type UseFinancialEntriesTotalAmountQueryReturnType = UseQueryResult<
  number | null
>;

export type UseFinancialEntriesTotalAmountQueryOptions = UseQueryOptions<
  number | null
>;
