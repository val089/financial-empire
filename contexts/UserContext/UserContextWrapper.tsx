import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { UserContextProvider } from '.';
import useUserProfileQuery from 'api/queries/useUserProfileQuery';
import { UserContextWrapperProps } from './types';

const UserContextWrapper = ({ children }: UserContextWrapperProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState('');

  const { data: userProfile, isLoading: isUserProfileLoading } =
    useUserProfileQuery(userId, {
      enabled: userId !== null && userId !== '',
      select: (data) => {
        if (!data) return data;

        // Generate public URL for avatar if avatar_url exists
        const avatar_url = data.avatar_url
          ? supabase.storage.from('avatars').getPublicUrl(data.avatar_url).data
              .publicUrl
          : null;

        return {
          ...data,
          avatar_url: avatar_url,
        };
      },
    });

  const isAuthenticating = isUserProfileLoading;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        return;
      }
      setSession(session);
      setUserId(session.user.id);
      setIsLoggedIn(true);
    });
  }, []);

  return (
    <UserContextProvider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        session,
        user: userProfile,
        userId,
        isAuthenticating,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

export default UserContextWrapper;
