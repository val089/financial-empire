import { useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { UserContextProvider } from '.';
import useUserProfileQuery from 'api/queries/useUserProfileQuery';
import useImageUrlQuery from 'api/queries/useImageUrlQuery';
import { UserContextWrapperProps } from './types';

const UserContextWrapper = ({ children }: UserContextWrapperProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState('');

  const { data: userProfile, isLoading: isUserProfileLoading } =
    useUserProfileQuery(userId, {
      enabled: userId !== null,
    });

  const { data: avatar_url, isLoading: isAvatarLoading } = useImageUrlQuery({
    storageName: 'avatars',
    path: userProfile?.avatar_url || '',
    options: {
      enabled: Boolean(userProfile?.avatar_url),
    },
  });

  const isAuthenticating = isUserProfileLoading;

  // Only show avatar loading when we have avatar_url path but haven't loaded the public URL yet
  // This prevents "perpetual loading" issue after app reload by only showing loading
  // when we actually need to fetch the public URL for an existing avatar path
  const shouldShowAvatarLoading =
    Boolean(userProfile?.avatar_url) && isAvatarLoading;

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

  const userWithAvatar = userProfile
    ? {
        ...userProfile,
        avatar_url: avatar_url || null,
      }
    : null;

  return (
    <UserContextProvider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        session,
        user: userWithAvatar,
        userId,
        isAuthenticating,
        isAvatarLoading: shouldShowAvatarLoading,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

export default UserContextWrapper;
