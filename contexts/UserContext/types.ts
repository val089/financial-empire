import { Dispatch, SetStateAction } from 'react';
import { Session, User } from '@supabase/supabase-js';

export type UserContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  session: Session | null;
  user: User | undefined;
};
