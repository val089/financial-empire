import { useMutation } from '@tanstack/react-query';
import { Mutations } from '../../enums';
import { UseUpdateUserProfileMutationParameters } from './types';
import { supabase } from '../../../lib/supabase';
import { useUserContext } from '../../../contexts/UserContext';
import { Alert } from 'react-native';

const useUpdateUserProfileMutation = () => {
  const { session } = useUserContext();

  return useMutation({
    mutationFn: async ({
      username,
      website,
      avatar_url,
    }: UseUpdateUserProfileMutationParameters) => {
      try {
        // TODO: handle error by toast or alert
        if (!session?.user.id) throw new Error('No user on the session!');

        const updates = {
          id: session?.user.id,
          username,
          website,
          avatar_url,
          updated_at: new Date(),
        };

        const { error } = await supabase.from('profiles').upsert(updates);

        if (error) {
          // TODO: handle error by toast or alert
          throw error;
        }
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message);
        }
      }
    },
    mutationKey: [Mutations.UpdateUserProfile],
  });
};

export default useUpdateUserProfileMutation;
