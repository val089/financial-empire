import { useMutation } from '@tanstack/react-query';
import { Mutations } from 'api/enums';
import { supabase } from 'lib/supabase';
import { UseLoginMutationReturnType } from './types';

const useLoginMutation = (): UseLoginMutationReturnType =>
  useMutation({
    mutationFn: async (params) => {
      const { data, error } = await supabase.auth.signInWithPassword(params);
      if (error) {
        throw error;
      }
      return data;
    },
    mutationKey: [Mutations.Login],
  });

export default useLoginMutation;
