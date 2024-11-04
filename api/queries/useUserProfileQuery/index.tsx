import { useQuery } from '@tanstack/react-query';
import { supabase } from '../../../lib/supabase';
import { UserProfileQueryResponse } from './types';
import { useUserContext } from '../../../contexts/UserContext';
import { Queries } from '../../enums';

const useUserProfileQuery = () => {
  const { session } = useUserContext();

  return useQuery<UserProfileQueryResponse | null>({
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
  });
};

export default useUserProfileQuery;
