import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { UseAddInvestmentMutationReturnType } from './types';
import { supabase } from 'lib/supabase';

const useAddInvestmentMutation = (): UseAddInvestmentMutationReturnType =>
  useMutation({
    mutationFn: async (params) => {
      const { data, error } = await supabase
        .from('investments')
        .insert(params)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    },
    mutationKey: [Mutations.AddInvestment],
  });

export default useAddInvestmentMutation;
