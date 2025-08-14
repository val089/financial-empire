import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { MonthlyFinancialSummary } from 'lib/types';

export type UseMonthlyFinancialSummaryQueryReturnType = UseQueryResult<
  MonthlyFinancialSummary[] | null
>;

export type UseMonthlyFinancialSummaryQueryOptions = UseQueryOptions<
  MonthlyFinancialSummary[] | null
>;
