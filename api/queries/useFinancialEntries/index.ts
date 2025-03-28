import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { Queries } from 'api/enums';
import {
  UseFinancialEntriesQueryOptions,
  UseFinancialEntriesQueryReturnType,
} from './types';

const useFinancialEntries = (
  options?: UseFinancialEntriesQueryOptions
): UseFinancialEntriesQueryReturnType =>
  useQuery({
    ...options,
    queryKey: [Queries.FinancialEntries],
    queryFn: async () => {
      const { data } = await supabase.from('financial-entries').select('*');

      return data;
    },
  });

export default useFinancialEntries;
