import { UseQueryOptions, UseQueryResult } from '@tanstack/react-query';
import { MonthlyFinancialSummary } from 'lib/supabase/types';

export type UseMonthlyFinancialSummaryQueryReturnType = UseQueryResult<
  MonthlyFinancialSummary[] | null
>;

export type UseMonthlyFinancialSummaryQueryOptions = UseQueryOptions<
  MonthlyFinancialSummary[] | null
>;

export type UseMonthlyFinancialSummarytQueryParameters = {
  filter_year: number;
};
