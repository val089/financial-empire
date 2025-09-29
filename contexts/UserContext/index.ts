import { createContext, useContext } from 'react';
import { UserContextProps } from './types';
import { Session } from '@supabase/supabase-js';
import { UseUserProfileQueryResponse } from 'api/queries/useUserProfileQuery/types';

export const UserContext = createContext<UserContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  session: {} as Session,
  user: {} as UseUserProfileQueryResponse,
  userId: '',
  isAuthenticating: false,
});

export const UserContextProvider = UserContext.Provider;
export const useUserContext = (): UserContextProps => useContext(UserContext);
