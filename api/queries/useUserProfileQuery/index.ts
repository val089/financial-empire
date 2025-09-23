import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import {
  UseUserProfileQueryOptions,
  UseUserProfileQueryReturnType,
} from './types';
import { Queries } from 'api/enums';

const useUserProfileQuery = (
  userId: string,
  options?: Omit<UseUserProfileQueryOptions, 'queryKey' | 'queryFn'>
): UseUserProfileQueryReturnType =>
  useQuery({
    queryKey: [Queries.UserProfile, userId],
    queryFn: async () => {
      const { data } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name `)
        .eq('id', userId)
        .single();

      return data;
    },
    ...options,
  });

export default useUserProfileQuery;
