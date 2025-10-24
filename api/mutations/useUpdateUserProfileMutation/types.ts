import { ProfileUpdate } from 'lib/supabase/types';

export type UseUpdateUserProfileMutationParameters = Pick<
  ProfileUpdate,
  'avatar_url' | 'username' | 'website'
>;
