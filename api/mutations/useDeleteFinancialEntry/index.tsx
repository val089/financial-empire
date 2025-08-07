import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { supabase } from 'lib/supabase';

const useDeleteFinancialEntry = () =>
  useMutation({
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
    mutationKey: [Mutations.DeleteFinancialEntry],
  });

export default useDeleteFinancialEntry;
