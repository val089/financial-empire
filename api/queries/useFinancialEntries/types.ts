import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { FinancialEntry } from 'lib/types';

export type UseFinancialEntriesQueryReturnType = UseQueryResult<
  FinancialEntry[] | null
>;

export type UseFinancialEntriesQueryOptions = UseQueryOptions<
  FinancialEntry[] | null
>;
