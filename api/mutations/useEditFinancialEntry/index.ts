import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { UseEditFinancialEntryReturnType } from './types';
import { supabase } from 'lib/supabase/supabase';

const useEditFinancialEntry = (): UseEditFinancialEntryReturnType =>
  useMutation({
    mutationFn: async (params) => {
      const { data, error } = await supabase
        .from('financial-entries')
        .update(params)
        .eq('id', params.id);

      if (error) {
        throw error;
      }

      return data;
    },
    mutationKey: [Mutations.EditFinancialEntry],
  });

export default useEditFinancialEntry;
