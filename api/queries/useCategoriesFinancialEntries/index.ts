import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase/supabase';
import { Queries } from 'api/enums';
import {
  UseCategoriesFinancialEntriesQueryOptions,
  UseCategoriesFinancialEntriesQueryReturnType,
} from './types';

const useCategoriesFinancialEntries = (
  options?: UseCategoriesFinancialEntriesQueryOptions
): UseCategoriesFinancialEntriesQueryReturnType =>
  useQuery({
    ...options,
    queryKey: [Queries.CategoriesFinancialEntries],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories-financial-entries')
        .select('*');

      if (error) {
        throw error;
      }

      return data;
    },
  });

export default useCategoriesFinancialEntries;
