import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import {
  UseUserProfileQueryOptions,
  UseUserProfileQueryReturnType,
} from './types';
import { Queries } from '../../enums';

const useUserProfileQuery = (
  userId: string,
  options?: Omit<UseUserProfileQueryOptions, 'queryKey'>
): UseUserProfileQueryReturnType =>
  useQuery({
    queryKey: [Queries.UserProfile, userId],
    queryFn: async () => {
      // TODO: handle error by toast or alert
      if (!userId) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', userId)
        .single();
      if (error && status !== 406) {
        // TODO: handle error by toast or alert
        throw error;
      }

      return data;
    },
    ...options,
  });

export default useUserProfileQuery;
