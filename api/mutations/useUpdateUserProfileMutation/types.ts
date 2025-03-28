import { ProfileUpdate } from 'lib/types';

export type UseUpdateUserProfileMutationParameters = Pick<
  ProfileUpdate,
  'avatar_url' | 'username' | 'website'
>;
