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
      // Fetch financial entries from the 'financial-entries' table
      // and order them by 'created_at' in descending order
      const { data } = await supabase
        .from('financial-entries')
        .select('*')
        .order('created_at', { ascending: false });

      return data;
    },
  });

export default useFinancialEntries;
