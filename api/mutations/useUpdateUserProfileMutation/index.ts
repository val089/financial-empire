import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Mutations, Queries } from 'api/enums';
import { UseUpdateUserProfileMutationParameters } from './types';
import { supabase } from 'lib/supabase';
import { useUserContext } from 'contexts/UserContext';
import { Alert } from 'react-native';
import { UseUserProfileQueryResponse } from 'api/queries/useUserProfileQuery/types';

const useUpdateUserProfileMutation = () => {
  const { session, userId } = useUserContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: UseUpdateUserProfileMutationParameters) => {
      try {
        // TODO: handle error by toast or alert
        if (!session?.user.id) throw new Error('No user on the session!');

        // filter fields that are actually passed
        const filteredUpdates = Object.fromEntries(
          Object.entries(updates).filter(([_, value]) => value !== undefined)
        );

        const { error } = await supabase
          .from('profiles')
          .update(filteredUpdates)
          .eq('id', session.user.id);

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
    onMutate: async (data) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: [Queries.UserProfile, userId],
      });

      // Snapshot the previous value
      const previousProfile =
        queryClient.getQueryData<UseUserProfileQueryResponse>([
          Queries.UserProfile,
          userId,
        ]);

      queryClient.setQueryData(
        [Queries.UserProfile, userId],
        (oldData: UseUserProfileQueryResponse) => ({
          ...oldData,
          ...data, // Apply all updates optimistically
        })
      );

      // If avatar_url changed, invalidate the image URL query to force refetch
      if (data.avatar_url && previousProfile?.avatar_url !== data.avatar_url) {
        queryClient.invalidateQueries({
          queryKey: [Queries.ImageUrl, 'avatars', data.avatar_url],
        });
      }

      return { previousProfile };
    },
    onError: (err, params, context) => {
      queryClient.setQueryData(
        [Queries.UserProfile, userId],
        context?.previousProfile
      );
    },
    mutationKey: [Mutations.UpdateUserProfile],
  });
};

export default useUpdateUserProfileMutation;
