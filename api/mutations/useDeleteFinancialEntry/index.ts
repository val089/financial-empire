import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Mutations, Queries } from 'api/enums';
import { UseFinancialEntriesQueryResponse } from 'api/queries/useFinancialEntries/types';
import { supabase } from 'lib/supabase/supabase';

const useDeleteFinancialEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const { data, error } = await supabase
        .from('financial-entries')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return data;
    },
    onMutate: async (entryId) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [Queries.FinancialEntries],
      });

      // Snapshot the previous value
      const previousEntries = queryClient.getQueryData([
        Queries.FinancialEntries,
      ]);

      queryClient.setQueryData(
        [Queries.FinancialEntries],
        (oldData: UseFinancialEntriesQueryResponse) => {
          if (!oldData?.pages) {
            return oldData;
          }

          return {
            ...oldData,
            pages: oldData.pages.map((page) => {
              // Ensure page is an array before filtering
              if (!Array.isArray(page)) {
                return page;
              }

              return page.filter((entry) => entry.id !== entryId);
            }),
          };
        }
      );

      return { previousEntries };
    },
    onError: (err, params, context) => {
      queryClient.setQueryData(
        [Queries.FinancialEntries],
        context?.previousEntries
      );
    },
    mutationKey: [Mutations.DeleteFinancialEntry],
  });
};

export default useDeleteFinancialEntry;
