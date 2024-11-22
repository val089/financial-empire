import { useQuery } from '@tanstack/react-query';
import { supabase } from 'lib/supabase';
import { UseUserProfileQueryOptions } from './types';
import { useUserContext } from 'contexts/UserContext';
import { Queries } from '../../enums';

const useUserProfileQuery = (options?: UseUserProfileQueryOptions) => {
  const { session } = useUserContext();

  return useQuery({
    queryKey: [Queries.UserProfile, session?.user, session?.user.id],
    queryFn: async () => {
      // TODO: handle error by toast or alert
      if (!session?.user) throw new Error('No user on the session!');

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        // TODO: handle error by toast or alert
        throw error;
      }

      return data;
    },
    ...options,
  });
};

export default useUserProfileQuery;
