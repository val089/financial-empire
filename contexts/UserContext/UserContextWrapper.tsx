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

  const { data: userProfile, isLoading: isUserProfileLoading } =
    useUserProfileQuery(userId, {
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

  const isAuthenticating = isInitializing || isUserProfileLoading;

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
    // Initialize session
    const initializeAuth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        // Handle error: clear session/user state to avoid inconsistent state
        updateAuthState(null);
      } else {
        updateAuthState(session);
      }

      setIsInitializing(false);
    };

    initializeAuth();

    // Listen to auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
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
