import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { UseAddFinancialEntryMutationParameters } from './types';
import { supabase } from 'lib/supabase';

const useAddFinancialEntry = () =>
  useMutation({
    mutationFn: async (params: UseAddFinancialEntryMutationParameters) => {
      await supabase.from('financial-entries').insert(params);
    },
    mutationKey: [Mutations.AddFinancialEntry],
  });

export default useAddFinancialEntry;
