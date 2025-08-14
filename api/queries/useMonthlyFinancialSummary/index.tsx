import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { Queries } from 'api/enums';
import {
  UseMonthlyFinancialSummaryQueryOptions,
  UseMonthlyFinancialSummaryQueryReturnType,
} from './types';

const useMonthlyFinancialSummary = (
  options?: UseMonthlyFinancialSummaryQueryOptions
): UseMonthlyFinancialSummaryQueryReturnType =>
  useQuery({
    ...options,
    queryKey: [Queries.MonthlyFinancialSummary],
    queryFn: async () => {
      const { data } = await supabase.rpc('get_monthly_financial_summary');

      return data;
    },
  });

export default useMonthlyFinancialSummary;
