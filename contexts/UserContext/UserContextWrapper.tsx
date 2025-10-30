import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase/supabase';
import { UserContextProvider } from '.';
import useUserProfileQuery from 'api/queries/useUserProfileQuery';
import { UserContextWrapperProps } from './types';

const UserContextWrapper = ({ children }: UserContextWrapperProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState('');
  const [isInitializing, setIsInitializing] = useState(true);

  const { data: userProfile } = useUserProfileQuery(userId, {
    enabled: userId !== null && userId !== '',
    select: (data) => {
      if (!data) return data;

      // Generate public URL for avatar if avatar_url exists
      const avatar_url = data.avatar_url
        ? supabase.storage.from('avatars').getPublicUrl(data.avatar_url).data
            ?.publicUrl
        : null;

      return {
        ...data,
        avatar_url,
      };
    },
  });

  // (userProfile === undefined && userId !== '') - thanks to this, the UI won't try to use an undefined profile before the user logs in.
  const isAuthenticating =
    isInitializing || (userProfile === undefined && userId !== '');

  // Helper function to update auth state consistently
  const updateAuthState = (session: Session | null) => {
    setSession(session);

    if (session) {
      setUserId(session.user.id);
      setIsLoggedIn(true);
    } else {
      setUserId('');
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      // INITIAL_SESSION is the first event after app start
      if (event === 'INITIAL_SESSION') {
        if (session) {
          updateAuthState(session);
        } else {
          // Defensive: make sure local storage doesn't hold an old token
          try {
            await supabase.auth.signOut();
          } catch (error) {
            // Ignore error - we're clearing invalid session anyway
            console.error('signOut error (expected if no session):', error);
          }
          updateAuthState(null);
        }
        setIsInitializing(false);
        return;
      }

      if (event === 'SIGNED_OUT') {
        updateAuthState(null);
        return;
      }

      // SIGNED_IN / TOKEN_REFRESHED / USER_UPDATED
      updateAuthState(session);
    });

    return () => {
      subscription.unsubscribe();
    };
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
