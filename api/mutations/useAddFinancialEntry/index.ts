import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { UseAddFinancialEntryMutationReturnType } from './types';
import { supabase } from 'lib/supabase/supabase';

const useAddFinancialEntry = (): UseAddFinancialEntryMutationReturnType =>
  useMutation({
    mutationFn: async (params) => {
      const { data, error } = await supabase
        .from('financial-entries')
        .insert(params)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    mutationKey: [Mutations.AddFinancialEntry],
  });

export default useAddFinancialEntry;
