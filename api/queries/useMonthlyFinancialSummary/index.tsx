import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { Queries } from 'api/enums';
import {
  UseMonthlyFinancialSummaryQueryOptions,
  UseMonthlyFinancialSummaryQueryReturnType,
  UseMonthlyFinancialSummarytQueryParameters,
} from './types';

const useMonthlyFinancialSummary = (
  params: UseMonthlyFinancialSummarytQueryParameters,
  options?: UseMonthlyFinancialSummaryQueryOptions
): UseMonthlyFinancialSummaryQueryReturnType =>
  useQuery({
    ...options,
    queryKey: [Queries.MonthlyFinancialSummary, params],
    queryFn: async () => {
      const { filter_year } = params;

      const { data } = await supabase.rpc('get_monthly_financial_summary', {
        filter_year,
      });

      return data;
    },
  });

export default useMonthlyFinancialSummary;
