import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { Queries } from 'api/enums';
import {
  UseInvestmentsQueryOptions,
  UseInvestmentsQueryResponse,
} from './types';

const ITEMS_PER_PAGE = 10; // Define your page size

const useInvestmentsQuery = <T = UseInvestmentsQueryResponse>(
  options?: UseInvestmentsQueryOptions<T>
) =>
  useInfiniteQuery({
    ...options,
    queryKey: [Queries.Investments],
    queryFn: async ({ pageParam = 0 }) => {
      const from = pageParam * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;

      // Fetch financial entries from the 'financial-entries' table
      // and order them by 'created_at' in descending order
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      return data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // If the last page has fewer items than the page size, we've reached the end
      if (lastPage.length < ITEMS_PER_PAGE) {
        return undefined;
      }
      // Return the next page number
      return allPages.length;
    },
    initialPageParam: 0,
  });

export default useInvestmentsQuery;
