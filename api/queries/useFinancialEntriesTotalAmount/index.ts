import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase/supabase';
import { Queries } from 'api/enums';
import {
  UseFinancialEntriesTotalAmountQueryOptions,
  UseFinancialEntriesTotalAmountQueryReturnType,
} from './types';

const useFinancialEntriesTotalAmount = (
  options?: UseFinancialEntriesTotalAmountQueryOptions
): UseFinancialEntriesTotalAmountQueryReturnType =>
  useQuery({
    ...options,
    queryKey: [Queries.FinancialEntriesTotalAmount],
    queryFn: async () => {
      const { data } = await supabase.rpc('get_total_financial_entries_amount');

      return data;
    },
  });

export default useFinancialEntriesTotalAmount;
