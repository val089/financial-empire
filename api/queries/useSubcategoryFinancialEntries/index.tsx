import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase/supabase';
import { Queries } from 'api/enums';
import {
  UseSubcategoryFinancialEntriesQueryOptions,
  UseSubcategoryFinancialEntriesQueryReturnType,
  UseSubcategoryFinancialEntriesQueryParameters,
} from './types';

const useSubcategoryFinancialEntries = (
  params: UseSubcategoryFinancialEntriesQueryParameters,
  options?: UseSubcategoryFinancialEntriesQueryOptions
): UseSubcategoryFinancialEntriesQueryReturnType =>
  useQuery({
    ...options,
    queryKey: [Queries.SubcategoryFinancialEntries, params],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('subcategories-financial-entries')
        .select('*')
        .filter('category_name', 'eq', params?.category_name);

      if (error) {
        throw error;
      }

      return data;
    },
  });

export default useSubcategoryFinancialEntries;
