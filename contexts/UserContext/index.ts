import { createContext, useContext } from 'react';
import { UserContextProps } from './types';
import { Session, User } from '@supabase/supabase-js';

export const UserContext = createContext<UserContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  session: {} as Session,
  user: {} as User,
});

export const UserContextProvider = UserContext.Provider;
export const useUserContext = (): UserContextProps => useContext(UserContext);
