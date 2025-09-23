import { Dispatch, SetStateAction } from 'react';
import { Session } from '@supabase/supabase-js';
import { UseUserProfileQueryResponse } from 'api/queries/useUserProfileQuery/types';

export type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  user: UseUserProfileQueryResponse | null;
  userId: string | null;
  isAuthenticating: boolean;
  avatarDataUrl: string | null;
};
