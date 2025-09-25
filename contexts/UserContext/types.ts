import { Dispatch, SetStateAction } from 'react';
import { Session } from '@supabase/supabase-js';
import { UseUserProfileQueryResponse } from 'api/queries/useUserProfileQuery/types';

export type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  user: UseUserProfileQueryResponse | undefined;
  userId: string | null;
  isAuthenticating: boolean;
};

export type UserContextWrapperProps = {
  children: React.ReactNode;
};
