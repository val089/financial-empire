import { ReactNode, useEffect, useState } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from 'lib/supabase';
import { UserContextProvider } from '.';
import useUserProfileQuery from 'api/queries/useUserProfileQuery';
import useDownloadImageQuery from 'api/queries/useDownloadImageQuery';

const UserContextWrapper = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [userId, setUserId] = useState('');
  const { data, isLoading: isUserProfileLoading } = useUserProfileQuery(
    userId,
    {
      enabled: userId !== null,
    }
  );

  const { data: avatarData, isLoading: isAvatarLoading } =
    useDownloadImageQuery({
      storageName: 'avatars',
      path: data?.avatar_url || '',
      options: {
        enabled: Boolean(data?.avatar_url),
      },
    });

  const isAuthenticating = isUserProfileLoading || isAvatarLoading;

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

  const userWithAvatar = data
    ? {
        ...data,
        avatar_url: avatarData?.avatar_url ?? data.avatar_url,
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
        avatarDataUrl: avatarData?.avatar_url ?? null,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

export default UserContextWrapper;
