import { ReactNode, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import { UserContextProvider } from '.';

const UserContextWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        return;
      }
      setIsLoggedIn(true);
      setUser(session.user);
    });
  }, []);

  return (
    <UserContextProvider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        session,
        user,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

export default UserContextWrapper;
